import React from 'react';
import './SearchOrder.css';

import { Input, Button } from 'antd';
import { useState } from 'react';
import { LINKIMG_BASE, LINKCONNECT_BASE } from '../../../App';

const INITIAL_DATA = {
  phone: '',
  address: '',
  note: '',
  total: 0,
  dateCreate: '',
  dateModified: '',
  dateEnd: null,
  status: {
    idStatus: 1,
    statusName: 'Đang đợi xử lý',
  },
  customer: {
    idCustomer: 0,
    name: '',
    phone: '',
    address: '',
    dateCreate: '',
  },
  employee: null,
  idOrder: 0,
};
const SearchOrderDetail = () => {
  const [dataOrder, setDataOrder] = useState([INITIAL_DATA]);
  const [dataSearch, setDataSearch] = useState('');

  const phoneOnchange = (event) => {
    setDataSearch(event.target.value);
  };
  const btnSubmitHandler = () => {};
  return <div></div>;
};

export default SearchOrderDetail;
