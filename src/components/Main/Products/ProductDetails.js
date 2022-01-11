import { Outlet } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = (props) => {
  return (
    <div className="grid wide">
      <div className="container-product-details">
        <div className="breadcrums">
          <a href="/" className="breadcrums-link">
            Trang Chủ
          </a>
          /
          <a href="/" className="breadcrums-link">
            Sản Phẩm
          </a>
          /
          <a href="/" className="breadcrums-link">
            Chi tiết sản phẩm
          </a>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ProductDetails;
