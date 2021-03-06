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
        })
        .catch((error) => console.log(error));
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
        message: 'H??? T??n tr???ng',
        desc: 'Vui l??ng ??i???n h??? t??n',
      });
      return;
    } else if (dataCustomer.phone === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'S??? ??i???n tho???i tr???ng',
        desc: 'Vui l??ng ??i???n S??T',
      });
      return;
    } else if (dataCustomer.phone.length + 1 <= 10) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'S??T ch??a ????ng',
        desc: 'S??T ph???i nhi???u h??n 9 s???',
      });
      return;
    } else if (dataCustomer.address === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: '?????a ch??? tr???ng',
        desc: 'Vui l??ng ??i???n ?????a ch???',
      });
      return;
    }
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
      .then((response) => response.json())
      .then((data) =>
        openNotificationWithIcon({
          type: 'success',
          message: 'Thay ?????i th??ng tin th??nh c??ng',
          desc: '',
        })
      );
  };
  const updatePasswordHandler = () => {};
  return (
    <div className="grid wide">
      <div className="account-wrap">
        <div className="account__title">Ch??o m???ng tr??? l???i {dataCustomer.name}.</div>
        <div className="row">
          <div className="col l-3">
            <ul className="account-left__list">
              <li className="account-left__item">
                <div className="account-left__item-title">T??i kho???n</div>
                <div onClick={activeLinkFalse}>
                  <NavLink
                    to="/account"
                    className={({ isActive }) =>
                      isActive
                        ? 'account-left__item-link account-left__item-link--active'
                        : 'account-left__item-link'
                    }
                  >
                    Th??ng tin t??i kho???n
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
                    Thay ?????i m???t kh???u
                  </NavLink>
                </div>
              </li>

              <li className="account-left__item">
                <div className="account-left__item-title">????n h??ng</div>
                <div onClick={activeLinkTrue}>
                  <NavLink
                    to="/account/orderHistory"
                    className={({ isActive }) =>
                      isActive
                        ? 'account-left__item-link account-left__item-link--active'
                        : 'account-left__item-link'
                    }
                  >
                    L???ch s??? mua h??ng
                  </NavLink>
                </div>
              </li>

              <li className="account-left__item">
                <div>
                  <ButtonTransparent onClick={() => logoutHandler()}>
                    ????ng xu???t
                  </ButtonTransparent>
                </div>
              </li>
            </ul>
          </div>
          <div className="col l-9">
            {!activeLink && (
              <div className="info-wrap">
                <div className="account-left__item-title">Th??ng tin t??i kho???n</div>
                <InputMain
                  type="text"
                  placeholder="H??? v?? T??n"
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
                  placeholder="S??? ??i??n tho???i"
                  value={dataCustomer.phone}
                />
                <InputMain
                  type="text"
                  onChange={inputAddressOnChange}
                  placeholder="?????a ch??? giao h??ng"
                  value={dataCustomer.address}
                />

                <div className="container-btnAccount">
                  <ButtonTransparent onClick={() => updateInfoHandler()}>
                    C???p nh???t th??ng tin
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
