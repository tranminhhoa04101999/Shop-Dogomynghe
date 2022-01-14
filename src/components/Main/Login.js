import { NavLink } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  return (
    <div className="grid wide">
      <div className="login-wrap">
        <div className="login-text-center">
          <div className="login-text-center__title">Thành viên nhà TMH</div>
          <div className="login-text-center_description">
            Trở thành thành viên nhà TMH, Nàng sẽ được cập nhật xu hướng thời trang và
            nhiều ưu đãi hấp dẫn
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
                placeholder="Nhập email hoặc số điện thoại"
              />
              <input type="text" className="login-main__input" placeholder="Mật khẩu" />
            </div>
            <button className="login-main__submit-btn">Đăng Nhập</button>
            <div className="login-main__login-link-wrap">
              <NavLink to="/register" className="login-main__login-link">
                Đăng Ký
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
