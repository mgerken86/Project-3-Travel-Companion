import "./ShowPageSearchBar.css";
import { useState } from "react";
import fetchApi from "../../utilities/fetchApi";

export default function ShowPageSearchBar({
  checkIn,
  checkOut,
  numberOfPerson,
  hotel_id,
  setRoomPhoto,
  setRooms,
}) {
  // console.log(searchMarkers)
  const starterData = {
    destination: "",
    checkIn: checkIn,
    checkOut: checkOut,
    numberOfAdult: numberOfPerson,
  };
  const [data, setData] = useState(starterData);

  const changeData = (e) => {
    const newData = {
      ...data,
      [e.target.name]: e.target.value,
    };
    setData(newData);
  };

  return (
    <>
      <div className="flex-row">
        <div>
          <label>Check In</label>
          <input
            type="date"
            name="checkIn"
            value={data.checkIn}
            onChange={changeData}
            required
          />
        </div>
        <div>
          <label>Check Out</label>
          <input
            type="date"
            name="checkOut"
            value={data.checkOut}
            onChange={changeData}
            required
          />
        </div>
        <div>
          <label>Number of Person</label>

          <input
            type="number"
            name="numberOfAdult"
            value={data.numberOfAdult}
            onChange={changeData}
            required
          />
        </div>
        {/* onClick function sets the state of the rooms to the new input arguments */}
        <button
          onClick={() =>
            fetchApi.getRoomDetails(
              data.checkIn,
              data.checkOut,
              data.numberOfAdult,
              hotel_id,
              setRoomPhoto,
              setRooms
            )
          }
        >
          Modify Your Search
        </button>
      </div>
    </>
  );
}
