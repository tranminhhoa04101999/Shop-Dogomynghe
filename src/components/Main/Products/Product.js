import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Product.css';
import { useEffect, useState } from 'react';
import { LINKCONNECT_BASE, LINKIMG_BASE } from '../../../App';
import { Pagination, Checkbox, Slider, Radio } from 'antd';

const Product = () => {
  const [dataProductDefault, setDataProductDefault] = useState([]);
  const [checkLink, setCheckLink] = useState(0);
  const [idCateClick, setIdCateClick] = useState(0);
  const [onChangePageSearchText, setOnChangePageSearchText] = useState(0);
  const [onChangePageSale, setOnChangePageSale] = useState(0);
  const [dataImage, setDataImage] = useState([]);
  const [checked, setChecked] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  const [onChangePageNew, setOnChangePageNew] = useState(0);
  const [dataNewProd, setDataNewProd] = useState([
    {
      idProduct: 0,
      nameProduct: '',
      price: 0,
      color: '',
      descProduct: '',
      quantity: 0,
      addDate: '',
      isActive: 1,
      discount: null,
      category: {},
    },
  ]);

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
    size: 15,
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
    if (state !== null) {
      let link = `${LINKCONNECT_BASE}/findByNamePage?page=0&size=${dataPage.size}&nameProduct=${state.searchText}`;
      fetch(link)
        .then((response) => response.json())
        .then((data) => {
          setDataProductDefault(data.content);
          setDataPage(data);
        });
    }
  }, [state]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // lấy sản phẩm mới thêm chưa được 1 tuần
    fetch(`${LINKCONNECT_BASE}/findByNewOneWeek`)
      .then((response) => response.json())
      .then((data) => {
        setDataNewProd(data);
        if (data.length === 0) {
          // nếu không có thì lấy 5 sản phẩm trong sản phẩm
          fetch(`${LINKCONNECT_BASE}/allproduct`)
            .then((response) => response.json())
            .then((data) => {
              setDataNewProd(data.slice(0, 5));
            });
        }
      });
    // lấy sản phẩm
    let link = `${LINKCONNECT_BASE}/allProductPage?page=${dataPage.page}&size=${dataPage.size}&priceBegin=0&priceEnd=1000000000`;
    if (state !== null) {
      if (state.idCategory !== undefined) {
        setOnChangePageNew(0);
        setOnChangePageSearchText(0);
        setOnChangePageSale(0);
        setCheckLink(1);
        setIdCateClick(state.idCategory);
        link = `${LINKCONNECT_BASE}/findWithIdCategoryPage?page=${dataPage.page}&size=${dataPage.size}&idCategory=${state.idCategory}&priceBegin=0&priceEnd=1000000000`;
      } else if (state.searchText !== undefined) {
        setOnChangePageSearchText(1);
        setOnChangePageNew(0);
        setOnChangePageSale(0);

        setCheckLink(0);
        link = `${LINKCONNECT_BASE}/findByNamePage?page=${dataPage.page}&size=${dataPage.size}&nameProduct=${state.searchText}`;
      } else if (state.isNew !== undefined) {
        link = `${LINKCONNECT_BASE}/findByNewOneWeekPage?page=${dataPage.page}&size=${dataPage.size}&priceBegin=0&priceEnd=1000000000`;
        setCheckLink(0);
        setOnChangePageSearchText(0);
        setOnChangePageSale(0);

        setOnChangePageNew(1);
      } else if (state.isSale !== undefined) {
        link = `${LINKCONNECT_BASE}/findByHaveDiscountPage?page=${dataPage.page}&size=${dataPage.size}&priceBegin=0&priceEnd=1000000000`;
        setCheckLink(0);
        setOnChangePageSearchText(0);
        setOnChangePageNew(0);
        setOnChangePageSale(1);
      }
    }

    setTimeout(() => {
      fetch(link)
        .then((response) => response.json())
        .then((data) => {
          setDataProductDefault(data.content);
          setDataPage(data);
        });
    });
    //có product nào thì lấy img product đó, tạm thời lấy all img
    fetch(`${LINKCONNECT_BASE}/allimghaveidprod`)
      .then((response) => response.json())
      .then((data) => setDataImage(data));
    // lấy all category
    fetch(`${LINKCONNECT_BASE}/allcategory`)
      .then((response) => response.json())
      .then((data) => setDataCategory(data));
  }, []);

  useEffect(() => {
    let priceBegin = 0;
    let priceEnd = 0;
    if (!checked.check1 && !checked.check2 && !checked.check3 && !checked.check4) {
      priceBegin = 0;
      priceEnd = 1000000000;
    } else if (checked.check1) {
      priceBegin = 0;
      priceEnd = 1000000;
    } else if (checked.check2) {
      priceBegin = 1000000;
      priceEnd = 3000000;
    } else if (checked.check3) {
      priceBegin = 3000000;
      priceEnd = 5000000;
    } else if (checked.check4) {
      priceBegin = 5000000;
      priceEnd = 1000000000;
    }
    let link = `${LINKCONNECT_BASE}/allProductPage?page=0&size=${dataPage.size}&priceBegin=${priceBegin}&priceEnd=${priceEnd}`;
    if (checkLink === 1) {
      link = `${LINKCONNECT_BASE}/findWithIdCategoryPage?page=0&size=${dataPage.size}&idCategory=${idCateClick}&priceBegin=${priceBegin}&priceEnd=${priceEnd}`;
    } else if (onChangePageNew === 1) {
      link = `${LINKCONNECT_BASE}/findByNewOneWeekPage?page=0&size=${dataPage.size}&priceBegin=${priceBegin}&priceEnd=${priceEnd}`;
    } else if (onChangePageSearchText === 1) {
      link = `${LINKCONNECT_BASE}/findByNamePage?page=0&size=${dataPage.size}&nameProduct=${state.searchText}`;
    } else if (onChangePageSale === 1) {
      link = `${LINKCONNECT_BASE}/findByHaveDiscountPage?page=0&size=${dataPage.size}&priceBegin=${priceBegin}&priceEnd=${priceEnd}`;
    }

    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        setDataProductDefault(data.content);
        setDataPage(data);
      });
  }, [checked]);

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
    let priceBegin = 0;
    let priceEnd = 0;
    if (!checked.check1 && !checked.check2 && !checked.check3 && !checked.check4) {
      priceBegin = 0;
      priceEnd = 1000000000;
    } else if (checked.check1) {
      priceBegin = 0;
      priceEnd = 1000000;
    } else if (checked.check2) {
      priceBegin = 1000000;
      priceEnd = 3000000;
    } else if (checked.check3) {
      priceBegin = 3000000;
      priceEnd = 5000000;
    } else if (checked.check4) {
      priceBegin = 5000000;
      priceEnd = 1000000000;
    }
    let link = `${LINKCONNECT_BASE}/allProductPage?page=${pageNumber - 1}&size=${
      dataPage.size
    }&priceBegin=${priceBegin}&priceEnd=${priceEnd}`;
    if (checkLink === 1) {
      link = `${LINKCONNECT_BASE}/findWithIdCategoryPage?page=${pageNumber - 1}&size=${
        dataPage.size
      }&idCategory=${idCateClick}&priceBegin=${priceBegin}&priceEnd=${priceEnd}`;
    } else if (onChangePageNew === 1) {
      link = `${LINKCONNECT_BASE}/findByNewOneWeekPage?page=${pageNumber - 1}&size=${
        dataPage.size
      }&priceBegin=${priceBegin}&priceEnd=${priceEnd}`;
    } else if (onChangePageSearchText === 1) {
      link = `${LINKCONNECT_BASE}/findByNamePage?page=${pageNumber - 1}&size=${
        dataPage.size
      }&nameProduct=${state.searchText}`;
    } else if (onChangePageSale === 1) {
      link = `${LINKCONNECT_BASE}/findByHaveDiscountPage?page=${pageNumber - 1}&size=${
        dataPage.size
      }&priceBegin=${priceBegin}&priceEnd=${priceEnd}`;
    }

    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        setDataProductDefault(data.content);
        setDataPage(data);
      });
  };

  const allProductCategoryHandler = () => {
    setCheckLink(0);
    setIdCateClick(0);
    setOnChangePageNew(0);
    setOnChangePageSale(0);
    setChecked({ check1: false, check2: false, check3: false, check4: false });
    fetch(
      `${LINKCONNECT_BASE}/allProductPage?page=0&size=${dataPage.size}&priceBegin=0&priceEnd=1000000000`
    )
      .then((response) => response.json())
      .then((data) => {
        setDataProductDefault(data.content);
        setDataPage(data);
      });
  };
  const categoryOnClickHandler = (props) => {
    setIdCateClick(props.idCategory);
    setCheckLink(1);
    setOnChangePageNew(0);
    setOnChangePageSale(0);
    window.scrollTo(0, 0);
    setChecked({ check1: false, check2: false, check3: false, check4: false });
    fetch(
      `${LINKCONNECT_BASE}/findWithIdCategoryPage?page=0&size=${dataPage.size}&idCategory=${props.idCategory}&priceBegin=0&priceEnd=1000000000`
    )
      .then((response) => response.json())
      .then((data) => {
        setDataProductDefault(data.content);
        setDataPage(data);
      });
  };
  const newProdHandler = () => {
    setCheckLink(0);
    setOnChangePageSale(0);
    setIdCateClick(0);
    setOnChangePageNew(1);
    setChecked({ check1: false, check2: false, check3: false, check4: false });
    fetch(
      `${LINKCONNECT_BASE}/findByNewOneWeekPage?page=0&size=${dataPage.size}&priceBegin=0&priceEnd=1000000000`
    )
      .then((response) => response.json())
      .then((data) => {
        setDataProductDefault(data.content);
        setDataPage(data);
        if (data.content.length === 0) {
          // nếu không có thì lấy 5 sản phẩm trong sản phẩm
          fetch(`${LINKCONNECT_BASE}/allproduct`)
            .then((response) => response.json())
            .then((data) => {
              setDataProductDefault(data.slice(0, 5));
            });
        }
      });
  };
  const saleProdHandler = () => {
    setCheckLink(0);
    setOnChangePageNew(0);
    setIdCateClick(0);
    setOnChangePageSale(1);

    setChecked({ check1: false, check2: false, check3: false, check4: false });
    fetch(
      `${LINKCONNECT_BASE}/findByHaveDiscountPage?page=0&size=${dataPage.size}&priceBegin=0&priceEnd=1000000000`
    )
      .then((response) => response.json())
      .then((data) => {
        setDataProductDefault(data.content);
        setDataPage(data);
      });
  };
  const checkOnchange1 = (e) => {
    setChecked({ check1: e.target.checked, check2: false, check3: false, check4: false });
  };
  const checkOnchange2 = (e) => {
    setChecked({ check1: false, check2: e.target.checked, check3: false, check4: false });
  };
  const checkOnchange3 = (e) => {
    setChecked({ check1: false, check2: false, check3: e.target.checked, check4: false });
  };
  const checkOnchange4 = (e) => {
    setChecked({ check1: false, check2: false, check3: false, check4: e.target.checked });
  };

  return (
    <div className="grid wide container-product">
      <div className="row sm-gutter wrapper-product">
        <div className="col l-2">
          <nav className="category-product">
            <h3 className="category__heading">
              <i className="category__heading-icon fas fa-list-ul"></i>
              Danh mục sản phẩm
            </h3>
            <ul className="category-list">
              <li
                className={`category-item ${
                  checkLink === 1 || onChangePageNew === 1 || onChangePageSale === 1
                    ? ''
                    : 'category-item--active'
                }`}
              >
                <div
                  className="category-item__link"
                  onClick={() => allProductCategoryHandler()}
                >
                  Tất cả
                </div>
              </li>
              <li
                className={`category-item ${
                  onChangePageNew === 1 ? 'category-item--active' : ''
                }`}
              >
                <div className="category-item__link" onClick={() => newProdHandler()}>
                  Mới ra
                </div>
              </li>
              <li
                className={`category-item ${
                  onChangePageSale === 1 ? 'category-item--active' : ''
                }`}
              >
                <div className="category-item__link" onClick={() => saleProdHandler()}>
                  Giảm giá
                </div>
              </li>
            </ul>
            <h3 className="category__heading">
              <i className="category__heading-icon fas fa-list-ul"></i>
              Loại sản phẩm
            </h3>
            <ul className="category-list">
              {dataCategory.map(
                (item) =>
                  item.isActive === 1 && (
                    <li
                      key={item.idCategory}
                      className={`category-item ${
                        idCateClick === item.idCategory ? 'category-item--active' : ''
                      }`}
                    >
                      <div
                        className="category-item__link"
                        onClick={() =>
                          categoryOnClickHandler({ idCategory: item.idCategory })
                        }
                      >
                        {item.name}
                      </div>
                    </li>
                  )
              )}
            </ul>
          </nav>
        </div>
        <div className="col l-10">
          <div className="home-product">
            <div className="row container-filterPrice">
              <Checkbox checked={checked.check1} onChange={checkOnchange1}>
                <p>Từ 0 - 1,000,000đ</p>
              </Checkbox>
              <Checkbox checked={checked.check2} onChange={checkOnchange2}>
                <p>Từ 1,000,000đ - 3,000,000đ</p>
              </Checkbox>
              <Checkbox checked={checked.check3} onChange={checkOnchange3}>
                <p>Từ 3,000,000đ - 5,000,000đ</p>
              </Checkbox>
              <Checkbox checked={checked.check4} onChange={checkOnchange4}>
                <p>Từ 5,000,000đ trở lên</p>
              </Checkbox>
            </div>
            <div className="row sm-gutter">
              {dataProductDefault.map((item) => {
                let imgName = getImageProductHandler({ idProduct: item.idProduct });
                let checkNew = dataNewProd.findIndex(
                  (prod) => prod.idProduct === item.idProduct
                );
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
                        {item.discount !== null ? (
                          <div style={{ display: 'flex' }}>
                            {item.discount.isActive === 1 && (
                              <span className="home-product-item__price-old">
                                {formatter.format(item.price)}
                              </span>
                            )}
                            <span className="home-product-item__price-current">
                              {item.discount.isActive === 1
                                ? formatter.format(
                                    item.price * (1 - item.discount.percent)
                                  )
                                : formatter.format(item.price)}
                            </span>
                          </div>
                        ) : (
                          <span className="home-product-item__price-current">
                            {formatter.format(item.price)}
                          </span>
                        )}
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
                      {checkNew >= 0 ? (
                        <div
                          className="home-product-item__favourite"
                          style={{ backgroundColor: '#ff0000d9' }}
                        >
                          <i className="fas fa-check"></i>
                          <span>Mới ra mắt</span>
                        </div>
                      ) : (
                        ''
                      )}
                      {item.discount !== null && (
                        <div>
                          {item.discount.isActive === 1 && (
                            <div className="home-product-item__sale-off">
                              <span className="home-product-item__sale-off-precent">
                                {item.discount.percent * 100}%
                              </span>
                              <span className="home-product-item__sale-off-label">
                                GIẢM
                              </span>
                            </div>
                          )}
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
