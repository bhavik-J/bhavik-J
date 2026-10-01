export default function SearchBar({ search, category, sort, onSearchChange, onCategoryChange, onSortChange }) {
  return <section className="filters" aria-label="Product filters">
    <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search products..." aria-label="Search products" />
    <select value={category} onChange={(event) => onCategoryChange(event.target.value)} aria-label="Filter by category">
      <option value="">All Categories</option><option>Electronics</option><option>Fashion</option><option>Books</option><option>Home</option>
    </select>
    <select value={sort} onChange={(event) => onSortChange(event.target.value)} aria-label="Sort products">
      <option value="">Newest</option><option value="price_asc">Price: Low to High</option><option value="price_desc">Price: High to Low</option>
    </select>
  </section>;
}
