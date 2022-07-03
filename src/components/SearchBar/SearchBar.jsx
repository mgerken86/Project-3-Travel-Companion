import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";
import './SearchBar.css'

const starterData = {
  destination: "",
  checkIn: Date.now(),
  checkOut: Date.now(),
};

export default function SearchBar() {
  const [data, setData] = useState(starterData);
  const [autocomplete, setAutocomplete] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const navigate = useNavigate();
  const onLoad = (autoC) => setAutocomplete(autoC);

  //   convert destination to lat lng
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    const city = autocomplete.getPlace().formatted_address;

    setData({ ...data, destination: city });
    setCoordinates({ lat, lng });
  };

  //   function handle change
  const changeData = (e) => {
    const newData = {
      ...data,
      [e.target.name]: e.target.value,
    };

    setData(newData);
  };

  //   function handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    // use booking api
    const options = {
      method: "GET",
      url: "https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates",
      params: {
        order_by: "popularity",
        adults_number: "2",
        units: "metric",
        room_number: "2",
        checkout_date: data.checkOut,
        filter_by_currency: "USD",
        locale: "en-gb",
        checkin_date: data.checkIn,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        // children_ages: "5,0",
        categories_filter_ids: "class::2,class::4,free_cancellation::1",
        page_number: "0",
        include_adjacency: "true",
      },
      headers: {
        "X-RapidAPI-Key": "cd61a9c3fcmsh03b40d2dc69de61p1d57efjsnb4b7e3ec281d",
        "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
      },
    };

    const response = await axios.request(options).catch(function (error) {
      console.error(error);
    });
    const hotels = response.data.result;
    setData(starterData);
    // navigate to hotels page and pass state { searchResult: hotels } to HotelListPage
    navigate("/hotels", { state: { searchResult: hotels } });
  };

  return (
    <>
      <form onSubmit={async (e) => handleSearch(e)} autoComplete="off">
        <div className="flex-row">
          <label>Destination</label>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              name="destination"
              value={data.destination}
              onChange={changeData}
              required
            />
          </Autocomplete>
          <label>Check In</label>
          <input
            type="date"
            name="checkIn"
            value={data.checkIn}
            onChange={changeData}
            required
          />
          <label>Check Out</label>
          <input
            type="date"
            name="checkOut"
            value={data.checkOut}
            onChange={changeData}
            required
          />
          <button type="submit">Search</button>
        </div>
      </form>
    </>
  );
}
