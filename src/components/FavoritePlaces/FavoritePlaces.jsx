<<<<<<< HEAD
import { ourFavoritePlaces } from "./ourFavoritePlacesData";
=======
import { useState, useEffect } from 'react';
import { markPlacesArr, jingPlacesArr, tirasPlacesArr } from './ourFavoritePlacesData'
import './FavoritePlaces.css'
>>>>>>> main
const axios = require("axios");
const API_KEY = process.env.REACT_APP_BOOKING_API_KEY

<<<<<<< HEAD
let randomPlace;

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
// This makes the format 'yyyy-mm-dd' for the axios fetch
today = today.toISOString().slice(0, 10);
tomorrow = tomorrow.toISOString().slice(0, 10);
// console.log(today)
// console.log(tomorrow)

export default function FavoritePlaces() {
  const getRandomPlace = () => {
    let randomIndex = Math.floor(Math.random() * ourFavoritePlaces.length);
    return (randomPlace = ourFavoritePlaces[randomIndex]);
  };

  const getRandomHotels = async (checkin, checkout, latitude, longitude) => {
    await getRandomPlace();
    console.log(randomPlace);
    const options = {
      method: "GET",
      url: "https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates",
      params: {
        order_by: "popularity",
        adults_number: "2",
        units: "metric",
        room_number: "1",
        checkout_date: tomorrow,
        filter_by_currency: "AED",
        locale: "en-gb",
        checkin_date: today,
        latitude: randomPlace.latitude,
        longitude: randomPlace.longitude,
        children_number: "2",
        children_ages: "5,0",
        categories_filter_ids: "class::2,class::4,free_cancellation::1",
        page_number: "0",
        include_adjacency: "true",
      },
      headers: {
        "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
        "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
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
    <div>
      <h1>Need Help Deciding Where to Go?</h1>
      <h2>Click Here To Get Some of Our Favorite Places in the World</h2>
      <button onClick={() => getRandomHotels()}>Random Places</button>
    </div>
  );
}
=======
// Using dates one month in the future for checkin / checkout because some destinations were sold out of hotels today
let checkIn = new Date(new Date().setMonth(new Date().getMonth() + 1))
let checkOut = new Date(new Date().setMonth(new Date().getMonth() + 1))
checkOut.setDate(checkIn.getDate() + 1)
// This makes the format 'yyyy-mm-dd' for the axios fetch
checkIn = checkIn.toISOString().slice(0, 10)
checkOut = checkOut.toISOString().slice(0, 10)
// console.log(checkIn)
// console.log(checkOut)


export default function FavoritePlaces() {
    //each person's place will be randomly selected from ourFavoritePlaces.js
    // each person's hotel will be randomly selected after the axios fetch
    const [markPlace, setMarkPlace] = useState({})
    const [jingPlace, setJingPlace] = useState({})
    const [tirasPlace, setTirasPlace] = useState({})
    const [markHotel, setMarkHotel] = useState([])
    const [jingHotel, setJingHotel] = useState([])
    const [tirasHotel, setTirasHotel] = useState([])

    // find a place in each person's favorite places array and set that place to their personPlace state
    const getRandomPlace = (personArr, setState) => {
        let randomIndex = Math.floor(Math.random() * personArr.length)
        let personPlace = personArr[randomIndex]
        setState(personPlace)
    }

    // This function takes each person's randomPlace and uses the coordinates of that place to find hotels there
    const getRandomHotels = (personPlace, setHotel) => {
        const options = {
            method: 'GET',
            url: 'https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates',
            params: {
                order_by: 'popularity',
                adults_number: '2',
                units: 'metric',
                room_number: '1',
                checkout_date: checkOut,
                filter_by_currency: 'USD',
                locale: "en-gb",
                checkin_date: checkIn,
                latitude: personPlace.latitude,
                longitude: personPlace.longitude,
                categories_filter_ids: 'class::2,class::4,free_cancellation::1',
                page_number: '0',
                include_adjacency: 'true'
            },
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            const hotels = response.data.result
            // console.log(hotels)
            const randomHotel = hotels[Math.floor(Math.random() * hotels.length)]
            setHotel(randomHotel)
        }).catch(function (error) {
            console.error(error);
        });
    }
    //when component renders, each person's place is randomly selected
    useEffect(() => {
        getRandomPlace(markPlacesArr, setMarkPlace)
        getRandomPlace(jingPlacesArr, setJingPlace)
        getRandomPlace(tirasPlacesArr, setTirasPlace)
    }, [])
    // whenever the state of a person's place changes, a hotel will be randomly chosen
    useEffect(() => {
        getRandomHotels(markPlace, setMarkHotel)
    }, [markPlace])
    useEffect(() => {
        getRandomHotels(jingPlace, setJingHotel)
    }, [jingPlace])
    useEffect(() => {
        getRandomHotels(tirasPlace, setTirasHotel)
    }, [tirasPlace])

    return (
        <div >
            <h1>Need Help Deciding Where to Go?</h1>
            <h2>Here Are Some of Our Favorite Places in the World</h2>
            <div className='main-container'>
                <div className="favorite-place-container">
                    <h2>Mark's Suggestion:</h2>
                    <h5>{markPlace.place}</h5>
                    <h4>Why He Loves it There:</h4>
                    <span>"{markPlace.testimonial}"</span>
                    <h4>Featured Accomodation:</h4>
                    {/* <button onClick={() => getRandomHotels(markPlace, setMarkHotel)}>
                        Click For Random Hotel
                    </button> */}
                    {/* If there is a hotel ID assigned to a person's hotel state, render the following jsx */}
                    {markHotel.hotel_id && (
                        <div className="hotel-container">
                            <h4>{markHotel.hotel_name}</h4>
                            <img src={markHotel.max_photo_url} alt="" />
                        </div>
                    )}
                </div>
                <div className="favorite-place-container">
                    <h2>Jing's Suggestion:</h2>
                    <h5>{jingPlace.place}</h5>
                    <h4>Why She Loves it There:</h4>
                    <span>"{jingPlace.testimonial}"</span>
                    <h4>Featured Accomodation:</h4>
                    {/* <button onClick={() => { getRandomHotels(jingPlace, setJingHotel) }}>
                        Click For Random Hotel
                    </button> */}
                    {jingHotel.hotel_id && (
                        <div className="hotel-container">
                            <h4>{jingHotel.hotel_name}</h4>
                            <img src={jingHotel.max_photo_url} alt="" />
                        </div>
                    )}
                </div>
                <div className="favorite-place-container">
                    <h2>Tiras's Suggestion:</h2>
                    <h5>{tirasPlace.place}</h5>
                    <h4>Why He Loves it There:</h4>
                    <span>"{tirasPlace.testimonial}"</span>
                    <h4>Featured Accomodation:</h4>
                    {/* <button
                        onClick={() => getRandomHotels(tirasPlace, setTirasHotel)}>
                        Click For Random Hotel
                    </button> */}
                    {tirasHotel.hotel_id && (
                        <div className="hotel-container">
                            <h4>{tirasHotel.hotel_name}</h4>
                            <img src={tirasHotel.max_photo_url} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
>>>>>>> main
