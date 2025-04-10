import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {CartContext} from '../context/CartContext';
import {convertToINR} from '../utils/currency';
function Home(){
  const navigate = useNavigate();
  const {addToCart} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState('INR');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/');
      return;
    }
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setProducts([]);
      });
  }, [navigate]);
  const convertPrice = (price) => {
    return currency === 'INR' ? `₹${convertToINR(price)}` : `$${price}`;
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  return(
    <>
      <button onClick={handleLogout} style={{margin: '1rem'}}>Logout</button>
      <div className = "hero-banner">
        <div className = "hero-content">
          <h1>Welcome to TechKart</h1>
          <p>Your one-stop shop for the best deals on tech products</p>
          <button onClick = {() => navigate('/cart')}>Shop Now</button>
        </div>
        <div style = {{textAlign: 'center', marginTop: '1rem'}}>
          <label htmlFor="currency-select">Choose currency: </label>
          <select
            id = "currency-select"
            value = {currency}
            onChange = {(e) => setCurrency(e.target.value)}
          >
            <option value = "INR">₹ INR</option>
            <option value = "USD">$ USD</option>
          </select>
        </div>
      </div>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img
              src = {product.image}
              alt = {product.title}
              onClick = {() => navigate(`/product/${product.id}`)}
              style = {{ cursor: 'pointer' }}
            />
            <h3>{product.title}</h3>
            <p>{convertPrice(product.price)}</p>
            <button onClick = {() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
}
export default Home;