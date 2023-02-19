import { Routes, Route } from 'react-router-dom';
import Category from '../pages/category/Category';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Category />} />
    <Route path="/:categoryId" element={<Category />} />
  </Routes>

);

export default AppRoutes;
