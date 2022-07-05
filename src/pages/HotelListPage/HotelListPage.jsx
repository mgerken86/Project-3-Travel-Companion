import HotelListCard from "../../components/HotelListCard/HotelListCard";
import Map from "../../components/Map/Map";
import { useLocation } from "react-router-dom";

export default function HotelsListPage() {
  const { state } = useLocation();
  // console.log(state);
  const { searchResult, checkIn, checkOut, coordinates } = state;
  console.log(coordinates);
  return (
    <>
      <h1>Hotels List Page</h1>
      <Map
        lat={coordinates.lat}
        lng={coordinates.lng}
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
