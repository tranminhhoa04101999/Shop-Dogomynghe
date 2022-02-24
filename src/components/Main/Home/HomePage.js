import Categories from './Categories';
import SliderNewProduct from './SliderNewProduct';
import BannerSlider from './BannerSlider';
import SliderSaleProdut from './SliderSaleProdut';
import './HomePage.css';
import { useEffect, useState } from 'react';
import { LINKCONNECT_BASE } from '../../../App';

const HomePage = (props) => {
  const [dataImage, setDataImage] = useState([]);
  useEffect(() => {
    // lấy hình
    fetch(`${LINKCONNECT_BASE}/allimghaveidprod`)
      .then((response) => response.json())
      .then((data) => setDataImage(data));
  }, []);
  return (
    <div className="homepage">
      <BannerSlider />
      <Categories />
      <SliderNewProduct />
      <SliderSaleProdut dataImage={dataImage} />
    </div>
  );
};

export default HomePage;
