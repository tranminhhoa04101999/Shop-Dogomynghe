import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { LINKCONNECT_BASE, LINKIMG_BASE } from '../../../App';
import { notification, Card } from 'antd';
import Rating from 'react-rating';
import { faStar as faStarEm } from '@fortawesome/free-regular-svg-icons';
import { ContextContainer } from '../../Header/Layout';

const styleGrid = {
  width: 'calc(100% /3)',
  padding: '10px 10px',
  borderRadius: '4px',
  margin: '8px 0',
};

const ProductDetails = (props) => {
  const [imgProduct, setImgProduct] = useState([]);
  const [listIdProd, setListIdProd] = useState([]);
  const [imgMain, setImgMain] = useState();
  const [quantityAddCart, setQuantityAddCart] = useState(1);
  const [rateDetail, setRateDetail] = useState(null);
  const [dataProduct, setDataProduct] = useState({
    idProduct: 0,
    nameProduct: '',
    price: 0,
    color: '',
    descProduct: '',
    quantity: 0,
    addDate: '2022-02-18T17:00:00.000+00:00',
    isActive: 1,
    discount: {
      idDiscount: 0,
      nameDiscount: '',
      descDiscount: '',
      percent: 1,
      dateCreate: '2022-02-15',
      dateModified: null,
      isActive: 1,
    },
  });
  const { state } = useLocation();
  const navigate = useNavigate();
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
    if (state === null) {
      navigate('/product');
    } else {
      window.scrollTo(0, 0);
      // set hinh mac dinh cho imgImain
      fetch(`${LINKCONNECT_BASE}/imgproductwith?idProduct=${state.idProduct}`)
        .then((response) => response.json())
        .then((data) => {
          setImgProduct(data);
          console.log('data', data);
          setImgMain(
            `${LINKIMG_BASE}${
              data.length !== 0 ? data[0].imgURL : 'defaultImage'
            }.jpg?alt=media`
          );
        });
      //l???y th??ng tin product
      fetch(`${LINKCONNECT_BASE}/getproductbyid?idProduct=${state.idProduct}`)
        .then((response) => response.json())
        .then((data) => {
          setDataProduct(data);
        });
      // l???y c??c gi?? tr??? c?? c???a gi??? h??ng set state;
      let dataLocal = JSON.parse(localStorage.getItem('cartListId'));
      if (dataLocal === null) {
        // console.log('data local null');
        setListIdProd([]);
      } else {
        setListIdProd(dataLocal);
      }
      fetch(`${LINKCONNECT_BASE}/rateDetails?idProduct=${state.idProduct}`)
        .then((response) => response.json())
        .then((data) => setRateDetail(data));
    }
  }, []);

  const imgSmallClick = (event) => {
    setImgMain(event.target.src);
  };
  const subQuantityAddHandler = (props) => {
    if (quantityAddCart === 1) {
      return;
    }
    setQuantityAddCart((prevData) => prevData - 1);
  };
  const addQuantityAddHandler = (props) => {
    setQuantityAddCart((prevData) => prevData + 1);
  };

  useEffect(() => {
    localStorage.setItem('cartListId', JSON.stringify(listIdProd));
  }, [listIdProd]);

  const { setReloadContext } = useContext(ContextContainer);
  const addCartHandler = () => {
    //l??u s???n ph???ma v??o localstorage
    setListIdProd((prevData) => {
      let check = prevData.findIndex((item) => item.idProduct === dataProduct.idProduct);
      if (check === -1) {
        return [
          ...prevData,
          { idProduct: dataProduct.idProduct, quantity: quantityAddCart },
        ];
      }
      return prevData.map((item) =>
        item.idProduct === dataProduct.idProduct
          ? { ...item, quantity: item.quantity + quantityAddCart }
          : item
      );
    });

    // window.location.reload(false);
    setReloadContext(true);
    openNotificationWithIcon({
      type: 'success',
      message: 'Th??nh c??ng',
      desc: '???? th??m v??o gi??? h??ng ' + dataProduct.nameProduct,
    });
  };

  return (
    <div className="grid wide">
      <div className="container-product-details">
        <div className="breadcrums">
          <NavLink to="/" className="breadcrums-link">
            Trang Ch???
          </NavLink>
          <span className="breadcrums-gach">/</span>
          <NavLink to="/product" className="breadcrums-link">
            S???n Ph???m
          </NavLink>
          <span className="breadcrums-gach">/</span>

          <NavLink to="/productDetails" className="breadcrums-link">
            Chi ti???t s???n ph???m
          </NavLink>
        </div>
        <div className="row">
          <div className="col l-2">
            <div className="P-details__list-img">
              {imgProduct.map((item) => (
                <div
                  key={item.idImgProduct}
                  className="P-details__list-img-link"
                  onClick={imgSmallClick}
                >
                  <img
                    src={`${LINKIMG_BASE}${item.imgURL}.jpg?alt=media`}
                    alt=""
                    className="P-details__list-img-small"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col l-5">
            <div className="P-details__main">
              <img src={imgMain} alt="" className="P-details__main-img" />
            </div>
          </div>
          <div className="col l-5 ">
            <div className="P-details-right">
              <h1 className="P-details-right__title">{dataProduct.nameProduct}</h1>
              <div className="P-details-right__quantity-SKU">
                <span className="P-details-right__sku">
                  M?? S???n Ph???m: {dataProduct.idProduct}
                </span>
                <span className="P-details-right__quantity">
                  Hi???n t???i c??n {dataProduct.quantity} s???n ph???m.
                </span>
              </div>
              <div className="P-details-right__price">
                {dataProduct.discount !== null ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="P-details-right__price-current">
                      {dataProduct.discount.isActive === 1
                        ? formatter.format(
                            dataProduct.price * (1 - dataProduct.discount.percent)
                          )
                        : formatter.format(dataProduct.price)}
                    </span>
                    {dataProduct.discount.isActive === 1 && (
                      <span className="P-details-right__price-old">
                        {formatter.format(dataProduct.price)}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="P-details-right__price-current">
                    {formatter.format(dataProduct.price)}
                  </span>
                )}
              </div>
              <div className="P-details-right__select-swatches">
                <span className="P-details-right__color-title">
                  M??u s???c: {dataProduct.color}
                </span>

                <div className="P-details-right__color">
                  <span className="P-details-right__color-title">M?? t???: </span>
                  <div className="P-details-right__list-size">
                    {dataProduct.descProduct}
                  </div>
                </div>
              </div>
              <div className="P-details-right__quantity-area">
                <input
                  type="button"
                  className="P-details-right__quantity-area-btn"
                  value="-"
                  onClick={subQuantityAddHandler}
                />
                <span className="P-details-right__quantity-area-num">
                  {quantityAddCart}
                </span>
                <input
                  type="button"
                  className="P-details-right__quantity-area-btn"
                  value="+"
                  onClick={addQuantityAddHandler}
                />
              </div>
              {dataProduct.isActive === 1 ? (
                <div>
                  {dataProduct.quantity !== 0 ? (
                    <div className="P-details-right__wrap-addcart">
                      <button
                        className="P-details-right__addcart"
                        onClick={() => addCartHandler()}
                      >
                        Th??m V??o Gi???
                      </button>
                    </div>
                  ) : (
                    <div className="P-details-right__wrap-addcart">
                      <button className="P-details-right__addcart">T???m h???t h??ng</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="P-details-right__wrap-addcart">
                  <button className="P-details-right__addcart">Ng???ng kinh doanh</button>
                </div>
              )}
              <div className="P-details-right__wrap-description">
                <p className="P-details-right__des-title">Th??ng tin b???o h??nh: </p>
                <p className="P-details-right__des-text">
                  S???n ph???m b???ng g??? c??ng nghi???p MDF/MFC: 2 n??m
                </p>
                <p className="P-details-right__des-text">
                  S???n ph???m b???ng g??? t??? nhi??n: 5 n??m
                </p>
                <p className="P-details-right__des-text">
                  S???n ph???m b???ng g??? cao c???p: 10 n??m
                </p>
                <p className="P-details-right__des-text">khung g???: 05 n??m.</p>
              </div>
            </div>
          </div>
        </div>
        {rateDetail !== null && (
          <div className="row container-rate-header">
            <div className="col l-3 rate-header-left">
              <div className="rate-header-left__wrap-total">
                <p className="rate-header-left__totalPercent">
                  {rateDetail.percentTotal.toFixed(1)}
                </p>
                <FontAwesomeIcon icon={faStar} size="3x" color="#ffb92e" />
              </div>
              <div className="rate-header-left__title">
                {rateDetail.totalRate} ????nh gi??
              </div>
            </div>
            <div className="col l-6 rate-header-center">
              <div className="rate-header-center__wrap">
                <p className="rate-header-center__title">5</p>
                <FontAwesomeIcon icon={faStar} size="lg" color="#ffb92e" />
                <div className="rate-header-center__loading">
                  <div
                    className="rate-header-center__loading-color"
                    style={{
                      width: `calc((100% / ${rateDetail.totalRate})*${rateDetail.five})`,
                    }}
                  >
                    .
                  </div>
                </div>
                <p className="rate-header-center__title">{rateDetail.five}</p>
                <p className="rate-header-center__title">????nh gi??</p>
              </div>
              <div className="rate-header-center__wrap">
                <p className="rate-header-center__title">4</p>
                <FontAwesomeIcon icon={faStar} size="lg" color="#ffb92e" />
                <div className="rate-header-center__loading">
                  <div
                    className="rate-header-center__loading-color"
                    style={{
                      width: `calc((100% / ${rateDetail.totalRate})*${rateDetail.four})`,
                    }}
                  >
                    .
                  </div>
                </div>
                <p className="rate-header-center__title">{rateDetail.four}</p>
                <p className="rate-header-center__title">????nh gi??</p>
              </div>
              <div className="rate-header-center__wrap">
                <p className="rate-header-center__title">3</p>
                <FontAwesomeIcon icon={faStar} size="lg" color="#ffb92e" />
                <div className="rate-header-center__loading">
                  <div
                    className="rate-header-center__loading-color"
                    style={{
                      width: `calc((100% / ${rateDetail.totalRate})*${rateDetail.three})`,
                    }}
                  >
                    .
                  </div>
                </div>
                <p className="rate-header-center__title">{rateDetail.three}</p>
                <p className="rate-header-center__title">????nh gi??</p>
              </div>
              <div className="rate-header-center__wrap">
                <p className="rate-header-center__title">2</p>
                <FontAwesomeIcon icon={faStar} size="lg" color="#ffb92e" />
                <div className="rate-header-center__loading">
                  <div
                    className="rate-header-center__loading-color"
                    style={{
                      width: `calc((100% / ${rateDetail.totalRate})*${rateDetail.two})`,
                    }}
                  >
                    .
                  </div>
                </div>
                <p className="rate-header-center__title">{rateDetail.two}</p>
                <p className="rate-header-center__title">????nh gi??</p>
              </div>
              <div className="rate-header-center__wrap">
                <p className="rate-header-center__title">1</p>
                <FontAwesomeIcon icon={faStar} size="lg" color="#ffb92e" />
                <div className="rate-header-center__loading">
                  <div
                    className="rate-header-center__loading-color"
                    style={{
                      width: `calc((100% / ${rateDetail.totalRate})*${rateDetail.one})`,
                    }}
                  >
                    .
                  </div>
                </div>
                <p className="rate-header-center__title">{rateDetail.one}</p>
                <p className="rate-header-center__title">????nh gi??</p>
              </div>
            </div>
            <div className="col l-3"></div>
          </div>
        )}
        <div className="row ">
          {rateDetail !== null && (
            <div className="col l-12 container-rate">
              <Card>
                {rateDetail.ratesProductList.map((item, index) => (
                  <Card.Grid key={index} style={styleGrid}>
                    <div className="rate-card__wrapName">
                      <p className="rate-card__name">{item.nameCustomer}</p>
                      <p className="rate-card__timed"> {item.timeUsed}</p>
                    </div>
                    <Rating
                      initialRating={item.pointRate}
                      emptySymbol={
                        <FontAwesomeIcon
                          icon={faStarEm}
                          size="2x"
                          style={{ color: '#ffb92e' }}
                        />
                      }
                      fullSymbol={
                        <FontAwesomeIcon
                          icon={faStar}
                          size="2x"
                          style={{ color: '#ffc31a ' }}
                        />
                      }
                      readonly={true}
                    />
                    <div className="rate-card__desc">{item.descRate}</div>
                  </Card.Grid>
                ))}
              </Card>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ProductDetails;
