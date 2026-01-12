import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex bg-slate-200 my-4 gap-4 w-fit mx-auto">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/product/add">Add Product</Link>
      <Link to="/product/edit/1">Edit Product</Link>
    </nav>
  );
}
