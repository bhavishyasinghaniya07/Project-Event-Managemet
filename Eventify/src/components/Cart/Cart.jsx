// Cart.js
import React, { useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Remove item from the cart
  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.pricePerPlate * item.guests,
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <div>
                <h3>{item.name}</h3>
                <p>Event Type: {item.eventType}</p>
                <p>Guests: {item.guests}</p>
                <p>Date: {item.date}</p>
                <p>Price: ₹{item.pricePerPlate * item.guests}</p>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="remove-btn"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-summary">
        <h3>Total Price: ₹{totalPrice}</h3>
        <button
          onClick={() => alert("Payment functionality coming soon!")}
          className="pay-btn"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
