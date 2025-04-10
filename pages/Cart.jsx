import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {CartContext} from '../context/CartContext';
import {convertToINR} from '../utils/currency';
function Cart(){
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/');
    }
  }, [navigate]);
  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate('/');
  };
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return(
    <div className="cart-page">
      <h2>Your Cart</h2>
      <button onClick={handleLogout} style={{marginBottom: '1rem'}}>Logout</button>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                <img src = {item.image} alt = {item.title} />
                <span>{item.title}</span>
                <input
                  type = "number"
                  value = {item.quantity}
                  onChange = {(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                />
                <span>₹{convertToINR(item.price)} x {item.quantity}</span>
                <button onClick = {() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{convertToINR(total)}</h3>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
}
export default Cart;