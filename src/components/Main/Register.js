import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { notification, Select } from 'antd';

import './Register.css';
import { useEffect } from 'react';

const INITIAL_ACCOUNT = {
  email: '',
  password: '',
  isActive: 1,
};
const INITIAL_CUSTOMER = {
  name: '',
  phone: '',
  address: '',
  dateCreate: new Date(),
};
const Register = (props) => {
  const [dataAccount, setDataAccount] = useState(INITIAL_ACCOUNT);
  const [dataCustomer, setDataCustomer] = useState(INITIAL_CUSTOMER);

  const { Option } = Select;
  const [passwordCheck, setPasswordCheck] = useState('');

  const emailOnchange = (props) => {
    setDataAccount((prevData) => ({ ...prevData, email: props.value }));
  };
  const nameOnchange = (props) => {
    setDataCustomer((prevData) => ({ ...prevData, name: props.value }));
  };
  const phoneOnchange = (props) => {
    setDataCustomer((prevData) => ({ ...prevData, phone: props.value }));
  };
  const addressOnchange = (props) => {
    setDataCustomer((prevData) => ({ ...prevData, address: props.value }));
  };
  const passwordOnchange = (props) => {
    setDataAccount((prevData) => ({ ...prevData, password: props.value }));
  };
  const passwordCheckOnchange = (props) => {
    setPasswordCheck(props.value);
  };
  const openNotificationWithIcon = (props) => {
    notification[props.type]({
      message: props.message,
      description: props.desc,
    });
  };
  useEffect(() => {}, []);
  const registerHandler = () => {
    if (dataCustomer.name === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Họ Tên trống',
        desc: 'Vui lòng điền họ tên',
      });
      return;
    } else if (dataCustomer.phone === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Số điện thoại trống',
        desc: 'Vui lòng điền SĐT',
      });
      return;
    } else if (dataCustomer.phone.length + 1 <= 10) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'SĐT chưa đúng',
        desc: 'SĐT phải nhiều hơn 9 số',
      });
      return;
    } else if (dataCustomer.address === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Địa chỉ trống',
        desc: 'Vui lòng điền địa chỉ',
      });
      return;
    } else if (dataAccount.email === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'email trống',
        desc: 'Vui lòng điền email',
      });
      return;
    } else if (!/\S+@\S+\.\S+/.test(dataCustomer.email)) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'email không hợp lệ',
        desc: 'Vui lòng điền lại email',
      });
      return;
    } else if (dataAccount.password === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Mật khẩu trống',
        desc: 'Vui lòng điền mật khẩu',
      });
      return;
    } else if (dataAccount.password !== passwordCheck) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Mật khẩu nhập lại không khớp',
        desc: '',
      });
      return;
    }
  };
  return (
    <div className="grid wide">
      <div className="register-wrap">
        <div className="register-text-center">
          <div className="register-text-center__title">Thành viên nhà TMH</div>
          <div className="register-text-center_description">
            Trở thành thành viên nhà TMH, Bạn sẽ được cập nhật các đồ gỗ mỹ nghệ mới và
            nhiều ưu đãi hấp dẫn
          </div>
        </div>
        <div className="row">
          <div className="col l-3"></div>
          <div className="col l-6">
            <div className="register-main">
              <p className="register-main__title">Đăng Ký</p>
              <input
                type="text"
                className="register-main__input"
                placeholder="Họ và Tên"
                onChange={(event) => nameOnchange({ value: event.target.value })}
                value={dataCustomer.name}
              />
              <input
                type="text"
                className="register-main__input"
                placeholder="Số điện thoại*"
                onChange={(event) => phoneOnchange({ value: event.target.value })}
                value={dataCustomer.phone}
              />
              <input
                type="text"
                className="register-main__input"
                placeholder="Địa chỉ*"
                onChange={(event) => addressOnchange({ value: event.target.value })}
                value={dataCustomer.address}
              />

              <input
                type="email"
                className="register-main__input"
                placeholder="Email*"
                onChange={(event) => emailOnchange({ value: event.target.value })}
                value={dataAccount.email}
              />
              <input
                type="password"
                className="register-main__input"
                placeholder="Mật khẩu* (tối thiểu 5 ký tự)"
                onChange={(event) => passwordOnchange({ value: event.target.value })}
                value={dataAccount.password}
              />
              <input
                type="password"
                className="register-main__input"
                placeholder="Nhập lại mật khẩu* (tối thiểu 5 ký tự)"
                onChange={(event) => passwordCheckOnchange({ value: event.target.value })}
                value={passwordCheck}
              />
              <button
                className="register-main__submit-btn"
                onClick={() => registerHandler()}
              >
                Đăng Ký
              </button>
              <div className="register-main__login-link-wrap">
                <NavLink to="/login" className="register-main__login-link">
                  Đăng Nhập
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col l-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
