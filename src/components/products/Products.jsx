/* eslint-disable no-nested-ternary */
import {
  Badge,
  Card, Image, List, Rate, Select, Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllProducts, getProductsByCategories } from '../../API';
import '../../styles/products.css';
import AddToCart from '../ui/AddToCart';

const Products = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortedOrder, setSortedOrder] = useState('az');
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    (params?.categoryId
      ? getProductsByCategories(params.categoryId)
      : getAllProducts()
    )
      .then((res) => {
        setItems(res.products);
        setLoading(false);
      });
  }, [params]);

  const getSortedItems = () => {
    const sortedItems = [...items];
    // eslint-disable-next-line array-callback-return, consistent-return
    sortedItems.sort((a, b) => {
      const aLowerCaseTitle = a.title.toLowerCase();
      const bLowerCaseTitle = b.title.toLowerCase();

      if (sortedOrder === 'az') {
        return aLowerCaseTitle > bLowerCaseTitle
          ? 1
          : aLowerCaseTitle === bLowerCaseTitle
            ? 0
            : -1;
      } if (sortedOrder === 'za') {
        return aLowerCaseTitle < bLowerCaseTitle
          ? 1
          : aLowerCaseTitle === bLowerCaseTitle
            ? 0
            : -1;
      } if (sortedOrder === 'lowHigh') {
        return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
      } if (sortedOrder === 'highLow') {
        return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
      }
    });
    return sortedItems;
  };
  return (
    <div className="productsContainer">
      <div>
        <Typography.Text>View Items Sorted By:</Typography.Text>
        <Select
          onChange={(value) => {
            setSortedOrder(value);
          }}
          defaultValue="az"
          options={[
            {
              label: 'Alphabetically a-z',
              value: 'az',
            },
            {
              label: 'Alphabetically z-a',
              value: 'za',
            },
            {
              label: 'Price Low to High',
              value: 'lowHigh',
            },
            {
              label: 'Price Hight to Low',
              value: 'highLow',
            },
          ]}
        />
      </div>
      <List
        loading={loading}
        grid={{ column: 3 }}
        renderItem={(product) => (
          <Badge.Ribbon
            text={`${product.discountPercentage} % Off `}
            color="#0d51c0"
            className="itemCardBadge"
          >
            <Card
              className="itemCard"
              title={product.title}
              key={product.index}
              cover={
                <Image className="itemCardImage" src={product.thumbnail} />
            }
              actions={[
                <Rate allowHalf disabled value={product.rating} key={product.index} />,
                <AddToCart item={product} key={product.id} />,
              ]}
            >
              <Card.Meta
                title={(
                  <Typography.Paragraph>
                    Price: $
                    {product.price}
                    {' '}
                    <Typography.Text delete type="danger">
                      $
                      {
                    parseFloat(
                      product.price + (product.price * product.discountPercentage) / 100,
                    ).toFixed(2)
                    }
                    </Typography.Text>
                  </Typography.Paragraph>
              )}
                description={<Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'see more' }}>{product.description}</Typography.Paragraph>}
              />
            </Card>
          </Badge.Ribbon>
        )}
        dataSource={getSortedItems()}
        className="productContainer"
      />
    </div>
  );
};

export default Products;
