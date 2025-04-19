import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Menu = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showQRModalForTen, setShowQRModalForTen] = useState(false);
  const [upiPaymentString, setUpiPaymentString] = useState("");
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Panipuri", image: "panipuri.jpg", description: "Crispy, tangy,spicy delight", price: 1 },
    { id: 2, name: "Vada Pav", image: "vadapav.jpg", description: "Tast, spicy, street burger 🌶", price: 1 },
    { id: 3, name: "Kachori", image: "kachori.jpg", description: "Flaky, spicy, stuffed snack", price: 20 },
    { id: 4, name: "Samosa", image: "samosa.jpg", description: "Crispy, savory stuffed pastry 😝", price: 15 },
    { id: 5, name: "Misal", image: "misal.jpg", description: "Spicy, crunchy curry mix 🥵", price: 80 },
    { id: 6, name: "Pav Bhaji", image: "pavbhaji.jpg", description: "Buttery, spicy vegetable mash", price: 60 },
    { id: 7, name: "Manchurian", image: "manchurian.jpg", description: "Spicy, saucy Indo-Chinese balls", price: 120 },
    { id: 8, name: "Kachi Dabeli", image: "kachidabeli.jpg", description: "Tangy, spicy street mix 😲", price: 20 },
    { id: 9, name: "Samosa Kachori", image: "samosakachori.jpg", description: "Crispy, Spicy stuffed delights", price: 35 },
    { id: 10, name: "Jalebi (100 gram)", image: "jalebi.jpg", description: "Sweet, crispy, syrupy swirl ☺", price: 50 },
    { id: 11, name: "Idli Sambar", image: "idlisambar.jpg", description: "Soft, savory, tasty, tangy combo😎😎(idli sambar chutney chutney)", price: 60 },
    { id: 12, name: "Bhaji", image: "bhaji.jpg", description: "Crispy, spicy, onion fritter snack🌶🥵", price: 30 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Update searchResults immediately as the user types
    const results = menuItems.filter(item =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
      item.description.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!userId) {
      console.error("User ID is missing. Redirecting to login.");
      navigate('/login'); // Redirect to the login page
      return;
    }
    // The filtering logic is now handled in handleSearchChange,
    // so no need to duplicate it here.
  };

  const addToCart = async (item) => {
    if (!userId) {
      console.error("User ID is missing. Please log in.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/add-to-cart", {
        userId,
        item: { ...item, price: item.price },
      });
      setCart(response.data.cart);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleBuyNow = (item) => {
    const upiId = "aryanshinde8282@okaxis";
    const amount = item.price;
    const payeeName = "Crunchily";

    axios.get(`http://localhost:3000/user/${userId}`)
      .then(userResponse => {
        const userInfo = userResponse.data;
        const transactionNote = `${item.name}, ${userInfo.fullName}, ${userInfo.address}, ${userInfo.phoneNumber}`;

        const encodedPayeeName = encodeURIComponent(payeeName);
        const encodedTransactionNote = encodeURIComponent(transactionNote);

        const upiString = `upi://pay?pa=${upiId}&pn=${encodedPayeeName}&am=${amount}&tn=${encodedTransactionNote}`;
        console.log(upiString);
        setUpiPaymentString(upiString);
        setSelectedBook(item);
        setShowQRModal(true);
      })
      .catch(error => {
        console.error("Error fetching user info:", error);
      });
  };

  const handleTenBuyNow = (item) => {
    const upiId = "aryanshinde8282@okaxis";
    const amount = item.price * 10;
    const payeeName = "Crunchily";

    axios.get(`http://localhost:3000/user/${userId}`)
      .then(userResponse => {
        const userInfo = userResponse.data;
        const transactionNote = `${item.name}, ${userInfo.fullName}, ${userInfo.address}, ${userInfo.phoneNumber}`;

        const encodedPayeeName = encodeURIComponent(payeeName);
        const encodedTransactionNote = encodeURIComponent(transactionNote);

        const upiString = `upi://pay?pa=${upiId}&pn=${encodedPayeeName}&am=${amount}&tn=${encodedTransactionNote}`;
        console.log(upiString);
        setUpiPaymentString(upiString);
        setSelectedBook(item);
        setShowQRModalForTen(true);
      })
      .catch(error => {
        console.error("Error fetching user info:", error);
      });
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cart/${userId}`);
        setCart(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  return (
    <>
      <div className="hero-section text-center py-5 bg-dark">
        <br />
        <p className="lead" style={{ color: "white", background: "transparent", margin: "0 auto" }}>
          <i style={{ fontFamily: 'cursive' }}>__ Enjoy Searching Foods in an effective way __</i>
        </p>
        <br />
        <form className="d-flex justify-content-center" onSubmit={handleSearchSubmit}>
          <input
            className="form-control w-50 me-2"
            type="search"
            placeholder="Enter the Food name which you want"
            aria-label="Search"
            style={{ fontFamily: 'cursive' }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-light custom-btn text-black" type="submit">Find Food</button>
        </form>
      </div>
      <br />
      <div className="row row-cols-1 row-cols-md-5 g-4 p-3 mybook">
        {(searchResults.length > 0 ? searchResults : menuItems).map((item) => (
          <div className="col" key={item.id}>
            <div className="card bg-black text-white h-100">
              <img src={item.image} className="card-img-top" alt={item.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text flex-grow-1">{item.description}</p>
                <p className="card-text">Price: ₹{item.price}</p>
                <div className="d-flex gap-2">
                  <button className="btn btn-danger p-2" onClick={() => addToCart(item)}>Add to Cart</button>
                  <button className="btn btn-success p-2" onClick={() => handleBuyNow(item)}>Buy Now</button>
                </div>
                <br />
                <button className="btn btn-outline-dark p-2 text-white" onClick={() => handleTenBuyNow(item)}>Buy 10 items (1 free)</button>
              </div>
            </div>
          </div>
        ))}
        {searchTerm && searchResults.length === 0 && (
          <div className="col-12 text-center">
            <p className="text-muted">No food items found matching your search.</p>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="position-fixed bottom-0 end-0 m-3 p-3 bg-dark text-white rounded" style={{ zIndex: 1000 }}>Item added to cart!</div>
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
                        top: '40%',
                        left: '50%',
                        width: '60px',
                        height: '60px',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '8%',
                      }}
                    />
                  </>
                )}
                <p style={{ fontFamily: 'Times New Roman' }}><br />Scan this QR code to pay <span style={{ color: 'red' }}>₹{selectedBook?.price}</span> for <span style={{ color: 'green' }}>{selectedBook?.name}</span></p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-dark" onClick={() => setShowQRModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showQRModalForTen && (
        <div className="modal" style={{ display: 'flex', backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ fontFamily: 'cursive' }}>Pay with UPI</h5>
                <button type="button" className="btn-close" onClick={() => setShowQRModalForTen(false)}></button>
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
                        top: '35%',
                        left: '50%',
                        width: '60px',
                        height: '60px',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '8%',
                      }}
                    />
                  </>
                )}
                <p style={{ fontFamily: 'Times New Roman' }}><br></br>Scan this QR code to pay <span style={{ color: 'red' }}>₹{selectedBook?.price * 10}</span></p><br></br>
                <p><strong><span style={{ color: 'green' }}>{selectedBook?.name} : </span></strong> 10 {selectedBook?.name} <span style={{ color: 'green' }}>(+1 free)</span></p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-dark" onClick={() => setShowQRModalForTen(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Menu;