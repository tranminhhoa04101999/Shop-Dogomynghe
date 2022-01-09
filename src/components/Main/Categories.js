import { NavLink } from "react-router-dom";
import "./Categories.css";

const Categories = (props) => {
  return (
    <div className="grid wide">
      <div className="categories">
        <span className="categories-title">Danh Mục Sản Phẩm</span>
        <NavLink to="/" className="categories-link">
          Xem Tất Cả Sản Phẩm
        </NavLink>
        <div className="row sm-gutter">
          <div className="col l-1-5 ">
            <div className="categories-item">
              <img
                src="https://cdn2.yame.vn/pimg/ao-thun-sweater-linh-vat-tigeer-ver1-0020579/c7aaf91b-0a33-8d00-c8b7-0018ac703c4a.jpg?w=540&h=756&c=true"
                alt=""
                className="categories-img"
              />
              <span className="categories-label">Áo hoodie</span>
            </div>
          </div>
          <div className="col l-1-5">
            <div className="categories-item">
              <img
                src="https://cdn2.yame.vn/pimg/ao-thun-co-tron-12vahdt-ai-hanh-kha-ver3-0020535/9f1f7a68-82e4-2b01-542d-0018ac680f88.jpg?w=540&h=756&c=true"
                alt=""
                className="categories-img"
              />
              <span className="categories-label">Áo Thun</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
