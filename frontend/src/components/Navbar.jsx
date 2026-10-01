import { Link } from 'react-router-dom';
export default function Navbar() { return <header className="navbar"><Link className="brand" to="/products">ShopKart</Link><Link to="/products">Products</Link></header>; }
