import "./footer.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = (props) => {
  return (
    <div className="grid wide">
      <div className="footer">
        <span className="footer-top-title">TMH Shop</span>
        <div className="row">
          <div className="col l-2">
            <span className="footer-title">Về chúng tôi</span>
            <ul className="footer-list">
              <li className="footer-item">
                <NavLink to="/" className="footer-link">
                  Giới thiệu TMH
                </NavLink>
              </li>
              <li className="footer-item">
                <NavLink to="/" className="footer-link">
                  Cảm hứng thời trang
                </NavLink>
              </li>
              <li className="footer-item">
                <NavLink to="/" className="footer-link">
                  Chính sách giao hàng
                </NavLink>
              </li>
              <li className="footer-item">
                <NavLink to="/" className="footer-link">
                  Chính sách bảo hành
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col l-3">
            <span className="footer-title">Hỗ trợ khách hàng</span>
            <ul className="footer-list">
              <li className="footer-item">
                <NavLink to="/" className="footer-link">
                  Liên hệ đến TMH
                </NavLink>
              </li>
              <li className="footer-item">
                <NavLink to="/" className="footer-link">
                  Câu hỏi thường gặp
                </NavLink>
              </li>
              <li className="footer-item">
                <NavLink to="/" className="footer-link">
                  Hướng dẫn tạo tài khoản
                </NavLink>
              </li>
              <li className="footer-item">
                <NavLink to="/" className="footer-link">
                  Mua Online nhận tại Cửa hàng
                </NavLink>
              </li>
              <li className="footer-item">
                <NavLink to="/" className="footer-link">
                  Hướng dẫn mua trước, trả sau
                </NavLink>
              </li>
              <li className="footer-item">
                <NavLink to="/" className="footer-link">
                  Quy định và Hướng dẫn đổi trả hàng
                </NavLink>
              </li>
              <li className="footer-item">
                <NavLink to="/" className="footer-link">
                  Hướng dẫn Đánh giá sản phẩm
                </NavLink>
              </li>
              <li className="footer-item">
                <NavLink to="/" className="footer-link">
                  Hướng dẫn xem và đổi điểm thưởng
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col l-3">
            <p className="footer-title">Liên hệ</p>
            <p className="footer-label">Đặt hàng trực tuyến (8h-21h)</p>
            <p className="footer-label-content">0374 269 758</p>
            <p className="footer-label">CSKH (8h-21h)</p>
            <p className="footer-label-content">0978 252 752</p>
            <p className="footer-label-mail">tranminhhoa0401999@gmail.com</p>
          </div>
          <div className="col l-4">
            <p className="footer-title">Đăng kí nhận tin khuyến mãi</p>
            <p className="footer-mail-description">
              Hãy nhập email của bạn vào đây để nhận được xu hướng thời trang và khuyến
              mãi mới nhất từ TMH nhé.
            </p>
            <div className="footer-wrapper-input">
              <input
                type="email"
                className="footer-wrapper-input__input"
                placeholder="Nhập e-mail của bạn "
              />
              <button className="footer-wrapper-input__btn">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="footer-wrapper-input__icon"
                />
              </button>
            </div>
            <div className="footer-wrapper-icon">
              <a
                href="https://www.facebook.com/hoatran0410/"
                className="footer-wrapper-icon__link"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="footer-wrapper-icon__icon"
                />
              </a>

              <a
                href="https://www.instagram.com/t_minhhoa_/"
                className="footer-wrapper-icon__link"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="footer-wrapper-icon__icon"
                />
              </a>

              <a href="youtube.com" className="footer-wrapper-icon__link">
                <FontAwesomeIcon icon={faYoutube} className="footer-wrapper-icon__icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
