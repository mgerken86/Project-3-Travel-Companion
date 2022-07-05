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
    const getMarkers = () => {
      searchResult.map(hotel => {
        setMarkers([...markers, {lat: hotel.latitude, lng: hotel.longitude}])
      })
    }
    getMarkers()
  }, [searchResult])
  // useEffect(() => {
  //   console.log(markers)
  // }, [markers])
  

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
