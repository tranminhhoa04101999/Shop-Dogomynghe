import './Cart.css';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Space, Image, notification } from 'antd';
import { useState, useEffect } from 'react';
import { LINKCONNECT_BASE, LINKIMG_BASE } from '../../App';

const Cart = (props) => {
  const [dataProdCart, setDataProdCart] = useState([]);
  const [dataProdLocal, setDataProdLocal] = useState([]);
  const [dataInfoOrder, setDataInfoOrder] = useState({
    phone: '',
    name: '',
    address: '',
  });
  const dataCartLocal = JSON.parse(localStorage.getItem('cartListId'));

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });

  const openNotificationWithIcon = (props) => {
    notification[props.type]({
      message: props.message,
      description: props.desc,
    });
  };
  useEffect(() => {
    if (dataCartLocal !== null) {
      dataCartLocal.map((item) =>
        fetch(`${LINKCONNECT_BASE}/getproductbyid?idProduct=${item.id}`)
          .then((response) => response.json())
          .then((data) => {
            fetch(`${LINKCONNECT_BASE}/imgproductwith?idProduct=${item.id}`)
              .then((response) => response.json())
              .then((data1) =>
                setDataProdCart((prev) => [
                  ...prev,
                  { content: data, count: item.count, imgName: data1[0].imgURL },
                ])
              );
          })
      );
      setDataProdLocal(dataCartLocal);
    }
    return () => {
      setDataProdCart([]);
    };
  }, []);

  const subCountHandler = (props) => {
    const dataNew = dataProdCart.map((item) => {
      if (item.count > 0) {
        return item.content.idProduct === props.id
          ? { ...item, count: item.count - 1 }
          : item;
      }
      return item;
    });
    const indexCountZero = dataNew.findIndex((item) => item.count === 0);

    if (indexCountZero >= 0) {
      dataNew.splice(indexCountZero, 1);
      setDataProdCart(dataNew);
    } else {
      setDataProdCart(dataNew);
    }

    // remove tren local
    const dataLocalNew = dataProdLocal.map((item) => {
      if (item.count > 0) {
        return item.id === props.id ? { ...item, count: item.count - 1 } : item;
      }
      return item;
    });
    const indexCountZeroLocal = dataLocalNew.findIndex((item) => item.count === 0);

    if (indexCountZero >= 0) {
      dataLocalNew.splice(indexCountZeroLocal, 1);
      setDataProdLocal(dataLocalNew);
      localStorage.setItem('cartListId', JSON.stringify(dataLocalNew));
    } else {
      setDataProdLocal(dataLocalNew);
      localStorage.setItem('cartListId', JSON.stringify(dataLocalNew));
    }
  };
  const addCountHandler = (props) => {
    setDataProdCart((prevData) =>
      prevData.map((item) =>
        item.content.idProduct === props.id ? { ...item, count: item.count + 1 } : item
      )
    );

    // remove tren local
    const dataLocalNew = dataProdLocal.map((item) =>
      item.id === props.id ? { ...item, count: item.count + 1 } : item
    );

    setDataProdLocal(dataLocalNew);
    localStorage.setItem('cartListId', JSON.stringify(dataLocalNew));
  };

  const nameOnchange = (event) => {
    setDataInfoOrder((prev) => ({ ...prev, name: event.target.value }));
  };
  const phoneOnchange = (event) => {
    setDataInfoOrder((prev) => ({ ...prev, phone: event.target.value }));
  };
  const addressOnchange = (event) => {
    setDataInfoOrder((prev) => ({ ...prev, address: event.target.value }));
  };

  const orderHandler = () => {
    if (dataInfoOrder.phone === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Số điện thoại trống',
        desc: 'Vui lòng điền SĐT',
      });
      return;
    } else if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(dataInfoOrder.phone)) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'SĐT không đúng định dạng',
        desc: 'SĐT phải 10 số hoặc các đầu số đúng',
      });
      return;
    } else if (dataInfoOrder.name === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Họ Tên trống',
        desc: 'Vui lòng điền họ tên',
      });
      return;
    } else if (dataInfoOrder.address === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Địa chỉ trống',
        desc: 'Vui lòng điền địa chỉ',
      });
      return;
    }
  };

  return (
    <div className="grid wide">
      <div className="cart">
        <div className="cart__title">Giỏ hàng của bạn</div>
        <div className="row">
          <div className="col l-8">
            <p className="cart__count">Tóm tắt đơn hàng</p>
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
                {dataProdCart.map((item) => (
                  <tr key={item.content.idProduct} className="cart-table-body-tr">
                    <td className="cart-table-img">
                      <div className="cart-table-img__wrap-img">
                        <img
                          src={`${LINKIMG_BASE}${item.imgName}.jpg?alt=media`}
                          alt=""
                          className="cart-table-img__img"
                        />
                      </div>
                      <div className="cart-table-img__wrap-variant">
                        <p className="cart-table-img__link">{item.content.nameProduct}</p>
                        <p className="cart-table-img__variant">{item.content.color}</p>
                      </div>
                    </td>
                    <td className="cart-table__wrap-price">
                      <p className="cart-table__price">
                        {item.content.discount !== null
                          ? formatter.format(
                              item.content.price * item.content.discount.percent
                            )
                          : formatter.format(item.content.price)}
                      </p>
                      {item.content.discount !== null ? (
                        <p className="cart-table__price-original">
                          {formatter.format(item.content.price)}
                        </p>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="cart-table__wrap-quantity">
                      <div className="cart-product__quantity-area">
                        <input
                          type="button"
                          className="cart-product__quantity-area-btn"
                          value="-"
                          onClick={() => subCountHandler({ id: item.content.idProduct })}
                        />
                        <span className="cart-product__quantity-area-num">
                          {item.count}
                        </span>
                        <input
                          type="button"
                          className="cart-product__quantity-area-btn"
                          value="+"
                          onClick={() => addCountHandler({ id: item.content.idProduct })}
                        />
                      </div>
                    </td>
                    <td className="cart-table__wrap-total">
                      <p className="cart-table__total">
                        {item.content.discount !== null
                          ? formatter.format(
                              item.content.price *
                                item.content.discount.percent *
                                item.count
                            )
                          : formatter.format(item.content.price * item.count)}
                      </p>
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
                ))}
              </tbody>
            </table>
            <input type="text" className="cart-note" placeholder="Lưu ý về đơn hàng" />
          </div>
          <div className="col l-4">
            <p className="cart-right__title">Thông tin giao hàng</p>
            <Space direction="vertical">
              <Input
                placeholder="Số điện thoại"
                style={{ width: 400 }}
                onChange={phoneOnchange}
                value={dataInfoOrder.phone}
              />
              <Input
                placeholder="Họ tên"
                style={{ width: 400 }}
                onChange={nameOnchange}
                value={dataInfoOrder.name}
              />
              <Input
                placeholder="địa chỉ giao hàng"
                style={{ width: 400 }}
                onChange={addressOnchange}
                value={dataInfoOrder.address}
              />
            </Space>

            <p className="cart-right__title">Thành tiền</p>
            <div className="cart-right__wrap-total">
              <span className="cart-right__total-text">Tổng</span>
              <span className="cart-right__total-price">
                {dataProdCart.length !== 0
                  ? formatter.format(
                      dataProdCart.reduce((prev, current) => {
                        if (current.content.discount !== null) {
                          return (
                            prev +
                            current.content.price *
                              current.content.discount.percent *
                              current.count
                          );
                        }
                        return prev + current.content.price * current.count;
                      }, 0)
                    )
                  : 0}
              </span>
            </div>
            <div className="cart-right__wrap-checkout">
              <div className="cart-right__checkout" onClick={() => orderHandler()}>
                <span className="cart-right__checkout-text">Đặt hàng</span>
              </div>
              <a href="/product" className="cart-right__collection">
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
