import "./HotelListCard.css";
import axios from "axios";

export default function HotelListCard({ hotel }) {
  const handleClick = () => {
    const options = {
      method: "GET",
      url: "https://booking-com.p.rapidapi.com/v1/hotels/data",
      params: { hotel_id: hotel.hotel_id, locale: "en-gb" },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div onClick={handleClick}>
      <h2>{hotel.hotel_name}</h2>
      <h3>Review Score: {hotel.review_score}</h3>
      <img src={hotel.max_photo_url} alt="" />
    </div>
  );
}
