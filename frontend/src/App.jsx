import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';

export default function App() {
  return <><Navbar /><main className="page"><Routes>
    <Route path="/products" element={<Products />} />
    <Route path="/products/:id" element={<ProductDetails />} />
    <Route path="*" element={<Navigate to="/products" replace />} />
  </Routes></main></>;
}
