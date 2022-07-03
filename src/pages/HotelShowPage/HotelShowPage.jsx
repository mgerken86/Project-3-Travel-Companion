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
      setHotel(response.data)
    };
  }, [])


  return (
    <>
    <h1>Show Page</h1>
      <h1>{hotel.hotel_name}</h1>
    </>
  );
}
