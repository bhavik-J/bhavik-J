import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../services/api.js';

const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

export default function ProductDetails() {
  const { id } = useParams(); const [product, setProduct] = useState(null); const [status, setStatus] = useState('loading');
  useEffect(() => { let active = true; setStatus('loading'); getProduct(id).then((data) => { if (active) { setProduct(data.product); setStatus('success'); } }).catch(() => active && setStatus('error')); return () => { active = false; }; }, [id]);
  if (status === 'loading') return <p className="state">Loading product...</p>;
  if (status === 'error') return <div className="state error">Something went wrong while loading this product.<br /><Link to="/products">Back to products</Link></div>;
  return <article className="details"><img src={product.image} alt={product.name} /><div className="details-content"><Link className="back" to="/products">← Back to products</Link><span className="category">{product.category}</span><h1>{product.name}</h1><p className="description">{product.description}</p><p className="detail-price">{formatPrice(product.price)}</p><p className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>{product.stock > 0 ? `${product.stock} units available` : 'Currently out of stock'}</p><button className="button" disabled={product.stock === 0}>Add to Cart</button></div></article>;
}
