import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HotelShowPage({ setSearch }) {
  const [hotel, setHotel] = useState({});
  const [rooms, setRooms] = useState([]);
  const [description, setDescription] = useState({});
  const [photos, setPhotos] = useState([]);
  const [roomPhoto, setRoomPhoto] = useState([]);
  const [reviews, setReviews] = useState({});

  const { hotel_id } = useParams();
  // get checkin and checkout date from query
  const queryParams = new URLSearchParams(window.location.search);
  const checkIn = queryParams.get("checkin");
  const checkOut = queryParams.get("checkout");

  //any time page re-renders it will get the hotel data
  useEffect(() => {
    const getHotelData = async (url, setState) => {
      const options = {
        method: "GET",
        url: url,
        params: { hotel_id: hotel_id, locale: "en-gb" },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_BOOKING_API_KEY,
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      };

      const response = await axios.request(options).catch(function (error) {
        console.error(error);
      });
      // if (response.data) console.log(response.data);
      setState(response.data);
    };
    // This calls a bunch of different axios urls to get different data and sets state accordingly
    const makeFetchCalls = async () => {
      // the rooms fetch seems deprecated
      // await getHotelData('https://booking-com.p.rapidapi.com/v1/hotels/room-list', setRooms)
      // await getHotelData(
      //   "https://booking-com.p.rapidapi.com/v1/hotels/description",
      //   setDescription
      // );
      await getHotelData(
        "https://booking-com.p.rapidapi.com/v1/hotels/data",
        setHotel
      );
      await getHotelData(
        "https://booking-com.p.rapidapi.com/v1/hotels/photos",
        (data) => {
          // only take first 6 photos
          data = data.slice(0, 6);
          setPhotos(data);
        }
      );
      // reviews fetch also getting 400 status errors
      // await getHotelData('https://booking-com.p.rapidapi.com/v1/hotels/reviews', setReviews)
    };
    makeFetchCalls();

    // get room details
    const getRoomDetails = async () => {
      const options = {
        method: "GET",
        url: "https://booking-com.p.rapidapi.com/v1/hotels/room-list",
        params: {
          checkin_date: checkIn,
          units: "metric",
          checkout_date: checkOut,
          currency: "USD",
          locale: "en-gb",
          adults_number_by_rooms: "3,1",
          hotel_id: hotel_id,
          children_ages: "5,0,9",
          children_number_by_rooms: "2,1",
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_BOOKING_API_KEY,
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      };
      const response = await axios.request(options).catch(function (error) {
        console.error(error);
      });
      const rooms = response.data[0].block.slice(0, 6);
      const room = response.data[0].rooms;
      setRoomPhoto(room);

      console.log("roomInfo", rooms);
      setRooms(rooms);
    };
    getRoomDetails();
  }, []);

  // handle onclick
  const handleClick = () => {};

  return (
    <>
      {/* {photos && <img src={photos[0].url_1440} alt="" />}  */}

      <h1>{hotel.name}</h1>
      {/* <span>{description.description}</span> */}
      <h3>
        Review Score: {hotel.review_score}/10: {hotel.review_score_word}
      </h3>
      <h3>Address:</h3>
      <p>{hotel.address}</p>
      <p>
        {hotel.city}, {hotel.zip}
      </p>
      <div>
        {photos &&
          photos.map((photo) => {
            return <img src={photo.url_1440} />;
          })}
      </div>

      {rooms &&
        rooms.map((room) => {
          return (
            <div>
              <img
                src={roomPhoto[room.room_id].photos[0].url_original}
                alt=""
              />
              <h4>{room.name}</h4>
              <h4>{room.max_occupancy}</h4>
              <h4>
                {room.min_price.currency} {room.min_price.price}
              </h4>
              <button onClick={handleClick}>Select</button>
            </div>
          );
        })}
    </>
  );
}
