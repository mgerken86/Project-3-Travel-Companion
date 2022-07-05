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
      console.log(searchResult)
      //When page renders, create an array of all of the lat/lon for each hotel
      //Then set the state of markers to that new array
      const filteredMarkers = searchResult.map(hotel => {
        return {
          name: hotel.hotel_name,
          lat: hotel.latitude,
          lng: hotel.longitude
        }
      })
      setMarkers(filteredMarkers)
    })()
  }, [])



  return (
    <>
      <h1>Hotels List Page</h1>
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
