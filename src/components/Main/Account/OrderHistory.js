import React, { useEffect, useState } from 'react';
import './OrderHistory.css';
import { Card, Image, Tabs, Button, Popconfirm, notification, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTruck } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEm } from '@fortawesome/free-regular-svg-icons';

import { LINKCONNECT_BASE, LINKIMG_BASE } from '../../../App';
import Rating from 'react-rating';
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

const INITIAL_RATEADD = {
  idOrder: 0,
  idProduct: 0,
  idCustomer: 0,
  descRate: '',
  pointRate: 0,
};
const { TabPane } = Tabs;
const OrderHistory = () => {
  const [dataOrder, setDataOrder] = useState([INITIAL_DATA]);
  const [idStatus, setIdStatus] = useState(0);
  const dataLogined = JSON.parse(localStorage.getItem('infoLogined'));
  const [showModal, setShowModal] = useState(false);
  const [dataRateCurrent, setDataRateCurrent] = useState(null);
  const [dataRateAdd, setDataRateAdd] = useState([INITIAL_RATEADD]);
  const [loading, setloading] = useState(false);
  const [checkListRated, setcheckListRated] = useState([]);
  useEffect(() => {
    if (dataLogined !== null) {
      fetch(
        `${LINKCONNECT_BASE}/searchOrderByIdAccount?idAccount=${dataLogined.idAccount}`
      )
        .then((response) => response.json())
        .then((data) => setDataOrder(data));
      fetch(
        `${LINKCONNECT_BASE}/findCustomerByIdAccount?idAccount=${dataLogined.idAccount}`
      )
        .then((response) => response.json())
        .then((data) =>
          fetch(`${LINKCONNECT_BASE}/orderCheckRate?idCustomer=${data.idCustomer}`)
            .then((response1) => response1.json())
            .then((data1) => setcheckListRated(data1))
        );
    }
  }, []);

  const openNotificationWithIcon = (props) => {
    notification[props.type]({
      message: props.message,
      description: props.desc,
    });
  };
  useEffect(() => {
    if (dataLogined !== null) {
      fetch(
        `${LINKCONNECT_BASE}/searchOrderByIdAccount?idAccount=${dataLogined.idAccount}`
      )
        .then((response) => response.json())
        .then((data) => setDataOrder(data));
    }
  }, [loading]);

  const btnHuyDonHandler = async (props) => {
    setloading(true);
    await fetch(`${LINKCONNECT_BASE}/huyOrder?idOrder=${props.idOrder}`, {
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
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 1) {
          openNotificationWithIcon({
            type: 'success',
            message: 'Hủy đơn hàng thành công',
            desc: '',
          });
        } else if (data === 0) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Hủy đơn hàng thất bại',
            desc: '',
          });
        }
      });
    setloading(false);
  };
  const btnRateHandler = (props) => {
    console.log('props.idOrder', props.idOrder);
    setDataRateCurrent({
      idOrder: props.idOrder,
      productSearchResponses: props.productList,
      customer: props.customer,
    });
    var dataAdd = [];
    props.productList.map((item) => {
      dataAdd = [
        ...dataAdd,
        {
          idOrder: props.idOrder,
          idProduct: item.idProduct,
          idCustomer: props.customer.idCustomer,
          descRate: '',
          pointRate: 0,
        },
      ];
      setDataRateAdd(dataAdd);
    });
    setShowModal(true);
  };
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
                        Mã đơn hàng: <p>{itemOrder.orders.idOrder}</p>
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
                      <span className="history-address__content">
                        Lưu ý: <p>{itemOrder.orders.note}</p>
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
                    {itemOrder.orders.status.idStatus === 1 && (
                      <div>
                        <Popconfirm
                          title="Bạn muốn xóa?"
                          onConfirm={() =>
                            btnHuyDonHandler({
                              idOrder: itemOrder.orders.idOrder,
                            })
                          }
                        >
                          <Button type="primary" danger loading={loading ? 1 : 0}>
                            <p style={{ margin: 0, fontSize: '1.4rem' }}>Hủy đơn</p>
                          </Button>
                        </Popconfirm>
                      </div>
                    )}
                    {itemOrder.orders.status.idStatus === 5 && (
                      <div>
                        {checkListRated.findIndex(
                          (itemCheck) => itemOrder.orders.idOrder === itemCheck
                        ) === -1 && (
                          <Button
                            type="primary"
                            danger
                            onClick={() =>
                              btnRateHandler({
                                idOrder: itemOrder.orders.idOrder,
                                productList: itemOrder.productSearchResponses,
                                customer: itemOrder.orders.customer,
                              })
                            }
                          >
                            <p style={{ margin: 0, fontSize: '1.4rem' }}>Đánh giá</p>
                          </Button>
                        )}
                      </div>
                    )}
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
                          Mã đơn hàng: <p>{itemOrder.orders.idOrder}</p>
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
                        <span className="history-address__content">
                          Lưu ý: <p>{itemOrder.orders.note}</p>
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
                      {itemOrder.orders.status.idStatus === 1 && (
                        <div>
                          <Popconfirm
                            title="Bạn muốn xóa?"
                            onConfirm={() =>
                              btnHuyDonHandler({
                                idOrder: itemOrder.orders.idOrder,
                              })
                            }
                          >
                            <Button type="primary" danger loading={loading ? 1 : 0}>
                              <p style={{ margin: 0, fontSize: '1.4rem' }}>Hủy đơn</p>
                            </Button>
                          </Popconfirm>
                        </div>
                      )}
                      {itemOrder.orders.status.idStatus === 5 && (
                        <div>
                          {checkListRated.findIndex(
                            (itemCheck) => itemOrder.orders.idOrder === itemCheck
                          ) === -1 && (
                            <Button
                              type="primary"
                              danger
                              onClick={() =>
                                btnRateHandler({
                                  idOrder: itemOrder.orders.idOrder,
                                  productList: itemOrder.productSearchResponses,
                                  customer: itemOrder.orders.customer,
                                })
                              }
                            >
                              <p style={{ margin: 0, fontSize: '1.4rem' }}>Đánh giá</p>
                            </Button>
                          )}
                        </div>
                      )}
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
  const rateOnClickHandler = (props) => {
    let data = dataRateAdd;
    data = dataRateAdd.map((item) =>
      item.idProduct === props.idProduct ? { ...item, pointRate: props.value } : item
    );
    setDataRateAdd(data);
  };

  const btnSubmitRateHandler = () => {
    console.log('dataRateAdd', dataRateAdd);
    let checkEmpty = false;
    dataRateAdd.map((item) => {
      if (item.descRate === '') {
        openNotificationWithIcon({
          type: 'warning',
          message: 'Không được để trống lời bình của đánh giá',
        });
        checkEmpty = true;
      } else if (item.pointRate === 0) {
        openNotificationWithIcon({
          type: 'warning',
          message: 'Vui lòng vote điểm',
        });
        checkEmpty = true;
      }
    });
    if (!checkEmpty) {
      fetch(`${LINKCONNECT_BASE}/saveRatesProduct`, {
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
        body: JSON.stringify(dataRateAdd),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.idResult === 1) {
            openNotificationWithIcon({
              type: 'success',
              message: data.message,
              desc: '',
            });
            window.location.reload(false);
          } else if (data.idResult === 0) {
            openNotificationWithIcon({
              type: 'error',
              message: data.message,
              desc: '',
            });
          }
        })
        .catch((error) => {
          openNotificationWithIcon({
            type: 'error',
            message: 'Đánh giá thất bại catch',
            desc: error,
          });
        });
    } else {
      openNotificationWithIcon({
        type: 'warning',
        message: 'Vui lòng điền đủ thông tin!',
      });
    }
  };
  const inputRateOnchangeHandler = (props) => {
    let data = dataRateAdd;
    data = dataRateAdd.map((item) =>
      item.idProduct === props.idProduct ? { ...item, descRate: props.value } : item
    );
    setDataRateAdd(data);
  };
  console.log('data', dataRateAdd);

  return (
    <div>
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
      <div className="modal" style={{ display: showModal ? 'flex' : 'none' }}>
        <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
        <div className="modal-body">
          {dataRateCurrent !== null && (
            <div className="rate-form">
              <div className="rate-header">
                <Card>
                  {dataRateCurrent.productSearchResponses.map((item, index) => {
                    let indexRate = dataRateAdd.findIndex(
                      (item1) => item1.idProduct === item.idProduct
                    );
                    return (
                      <Card.Grid key={index} style={gridStyle}>
                        <div className="history-listproduct__card">
                          <div className="history-listproduct__card-Right">
                            <Image
                              width={120}
                              height={100}
                              src={`${LINKIMG_BASE}${item.imgURL}.jpg?alt=media`}
                            />
                            <div className="history-listproduct__card-name">
                              <p className="history-listproduct__card-nameProduc">
                                {item.nameProduct}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Rating
                          initialRating={dataRateAdd[indexRate].pointRate}
                          emptySymbol={
                            <FontAwesomeIcon
                              icon={faStarEm}
                              size="3x"
                              style={{ color: '#ffb91e' }}
                            />
                          }
                          fullSymbol={
                            <FontAwesomeIcon
                              icon={faStar}
                              size="3x"
                              style={{ color: '#ffc31a ' }}
                            />
                          }
                          onClick={(value) =>
                            rateOnClickHandler({
                              value: value,
                              idProduct: item.idProduct,
                            })
                          }
                        />
                        <Input.TextArea
                          rows={4}
                          placeholder="Thêm bình luận"
                          maxLength={200}
                          style={{ margin: '10px 0' }}
                          onChange={(event) =>
                            inputRateOnchangeHandler({
                              value: event.target.value,
                              idProduct: item.idProduct,
                            })
                          }
                          value={dataRateAdd[indexRate].descRate}
                        />
                      </Card.Grid>
                    );
                  })}
                </Card>
              </div>
            </div>
          )}
          <div style={{ float: 'right' }}>
            <Button
              style={{ margin: '10px 0' }}
              type="primary"
              danger
              onClick={() => btnSubmitRateHandler()}
            >
              <p style={{ fontSize: '1.4rem', margin: 0 }}>Hoàn thành</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
