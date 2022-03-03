import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';
import { notification } from 'antd';
import { LINKCONNECT_BASE } from '../../App';
import { useEffect } from 'react';

const INITIAL_LOGIN = {
  email: '',
  password: '',
};

const Login = (props) => {
  const [dataLogin, setDataLogin] = useState(INITIAL_LOGIN);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('infoLogined') !== null) {
      if (localStorage.getItem('infoLogined').length !== 0) {
        navigate('/product');
      }
    }
  }, []);

  const emailOnChange = (props) => {
    setDataLogin((prevData) => ({ ...prevData, email: props.value }));
  };
  const passwordOnChange = (props) => {
    setDataLogin((prevData) => ({ ...prevData, password: props.value }));
  };
  const openNotificationWithIcon = (props) => {
    notification[props.type]({
      message: props.message,
      description: props.desc,
    });
  };
  const submitHandler = () => {
    if (dataLogin.email === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'email trống',
        desc: 'Vui lòng điền email',
      });
      return;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(dataLogin.email)) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'email không hợp lệ',
        desc: 'Vui lòng điền lại email',
      });
      return;
    } else if (dataLogin.password === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Mật khẩu trống',
        desc: 'Vui lòng điền mật khẩu',
      });
      return;
    }
    fetch(
      `${LINKCONNECT_BASE}/login?email=${dataLogin.email}&password=${dataLogin.password}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Không thành công',
            desc: 'sai thông tin đăng nhập',
          });
        } else {
          localStorage.setItem('infoLogined', JSON.stringify(data[0]));
          navigate('/');
        }
      });
  };

  return (
    <div className="grid wide">
      <div className="login-wrap">
        <div className="login-text-center">
          <div className="login-text-center__title">Thành viên nhà TMH</div>
          <div className="login-text-center_description">
            Trở thành thành viên nhà TMH, bạn sẽ được cập nhật các đồ gỗ mỹ nghệ mới nhất
            và nhiều ưu đãi hấp dẫn
          </div>
        </div>
        <div className="row">
          <div className="col l-3"></div>
          <div className="col l-6">
            <div className="login-main">
              <p className="login-main__title">Đăng Nhập</p>
              <input
                type="text"
                className="login-main__input"
                placeholder="Nhập email"
                onChange={(event) => {
                  emailOnChange({ value: event.target.value });
                }}
                value={dataLogin.email}
              />
              <input
                type="password"
                className="login-main__input"
                placeholder="Mật khẩu"
                onChange={(event) => {
                  passwordOnChange({ value: event.target.value });
                }}
                value={dataLogin.password}
              />
            </div>
            <button className="login-main__submit-btn" onClick={() => submitHandler()}>
              Đăng Nhập
            </button>
            <div className="login-main__login-link-wrap">
              <NavLink to="/register" className="login-main__login-link">
                Đăng Ký
              </NavLink>
            </div>
            <div className="login-main__login-link-wrap">
              <NavLink to="/forgotPassword" className="login-main__login-link">
                quên mật khẩu
              </NavLink>
            </div>
          </div>
          <div className="col l-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
