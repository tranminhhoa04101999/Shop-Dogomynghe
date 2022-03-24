import React, { useEffect, useRef, useState } from 'react';
import { notification } from 'antd';

export default function PayPal(props) {
  const [value, setValue] = useState(1);
  const [loaded, setLoaded] = useState(false);
  let payPalRef = useRef();

  const openNotificationWithIcon = (props) => {
    notification[props.type]({
      message: props.message,
      description: props.desc,
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.paypal.com/sdk/js?client-id=AdYAYot4ld2aOXtZhgOmEnpuecB4p6Dq4Nl_8UBPRcfUV-kCr5u9KpZ4945TYQSiqtnd-kz6Lx9ENZdJ';
    script.addEventListener('load', () => setLoaded(true));
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (loaded) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: 'Cool looking table',
                    amount: {
                      value: props.payAmount,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              openNotificationWithIcon({
                type: 'success',
                message: 'Thanh toán thành công !!!',
                desc: 'Đơn hàng đã được đặt',
              });
              props.submitHandler();
            },
            onCancel: function (data) {
              openNotificationWithIcon({
                type: 'warning',
                message: 'Thanh toán không thành công !!!',
                desc: 'Người dùng đã cancel',
              });
            },
          })
          .render(payPalRef);
      }
    });
  }, [loaded, props.payAmount]);
  return (
    <div>
      <div ref={(v) => (payPalRef = v)} />
    </div>
  );
}
