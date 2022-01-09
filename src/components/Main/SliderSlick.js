import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import "./SliderSlick.css";
const SlideSlick = (props) => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#999",
          position: "absolute",
          borderRadius: "50%",
          height: "38px",
          width: "38px",
          top: "50%",
          left: "28px",
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#999",
          position: "absolute",
          borderRadius: "50%",
          height: "38px",
          width: "38px",
          top: "50%",
          right: "28px",
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SampleNextArrow />,
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

export default SlideSlick;
