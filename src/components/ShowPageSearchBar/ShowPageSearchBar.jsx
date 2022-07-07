import "./ShowPageSearchBar.css";
import { useState } from "react";

export default function ShowPageSearchBar({
  checkIn,
  checkOut,
  numberOfPerson,
  hotel_id,
  getRoomDetails
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
        <button onClick={() => getRoomDetails(data.checkIn, data.checkOut, data.numberOfAdult)}>
          Modify Your Search</button>
      </div>
    </>
  );
}
