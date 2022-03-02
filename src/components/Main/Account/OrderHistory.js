import React, { useEffect, useState } from 'react';
import './OrderHistory.css';
import { Card, Image, Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faTruck } from '@fortawesome/free-solid-svg-icons';
import { LINKCONNECT_BASE, LINKIMG_BASE } from '../../../App';
import moment from 'moment';
const gridStyle = {
  width: '100%',
  textAlign: 'center',
  padding: '10px',
  marginBottom: '10px',
};
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
});
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
    idOrder: 0,
  },
  productSearchResponses: [
    {
      idProduct: 0,
      nameProduct: '',
      price: 0,
      color: '',
      quantity: 6,
      imgURL: 'defaultImage',
    },
  ],
};
const { TabPane } = Tabs;
const OrderHistory = () => {
  const [dataOrder, setDataOrder] = useState([INITIAL_DATA]);
  const [idStatus, setIdStatus] = useState(0);
  const dataLogined = JSON.parse(localStorage.getItem('infoLogined'));
  useEffect(() => {
    if (dataLogined !== null) {
      fetch(
        `${LINKCONNECT_BASE}/searchOrderByIdAccount?idAccount=${dataLogined.idAccount}`
      )
        .then((response) => response.json())
        .then((data) => setDataOrder(data));
    }
  }, []);

  useEffect(() => {}, [idStatus]);

  function RenderWithKey(props) {
    if (props.idStatus > 6) {
      return (
        <div>
          {dataOrder.length !== 0 ? (
            <div>
              {dataOrder.map((itemOrder, indexOrder) => (
                <Card key={indexOrder} style={{ marginBottom: '10px' }}>
                  <div className="container-history__address-status">
                    <div className="history-address">
                      <span className="history-address__title">Thông tin giao hàng</span>
                      <span className="history-address__content">
                        Tên: <p>{itemOrder.orders.customer.name}</p>
                      </span>
                      <span className="history-address__content">
                        Số điện thoại: <p>{itemOrder.orders.phone}</p>
                      </span>
                      <span className="history-address__content">
                        Địa chỉ: <p>{itemOrder.orders.address}</p>
                      </span>
                    </div>

                    <div className="history-status">
                      <div className="history-status__icontitle">
                        <FontAwesomeIcon
                          icon={faTruck}
                          size="2x"
                          className="history-status__icon"
                        />
                        <span className="history-status__title">
                          {itemOrder.orders.status.statusName}
                        </span>
                      </div>
                      <div className="history-status__date">
                        <span className="history-status__date-content">
                          Ngày đặt hàng:{' '}
                          <p>
                            {' '}
                            {moment(itemOrder.orders.dateCreate).format('DD/MM/YYYY')}
                          </p>
                        </span>
                        <span className="history-status__date-content">
                          Ngày giao hàng:{' '}
                          <p>{moment(itemOrder.orders.dateEnd).format('DD/MM/YYYY')}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="history-listproduct">
                    {itemOrder.productSearchResponses.map((itemProd, indexProd) => (
                      <Card.Grid key={indexProd} style={gridStyle}>
                        <div className="history-listproduct__card">
                          <div className="history-listproduct__card-Right">
                            <Image
                              width={120}
                              height={100}
                              src={`${LINKIMG_BASE}${itemProd.imgURL}.jpg?alt=media`}
                            />
                            <div className="history-listproduct__card-name">
                              <p className="history-listproduct__card-nameProduc">
                                {itemProd.nameProduct}
                              </p>
                              <p className="history-listproduct__card-nameVariant">
                                x{itemProd.quantity}
                              </p>
                            </div>
                          </div>
                          <div className="history-listproduct__card-total">
                            <div className="history-listproduct__card-price-old">
                              {formatter.format(itemProd.price)}
                            </div>
                          </div>
                        </div>
                      </Card.Grid>
                    ))}
                  </div>
                  <div className="history-totalprice">
                    Tổng tiền: <span>{formatter.format(itemOrder.orders.total)}</span>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div>CHƯA CÓ ĐƠN ĐẶT HÀNG NÀO</div>
          )}
        </div>
      );
    }
    return (
      <div>
        {dataOrder.length !== 0 ? (
          <div>
            {dataOrder.map(
              (itemOrder, indexOrder) =>
                itemOrder.orders.status.idStatus === props.idStatus && (
                  <Card key={indexOrder} style={{ marginBottom: '10px' }}>
                    <div className="container-history__address-status">
                      <div className="history-address">
                        <span className="history-address__title">
                          Thông tin giao hàng
                        </span>
                        <span className="history-address__content">
                          Tên: <p>{itemOrder.orders.customer.name}</p>
                        </span>
                        <span className="history-address__content">
                          Số điện thoại: <p>{itemOrder.orders.phone}</p>
                        </span>
                        <span className="history-address__content">
                          Địa chỉ: <p>{itemOrder.orders.address}</p>
                        </span>
                      </div>

                      <div className="history-status">
                        <div className="history-status__icontitle">
                          <FontAwesomeIcon
                            icon={faTruck}
                            size="2x"
                            className="history-status__icon"
                          />
                          <span className="history-status__title">
                            {itemOrder.orders.status.statusName}
                          </span>
                        </div>
                        <div className="history-status__date">
                          <span className="history-status__date-content">
                            Ngày đặt hàng:{' '}
                            <p>
                              {' '}
                              {moment(itemOrder.orders.dateCreate).format('DD/MM/YYYY')}
                            </p>
                          </span>
                          <span className="history-status__date-content">
                            Ngày giao hàng:{' '}
                            <p>{moment(itemOrder.orders.dateEnd).format('DD/MM/YYYY')}</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="history-listproduct">
                      {itemOrder.productSearchResponses.map((itemProd, indexProd) => (
                        <Card.Grid key={indexProd} style={gridStyle}>
                          <div className="history-listproduct__card">
                            <div className="history-listproduct__card-Right">
                              <Image
                                width={120}
                                height={100}
                                src={`${LINKIMG_BASE}${itemProd.imgURL}.jpg?alt=media`}
                              />
                              <div className="history-listproduct__card-name">
                                <p className="history-listproduct__card-nameProduc">
                                  {itemProd.nameProduct}
                                </p>
                                <p className="history-listproduct__card-nameVariant">
                                  x{itemProd.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="history-listproduct__card-total">
                              <div className="history-listproduct__card-price-old">
                                {formatter.format(itemProd.price)}
                              </div>
                            </div>
                          </div>
                        </Card.Grid>
                      ))}
                    </div>
                    <div className="history-totalprice">
                      Tổng tiền: <span>{formatter.format(itemOrder.orders.total)}</span>
                    </div>
                  </Card>
                )
            )}
          </div>
        ) : (
          <div>CHƯA CÓ ĐƠN ĐẶT HÀNG NÀO</div>
        )}
      </div>
    );
  }

  function callback(key) {
    setIdStatus(key);
  }

  return (
    <div>
      {}
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Tất cả" key="7">
          <RenderWithKey idStatus={7} />
        </TabPane>
        <TabPane tab="Đang đợi xử lý" key="1">
          <RenderWithKey idStatus={1} />
        </TabPane>
        <TabPane tab="Đã tiếp nhận" key="2">
          <RenderWithKey idStatus={2} />
        </TabPane>
        <TabPane tab="Đang giao" key="4">
          <RenderWithKey idStatus={4} />
        </TabPane>
        <TabPane tab="Đã giao" key="5">
          <RenderWithKey idStatus={5} />
        </TabPane>
        <TabPane tab="Đã hủy" key="6">
          <RenderWithKey idStatus={6} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default OrderHistory;
