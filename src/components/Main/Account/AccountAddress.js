import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AccountAddress.css";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faPhoneVolume, faMapMarked } from "@fortawesome/free-solid-svg-icons";
import ButtonTransparent from "../../Base/ButtonTransparent";

const AccountAddress = (props) => {
  return (
    <div className="account-address-wrap">
      <div className="account-address__title">Sổ địa chỉ</div>
      <div className="account-address__label">Địa chỉ mặc định</div>
      <div className="account-address__content-wrap">
        <div className="account-address__content">
          <div className="account-address__content-name">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="account-address__content-icon"
            />
            trần minh hòa
          </div>
          <div className="account-address__content-phone">
            <FontAwesomeIcon
              icon={faPhoneVolume}
              className="account-address__content-icon"
            />
            0374269758
          </div>
          <div className="account-address__content-address">
            <FontAwesomeIcon
              icon={faMapMarked}
              className="account-address__content-icon"
            />
            Việt Nam
          </div>
        </div>
        <div className="account-address__btn">
          <ButtonTransparent className="account-address__btn-modify">
            Sửa
          </ButtonTransparent>
          <span className="account-address__btn-remove">Xóa</span>
        </div>
      </div>
    </div>
  );
};

export default AccountAddress;
