import React, { useEffect } from 'react';
import './SearchOrder.css';
import { Input, Button } from 'antd';
import { useState } from 'react';
import { LINKIMG_BASE, LINKCONNECT_BASE } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const INITIAL_DATA = {
  orders: {
    phone: '',
    address: '',
    note: '',
    total: 0,
    dateCreate: '2022-02-26T17:00:00.000+00:00',
    dateModified: '2022-02-26T17:00:00.000+00:00',
    dateEnd: null,
    status: {
      idStatus: 1,
      statusName: 'Đang đợi xử lý',
    },
    customer: {
      idCustomer: 0,
      name: '',
      phone: '',
      address: '',
      dateCreate: '2022-02-26T17:00:00.000+00:00',
      account: null,
    },
    employee: null,
    idOrder: 31,
  },
  productSearchResponses: [
    {
      idProduct: 0,
      nameProduct: '',
      price: 0,
      color: '',
      quantity: 6,
      imgURL: '',
    },
  ],
};

const SearchOrder = () => {
  const [dataSearch, setDataSearch] = useState('');
  const [dataOrder, setDataOrder] = useState([INITIAL_DATA]);

  const phoneOnchange = (event) => {
    setDataSearch(event.target.value);
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });
  const btnSubmitHandler = async () => {
    fetch(
      `${LINKCONNECT_BASE}/searchOrderByIdOrPhone?idStatus=7&idOrders=${
        dataSearch === '' ? 0 : dataSearch
      }&phone=${dataSearch}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDataOrder(data);
      });
  };

  return (
    <div className="grid wide container-searchOrder">
      <div className="row wapper-searchOrder">
        <div className="wapper-inputsearchorder">
          <p>Tra cứu đơn hàng: bằng số điện thoại hoặc mã đơn hàng</p>
          <Input
            type="text"
            placeholder="số điện thoại hoặc mã đơn hàng"
            value={dataSearch}
            onChange={phoneOnchange}
          />
          <Button className="inputsearchorder__btn" onClick={() => btnSubmitHandler()}>
            Truy cứu
          </Button>
        </div>
      </div>
      {dataOrder.map((itemDataOrder, indexDataOrder) => (
        <div key={indexDataOrder}>
          <div className="row wapper-searchOrder ">
            <div className="col l-3"></div>
            <div className="col l-9 container-searchOrder-col-top">
              <div className="row wapper-searchorder-main-left">
                <div className="col l-4 searchorder-main-left">
                  <p className="searchorder-main-left__title">Địa Chỉ Nhận Hàng</p>
                  <p className="searchorder-main-left__name">
                    Tên : {itemDataOrder.orders.customer.name}
                  </p>
                  <p className="searchorder-main-left_phone">
                    SĐT : {itemDataOrder.orders.phone}
                  </p>
                  <p className="searchorder-main-left_address">
                    Địa chỉ : {itemDataOrder.orders.address}
                  </p>
                </div>
                <div className="col l-8 ">
                  <div className="searchOrder-Status">
                    <FontAwesomeIcon icon={faCircleNotch} size="2x" />
                    <div className="searchOrder-Status__title">
                      {itemDataOrder.orders.status.statusName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row wapper-searchOrder">
            <div className="col l-3"></div>
            <div className="col l-9 container-searchOrder-col-bottom">
              <table className="cart-table">
                <thead></thead>
                <tbody className="searchOrderTable-body">
                  {itemDataOrder.productSearchResponses.map((itemProd, indexProd) => (
                    <tr key={indexProd} className="cart-table-body-tr">
                      <td className="cart-table-img">
                        <div className="cart-table-img__wrap-img">
                          <img
                            src={`${LINKIMG_BASE}${itemProd.imgURL}.jpg?alt=media`}
                            alt=""
                            className="cart-table-img__img"
                          />
                        </div>
                        <div className="cart-table-img__wrap-variant">
                          <p className="cart-table-img__link">{itemProd.nameProduct}</p>
                          <p className="cart-table-img__variant">x{itemProd.quantity}</p>
                        </div>
                      </td>
                      <td className="cart-table__wrap-price">
                        <div className="cart-table__wrap-price-old">
                          {formatter.format(itemProd.price)}
                        </div>
                        <div className="cart-table__wrap-price-total">
                          Tổng tiền:{' '}
                          {formatter.format(itemProd.price * itemProd.quantity)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchOrder;
