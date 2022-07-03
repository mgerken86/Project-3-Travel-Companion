import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'


export default function HotelShowPage({ setSearch }) {
  const [hotel, setHotel] = useState({})
  const { hotel_id } = useParams()

  useEffect(() => {
    const getHotel = async () => {
      const options = {
        method: "GET",
        url: "https://booking-com.p.rapidapi.com/v1/hotels/data",
        params: { hotel_id: hotel_id, locale: "en-gb" },
        headers: {
          "X-RapidAPI-Key": "cd61a9c3fcmsh03b40d2dc69de61p1d57efjsnb4b7e3ec281d",
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      };

      const response = await axios.request(options).catch(function (error) {
        console.error(error);
      });
      console.log(response.data);
      setHotel(response.data)
    };
    getHotel()
  }, [])


  return (
    <>
      <img src={hotel.main_photo_url} alt="" />
      <h1>{hotel.name}</h1>
      {hotel.description &&
        <span>{hotel.description_translations[0].description}</span>
      }
      <h3>Review Score: {hotel.review_score}/10: {hotel.review_score_word}</h3>
      <h3>Address:</h3>
      <p>{hotel.address}</p>
      <p>{hotel.city}, {hotel.zip}</p>
    </>
  );
}
