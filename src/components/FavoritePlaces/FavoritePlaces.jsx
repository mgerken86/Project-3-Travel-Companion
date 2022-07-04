const axios = require("axios");

const getRandomHotels = (today, tomorrow, latitude, longitude) => {

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
    latitude: latitude,
    longitude: longitude,
    children_number: '2',
    children_ages: '5,0',
    categories_filter_ids: 'class::2,class::4,free_cancellation::1',
    page_number: '0',
    include_adjacency: 'true'
  },
  headers: {
    'X-RapidAPI-Key': 'b00ef5d09cmsh0fcc399427b9deap187b8djsn0c860bac4d4d',
    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
}


const ourFavoritePlaces = [
    {
        place: 'Boulder, Colorado, USA',
        latitude: '',
        longitude: ''
    }
]

let today = new Date()
let tomorrow =  new Date()
tomorrow.setDate(today.getDate() + 1)

today = today.toISOString().slice(0, 10)
tomorrow = tomorrow.toISOString().slice(0, 10)
console.log(today)
console.log(tomorrow)

export default function FavoritePlaces() {

    const handleFavoritePlaces = () => {
        let randomIndex = Math.floor(Math.random() * ourFavoritePlaces.length)
        let randomPlace = ourFavoritePlaces[randomIndex]
    }

    return (
        <div>
            <h1>Need Help Deciding Where to Go?</h1>
             <h2>Click Here To Get Some of Our Favorite Places in the World</h2>
             <button onClick={handleFavoritePlaces}>Random Places</button>
        </div>
    )
}