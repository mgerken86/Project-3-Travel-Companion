import { useState, useEffect } from "react";

const axios = require("axios");
const API_KEY = process.env.REACT_APP_BOOKING_API_KEY




export default function FavoritePlaceHotels({ checkIn, checkOut, markPlace }) {
    const [hotels, setHotels] = useState([])

    // This function takes each of our randomPlace and uses the coordinates of that place to find hotels there
    const getRandomHotels = () => {
        const options = {
            method: 'GET',
            url: 'https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates',
            params: {
                order_by: 'popularity',
                adults_number: '2',
                units: 'metric',
                room_number: '1',
                checkout_date: checkOut,
                filter_by_currency: 'AED',
                locale: 'en-gb',
                checkin_date: checkIn,
                latitude: markPlace.latitude,
                longitude: markPlace.longitude,
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
            const hotels = response.data.result
            setHotels(hotels)
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(() => {
        // getRandomHotels()
    }, [])

    return (
        <h1>Hello</h1>
    )
}