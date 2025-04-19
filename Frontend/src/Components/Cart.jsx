import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import QRCode from 'react-qr-code';

const Cart = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [upiPaymentString, setUpiPaymentString] = useState("");
  const [paymentFor, setPaymentFor] = useState('cart'); // 'cart' or 'single'
  const [selectedSingleBook, setSelectedSingleBook] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cart/${userId}`);
        setCart(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${userId}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchCart();
    fetchUserInfo();
  }, [userId]);

  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.post("http://localhost:3000/remove-from-cart", {
        userId,
        itemId,
      });
      setCart(response.data.cart);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleConfirmPayment = async () => {
    if (!userInfo) {
      console.error("User information not available for payment.");
      return;
    }

    const upiId = "aryanshinde8282@okaxis";
    const amount = totalPrice;
    const payeeName = "Crunchily";
    const cartItemNames = cart.map(item => item.name).join(', ');
    const transactionNote = `Payment for cart items: ${cartItemNames}, ${userInfo.fullName}, ${userInfo.phoneNumber}, ${userInfo.address}`;

    const encodedPayeeName = encodeURIComponent(payeeName);
    const encodedTransactionNote = encodeURIComponent(transactionNote);

    const upiString = `upi://pay?pa=${upiId}&pn=${encodedPayeeName}&am=${amount}&tn=${encodedTransactionNote}`;
    console.log(upiString);
    setUpiPaymentString(upiString);
    setPaymentFor('cart');
    setShowQRModal(true);
  };

  const handleBuyNowSingle = (item) => {
    if (!userInfo) {
      console.error("User information not available for payment.");
      return;
    }

    const upiId = "aryanshinde8282@okaxis";
    const amount = item.price;
    const payeeName = "Crunchily";
    const transactionNote = `Payment for book: ${item.name} (₹${item.price}), Name: ${userInfo.fullName}, Phone: ${userInfo.phoneNumber}`;

    const encodedPayeeName = encodeURIComponent(payeeName);
    const encodedTransactionNote = encodeURIComponent(transactionNote);

    const upiString = `upi://pay?pa=${upiId}&pn=${encodedPayeeName}&am=${amount}&tn=${encodedTransactionNote}`;
    console.log(upiString);
    setUpiPaymentString(upiString);
    setPaymentFor('single');
    setSelectedSingleBook(item);
    setShowQRModal(true);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mt-5">
      <h1 className="text-center" style={{color:'white',fontWeight:'bold'}}>Your Cart</h1>
      <br />
      {cart.length === 0 ? (
        <p className="text-center" style={{color:'white',fontWeight:'bold'}}>Your cart is empty.</p>
      ) : (
        <div className="row">
          {cart.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card bg-black text-white">
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">Price: ₹{item.price}</p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-success p-2" onClick={() => handleBuyNowSingle(item)}>Buy Now</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="text-center mt-4">
          <h4 style={{color:'white',fontWeight:'bold'}}>Total Price: ₹{totalPrice}</h4>
          <br />
          <button className="btn btn-success me-2" onClick={handleConfirmPayment}>
            Confirm Payment
          </button>
          <Link to="/menu" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      )}
      {showQRModal && (
        <div className="modal" style={{ display: 'flex', backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ fontFamily: 'cursive' }}>Pay with UPI</h5>
                <button type="button" className="btn-close" onClick={() => setShowQRModal(false)}></button>
              </div>
              <div className="modal-body" style={{ padding: '40px 80px 40px 80px', position: 'relative', width: 'fit-content', margin: 'auto' }}>
  {upiPaymentString && (
    <>
      <QRCode value={upiPaymentString} size={256} level="H" />
      <img
        src="LogoQR.jpg"
        alt="logo"
        style={{
          position: 'absolute',
          top: '45%',
          left: '48%',
          width: '60px',
          height: '60px',
          transform: 'translate(-50%, -50%)',
          borderRadius: '8%',
        }}
      />
    </>
    )}
                <p style={{ fontFamily: 'Times New Roman' }}><br />Scan this QR code to pay <span style={{ color: 'red' }}>₹{paymentFor === 'cart' ? totalPrice : (selectedSingleBook?.price)}</span> for <span style={{ color: 'green' }}>{paymentFor === 'cart' ? 'all items in cart' : (selectedSingleBook?.name)}</span></p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-dark" onClick={() => setShowQRModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <br />
    </div>
  );
};

export default Cart;