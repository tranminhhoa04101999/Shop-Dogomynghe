import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LINKCONNECT_BASE, LINKIMG_BASE } from '../../../App';
import './Categories.css';

const Categories = (props) => {
  const [dataCategory, setDataCategory] = useState([
    {
      idCategory: 0,
      name: '',
      descCategory: '',
      imgURL: 'defaultImage',
      isActive: 1,
    },
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    // lấy all category
    fetch(`${LINKCONNECT_BASE}/allcategory`)
      .then((response) => response.json())
      .then((data) => setDataCategory(data));
  }, []);

  const onClickHandler = (props) => {
    console.log('first', props.idCategory);
    navigate('/product', { state: { idCategory: props.idCategory } });
  };
  return (
    <div className="grid wide">
      <div className="categories">
        <span className="categories-title">Danh Mục Sản Phẩm</span>
        <NavLink to="/product" className="categories-link">
          Xem Tất Cả Sản Phẩm
        </NavLink>
        <div className="row sm-gutter">
          {dataCategory.map((item) => (
            <div
              key={item.idCategory}
              className="col l-1-5 "
              onClick={() => onClickHandler({ idCategory: item.idCategory })}
              style={{ cursor: 'pointer' }}
            >
              <div className="categories-item">
                <img
                  src={`${LINKIMG_BASE}${item.imgURL}.jpg?alt=media`}
                  alt=""
                  className="categories-img"
                />
                <span className="categories-label">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
