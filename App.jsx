import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetailPage from './pages/ProductDetailPage';
import Header from './components/Header';
import {CartProvider} from './context/CartContext';
import {convertToINR} from './utils/currency';
function App(){
  const isAuthenticated = !!localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  return(
    <CartProvider>
      {isAuthenticated && <Header onLogout = {handleLogout} />}
      <Routes>
        <Route
          path = "/"
          element={isAuthenticated ? <Navigate to = "/home" /> : <Login />} 
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home convertToINR={convertToINR} /> : <Navigate to="/" />} 
        />
        <Route
          path="/product/:id"
          element={isAuthenticated ? <ProductDetailPage convertToINR={convertToINR} /> : <Navigate to="/" />} 
        />
        <Route
          path="/cart"
          element={isAuthenticated ? <Cart convertToINR={convertToINR} /> : <Navigate to="/" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </CartProvider>
  );
}
export default App;