const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path) {
  const response = await fetch(`${API_URL}${path}`);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export function getProducts({ search = '', category = '', sort = '' } = {}) {
  const params = new URLSearchParams();
  if (search.trim()) params.set('search', search.trim());
  if (category) params.set('category', category);
  if (sort) params.set('sort', sort);
  const query = params.toString();
  return request(`/products${query ? `?${query}` : ''}`);
}

export function getProduct(id) { return request(`/products/${id}`); }
