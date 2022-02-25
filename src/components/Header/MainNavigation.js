import { NavLink, useNavigate } from 'react-router-dom';
import './MainNavigation.css';
import logo from '../../assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { LINKCONNECT_BASE, LINKIMG_BASE } from '../../App';
import { useState } from 'react';
import { useEffect } from 'react';

const INITIAL_CATEGORY = {
  idCategory: 0,
  name: '',
  descCategory: 'null',
  imgURL: '0',
  isActive: 1,
};

const NavBar = (props) => {
  const [dataCategory, setDataCategory] = useState([INITIAL_CATEGORY]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // get all category
    fetch(`${LINKCONNECT_BASE}/allcategory`)
      .then((response) => response.json())
      .then((data) => setDataCategory(data));
  }, []);

  const inputSearchOnChange = (props) => {
    setSearchText(props.value);
  };

  const searchOnClick = () => {
    navigate('/product', { state: { searchText: searchText } });
    setSearchText('');
  };

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
                      ? 'header-nav__item-link header-nav__item-link--active '
                      : 'header-nav__item-link'
                  }
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className="header-nav__item header-nav__item-show-navProduct">
                <NavLink
                  to="/product"
                  className={({ isActive }) =>
                    isActive
                      ? 'header-nav__item-link header-nav__item-link--active'
                      : 'header-nav__item-link'
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
                          <NavLink to="/product">
                            <img
                              src={`${LINKIMG_BASE}imghover.jpg?alt=media`}
                              className="header-product__item-img"
                              alt="mua ngay"
                            />
                          </NavLink>
                        </div>
                      </div>
                      <div className="col l-3">
                        <div className="header-product__item">
                          <NavLink to="/product">
                            <img
                              src={`${LINKIMG_BASE}imghover1.jpg?alt=media`}
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
                          <span className="header-product__item-text-title">
                            Đồ gỗ mỹ nghệ
                          </span>
                          <ul className="header-product__item-text-list">
                            {dataCategory.map((item) => (
                              <li
                                key={item.idCategory}
                                className="header-product__item-text-item"
                              >
                                <NavLink
                                  to="/product"
                                  className="header-product__item-text-link"
                                  state={{ idCategory: item.idCategory }}
                                >
                                  {item.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col l-2">
                        <div className="header-product__item-text">
                          <span className="header-product__item-text-title"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="header-nav__item">
                <NavLink
                  to="/gioithieu"
                  className={({ isActive }) =>
                    isActive
                      ? 'header-nav__item-link header-nav__item-link--active'
                      : 'header-nav__item-link'
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
              <input
                id="header-right__search-inputId"
                className="header-right__search-input"
                placeholder="Nhập tên sản phẩm"
                onChange={(event) => inputSearchOnChange({ value: event.target.value })}
                value={searchText}
              ></input>
              <button
                className="header-right__search-btn"
                onClick={() => searchOnClick()}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="header-right__search-btn-icon"
                />
              </button>
            </div>
            <div className="header-right__user">
              {localStorage.getItem('infoLogined') === null ? (
                <NavLink to="/login" className="header-right__user-link">
                  <FontAwesomeIcon icon={faUser} className="header-right__user-icon" />
                </NavLink>
              ) : (
                <NavLink to="/account" className="header-right__user-link">
                  <FontAwesomeIcon icon={faUser} className="header-right__user-icon" />
                  <span>{localStorage.getItem('infoLogined').email}</span>
                </NavLink>
              )}
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
