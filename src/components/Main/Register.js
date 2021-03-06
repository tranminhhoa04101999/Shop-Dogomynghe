import { useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { LINKCONNECT_BASE } from '../../App';
import './Register.css';

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
  const navigate = useNavigate();

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
    } else if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(dataCustomer.phone)) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'SĐT không đúng định dạng',
        desc: 'SĐT phải 10 số hoặc các đầu số đúng',
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
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(dataAccount.email)) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'email không hợp lệ',
        desc: 'Vui lòng điền lại email',
      });
      return;
    } else if (dataAccount.password.trim() === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Mật khẩu trống',
        desc: 'Vui lòng điền mật khẩu',
      });
      return;
    } else if (dataAccount.password.trim().indexOf(' ') >= 0) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Mật khẩu lỗi',
        desc: 'mật khẩu không được chưa khoảng trắng',
      });
      return;
    } else if (dataAccount.password.length <= 5) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Mật khẩu quá ngắn',
        desc: 'mật khẩu phải 6 ký tự',
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
    fetch(`${LINKCONNECT_BASE}/addAccount`, {
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
      body: JSON.stringify(dataAccount),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 1) {
          // thêm cả thông tin vào customer
          fetch(`${LINKCONNECT_BASE}/saveCustomer`, {
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
            body: JSON.stringify(dataCustomer),
          })
            .then((response1) => response1.json())
            .then((data1) => {});

          // chuyển trang
          navigate('/login');
          openNotificationWithIcon({
            type: 'success',
            message: 'Thêm mới thành công',
          });
        } else if (data === 2) {
          openNotificationWithIcon({
            type: 'warning',
            message: 'Email đăng ký đã tồn tại',
          });
        }
      })
      .catch((error) => {
        openNotificationWithIcon({
          type: 'error',
          message: 'Thêm mới thất bại',
          desc: error,
        });
      });
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
                placeholder="Mật khẩu* (tối thiểu 6 ký tự)"
                onChange={(event) => passwordOnchange({ value: event.target.value })}
                value={dataAccount.password}
              />
              <input
                type="password"
                className="register-main__input"
                placeholder="Nhập lại mật khẩu* (tối thiểu 6 ký tự)"
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
