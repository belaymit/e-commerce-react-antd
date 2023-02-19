import {
  Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, message, Table, Typography,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { getCartItems } from '../../API';

const CartDrawer = () => {
  const [cartDrawer, setCartDrawer] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkOutDrawer, setCheckOutDrawer] = useState(false);

  const onConfirmOrder = (values) => {
    setCartDrawer(false);
    setCheckOutDrawer(false);
    message.success('Your Order has been placed successfully!');
    console.log(values);
  };

  useEffect(() => {
    getCartItems().then((res) => {
      setCartItems(res.products);
    });
  }, []);
  return (
    <>
      <Badge
        onClick={() => {
          setCartDrawer(true);
        }}
        count={cartItems.length}
        className="shoppingCartBadge"
      >
        <ShoppingCartOutlined className="shoppingCart" />
      </Badge>
      <Drawer
        open={cartDrawer}
        onClose={() => {
          setCartDrawer(false);
        }}
        title="Cart Content"
        contentWrapperStyle={{ width: '31.25rem', paddingRight: '1.2rem' }}
      >
        <Table
          columns={[
            {
              title: 'Title',
              dataIndex: 'title',
            },
            {
              title: 'Price',
              dataIndex: 'price',
              render: (value) => (
                <span>
                  $
                  {value}
                </span>
              ),
            },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
              render: (value, record) => (
                <InputNumber
                  min={0}
                  defaultValue={value}
                  onChange={(value) => {
                    setCartItems((pre) => pre.map((cart) => {
                      if (record.id === cart.id) {
                        // eslint-disable-next-line no-param-reassign
                        cart.total = cart.price * value;
                      }
                      return cart;
                    }));
                  }}
                />
              ),
            },
            {
              title: 'Total',
              dataIndex: 'total',
              render: (value) => (
                <span>
                  $
                  {value}
                </span>
              ),
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((pre, current) => pre + current.total, 0);
            return (
              <span>
                Total:
                {' '}
                $
                {total}
              </span>
            );
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            setCheckOutDrawer(true);
          }}
        >
          Checkout Your Cart
        </Button>
      </Drawer>
      <Drawer
        open={checkOutDrawer}
        onClose={() => {
          setCheckOutDrawer(false);
        }}
        title="Checkout Form"
        contentWrapperStyle={{ width: '31.25rem', paddingRight: '1.2rem' }}
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please Enter your full name',
              },
            ]}
            label="Name"
            name="full_name"
          >
            <Input placeholder="Enter your full name..." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please Enter valid Email',
                type: 'email',
              },
            ]}
            label="Email"
            name="your_email"
          >
            <Input placeholder="Enter your email..." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please Enter your full address',
              },
            ]}
            label="Address"
            name="address"
          >
            <Input placeholder="Enter your address..." />
          </Form.Item>
          <Form.Item>
            <Checkbox defaultChecked disabled>Cash on Delivery</Checkbox>
          </Form.Item>
          <Typography.Paragraph type="secondary">More Methods soon...</Typography.Paragraph>
          <Button type="primary" htmlType="submit">Confirm Order</Button>
        </Form>
      </Drawer>
    </>
  );
};

export default CartDrawer;
