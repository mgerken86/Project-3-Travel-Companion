import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'


export default function HotelShowPage({ setSearch }) {
  const [hotel, setHotel] = useState({})
  const [rooms, setRooms] = useState({})
  const [description, setDescription] = useState({})
  const [photos, setPhotos] = useState([])
  const [reviews, setReviews] = useState({})

  const { hotel_id } = useParams()

  //any time page re-renders it will get the hotel data
  useEffect(() => {
    const getHotelData = async (url, setState) => {
      const options = {
        method: "GET",
        url: url,
        params: { hotel_id: hotel_id, locale: "en-gb" },
        headers: {
          "X-RapidAPI-Key": "cd61a9c3fcmsh03b40d2dc69de61p1d57efjsnb4b7e3ec281d",
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      };

      const response = await axios.request(options).catch(function (error) {
        console.error(error);
      });
      if (response.data) console.log(response.data);
      setState(response.data)
    };
    // This calls a bunch of different axios urls to get different data and sets state accordingly
    const makeFetchCalls = async () => {
      // the rooms fetch seems deprecated
      // await getHotelData('https://booking-com.p.rapidapi.com/v1/hotels/room-list', setRooms)
      await getHotelData('https://booking-com.p.rapidapi.com/v1/hotels/description', setDescription)
      await getHotelData("https://booking-com.p.rapidapi.com/v1/hotels/data", setHotel)
      await getHotelData("https://booking-com.p.rapidapi.com/v1/hotels/photos", setPhotos)
      // reviews fetch also getting 400 status errors
      await getHotelData('https://booking-com.p.rapidapi.com/v1/hotels/reviews', setReviews)
    }
    makeFetchCalls()
  }, [])


  return (
    <>
      <img src={hotel.main_photo_url} alt="" />
      <h1>{hotel.name}</h1>
      <span>{description.description}</span>
      <h3>Review Score: {hotel.review_score}/10: {hotel.review_score_word}</h3>
      <h3>Address:</h3>
      <p>{hotel.address}</p>
      <p>{hotel.city}, {hotel.zip}</p>
      <div>
        {photos.map(photo => {
          return <img src={photo.url_square60} />
        })}
      </div>
    </>
  );
}
