export const getAllProducts = () => fetch('http://dummyjson.com/products')
  .then((res) => res.json());

export const getProductsByCategories = (category) => fetch(`https://dummyjson.com/products/category/${category}`).then((res) => res.json());

export const getCartItems = () => (
  fetch('https://dummyjson.com/carts/1')
    .then((res) => res.json())
);

export const addItemToCart = (id) => fetch('https://dummyjson.com/carts/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 1,
    products: [
      {
        id,
        quantity: 1,
      },
    ],
  }),
}).then((res) => res.json());
