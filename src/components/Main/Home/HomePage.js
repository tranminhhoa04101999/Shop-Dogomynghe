import { Input, Button } from "antd";
import Categories from "./Categories";
import SliderNewProduct from "./SliderNewProduct";
import BannerSlider from "./BannerSlider";
import SliderSaleProdut from "./SliderSaleProdut";

const HomePage = (props) => {
  return (
    <div className="container-trangchu">
      <BannerSlider />
      <Categories />
      <SliderNewProduct />
      <SliderSaleProdut />
    </div>
  );
};

export default HomePage;
