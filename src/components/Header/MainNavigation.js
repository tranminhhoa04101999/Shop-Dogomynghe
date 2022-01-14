import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
import logo from "../../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
  const loginOnclick = (props) => {};

  return (
    <header className="header">
      <div className="grid wide">
        <div className="mainHeader">
          <div className="header-left">
            <div className="header-logo">
              <NavLink to="/">
                <img src={logo} alt="logo" className="header-logo__img" />
              </NavLink>
            </div>
            <ul className="header-nav__list">
              <li className="header-nav__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "header-nav__item-link header-nav__item-link--active "
                      : "header-nav__item-link"
                  }
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className="header-nav__item header-nav__item-show-navProduct">
                <NavLink
                  to="/sanpham"
                  className={({ isActive }) =>
                    isActive
                      ? "header-nav__item-link header-nav__item-link--active"
                      : "header-nav__item-link"
                  }
                >
                  Sản phẩm
                </NavLink>
                {/* danh mục khi hover btn SP */}
                <div className="header-product">
                  <div className="grid wide">
                    <div className="row sm-gutter header-product__row-add">
                      <div className="col l-3">
                        <div className="header-product__item">
                          <NavLink to="#">
                            <img
                              src="https://theme.hstatic.net/1000197303/1000796534/14/mega-image_1-1.jpg?v=444"
                              className="header-product__item-img"
                              alt="mua ngay"
                            />
                          </NavLink>
                        </div>
                      </div>
                      <div className="col l-3">
                        <div className="header-product__item">
                          <NavLink to="#">
                            <img
                              src="https://theme.hstatic.net/1000197303/1000796534/14/mega-image_1-2.jpg?v=444"
                              className="header-product__item-img"
                              alt="mua ngay"
                            />
                          </NavLink>
                        </div>
                      </div>
                      <div className="col l-2">
                        <div className="header-product__item-text">
                          <span className="header-product__item-text-title">Ưu đãi</span>
                          <ul className="header-product__item-text-list">
                            <li className="header-product__item-text-item">
                              <NavLink to="#" className="header-product__item-text-link">
                                Ưu đãi thành viên mới
                              </NavLink>
                            </li>
                            <li className="header-product__item-text-item">
                              <NavLink to="#" className="header-product__item-text-link">
                                Online Special
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col l-2 border-right-left">
                        <div className="header-product__item-text">
                          <span className="header-product__item-text-title">Áo</span>
                          <ul className="header-product__item-text-list">
                            <li className="header-product__item-text-item">
                              <NavLink to="#" className="header-product__item-text-link">
                                GU Unisex GENZ
                              </NavLink>
                            </li>
                            <li className="header-product__item-text-item">
                              <NavLink to="#" className="header-product__item-text-link">
                                Áo Thun
                              </NavLink>
                            </li>
                            <li className="header-product__item-text-item">
                              <NavLink to="#" className="header-product__item-text-link">
                                Áo Khoác
                              </NavLink>
                            </li>
                            <li className="header-product__item-text-item">
                              <NavLink to="#" className="header-product__item-text-link">
                                Áo Sơ Mi
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col l-2">
                        <div className="header-product__item-text">
                          <span className="header-product__item-text-title">
                            Quần, Phụ Kiện
                          </span>
                          <ul className="header-product__item-text-list">
                            <li className="header-product__item-text-item">
                              <NavLink to="#" className="header-product__item-text-link">
                                Quần Jean
                              </NavLink>
                            </li>
                            <li className="header-product__item-text-item">
                              <NavLink to="#" className="header-product__item-text-link">
                                Quần Dài
                              </NavLink>
                            </li>
                            <li className="header-product__item-text-item">
                              <NavLink to="#" className="header-product__item-text-link">
                                Balo, Túi
                              </NavLink>
                            </li>
                            <li className="header-product__item-text-item">
                              <NavLink to="#" className="header-product__item-text-link">
                                Nón
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="header-nav__item">
                <NavLink
                  to="/tintuc"
                  className={({ isActive }) =>
                    isActive
                      ? "header-nav__item-link header-nav__item-link--active"
                      : "header-nav__item-link"
                  }
                >
                  Tin tức
                </NavLink>
              </li>
              <li className="header-nav__item">
                <NavLink
                  to="/gioithieu"
                  className={({ isActive }) =>
                    isActive
                      ? "header-nav__item-link header-nav__item-link--active"
                      : "header-nav__item-link"
                  }
                >
                  Giới thiệu
                </NavLink>
              </li>
              <li className="header-nav__item">
                <NavLink to="/lienhe" className="header-nav__item-link">
                  Liên hệ
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="header-right">
            <div className="header-right__search">
              <input className="header-right__search-input"></input>
              <button className="header-right__search-btn">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="header-right__search-btn-icon"
                />
              </button>
            </div>
            <div className="header-right__user">
              <NavLink to="/register" className="header-right__user-link">
                <FontAwesomeIcon icon={faUser} className="header-right__user-icon" />
              </NavLink>
            </div>
            <div className="header-right__cart">
              <span className="header-right__cart-notice">0</span>
              <NavLink to="/cart" className="header-right__cart-link">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="header-right__cart-icon"
                />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
