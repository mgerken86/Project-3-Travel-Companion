import { useState, useEffect } from 'react';
import { markPlacesArr, jingPlacesArr, tirasPlacesArr } from './ourFavoritePlacesData'



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
        let personPlace = personArr[randomIndex]
        setState(personPlace)
    }

    useEffect(() => {
        getRandomPlace(markPlacesArr, setMarkPlace)
        getRandomPlace(jingPlacesArr, setJingPlace)
        getRandomPlace(tirasPlacesArr, setTirasPlace)
    }, [])


    return (
        <div>
            <h1>Need Help Deciding Where to Go?</h1>
            <h2>Here Are Some of Our Favorite Places in the World</h2>
            <div className="favorite-place-container">
                <h2>Mark's Suggestion:</h2>
                <h5>{markPlace.place}</h5>
                <h4>Why He Loves it There:</h4>
                <span>"{markPlace.testimonial}"</span>
                <h4>Featured Accomodation:</h4>
                {/* <RandomHotel /> */}
            </div>
            <div className="favorite-place-container">
                <h2>Jing's Suggestion:</h2>
                <h5>{jingPlace.place}</h5>
                <h4>Why He Loves it There:</h4>
                <span>"{jingPlace.testimonial}"</span>
                <h4>Featured Accomodation:</h4>
                {/* <RandomHotel /> */}
            </div>
            <div className="favorite-place-container">
                <h2>Tiras's Suggestion:</h2>
                <h5>{tirasPlace.place}</h5>
                <h4>Why He Loves it There:</h4>
                <span>"{tirasPlace.testimonial}"</span>
                <h4>Featured Accomodation:</h4>
                {/* <RandomHotel /> */}
            </div>
        </div>
    )
}