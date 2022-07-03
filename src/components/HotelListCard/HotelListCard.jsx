import "./HotelListCard.css";
import axios from "axios";
import { Link } from 'react-router-dom'

export default function HotelListCard({ hotel }) {
//Hi Jing! I'm curious why we do another axios fetch for the hotel onClick, when we are already passing all of that data down for each hotel through props
//If I console.log(hotel) it lists out all of the same info for each hotel that you would get on the onClick

  console.log(hotel)
  // const handleClick = async () => {
  //   const options = {
  //     method: "GET",
  //     url: "https://booking-com.p.rapidapi.com/v1/hotels/data",
  //     params: { hotel_id: hotel.hotel_id, locale: "en-gb" },
  //     headers: {
  //       "X-RapidAPI-Key": "cd61a9c3fcmsh03b40d2dc69de61p1d57efjsnb4b7e3ec281d",
  //       "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  //     },
  //   };

  //   const response = await axios.request(options).catch(function (error) {
  //     console.error(error);
  //   });
  //   console.log(response.data);
  // };

  return (
    <div >
      <Link to={`/hotels/${hotel.hotel_id}`} >
      <h2>{hotel.hotel_name}</h2>
      </Link>
      <h3>Review Score: {hotel.review_score}</h3>
      <img src={hotel.max_photo_url} alt="" />
    </div>
  );
}
