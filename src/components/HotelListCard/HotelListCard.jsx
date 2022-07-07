import "./HotelListCard.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HotelListCard({
  hotel,
  checkIn,
  checkOut,
  numberOfPerson,
  markers
}) {
  const [marker, setMarker] = useState({})
  // console.log(markers)
  const navigate = useNavigate()

  
  useEffect(() => {
    const filterMarker = (marker) => {
      return marker.name === hotel.hotel_name
    }
    const singleMarker = markers.filter(filterMarker)
    setMarker(singleMarker[0])
  }, [])
  console.log(marker)
  return (
    <div onClick={() => {
      navigate(`/hotels/${hotel.hotel_id}?checkin=${checkIn}&checkout=${checkOut}&numberOfPerson=${numberOfPerson}`,
        {
          state: {
            markers: { marker },
          }
        }
      )
    }}>


      <h2>{hotel.hotel_name}</h2>
      <h3>Review Score: {hotel.review_score}</h3>
      <img src={hotel.max_photo_url} alt="" />
    </div>
  );
}
