import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Product.css';
import { useEffect, useState } from 'react';
import { LINKCONNECT_BASE, LINKIMG_BASE } from '../../../App';
import { Pagination } from 'antd';

const Product = () => {
  const [dataProductDefault, setDataProductDefault] = useState([]);
  const [checkLink, setCheckLink] = useState(0);
  const [idCateClick, setIdCateClick] = useState(0);
  const [dataImage, setDataImage] = useState([]);
  const { state } = useLocation();
  const [dataPage, setDataPage] = useState({
    content: [
      {
        idProduct: 0,
        nameProduct: '0',
        price: 0,
        color: '',
        descProduct: '',
        quantity: 10,
        addDate: '2022-02-19T17:00:00.000+00:00',
        isActive: 1,
        discount: null,
      },
    ],
    page: 0,
    size: 10,
    totalElements: 41,
    totalPages: 41,
    last: false,
  });
  const [dataCategory, setDataCategory] = useState([
    {
      idCategory: 0,
      name: '',
      descCategory: '',
      imgURL: '',
      isActive: 1,
    },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let link = `${LINKCONNECT_BASE}/allProductPage?page=${dataPage.page}&size=${dataPage.size}`;
    if (state !== null) {
      link = `${LINKCONNECT_BASE}/findWithIdCategoryPage?page=${dataPage.page}&size=${dataPage.size}&idCategory=${state.idCategory}`;
    }

    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        setDataProductDefault(data.content);
        setDataPage(data);
      });
    //có product nào thì lấy img product đó, tạm thời lấy all img
    fetch(`${LINKCONNECT_BASE}/allimghaveidprod`)
      .then((response) => response.json())
      .then((data) => setDataImage(data));
    // fetch(`${LINKCONNECT_BASE}/imgwithidprod?idProduct=${props.idProduct}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('data', data);
    //   });
    // lấy all category
    fetch(`${LINKCONNECT_BASE}/allcategory`)
      .then((response) => response.json())
      .then((data) => setDataCategory(data));
  }, []);

  const getImageProductHandler = (props) => {
    var imgURL = 'defaultImage';
    dataImage.map((item) => {
      if (item.idProduct === props.idProduct) {
        imgURL = item.imgURL;
      }
    });
    return imgURL;
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });
  const onChangePage = (pageNumber) => {
    console.log('pagenumbẻ', pageNumber);
    let link = `${LINKCONNECT_BASE}/allProductPage?page=${pageNumber - 1}&size=${
      dataPage.size
    }`;
    if (checkLink === 1) {
      link = `${LINKCONNECT_BASE}/findWithIdCategoryPage?page=${pageNumber - 1}&size=${
        dataPage.size
      }&idCategory=${idCateClick}`;
    }

    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        setDataProductDefault(data.content);
        setDataPage(data);
      });
  };

  const categoryOnClickHandler = (props) => {
    setIdCateClick(props.idCategory);
    setCheckLink(1);
    window.scrollTo(0, 0);

    fetch(
      `${LINKCONNECT_BASE}/findWithIdCategoryPage?page=0&size=${dataPage.size}&idCategory=${props.idCategory}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDataProductDefault(data.content);
        setDataPage(data);
      });
  };
  const allProductCategoryHandler = () => {
    setCheckLink(0);
    setIdCateClick(0);
    fetch(`${LINKCONNECT_BASE}/allProductPage?page=0&size=${dataPage.size}`)
      .then((response) => response.json())
      .then((data) => {
        setDataProductDefault(data.content);
        setDataPage(data);
      });
  };
  return (
    <div className="grid wide container-product">
      <div className="row sm-gutter wrapper-product">
        <div className="col l-2">
          <nav className="category-product">
            <h3 className="category__heading">
              <i className="category__heading-icon fas fa-list-ul"></i>
              Danh mục
            </h3>
            <ul className="category-list">
              <li className="category-item category-item--active">
                <div
                  className="category-item__link"
                  onClick={() => allProductCategoryHandler()}
                >
                  Tất cả
                </div>
              </li>
              {dataCategory.map((item) => (
                <li key={item.idCategory} className="category-item category-item--active">
                  <div
                    className="category-item__link"
                    onClick={() =>
                      categoryOnClickHandler({ idCategory: item.idCategory })
                    }
                  >
                    {item.name}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="col l-10">
          <div className="home-product">
            <div className="row sm-gutter">
              {dataProductDefault.map((item) => {
                let imgName = getImageProductHandler({ idProduct: item.idProduct });
                return (
                  <div className="col l-2-4" key={item.idProduct}>
                    <NavLink
                      to="/productDetails"
                      className="home-product-item"
                      state={{ idProduct: item.idProduct }}
                    >
                      <div
                        className="home-product-item__img"
                        style={{
                          backgroundImage: `url(${LINKIMG_BASE}${imgName}.jpg?alt=media)`,
                        }}
                      ></div>
                      <h4 className="home-product-item__name">{item.nameProduct}</h4>
                      <div className="home-product-item__price">
                        {item.discount !== null && (
                          <span className="home-product-item__price-old">
                            {formatter.format(item.price)}
                          </span>
                        )}
                        <span className="home-product-item__price-current">
                          {item.discount !== null
                            ? formatter.format(item.price * item.discount.percent)
                            : formatter.format(item.price)}
                        </span>
                      </div>
                      <div className="home-product-item__action">
                        <span className="home-product-item__like home-product-item__like--liked">
                          <i className="home-product-item__like-icon-empty far fa-heart"></i>
                          <i className="home-product-item__like-icon-fill fas fa-heart"></i>
                        </span>
                        <div className="home-product-item__rating">
                          <i className="home-product-item__star--gold fas fa-star"></i>
                          <i className="home-product-item__star--gold fas fa-star"></i>
                          <i className="home-product-item__star--gold fas fa-star"></i>
                          <i className="home-product-item__star--gold fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                      </div>
                      <div className="home-product-item__origin">
                        <span className="home-product-item__brand">TMH</span>
                        <span className="home-product-item__origin-name">Việt Nam</span>
                      </div>
                      <div className="home-product-item__favourite">
                        <i className="fas fa-check"></i>
                        <span>Yêu thích</span>
                      </div>
                      {item.discount !== null && (
                        <div className="home-product-item__sale-off">
                          <span className="home-product-item__sale-off-precent">
                            {item.discount.percent * 100}%
                          </span>
                          <span className="home-product-item__sale-off-label">GIẢM</span>
                        </div>
                      )}
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="row wrapper-pagination">
        <Pagination
          defaultCurrent={dataPage.page}
          total={dataPage.totalElements}
          defaultPageSize={dataPage.size}
          showSizeChanger={false}
          onChange={onChangePage}
        />
      </div>
    </div>
  );
};

export default Product;