import "./Cart.css";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = (props) => {
  return (
    <div className="grid wide">
      <div className="cart">
        <div className="cart__title">Giỏ hàng của bạn</div>
        <div className="row">
          <div className="col l-9">
            <p className="cart__count">Tóm tắt đơn hàng (1)</p>
            <table className="cart-table">
              <thead>
                <tr className="cart-table-tr-header">
                  <th className="cart-table-th__products">Sản phẩm</th>
                  <th className="cart-table-th__price">Giá</th>
                  <th className="cart-table-th__quantity">Số lượng</th>
                  <th className="cart-table-th__total">Thành tiền</th>
                  <th className="cart-table-th__remove"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="cart-table-body-tr">
                  <td className="cart-table-img">
                    <div className="cart-table-img__wrap-img">
                      <img
                        src="https://product.hstatic.net/1000197303/product/pro_den_1_b84b7bafb92b42318f85139fc179215b.jpg"
                        alt=""
                        className="cart-table-img__img"
                      />
                    </div>
                    <div className="cart-table-img__wrap-variant">
                      <a href="/" className="cart-table-img__link">
                        Quần biker lưng thun
                      </a>
                      <p className="cart-table-img__variant">Đen / S</p>
                    </div>
                  </td>
                  <td className="cart-table__wrap-price">
                    <p className="cart-table__price">85,000₫</p>
                    <p className="cart-table__price-original">(155,000₫)</p>
                  </td>
                  <td className="cart-table__wrap-quantity">
                    <div className="cart-product__quantity-area">
                      <input
                        type="button"
                        className="cart-product__quantity-area-btn"
                        value="-"
                      />
                      <span className="cart-product__quantity-area-num">1</span>
                      <input
                        type="button"
                        className="cart-product__quantity-area-btn"
                        value="+"
                      />
                    </div>
                  </td>
                  <td className="cart-table__wrap-total">
                    <p className="cart-table__total">85,000₫</p>
                  </td>
                  <td className="cart-table__wrap-remove">
                    <div className="cart-table__remove">
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="cart-table__remove-icon"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <input type="text" className="cart-note" placeholder="Lưu ý về đơn hàng" />
          </div>
          <div className="col l-3">
            <p className="cart-right__title">Thành tiền</p>
            <div className="cart-right__wrap-total">
              <span className="cart-right__total-text">Tổng</span>
              <span className="cart-right__total-price">160,000₫</span>
            </div>
            <div className="cart-right__wrap-checkout">
              <a href="/" className="cart-right__checkout">
                <span className="cart-right__checkout-text">Đặt hàng</span>
              </a>
              <a href="/" className="cart-right__collection">
                <span className="cart-right__collection-text">Tiếp Tục Mua Sắm</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
