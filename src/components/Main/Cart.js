import './Cart.css';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Space, Image, notification, Select } from 'antd';
import { useState, useEffect, useContext } from 'react';
import { LINKAPI_ADDRESS, LINKCONNECT_BASE, LINKIMG_BASE } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import { ContextContainer } from '../Header/Layout';

const INITIAL_INFOORDERS = {
  phone: '',
  address: '',
  note: '',
  total: 0,
  dateCreate: new Date(),
  dateModified: new Date(),
  dateEnd: null,
  status: {
    idStatus: 1,
  },
  customer: {
    idCustomer: 0,
  },
  employee: null,
};

const Cart = (props) => {
  const [dataProdCart, setDataProdCart] = useState([]);
  const [dataProdLocal, setDataProdLocal] = useState([]);
  const [dataInfoOrder, setDataInfoOrder] = useState(INITIAL_INFOORDERS);
  const [name, setName] = useState('');
  const [dataCustomer, setDataCustomer] = useState(null);
  const [dataAddress, setDataAddress] = useState(null);
  const [addressChoose, setAddressChoose] = useState({
    tinh: null,
    huyen: null,
    xa: null,
  });
  const dataCartLocal = JSON.parse(localStorage.getItem('cartListId'));
  const dataLogined = JSON.parse(localStorage.getItem('infoLogined'));

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
  const { Option } = Select;

  useEffect(() => {
    if (dataCartLocal !== null) {
      dataCartLocal.map((item) =>
        fetch(`${LINKCONNECT_BASE}/getproductbyid?idProduct=${item.idProduct}`)
          .then((response) => response.json())
          .then((data) => {
            fetch(`${LINKCONNECT_BASE}/imgproductwith?idProduct=${item.idProduct}`)
              .then((response) => response.json())
              .then((data1) =>
                setDataProdCart((prev) => [
                  ...prev,
                  {
                    content: data,
                    quantity: item.quantity,
                    imgName: data1.length !== 0 ? data1[0].imgURL : 'defaultImage',
                  },
                ])
              );
          })
      );
      setDataProdLocal(dataCartLocal);
      if (dataLogined !== null) {
        fetch(
          `${LINKCONNECT_BASE}/findCustomerByIdAccount?idAccount=${dataLogined.idAccount}`
        )
          .then((response) => response.json())
          .then((data) => {
            setDataCustomer(data);
            setDataInfoOrder((prev) => ({ ...prev, phone: data.phone }));
            setDataInfoOrder((prev) => ({ ...prev, address: data.address }));
            setName(data.name);
          });
      }
      fetch(`${LINKAPI_ADDRESS}`)
        .then((response) => response.json())
        .then((data) => setDataAddress(data));
    }
    return () => {
      setDataProdCart([]);
      setAddressChoose({
        tinh: null,
        huyen: null,
        xa: null,
      });
    };
  }, []);

  const subCountHandler = (props) => {
    const dataNew = dataProdCart.map((item) => {
      if (item.quantity > 0) {
        return item.content.idProduct === props.idProduct
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      }
      return item;
    });
    const indexCountZero = dataNew.findIndex((item) => item.quantity === 0);

    if (indexCountZero >= 0) {
      dataNew.splice(indexCountZero, 1);
      setDataProdCart(dataNew);
    } else {
      setDataProdCart(dataNew);
    }

    // remove tren local
    const dataLocalNew = dataProdLocal.map((item) => {
      if (item.quantity > 0) {
        return item.idProduct === props.idProduct
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      }
      return item;
    });
    const indexCountZeroLocal = dataLocalNew.findIndex((item) => item.quantity === 0);

    if (indexCountZero >= 0) {
      dataLocalNew.splice(indexCountZeroLocal, 1);
      setDataProdLocal(dataLocalNew);
      localStorage.setItem('cartListId', JSON.stringify(dataLocalNew));
    } else {
      setDataProdLocal(dataLocalNew);
      localStorage.setItem('cartListId', JSON.stringify(dataLocalNew));
    }
    setReloadContext(true);
  };
  const addCountHandler = (props) => {
    setDataProdCart((prevData) =>
      prevData.map((item) =>
        item.content.idProduct === props.idProduct
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    const dataLocalNew = dataProdLocal.map((item) =>
      item.idProduct === props.idProduct ? { ...item, quantity: item.quantity + 1 } : item
    );

    setDataProdLocal(dataLocalNew);
    localStorage.setItem('cartListId', JSON.stringify(dataLocalNew));
    setReloadContext(true);
  };

  const nameOnchange = (event) => {
    setName(event.target.value);
  };
  const phoneOnchange = (event) => {
    setDataInfoOrder((prev) => ({ ...prev, phone: event.target.value }));
  };
  const addressOnchange = (event) => {
    setDataInfoOrder((prev) => ({ ...prev, address: event.target.value }));
  };
  const noteOnchange = (event) => {
    setDataInfoOrder((prev) => ({ ...prev, note: event.target.value }));
  };

  const orderHandler = async () => {
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
    } else if (addressChoose.tinh === null) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Vui lòng chọn tỉnh',
      });
      return;
    } else if (addressChoose.huyen === null) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Vui lòng chọn huyện',
      });
      return;
    } else if (addressChoose.xa === null) {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Vui lòng chọn xã',
      });
      return;
    } else if (dataInfoOrder.address === '') {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Địa chỉ chi tiết trống',
        desc: 'Vui lòng điền địa chỉ chi tiết',
      });
      return;
    }
    //tính tổng tiền
    let total = dataProdCart.reduce(
      (prev, current) => {
        if (current.content.discount !== null) {
          if (current.content.discount.isActive === 1) {
            return (
              prev +
              current.content.price *
                (1 - current.content.discount.percent) *
                current.quantity
            );
          }
        }
        return prev + current.content.price * current.quantity;
      },
      // current.content.discount !== null
      //   ? prev +
      //     current.content.price *
      //       (1 - current.content.discount.percent) *
      //       current.quantity
      //   : prev + current.content.price * current.quantity,
      0
    );
    // tạo dữ liệu thêm
    let dataOrderAdd = dataInfoOrder;
    dataOrderAdd.total = total;
    if (dataCustomer !== null) {
      dataOrderAdd.customer.idCustomer = dataCustomer.idCustomer;
    }
    dataOrderAdd.address = `${addressChoose.tinh.name}, ${addressChoose.huyen.name}, ${addressChoose.xa.name},${dataOrderAdd.address}`;
    // kiểm tra còn hàng không trước khi đặt
    var dataResult = [];
    await fetch(`${LINKCONNECT_BASE}/checkQuantityProduct`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accepts: '*/*',

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(dataProdLocal),
    })
      .then((response) => response.json())
      .then((data) => {
        dataResult = data;
      });

    if (dataResult.length === 0) {
      // thêm mới order
      fetch(`${LINKCONNECT_BASE}/saveOrder?name=${name}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Accepts: '*/*',

          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(dataOrderAdd),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === 1) {
            fetch(`${LINKCONNECT_BASE}/saveOrderItems`, {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json',
                Accepts: '*/*',

                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
              body: JSON.stringify(dataProdLocal),
            })
              .then((response) => response.json())
              .then((data1) => {
                if (data1 === 1) {
                  openNotificationWithIcon({
                    type: 'success',
                    message: 'Đặt hàng thành công',
                  });
                  localStorage.setItem('cartListId', JSON.stringify([]));
                  setDataProdCart([]);
                } else {
                  openNotificationWithIcon({
                    type: 'error',
                    message: 'Đặt hàng thất bại',
                    desc: 'save orderitém',
                  });
                }
              })
              .catch((error) =>
                openNotificationWithIcon({
                  type: 'error',
                  message: 'Đặt hàng thất bại',
                  desc: error,
                })
              );
          }
        })
        .catch((error) =>
          openNotificationWithIcon({
            type: 'error',
            message: 'Đặt hàng thất bại',
            desc: error,
          })
        );
    } else {
      openNotificationWithIcon({
        type: 'error',
        message: dataResult[0].message,
        desc: 'vui lòng liên hệ 0374269758',
      });
    }
  };
  const { setReloadContext } = useContext(ContextContainer);

  const removeItem = (props) => {
    const dataNew = dataProdCart;
    const indexCountZero = dataNew.findIndex(
      (item) => item.content.idProduct === props.idProduct
    );

    dataNew.splice(indexCountZero, 1);
    setDataProdCart(dataNew);

    // remove tren local
    const dataLocalNew = dataProdLocal;
    const indexCountZeroLocal = dataLocalNew.findIndex(
      (item) => item.idProduct === props.idProduct
    );

    dataLocalNew.splice(indexCountZeroLocal, 1);
    setDataProdLocal(dataLocalNew);
    localStorage.setItem('cartListId', JSON.stringify(dataLocalNew));
    setReloadContext(true);
  };

  const onChangeSelect = (value) => {
    const index = dataAddress.findIndex((item) => item.code === value);
    setAddressChoose((prev) => ({ ...prev, tinh: dataAddress[index] }));
  };
  const onSearchSelect = (value) => {};
  const onChangeSelecthuyen = (value) => {
    const index = addressChoose.tinh.districts.findIndex((item) => item.code === value);
    setAddressChoose((prev) => ({ ...prev, huyen: addressChoose.tinh.districts[index] }));
  };
  const onSearchSelecthuyen = (value) => {};
  const onChangeSelectxa = (value) => {
    const index = addressChoose.huyen.wards.findIndex((item) => item.code === value);
    setAddressChoose((prev) => ({ ...prev, xa: addressChoose.huyen.wards[index] }));
  };
  const onSearchSelectxa = (value) => {};
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
                      {item.content.discount !== null ? (
                        <div style={{ display: 'flex' }}>
                          {item.content.discount.isActive === 1 && (
                            <span className="cart-table__price-original">
                              {formatter.format(item.content.price)}
                            </span>
                          )}
                          <span className="cart-table__price">
                            {item.content.discount.isActive === 1
                              ? formatter.format(
                                  item.content.price * (1 - item.content.discount.percent)
                                )
                              : formatter.format(item.content.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="cart-table__price-original">
                          {formatter.format(item.content.price)}
                        </span>
                      )}
                    </td>
                    <td className="cart-table__wrap-quantity">
                      <div className="cart-product__quantity-area">
                        <input
                          type="button"
                          className="cart-product__quantity-area-btn"
                          value="-"
                          onClick={() =>
                            subCountHandler({ idProduct: item.content.idProduct })
                          }
                        />
                        <span className="cart-product__quantity-area-num">
                          {item.quantity}
                        </span>
                        <input
                          type="button"
                          className="cart-product__quantity-area-btn"
                          value="+"
                          onClick={() =>
                            addCountHandler({ idProduct: item.content.idProduct })
                          }
                        />
                      </div>
                    </td>
                    <td className="cart-table__wrap-total">
                      {item.content.discount !== null && (
                        <p className="cart-table__total">
                          {item.content.discount.isActive === 1
                            ? formatter.format(
                                item.content.price *
                                  (1 - item.content.discount.percent) *
                                  item.quantity
                              )
                            : formatter.format(item.content.price * item.quantity)}
                        </p>
                      )}
                    </td>
                    <td className="cart-table__wrap-remove">
                      <div
                        className="cart-table__remove"
                        onClick={() => removeItem({ idProduct: item.content.idProduct })}
                      >
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
            <input
              type="text"
              className="cart-note"
              placeholder="Lưu ý về đơn hàng"
              onChange={noteOnchange}
              value={dataInfoOrder.note}
            />
          </div>
          {dataProdCart.length !== 0 ? (
            <div className="col l-4" style={{ marginBottom: 100 }}>
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
                  value={name}
                />
                {dataAddress !== null && (
                  <div className="wrap-select-cart">
                    <Select
                      showSearch
                      placeholder="Chọn Tỉnh"
                      optionFilterProp="children"
                      onChange={onChangeSelect}
                      onSearch={onSearchSelect}
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      className="select-cart__select"
                    >
                      {dataAddress.map((item, index) => {
                        return (
                          <Option key={index} value={item.code}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                    {addressChoose.tinh !== null ? (
                      <div>
                        {
                          <Select
                            showSearch
                            placeholder="Chọn huyện"
                            optionFilterProp="children"
                            onChange={onChangeSelecthuyen}
                            onSearch={onSearchSelecthuyen}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            className="select-cart__select"
                          >
                            {addressChoose.tinh.districts.map((item, index) => {
                              return (
                                <Option key={index} value={item.code}>
                                  {item.name}
                                </Option>
                              );
                            })}
                          </Select>
                        }
                      </div>
                    ) : (
                      ''
                    )}
                    {addressChoose.huyen !== null && (
                      <div>
                        {
                          <Select
                            showSearch
                            placeholder="Chọn xã/phường"
                            optionFilterProp="children"
                            onChange={onChangeSelectxa}
                            onSearch={onSearchSelectxa}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            className="select-cart__select"
                          >
                            {addressChoose.huyen.wards.map((item, index) => {
                              return (
                                <Option key={index} value={item.code}>
                                  {item.name}
                                </Option>
                              );
                            })}
                          </Select>
                        }
                      </div>
                    )}
                  </div>
                )}
                <Input
                  placeholder="Địa chỉ chi tiết"
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
                            if (current.content.discount.isActive === 1) {
                              return (
                                prev +
                                current.content.price *
                                  (1 - current.content.discount.percent) *
                                  current.quantity
                              );
                            }
                          }
                          return prev + current.content.price * current.quantity;
                        }, 0)
                      )
                    : 0}
                </span>
              </div>
              <div className="container-thanhtoanCOD">Thanh toán khi nhận hàng</div>

              <div className="cart-right__wrap-checkout">
                <div className="cart-right__checkout" onClick={() => orderHandler()}>
                  <span className="cart-right__checkout-text">Đặt hàng</span>
                </div>
                <a href="/product" className="cart-right__collection">
                  <span className="cart-right__collection-text">Tiếp Tục Mua Sắm</span>
                </a>
              </div>
            </div>
          ) : (
            <div>
              <a href="/product" className="cart-right__collection">
                <span className="cart-right__collection-text">
                  Giỏ hàng trống -- Đi mua sắm
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
