import { useState, useEffect } from 'react';
import { markPlacesArr } from './ourFavoritePlacesData'
import { jingPlacesArr } from './ourFavoritePlacesData'
import { tirasPlacesArr } from './ourFavoritePlacesData'
const axios = require("axios");
const API_KEY = process.env.REACT_APP_BOOKING_API_KEY


let today = new Date()
let tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)
// This makes the format 'yyyy-mm-dd' for the axios fetch
today = today.toISOString().slice(0, 10)
tomorrow = tomorrow.toISOString().slice(0, 10)
// console.log(today)
// console.log(tomorrow)


export default function FavoritePlaces() {
    const [markPlace, setMarkPlace] = useState({})
    const [jingPlace, setJingPlace] = useState({})
    const [tirasPlace, setTirasPlace] = useState({})

    const getRandomPlace = (personArr, setState) => {
        let randomIndex = Math.floor(Math.random() * personArr.length)
        setState(personArr[randomIndex])
    }
    useEffect(() => {
        // console.log('apikey:', API_KEY)
        getRandomPlace(markPlacesArr, setMarkPlace)
        getRandomPlace(jingPlacesArr, setJingPlace)
        getRandomPlace(tirasPlacesArr, setTirasPlace)
    }, [])
    
    // This function takes each of our favorite places array, chooses a random place, and then uses the coordinates of that place to find hotels there
    const getRandomHotels = (personPlace) => {
        getRandomPlace(markPlaces)
        const options = {
            method: 'GET',
            url: 'https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates',
            params: {
                order_by: 'popularity',
                adults_number: '2',
                units: 'metric',
                room_number: '1',
                checkout_date: tomorrow,
                filter_by_currency: 'AED',
                locale: 'en-gb',
                checkin_date: today,
                latitude: personPlace.latitude,
                longitude: personPlace.longitude,
                children_number: '2',
                children_ages: '5,0',
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
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <div>
            <h1>Need Help Deciding Where to Go?</h1>
            <h2>Click Here To Get Some of Our Favorite Places in the World</h2>
            <button onClick={() => getRandomHotels(markPlaces)}>
                Random Places
            </button>
        </div>
    )
}