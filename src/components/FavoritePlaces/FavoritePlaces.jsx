import { ourFavoritePlaces } from './ourFavoritePlacesData'
const axios = require("axios");


let randomPlace

let today = new Date()
let tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)
// This makes the format 'yyyy-mm-dd' for the axios fetch
today = today.toISOString().slice(0, 10)
tomorrow = tomorrow.toISOString().slice(0, 10)
// console.log(today)
// console.log(tomorrow)

export default function FavoritePlaces() {

    const getRandomPlace = () => {
        let randomIndex = Math.floor(Math.random() * ourFavoritePlaces.length)
        return randomPlace = ourFavoritePlaces[randomIndex]
    }

    const getRandomHotels = async (checkin, checkout, latitude, longitude) => {
        await getRandomPlace()
        console.log(randomPlace)
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
                latitude: randomPlace.latitude,
                longitude: randomPlace.longitude,
                children_number: '2',
                children_ages: '5,0',
                categories_filter_ids: 'class::2,class::4,free_cancellation::1',
                page_number: '0',
                include_adjacency: 'true'
            },
            headers: {
                'X-RapidAPI-Key': 'cd61a9c3fcmsh03b40d2dc69de61p1d57efjsnb4b7e3ec281d',
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
            <button onClick={() => getRandomHotels()}>
                Random Places
            </button>
        </div>
    )
}