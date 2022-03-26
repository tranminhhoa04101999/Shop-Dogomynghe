import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { LINKCONNECT_BASE } from '../../../App';
import ButtonTransparent from '../../Base/ButtonTransparent';
import InputMain from '../../Base/InputMain';
import './UpdatePassword.css';

const UpdatePassword = () => {
  const [passNew, setPassNew] = useState('');
  const [passOld, setPassOld] = useState('');
  const [passNewCheck, setPassNewCheck] = useState('');
  const navigate = useNavigate();
  const info = JSON.parse(localStorage.getItem('infoLogined'));

  const openNotificationWithIcon = (props) => {
    notification[props.type]({
      message: props.message,
      description: props.desc,
    });
  };

  useEffect(() => {
    if (localStorage.getItem('infoLogined') === null) {
      navigate('/login');
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const inputPassOnChange = (event) => {
    setPassOld(event.target.value);
  };
  const inputPassNewOnChange = (event) => {
    setPassNew(event.target.value);
  };
  const inputPassNewCheckOnChange = (event) => {
    setPassNewCheck(event.target.value);
  };
  const btnOnclickHandler = () => {
    if (passOld === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Mật khẩu cũ trống',
        desc: 'Vui lòng điền mật khẩu cũ',
      });
      return;
    } else if (passOld.length <= 5) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Mật khẩu cũ quá ngắn',
        desc: 'mật khẩu  phải 6 ký tự',
      });
      return;
    } else if (passNew === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Mật khẩu mới trống',
        desc: 'Vui lòng điền mật khẩu mới',
      });
      return;
    } else if (passNew.length <= 5) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Mật khẩu mới quá ngắn',
        desc: 'mật khẩu phải 6 ký tự',
      });
      return;
    } else if (passNew !== passNewCheck) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Mật khẩu nhập lại không khớp',
        desc: '',
      });
      return;
    }
    fetch(
      `${LINKCONNECT_BASE}/changePass?email=${info.email}&oldPass=${passOld}&newPass=${passNew}`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Accepts: '*/*',

          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data === 3) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Mật khẩu cũ không đúng',
            desc: '',
          });
        } else if (data === 1) {
          openNotificationWithIcon({
            type: 'success',
            message: 'Thay đổi thành công',
            desc: '',
          });
          setPassNew('');
          setPassOld('');
          setPassNewCheck('');
        } else if (data === 0) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Thay đổi thất bại',
            desc: '',
          });
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="container-updatepassword">
      <InputMain
        type="password"
        placeholder="Mật khẩu cũ"
        onChange={inputPassOnChange}
        value={passOld}
      />
      <InputMain
        type="password"
        placeholder="Mật khẩu mới"
        onChange={inputPassNewOnChange}
        value={passNew}
      />
      <InputMain
        type="password"
        placeholder="Nhập lại mật khẩu mới"
        onChange={inputPassNewCheckOnChange}
        value={passNewCheck}
      />
      <ButtonTransparent onClick={() => btnOnclickHandler()}>Thay đổi</ButtonTransparent>
    </div>
  );
};

export default UpdatePassword;
