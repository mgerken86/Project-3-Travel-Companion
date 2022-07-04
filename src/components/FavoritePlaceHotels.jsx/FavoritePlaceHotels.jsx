const axios = require("axios");
const API_KEY = process.env.REACT_APP_BOOKING_API_KEY


export default function FavoritePlaceHotels() {

// This function takes each of our randomPlace and uses the coordinates of that place to find hotels there
const getRandomHotels = (personPlace, setState) => {
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
        const hotels = response.data.result
        setState(hotels)
    }).catch(function (error) {
        console.error(error);
    });
}

    return (
        <h1>Hello World</h1>
    )
}