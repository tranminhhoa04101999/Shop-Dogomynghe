import React, { useState } from 'react';
import './ForgotPassword.css';
import { Input, Button, Card, notification } from 'antd';
import { LINKCONNECT_BASE } from '../../../App';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loaded, setLoaded] = useState(false);
  const openNotificationWithIcon = (props) => {
    notification[props.type]({
      message: props.message,
      description: props.desc,
    });
  };
  const emailOnchangeHandler = (props) => {
    setEmail(props.value);
  };

  const btnSubmitHandler = async () => {
    setLoaded(true);
    if (email === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'email trống',
        desc: 'Vui lòng điền email',
      });
      return;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'email không hợp lệ',
        desc: 'Vui lòng điền lại email',
      });
      return;
    }
    await fetch(`${LINKCONNECT_BASE}/getforgotPassword?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data === 1) {
          openNotificationWithIcon({
            type: 'success',
            message: 'Thay đổi thành công',
            desc: 'Vui lòng check mail',
          });
        } else if (data === 0) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Lấy mật khẩu thất bại',
            desc: '',
          });
        } else if (data === 2) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Email không tồn tại',
            desc: '',
          });
        }
      });
    setLoaded(false);
  };
  return (
    <div className="grid wide container-forgotpass">
      <div className="row">
        <div className="col l-4"></div>
        <div className="col l-4">
          <Card>
            <Input
              placeholder="Nhập email để lấy lại mật khẩu"
              onChange={(event) => emailOnchangeHandler({ value: event.target.value })}
            />
            <Button
              loading={loaded === true ? 1 : 0}
              className="forgotpass-btn"
              onClick={() => btnSubmitHandler()}
            >
              Gửi
            </Button>
          </Card>
        </div>
        <div className="col l-4"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
