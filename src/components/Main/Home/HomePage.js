import Categories from "./Categories";
import SliderNewProduct from "./SliderNewProduct";
import BannerSlider from "./BannerSlider";
import SliderSaleProdut from "./SliderSaleProdut";
import "./HomePage.css";

const HomePage = (props) => {
  return (
    <div className="homepage">
      <BannerSlider />
      <Categories />
      <SliderNewProduct />
      <SliderSaleProdut />
    </div>
  );
};

export default HomePage;
