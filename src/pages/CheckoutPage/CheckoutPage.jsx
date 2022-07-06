import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as ordersAPI from "../../utilities/tripOrders-api";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const [cardinfo, setCardinfo] = useState({});
  const { state } = useLocation();
  // use navigate
  const navigate = useNavigate();
  // console.log(state);
  const { hotel, checkIn, checkOut, room, hotelPhoto, hotel_id } = state;

  const handleChange = (e) => {
    const cardData = {
      ...cardinfo,
      [e.target.name]: e.target.value,
    };

    setCardinfo(cardData);
    // console.log(cardData);
  };

  const handlePay = async (e) => {
    e.preventDefault();
    const addPaymentInfo = await ordersAPI.checkout(cardinfo);
    console.log(addPaymentInfo);
    navigate("/users/myAccount");
  };

  return (
    <>
      <h1>Check Out Page</h1>
      <div>
        <div className="leftContainer">
          <h3>Your Booking Details</h3>
          <h5>Check-in</h5>
          <h4>{checkIn}</h4>
          <h5>Check-out</h5>
          <h4>{checkOut}</h4>
          <h5>You selected</h5>
          <p>{room.name}</p>
          <Link
            to={`/hotels/${hotel_id}?checkin=${checkIn}&checkout=${checkOut}`}
          >
            Change Your Selection
          </Link>
        </div>

        <div>
          <h3>Your Price Summary</h3>
          <h5>Total</h5>
          <h5> $ {room.price_breakdown.gross_price}</h5>
          <p>(for {room.nr_adults} guests)</p>
        </div>
      </div>
      <div className="rightContainer">
        <div>
          <h2>{hotel.name}</h2>
          <img src={hotelPhoto} alt="" />
          <h5>
            {hotel.address}, {hotel.city}, {hotel.zip}
          </h5>
          <h5>{hotel.review_score}/10 </h5>
          <h5>{hotel.review_score_word}</h5>
        </div>
        <form onSubmit={async (e) => handlePay(e)}>
          <div className="flex-column">
            <h2>Payment Info</h2>
            <input type="text" name="name" onChange={handleChange} required />
            <input
              type="number"
              name="cardNumber"
              onChange={handleChange}
              minLength={16}
              required
            />
            <input
              type="text"
              name="expDate"
              onChange={handleChange}
              required
            />
            <button type="submit">Make Payment</button>
          </div>
        </form>
      </div>
    </>
  );
}
