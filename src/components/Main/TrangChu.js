import { Input, Button } from "antd";
import Categories from "./Categories";
import ShowProduct from "./ShowProduct";
import SlideSlick from "./SliderSlick";

const TrangChu = (props) => {
  return (
    <div className="container-trangchu">
      <SlideSlick />
      <Categories />
      <ShowProduct />
    </div>
  );
};

export default TrangChu;
