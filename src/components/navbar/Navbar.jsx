import React from 'react';
import { HomeFilled } from '@ant-design/icons';
import { Menu, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import CartDrawer from '../ui/CartDrawer';
import '../../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = (item) => {
    navigate(`/${item.key}`);
  };

  return (
    <div className="navBar">
      <Menu
        onClick={handleClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: '',
          },
          {
            label: 'Men',
            key: 'men',
            children: [
              {
                label: 'Men\'s Shirt',
                key: 'mens-shirts',
              },
              {
                label: 'Men\'s Shoes',
                key: 'mens-shoes',
              },
              {
                label: 'Mens\' Watches',
                key: 'mens-watches',
              },
            ],
          },
          {
            label: 'Women',
            key: 'women',
            children: [
              {
                label: 'Women\'s Dresses',
                key: 'womens-dresses',
              },
              {
                label: 'Women\'s Shoes',
                key: 'womens-shoes',
              },
              {
                label: 'Women\'s Watches',
                key: 'womens-watches',
              },
              {
                label: 'Women\'s Bags',
                key: 'womens-bags',
              },
              {
                label: 'Women\'s Jewelry',
                key: 'womens-jewellery',
              },
            ],
          },
          {
            label: 'Accessories',
            key: 'fragrances',
          },
        ]}
        className="menuContainer"
      />
      <Typography.Title className="storeTitle">Store</Typography.Title>
      <CartDrawer />
    </div>
  );
};

export default Navbar;
