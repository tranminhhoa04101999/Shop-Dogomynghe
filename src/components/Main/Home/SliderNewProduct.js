import './SliderNewProduct.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import news from '../../../assets/img/new.png';
import { useState } from 'react';
import { useEffect } from 'react';
import { LINKCONNECT_BASE, LINKIMG_BASE } from '../../../App';

const INITIALDATA = {
  idProduct: 0,
  nameProduct: '',
  price: 0,
  color: '',
  descProduct: '',
  quantity: 0,
  addDate: '',
  isActive: 1,
  discount: null,
  category: {},
};

const SliderNewProduct = (props) => {
  const [dataNewProd, setDataNewProd] = useState([INITIALDATA]);
  const [dataImage, setDataImage] = useState([]);

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
    // lấy sản phẩm mới thêm chưa được 1 tuần
    fetch(`${LINKCONNECT_BASE}/findByNewOneWeek`)
      .then((response) => response.json())
      .then((data) => {
        setDataNewProd(data);
        if (data.length === 0) {
          // nếu không có thì lấy 5 sản phẩm trong sản phẩm
          fetch(`${LINKCONNECT_BASE}/allproduct`)
            .then((response) => response.json())
            .then((data) => {
              setDataNewProd(data.slice(0, 5));
            });
        }
      });
    // lấy hình
    fetch(`${LINKCONNECT_BASE}/allimghaveidprod`)
      .then((response) => response.json())
      .then((data) => setDataImage(data));
  }, []);
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
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  //#endregion
  return (
    <div className="grid wide">
      <div className="products">
        <span className="products-title">Sản Phẩm Mới</span>
        <NavLink to="/product" className="products-link" state={{ isNew: 1 }}>
          Xem Tất Cả Sản Phẩm Mới
        </NavLink>
        <Slider {...settings}>
          {dataNewProd.map((item) => {
            let imgName = getImageProductHandler({ idProduct: item.idProduct });
            return (
              <div key={item.idProduct} className="products-col">
                <div className="products-col__newImg">
                  <img src={news} alt="newImg"></img>
                </div>
                <NavLink
                  to="/productDetails"
                  className="products-col__wapper-content"
                  state={{ idProduct: item.idProduct }}
                >
                  <img
                    src={`${LINKIMG_BASE}${imgName}.jpg?alt=media`}
                    alt=""
                    className="products-item__img"
                  />
                  <div className="products-item__price">
                    <span className="products-item__title">{item.nameProduct}</span>
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

export default SliderNewProduct;
