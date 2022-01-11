import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import "./BannerSlider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const BannerSlider = (props) => {
  function PrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <FontAwesomeIcon icon={faArrowLeft} className="slider-slick-icon" />
      </div>
    );
  }
  function NextArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <FontAwesomeIcon icon={faArrowRight} className="slider-slick-icon" />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="grid wide">
      <div className="container-slider">
        <Slider {...settings}>
          <div className="slider-item">
            <NavLink to="/">
              <img
                src="https://theme.hstatic.net/1000197303/1000796534/14/image_slider-1.jpg?v=444"
                alt="slider1"
                className="slider-item__img"
              />
            </NavLink>
          </div>
          <div className="slider-item">
            <NavLink to="/">
              <img
                src="https://theme.hstatic.net/1000197303/1000796534/14/image_slider-2.jpg?v=444"
                alt="slider2"
                className="slider-item__img"
              />
            </NavLink>
          </div>
          <div className="slider-item">
            <NavLink to="/">
              <img
                src="https://theme.hstatic.net/1000197303/1000796534/14/image_slider-4.jpg?v=444"
                alt="slider3"
                className="slider-item__img"
              />
            </NavLink>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default BannerSlider;
