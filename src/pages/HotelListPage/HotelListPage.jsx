import HotelListCard from "../../components/HotelListCard/HotelListCard";
import Map from "../../components/Map/Map";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HotelsListPage() {
  const { state } = useLocation();
  // console.log(state);
  const { searchResult, checkIn, checkOut, coordinates } = state;

  const [markers, setMarkers] = useState([])


  useEffect(() => {
    (() => {
      //When page renders, create an array of all of the lat/lon for each hotel
      //Then set the state of markers to that new array
      const filteredMarkers = searchResult.map(hotel => {
        return { lat: hotel.latitude, lng: hotel.longitude }
      })
      setMarkers(filteredMarkers)
    })()
  }, [])

  const getMarkers = () => {
    console.log(searchResult)
    searchResult.map(hotel =>
      setMarkers([...markers, { lat: hotel.latitude, lng: hotel.longitude }])
    )
  }


  return (
    <>
      <h1 onClick={getMarkers}>Hotels List Page</h1>
      <Map
        lat={coordinates.lat}
        lng={coordinates.lng}
        markers={markers}
      />
      <div>
        {searchResult.map((hotel) => {
          return (
            <HotelListCard
              hotel={hotel}
              key={hotel.hotel_id}
              checkIn={checkIn}
              checkOut={checkOut}
            />
          );
        })}
      </div>
    </>
  );
}
