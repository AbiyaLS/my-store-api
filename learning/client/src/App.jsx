import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProductAddPage from "./pages/ProductAddPage";
import ProductEditPage from "./pages/ProductEditPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/add" element={<ProductAddPage />} />
            <Route
              path="/product/edit/:productId"
              element={<ProductEditPage />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
