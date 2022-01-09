import "./ShowProduct.css";
import { NavLink } from "react-router-dom";

const ShowProduct = (props) => {
  return (
    <div className="grid wide">
      <div className="products">
        <span className="products-title">Sản Phẩm Mới</span>
        <NavLink to="/" className="products-link">
          Xem Tất Cả Sản Phẩm
        </NavLink>
        <div className="row">
          <div className="col l-3 products-col">
            <img
              src="https://cdn2.yame.vn/pimg/ao-thun-sweater-linh-vat-tigeer-ver1-0020579/c7aaf91b-0a33-8d00-c8b7-0018ac703c4a.jpg?w=540&h=756&c=true"
              alt=""
              className="products-item__img"
            />
            <span className="products-item__title">Áo Thun Sweater Linh Vật Tigeer</span>
            <span className="products-item__price">125.000đ</span>
          </div>
          <div className="col l-3">
            <img
              src="https://cdn2.yame.vn/pimg/ao-thun-sweater-linh-vat-tigeer-ver1-0020579/c7aaf91b-0a33-8d00-c8b7-0018ac703c4a.jpg?w=540&h=756&c=true"
              alt=""
              className="products-item__img"
            />
            <span className="products-item__title">Áo Thun Sweater Linh Vật Tigeer</span>
            <span className="products-item__price">125.000đ</span>
          </div>
          <div className="col l-3">
            <img
              src="https://cdn2.yame.vn/pimg/ao-thun-sweater-linh-vat-tigeer-ver1-0020579/c7aaf91b-0a33-8d00-c8b7-0018ac703c4a.jpg?w=540&h=756&c=true"
              alt=""
              className="products-item__img"
            />
            <span className="products-item__title">Áo Thun Sweater Linh Vật Tigeer</span>
            <span className="products-item__price">125.000đ</span>
          </div>
          <div className="col l-3">
            <img
              src="https://cdn2.yame.vn/pimg/ao-thun-sweater-linh-vat-tigeer-ver1-0020579/c7aaf91b-0a33-8d00-c8b7-0018ac703c4a.jpg?w=540&h=756&c=true"
              alt=""
              className="products-item__img"
            />
            <span className="products-item__title">Áo Thun Sweater Linh Vật Tigeer</span>
            <span className="products-item__price">125.000đ</span>
          </div>
          <div className="col l-3">
            <img
              src="https://cdn2.yame.vn/pimg/ao-thun-sweater-linh-vat-tigeer-ver1-0020579/c7aaf91b-0a33-8d00-c8b7-0018ac703c4a.jpg?w=540&h=756&c=true"
              alt=""
              className="products-item__img"
            />
            <span className="products-item__title">Áo Thun Sweater Linh Vật Tigeer</span>
            <span className="products-item__price">125.000đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
