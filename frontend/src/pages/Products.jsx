import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { getProducts } from '../services/api.js';

export default function Products() {
  const [search, setSearch] = useState(''); const [category, setCategory] = useState(''); const [sort, setSort] = useState('');
  const [products, setProducts] = useState([]); const [status, setStatus] = useState('loading');
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setStatus('loading');
      try { const data = await getProducts({ search, category, sort }); if (!controller.signal.aborted) { setProducts(data.products); setStatus('success'); } }
      catch { if (!controller.signal.aborted) setStatus('error'); }
    }, 250);
    return () => { controller.abort(); clearTimeout(timer); };
  }, [search, category, sort]);
  return <><div className="page-heading"><p className="eyebrow">Discover our collection</p><h1>Find your next favourite</h1></div>
    <SearchBar {...{ search, category, sort }} onSearchChange={setSearch} onCategoryChange={setCategory} onSortChange={setSort} />
    {status === 'loading' && <p className="state">Loading products...</p>}
    {status === 'error' && <p className="state error">Something went wrong while loading products.</p>}
    {status === 'success' && products.length === 0 && <p className="state">No products found.</p>}
    {status === 'success' && products.length > 0 && <section className="product-grid">{products.map((product) => <ProductCard key={product._id} product={product} />)}</section>}
  </>;
}
