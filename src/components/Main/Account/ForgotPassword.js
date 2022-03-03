import React, { useState } from 'react';
import './ForgotPassword.css';
import { Input, Button, Card } from 'antd';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="grid wide container-forgotpass">
      <div className="row">
        <div className="col l-4"></div>
        <div className="col l-4">
          <Card>
            <Input placeholder="Nhập email để lấy lại mật khẩu" />
            <Button className="forgotpass-btn">Gửi</Button>
          </Card>
        </div>
        <div className="col l-4"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
