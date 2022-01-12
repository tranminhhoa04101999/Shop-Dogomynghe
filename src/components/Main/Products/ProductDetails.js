import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faFeatherAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./ProductDetails.css";

const LIST_IMG = [
  {
    id: 1,
    link: "https://storage.googleapis.com/cdn.nhanh.vn/store/7136/ps/20210416/16042021120427_IMG_6989.jpg",
  },
  {
    id: 2,
    link: "https://storage.googleapis.com/cdn.nhanh.vn/store/7136/ps/20210416/16042021120429_IMG_6988.jpg",
  },
  {
    id: 3,
    link: "https://storage.googleapis.com/cdn.nhanh.vn/store/7136/ps/20210416/16042021120427_1.jpg",
  },
];

const ProductDetails = (props) => {
  const [imgMain, setImgMain] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    // set hinh mac dinh cho imgImain
    setImgMain(LIST_IMG[0].link);
  }, []);

  const imgSmallClick = (event) => {
    setImgMain(event.target.src);
  };

  return (
    <div className="grid wide">
      <div className="container-product-details">
        <div className="breadcrums">
          <a href="/" className="breadcrums-link">
            Trang Chủ
          </a>
          <span className="breadcrums-gach">/</span>
          <a href="/" className="breadcrums-link">
            Sản Phẩm
          </a>
          <span className="breadcrums-gach">/</span>

          <a href="/" className="breadcrums-link">
            Chi tiết sản phẩm
          </a>
        </div>
        <div className="row">
          <div className="col l-2">
            <div className="P-details__list-img">
              {LIST_IMG.map((item) => (
                <div
                  key={item.id}
                  className="P-details__list-img-link"
                  onClick={imgSmallClick}
                >
                  <img src={item.link} alt="" className="P-details__list-img-small" />
                </div>
              ))}
            </div>
          </div>
          <div className="col l-5">
            <div className="P-details__main">
              <img src={imgMain} alt="" className="P-details__main-img" />
            </div>
          </div>
          <div className="col l-5 ">
            <div className="P-details-right">
              <h1 className="P-details-right__title">Quần Short Trừu Tượng</h1>
              <div className="P-details-right__quantity-SKU">
                <span className="P-details-right__sku">SKU: M2STH3041007</span>
                <span className="P-details-right__quantity">
                  Hiện tại còn 31 sản phẩm.
                </span>
              </div>
              <div className="P-details-right__price">
                <span className="P-details-right__price-current">362,950₫</span>
                <span className="P-details-right__price-old">595,000₫</span>
              </div>
              <div className="P-details-right__select-swatches">
                <span className="P-details-right__color-title">Màu sắc:</span>

                <div className="P-details-right__color">
                  <div className="P-details-right__wrapper-img">
                    <a
                      href="/"
                      className="P-details-right__color-item P-details-right__color-item--active"
                    >
                      <img
                        src="https://storage.googleapis.com/cdn.nhanh.vn/store/7136/ps/20210416/16042021120427_IMG_6989.jpg"
                        alt=""
                        className="P-details-right__color-item--img"
                      />
                      <img
                        src="https://totoshop.vn/tp/T0235/img/bg-product.png"
                        alt=""
                        className="P-details-right__color-item--active-tich"
                      />
                    </a>
                    <a href="/" className="P-details-right__color-item">
                      <img
                        src="https://storage.googleapis.com/cdn.nhanh.vn/store/7136/ps/20210416/16042021120429_IMG_6988.jpg"
                        alt=""
                        className="P-details-right__color-item--img"
                      />
                      <img
                        src="https://totoshop.vn/tp/T0235/img/bg-product.png"
                        alt=""
                        className="P-details-right__color-item--active-tich"
                      />
                    </a>
                  </div>
                  <span className="P-details-right__color-title">Kích Thước:</span>
                  <div className="P-details-right__list-size">
                    <div className="P-details-right__item-size P-details-right__item-size--active">
                      <span>L</span>
                      <img
                        src="https://totoshop.vn/tp/T0235/img/bg-product.png"
                        alt=""
                        className="P-details-right__item-size--active-tich"
                      />
                    </div>
                    <div className="P-details-right__item-size">
                      <span>XL</span>
                      <img
                        src="https://totoshop.vn/tp/T0235/img/bg-product.png"
                        alt=""
                        className="P-details-right__item-size--active-tich"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="P-details-right__quantity-area">
                <input
                  type="button"
                  className="P-details-right__quantity-area-btn"
                  value="-"
                />
                <span className="P-details-right__quantity-area-num">1</span>
                <input
                  type="button"
                  className="P-details-right__quantity-area-btn"
                  value="+"
                />
              </div>
              <div className="P-details-right__wrap-addcart">
                <button className="P-details-right__addcart">Thêm Vào Giỏ</button>
                <button className="P-details-right__addcart">Mua Ngay</button>
              </div>
              <div className="P-details-right__wrap-description">
                <p className="P-details-right__des-title">Miêu tả sản phẩm</p>
                <p className="P-details-right__des-text">
                  - Vải Kate in hoa thoáng mát, Phù hợp đi làm, đi dạo phố.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="wrap-product-star-reviews">
          <div className="wrap-star-reviews">
            <h2 className="product-star__title">Đánh giá sản phẩm</h2>
            <div className="product-star__summary">
              <a href="/" className="product-star__summary-icon">
                <FontAwesomeIcon icon={faStar} />
              </a>
              <a href="/" className="product-star__summary-icon">
                <FontAwesomeIcon icon={faStar} />
              </a>
              <a href="/" className="product-star__summary-icon">
                <FontAwesomeIcon icon={faStar} />
              </a>
              <a href="/" className="product-star__summary-icon">
                <FontAwesomeIcon icon={faStar} />
              </a>
              <a href="/" className="product-star__summary-icon">
                <FontAwesomeIcon icon={faStar} />
              </a>
            </div>
            <div className="product-star__summary-text">Dựa trên 0 đánh giá</div>
            <div className="product-star__write-rev">
              <FontAwesomeIcon
                icon={faFeatherAlt}
                className="product-star__write-rev-icon"
              />
              Viết đánh giá
            </div>
          </div>
          <div className="wrap-cmt-reviews">
            <span className="cmt-reviews__label">
              Đánh giá
              <span className="cmt-reviews__count">0</span>
            </span>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ProductDetails;
