import React, { useState } from 'react';
import { Button, message } from 'antd';
import PropTypes from 'prop-types';
import { addItemToCart } from '../../API';

const AddToCart = ({ item }) => {
  const [loading, setLoading] = useState(false);

  const addToCart = () => {
    setLoading(true);
    addItemToCart(item.id).then(() => {
      message.success(`${item.title} has been added to cart`);
      setLoading(false);
    });
  };
  return (
    <Button
      type="link"
      onClick={() => { addToCart(); }}
      loading={loading}
    >
      Add to Cart
    </Button>
  );
};

AddToCart.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default AddToCart;
