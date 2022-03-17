import './Account.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputMain from '../../Base/InputMain';
import ButtonTransparent from '../../Base/ButtonTransparent';
import { LINKCONNECT_BASE } from '../../../App';
import { notification } from 'antd';

const INITIAL_CUSTOMER = {
  idCustomer: 0,
  name: '',
  phone: '',
  address: '',
  dateCreate: '',
  account: { email: '' },
};

const Account = (props) => {
  const [activeLink, setActiveLink] = useState(true);

  const [dataCustomer, setDataCustomer] = useState(INITIAL_CUSTOMER);
  const navigate = useNavigate();

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
      const info = JSON.parse(localStorage.getItem('infoLogined'));
      // get data customer
      fetch(`${LINKCONNECT_BASE}/findCustomerByIdAccount?idAccount=${info.idAccount}`)
        .then((response) => response.json())
        .then((data) => {
          setDataCustomer(data);
        });
    }
  }, []);

  const activeLinkFalse = () => {
    setActiveLink(false);
  };
  const activeLinkTrue = () => {
    setActiveLink(true);
  };
  const inputNameOnChange = (event) => {
    setDataCustomer((prevData) => ({ ...prevData, name: event.target.value }));
  };
  const inputEmailOnChange = () => {};
  const inputAddressOnChange = (event) => {
    setDataCustomer((prevData) => ({ ...prevData, address: event.target.value }));
  };
  const inputPhoneOnChange = (event) => {
    setDataCustomer((prevData) => ({ ...prevData, phone: event.target.value }));
  };
  const logoutHandler = () => {
    localStorage.removeItem('infoLogined');
    window.location.reload(false);
  };
  const updateInfoHandler = () => {
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
    }
    fetch(`${LINKCONNECT_BASE}/updateInfCustomer`, {
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
      .then((response) => response.json())
      .then((data) =>
        openNotificationWithIcon({
          type: 'success',
          message: 'Thay đổi thông tin thành công',
          desc: '',
        })
      );
  };
  return (
    <div className="grid wide">
      <div className="account-wrap">
        <div className="account__title">Chào mừng trở lại {dataCustomer.name}.</div>
        <div className="row">
          <div className="col l-3">
            <ul className="account-left__list">
              <li className="account-left__item">
                <div className="account-left__item-title">Tài khoản</div>
                <div onClick={activeLinkFalse}>
                  <NavLink
                    to="/account"
                    className={({ isActive }) =>
                      isActive
                        ? 'account-left__item-link account-left__item-link--active'
                        : 'account-left__item-link'
                    }
                  >
                    Thông tin tài khoản
                  </NavLink>
                </div>

                <div onClick={activeLinkTrue} style={{ marginTop: '20px' }}>
                  <NavLink
                    to="/account/updatePassword"
                    className={({ isActive }) =>
                      isActive
                        ? 'account-left__item-link account-left__item-link--active'
                        : 'account-left__item-link'
                    }
                  >
                    Thay đổi mật khẩu
                  </NavLink>
                </div>
              </li>

              <li className="account-left__item">
                <div className="account-left__item-title">Đơn hàng</div>
                <div onClick={activeLinkTrue}>
                  <NavLink
                    to="/account/orderHistory"
                    className={({ isActive }) =>
                      isActive
                        ? 'account-left__item-link account-left__item-link--active'
                        : 'account-left__item-link'
                    }
                  >
                    Lịch sử mua hàng
                  </NavLink>
                </div>
              </li>

              <li className="account-left__item">
                <div>
                  <ButtonTransparent onClick={() => logoutHandler()}>
                    Đăng xuất
                  </ButtonTransparent>
                </div>
              </li>
            </ul>
          </div>
          <div className="col l-9">
            {!activeLink && (
              <div className="info-wrap">
                <div className="account-left__item-title">Thông tin tài khoản</div>
                <InputMain
                  type="text"
                  placeholder="Họ và Tên"
                  onChange={inputNameOnChange}
                  value={dataCustomer.name}
                />
                <InputMain
                  type="text"
                  placeholder="Email"
                  onChange={inputEmailOnChange}
                  value={dataCustomer.account.email}
                  disabled={true}
                />

                <InputMain
                  type="text"
                  onChange={inputPhoneOnChange}
                  placeholder="Số điên thoại"
                  value={dataCustomer.phone}
                />
                <InputMain
                  type="text"
                  onChange={inputAddressOnChange}
                  placeholder="Địa chỉ giao hàng"
                  value={dataCustomer.address}
                />

                <div className="container-btnAccount">
                  <ButtonTransparent onClick={() => updateInfoHandler()}>
                    Cập nhật thông tin
                  </ButtonTransparent>
                  {/* <div style={{ width: '400px' }}></div> */}
                </div>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
