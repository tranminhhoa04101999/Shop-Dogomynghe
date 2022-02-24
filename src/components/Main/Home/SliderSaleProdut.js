import './SliderSaleProdut.css';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { LINKCONNECT_BASE, LINKIMG_BASE } from '../../../App';

const INITIAL_PRODDISCOUNT = {
  idProduct: 0,
  nameProduct: '',
  price: 0,
  color: '',
  descProduct: '',
  quantity: 0,
  addDate: '',
  isActive: 1,
  discount: {},
  category: {},
};

const SliderSaleProdut = (props) => {
  const [dataProdDiscount, setDataProdDiscount] = useState([]);
  const { dataImage } = props;

  //#region custom arrow slider
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, top: '40%', left: '-20px', display: 'flex' }}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="slider-slick-icon" />
      </div>
    );
  }
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, top: '40%', right: '-2px', display: 'flex' }}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faArrowRight} className="slider-slick-icon" />
      </div>
    );
  }
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  //#endregion

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });
  const getImageProductHandler = (props) => {
    var imgURL = 'defaultImage';
    dataImage.map((item) => {
      if (item.idProduct === props.idProduct) {
        imgURL = item.imgURL;
      }
    });
    return imgURL;
  };
  useEffect(() => {
    // lấy sản phẩm có discount
    fetch(`${LINKCONNECT_BASE}/findByHaveDiscount`)
      .then((response) => response.json())
      .then((data) => setDataProdDiscount(data));
  }, []);

  return (
    <div className="grid wide">
      <div className="product-sale">
        <span className="product-sale-title">Sản Phẩm Giảm Giá</span>
        <NavLink to="/" className="product-sale-link">
          Xem Các Sản Phẩm Giảm Giá
        </NavLink>
        <Slider {...settings}>
          {dataProdDiscount.map((item) => {
            let imgName = getImageProductHandler({ idProduct: item.idProduct });

            return (
              <div key={item.idProduct} className="product-sale-col">
                <NavLink
                  to="/productDetails"
                  className="products-col__wapper-content"
                  state={{ idProduct: item.idProduct }}
                >
                  <div className="product-sale-wrapper-img">
                    <img
                      src={`${LINKIMG_BASE}${imgName}.jpg?alt=media`}
                      alt=""
                      className="product-sale-item__img"
                    />
                    <span className="product-sale-item__sale-percent">
                      {item.discount.percent * 100} %
                    </span>
                  </div>
                  <span className="product-sale-item__title">{item.nameProduct}</span>
                  <div className="products-item__price">
                    {item.discount !== null && (
                      <span className="products-item__price-old">
                        {formatter.format(item.price)}
                      </span>
                    )}
                    <span className="products-item__price-current">
                      {item.discount !== null
                        ? formatter.format(item.price * item.discount.percent)
                        : formatter.format(item.price)}
                    </span>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default SliderSaleProdut;
