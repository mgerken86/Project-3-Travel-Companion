import "./HotelListCard.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HotelListCard({ hotel, checkIn, checkOut, markers }) {
  
  return (
    <div>
      <Link
        to={`/hotels/${hotel.hotel_id}?checkin=${checkIn}&checkout=${checkOut}`}
      >
        <h2>{hotel.hotel_name}</h2>
      </Link>
      <h3>Review Score: {hotel.review_score}</h3>
      <img src={hotel.max_photo_url} alt="" />
    </div>
  );
}
