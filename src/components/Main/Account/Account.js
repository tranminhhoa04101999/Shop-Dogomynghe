import "./Account.css";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import InputMain from "../../Base/InputMain";

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
  const inputOnChange = (event) => {
    setLastName(event.target.value);
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
                  <NavLink to="" className="account-left__item-link">
                    Thông tin tài khoản
                  </NavLink>
                </div>
              </li>
              <li className="account-left__item">
                <div className="account-left__item-title">Sổ địa chỉ</div>
                <div onClick={activeLinkTrue}>
                  <NavLink to="customerinfo" className="account-left__item-link">
                    Địa chỉ giao hàng
                  </NavLink>
                </div>
              </li>
              <li className="account-left__item">
                <div className="account-left__item-title">Đơn hàng</div>
                <div onClick={activeLinkTrue}>
                  <NavLink to="" className="account-left__item-link">
                    Lịch sử mua hàng
                  </NavLink>
                </div>
              </li>
              <li className="account-left__item">
                <div className="account-left__item-title">Wishlist</div>
                <div onClick={activeLinkTrue}>
                  <NavLink to="" className="account-left__item-link">
                    Danh sách yêu thích
                  </NavLink>
                </div>
              </li>
              <li className="account-left__item">
                <div>
                  <NavLink to="" className="account-left__item-link">
                    Đăng xuất tài khoản
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
          <div className="col l-9">
            {!activeLink && (
              <div className="info-wrap">
                <div className="info__title">Thông tin tài khoản</div>
                <InputMain
                  type="text"
                  placeholder="Họ"
                  onChange={inputOnChange}
                  value={lastName}
                />
                <InputMain
                  type="text"
                  placeholder="Tên"
                  onChange={inputOnChange}
                  value={firstName}
                />
                <InputMain
                  type="text"
                  placeholder="Email"
                  onChange={inputOnChange}
                  value={email}
                />
                <InputMain type="date" onChange={inputOnChange} value={date} />
                <InputMain type="text" onChange={inputOnChange} value={phone} />
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
