import React, {useEffect, useState, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {CartContext} from '../context/CartContext';
import {convertToINR} from '../utils/currency';
function ProductDetailPage(){
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/');
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);
  if(!product) return <p>Loading...</p>;
  return(
    <div className="product-detail">
      <button onClick={handleLogout} style={{ marginBottom: '1rem' }}>Logout</button>
      <img src={product.image} alt={product.title} />
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>₹{convertToINR(product.price)}</h3>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}
export default ProductDetailPage;