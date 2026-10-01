import { Link } from 'react-router-dom';
const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

export default function ProductCard({ product }) {
  return <article className="product-card">
    <img src={product.image} alt={product.name} />
    <div className="card-content"><span className="category">{product.category}</span><h2>{product.name}</h2><strong>{formatPrice(product.price)}</strong>
      <p className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>{product.stock > 0 ? `${product.stock} units left` : 'Out of stock'}</p>
      <Link className="button" to={`/products/${product._id}`}>View Details</Link>
    </div>
  </article>;
}
