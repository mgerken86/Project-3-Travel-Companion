// import * as usersService from "../../utilities/users-service";
import SearchBar from "../../components/SearchBar/SearchBar";
import HotelListCard from "../../components/HotelListCard/HotelListCard";
import { useLocation } from "react-router-dom";

export default function OrderHisotoryPage() {
  const { state } = useLocation();
  // console.log(state);
  const { searchResult } = state;
  console.log(searchResult);
  return (
    <>
      <h1>Hotels List Page</h1>
      <div>
        {searchResult.map((hotel) => {
          return <HotelListCard hotel={hotel} key={hotel.hotel_id} />;
        })}
      </div>
    </>
  );
}
