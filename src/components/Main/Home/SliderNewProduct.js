import "./SliderNewProduct.css";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";

const SliderNewProduct = (props) => {
  //#region custom arrow slider
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, top: "40%", left: "-20px", display: "flex" }}
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
        style={{ ...style, top: "40%", right: "-2px", display: "flex" }}
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
        <NavLink to="/" className="products-link">
          Xem Tất Cả Sản Phẩm
        </NavLink>
        <Slider {...settings}>
          <div className="products-col">
            <NavLink to="/ProductDetails">
              <img
                src="https://cdn2.yame.vn/pimg/ao-thun-sweater-linh-vat-tigeer-ver1-0020579/c7aaf91b-0a33-8d00-c8b7-0018ac703c4a.jpg?w=540&h=756&c=true"
                alt=""
                className="products-item__img"
              />
              <span className="products-item__title">
                Áo Thun Sweater Linh Vật Tigeer
              </span>
              <span className="products-item__price">125.000đ</span>
            </NavLink>
          </div>
          <div className="products-col">
            <img
              src="https://cdn2.yame.vn/pimg/so-mi-tay-ngan-than-co-ai-anubis-ver2-0020430/bf1238ff-3dc5-d900-9f7e-0018ac6613c1.jpg?w=540&h=756&c=true"
              alt=""
              className="products-item__img"
            />
            <span className="products-item__title">
              Sơ Mi Tay Ngắn Thần Cổ Đại Anubis Ver2
            </span>
            <span className="products-item__price">285,000 đ</span>
          </div>
          <div className="products-col">
            <img
              src="https://cdn2.yame.vn/pimg/quan-dai-jean-straight-on-gian-y-nguyen-ban-ver5-0020539/3831d169-bd09-3d00-7ab5-0018ac6b84b5.jpg?w=540&h=756"
              alt=""
              className="products-item__img"
            />
            <span className="products-item__title">
              Quần Dài Jean Straight Đơn Giản Y Nguyên Bản Ver5
            </span>
            <span className="products-item__price">285,000 đ</span>
          </div>
          <div className=" products-col">
            <img
              src="https://cdn2.yame.vn/pimg/quan-short-linh-vat-bbuff-ver4-0020515/1c36da07-ff77-0100-8d3e-0018afcab2de.jpg?w=540&h=756"
              alt=""
              className="products-item__img"
            />
            <span className="products-item__title">Quần Short Linh Vật Bbuff Ver4</span>
            <span className="products-item__price">355,000 đ</span>
          </div>
          <div className="products-col">
            <img
              src="https://cdn2.yame.vn/pimg/ao-thun-sweater-linh-vat-tigeer-ver1-0020579/c7aaf91b-0a33-8d00-c8b7-0018ac703c4a.jpg?w=540&h=756&c=true"
              alt=""
              className="products-item__img"
            />
            <span className="products-item__title">Áo Thun Sweater Linh Vật Tigeer</span>
            <span className="products-item__price">125.000đ</span>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default SliderNewProduct;
