import "./Account.css";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import InputMain from "../../Base/InputMain";
import ButtonTransparent from "../../Base/ButtonTransparent";

const Account = (props) => {
  const [activeLink, setActiveLink] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setLastName("Trần Minh");
    setFirstName("Hòa");
    setEmail("tmhoa111@gmail.com");
    setPhone("0374269758");
    setDate("2022-01-13");
  }, []);

  const activeLinkFalse = () => {
    setActiveLink(false);
  };
  const activeLinkTrue = () => {
    setActiveLink(true);
  };
  const inputLastNameOnChange = (event) => {
    setLastName(event.target.value);
  };
  const inputFirstNameOnChange = (event) => {
    setFirstName(event.target.value);
  };
  const inputEmailOnChange = (event) => {
    setEmail(event.target.value);
  };
  const inputDateOnChange = (event) => {
    setDate(event.target.value);
  };
  const inputPhoneOnChange = (event) => {
    setPhone(event.target.value);
  };

  return (
    <div className="grid wide">
      <div className="account-wrap">
        <div className="account__title">Chào mừng trở lại. trần minh hòa</div>
        <div className="row">
          <div className="col l-3">
            <ul className="account-left__list">
              <li className="account-left__item">
                <div className="account-left__item-title">Tài khoản</div>
                <div onClick={activeLinkFalse}>
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive
                        ? "account-left__item-link account-left__item-link--active"
                        : "account-left__item-link"
                    }
                  >
                    Thông tin tài khoản
                  </NavLink>
                </div>
              </li>
              <li className="account-left__item">
                <div className="account-left__item-title">Sổ địa chỉ</div>
                <div onClick={activeLinkTrue}>
                  <NavLink
                    to="address"
                    className={({ isActive }) =>
                      isActive
                        ? "account-left__item-link account-left__item-link--active"
                        : "account-left__item-link"
                    }
                  >
                    Địa chỉ giao hàng
                  </NavLink>
                </div>
              </li>
              <li className="account-left__item">
                <div className="account-left__item-title">Đơn hàng</div>
                <div onClick={activeLinkTrue}>
                  <NavLink
                    to="accountPurchaseHistory"
                    className={({ isActive }) =>
                      isActive
                        ? "account-left__item-link account-left__item-link--active"
                        : "account-left__item-link"
                    }
                  >
                    Lịch sử mua hàng
                  </NavLink>
                </div>
              </li>
              <li className="account-left__item">
                <div className="account-left__item-title">Wishlist</div>
                <div onClick={activeLinkTrue}>
                  <NavLink
                    to="accountFavoriteList"
                    className={({ isActive }) =>
                      isActive
                        ? "account-left__item-link account-left__item-link--active"
                        : "account-left__item-link"
                    }
                  >
                    Danh sách yêu thích
                  </NavLink>
                </div>
              </li>
              <li className="account-left__item">
                <div>
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive
                        ? "account-left__item-link account-left__item-link--active"
                        : "account-left__item-link"
                    }
                  >
                    Đăng xuất tài khoản
                  </NavLink>
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
                  placeholder="Họ"
                  onChange={inputLastNameOnChange}
                  value={lastName}
                />
                <InputMain
                  type="text"
                  placeholder="Tên"
                  onChange={inputFirstNameOnChange}
                  value={firstName}
                />
                <InputMain
                  type="text"
                  placeholder="Email"
                  onChange={inputEmailOnChange}
                  value={email}
                />
                <InputMain type="date" onChange={inputDateOnChange} value={date} />
                <InputMain
                  type="text"
                  onChange={inputPhoneOnChange}
                  placeholder="Số điên thoại"
                  value={phone}
                />
                <div className="account-left__wrap-gender">
                  <input
                    id="account-left__registerRadio1"
                    type="radio"
                    name="gender"
                    defaultChecked
                  />
                  <label
                    htmlFor="account-left__registerRadio1"
                    className="account-left__Radio-label"
                  >
                    Nam
                  </label>
                  <input id="account-left__registerRadio2" type="radio" name="gender" />
                  <label
                    htmlFor="account-left__registerRadio2"
                    className="account-left__Radio-label"
                  >
                    Nữ
                  </label>
                </div>
                <ButtonTransparent>Cập nhật thông tin</ButtonTransparent>
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
