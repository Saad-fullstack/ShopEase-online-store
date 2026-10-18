import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetail'
import ForgotPasswordRequest from './pages/ForgotPasswordRequest'
import ResetPassword from './pages/ResetPassword'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddProduct from './pages/admin/AddProduct'
import Users from './pages/admin/Users'
import AdminProducts from './pages/admin/AdminProducts'
import UserProfile from './pages/UserProfile'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password-request" element={<ForgotPasswordRequest />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/user-profile" element={<UserProfile />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
