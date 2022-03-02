import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { LINKCONNECT_BASE, LINKIMG_BASE } from '../../../App';
import { notification } from 'antd';

const ProductDetails = (props) => {
  const [imgProduct, setImgProduct] = useState([]);
  const [listIdProd, setListIdProd] = useState([]);
  const [imgMain, setImgMain] = useState();
  const [quantityAddCart, setQuantityAddCart] = useState(1);
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
          setImgMain(`${LINKIMG_BASE}${data[0].imgURL}.jpg?alt=media`);
        });
      //lấy thông tin product
      fetch(`${LINKCONNECT_BASE}/getproductbyid?idProduct=${state.idProduct}`)
        .then((response) => response.json())
        .then((data) => {
          setDataProduct(data);
        });
      // lấy các giá trị cũ của giỏ hàng set state;
      let dataLocal = JSON.parse(localStorage.getItem('cartListId'));
      if (dataLocal === null) {
        // console.log('data local null');
        setListIdProd([]);
      } else {
        setListIdProd(dataLocal);
      }
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

  const addCartHandler = () => {
    //lưu sản phảma vào localstorage
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

    window.location.reload(false);
    // props.reload();

    openNotificationWithIcon({
      type: 'success',
      message: 'Thành công',
      desc: 'Đã thêm vào giỏ hàng ' + dataProduct.nameProduct,
    });
  };

  return (
    <div className="grid wide">
      <div className="container-product-details">
        <div className="breadcrums">
          <NavLink to="/" className="breadcrums-link">
            Trang Chủ
          </NavLink>
          <span className="breadcrums-gach">/</span>
          <NavLink to="/product" className="breadcrums-link">
            Sản Phẩm
          </NavLink>
          <span className="breadcrums-gach">/</span>

          <NavLink to="/productDetails" className="breadcrums-link">
            Chi tiết sản phẩm
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
                  Mã Sản Phẩm: {dataProduct.idProduct}
                </span>
                <span className="P-details-right__quantity">
                  Hiện tại còn {dataProduct.quantity} sản phẩm.
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
                  Màu sắc: {dataProduct.color}
                </span>

                <div className="P-details-right__color">
                  <span className="P-details-right__color-title">Mô tả: </span>
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
              <div className="P-details-right__wrap-addcart">
                <button
                  className="P-details-right__addcart"
                  onClick={() => addCartHandler()}
                >
                  Thêm Vào Giỏ
                </button>
                <button className="P-details-right__addcart">Mua Ngay</button>
              </div>
              <div className="P-details-right__wrap-description">
                <p className="P-details-right__des-title">Thông tin bảo hành: </p>
                <p className="P-details-right__des-text">
                  Sản phẩm bằng gỗ công nghiệp MDF/MFC: 2 năm
                </p>
                <p className="P-details-right__des-text">
                  Sản phẩm bằng gỗ tự nhiên: 5 năm
                </p>
                <p className="P-details-right__des-text">
                  Sản phẩm bằng gỗ cao cấp: 10 năm
                </p>
                <p className="P-details-right__des-text">khung gỗ: 05 năm.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="wrap-product-star-reviews">
          <div className="wrap-star-reviews">
            <h2 className="product-star__title">Đánh giá sản phẩm</h2>
            <div className="product-star__summary">
              <a href="/" className="product-star__summary-icon">
                <FontAwesomeIcon icon={faStar} />
              </a>
              <a href="/" className="product-star__summary-icon">
                <FontAwesomeIcon icon={faStar} />
              </a>
              <a href="/" className="product-star__summary-icon">
                <FontAwesomeIcon icon={faStar} />
              </a>
              <a href="/" className="product-star__summary-icon">
                <FontAwesomeIcon icon={faStar} />
              </a>
              <a href="/" className="product-star__summary-icon">
                <FontAwesomeIcon icon={faStar} />
              </a>
            </div>
            <div className="product-star__summary-text">Dựa trên 0 đánh giá</div>
            <div className="product-star__write-rev">
              <FontAwesomeIcon
                icon={faFeatherAlt}
                className="product-star__write-rev-icon"
              />
              Viết đánh giá
            </div>
          </div>
          <div className="wrap-cmt-reviews">
            <span className="cmt-reviews__label">
              Đánh giá
              <span className="cmt-reviews__count">0</span>
            </span>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ProductDetails;
