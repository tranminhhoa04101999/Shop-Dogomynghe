import { NavLink } from "react-router-dom";
import "./Register.css";

const Register = (props) => {
  return (
    <div className="grid wide">
      <div className="register-wrap">
        <div className="register-text-center">
          <div className="register-text-center__title">Thành viên nhà TMH</div>
          <div className="register-text-center_description">
            Trở thành thành viên nhà TMH, Nàng sẽ được cập nhật xu hướng thời trang và
            nhiều ưu đãi hấp dẫn
          </div>
        </div>
        <div className="row">
          <div className="col l-3"></div>
          <div className="col l-6">
            <div className="register-main">
              <p className="register-main__title">Đăng Ký</p>
              <input type="text" className="register-main__input" placeholder="Họ" />
              <input type="text" className="register-main__input" placeholder="Tên" />
              <div className="register-main__wrap-gender">
                <input id="registerRadio1" type="radio" name="gender" checked />
                <label htmlFor="registerRadio1" className="registerRadio-label">
                  Nam
                </label>
                <input id="registerRadio2" type="radio" name="gender" />
                <label htmlFor="registerRadio2" className="registerRadio-label">
                  Nữ
                </label>
              </div>
              <input
                type="date"
                className="register-main__input"
                placeholder="mm/dd/yy"
              />
              <input
                type="text"
                className="register-main__input"
                placeholder="Số điện thoại*"
              />
              <input type="email" className="register-main__input" placeholder="Email*" />
              <input
                type="password"
                className="register-main__input"
                placeholder="Mật khẩu* (tối thiểu 5 ký tự)"
              />
              <button className="register-main__submit-btn">Đăng K</button>
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
