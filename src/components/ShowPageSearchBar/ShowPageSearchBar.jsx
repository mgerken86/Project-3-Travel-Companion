import "./ShowPageSearchBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ShowPageSearchBar({
  checkIn,
  checkOut,
  numberOfPerson,
  hotel_id,
}) {
  const starterData = {
    destination: "",
    checkIn: checkIn,
    checkOut: checkOut,
    numberOfAdult: numberOfPerson,
  };
  const [data, setData] = useState(starterData);
  const navigate = useNavigate();

  //   function handle change
  const changeData = (e) => {
    const newData = {
      ...data,
      [e.target.name]: e.target.value,
    };
    setData(newData);
  };

  //   function handle search
  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   navigate(
  //     `/hotels/${hotel_id}?checkin=${data.checkIn}&checkout=${data.checkOut}&numberOfPerson=${data.numberOfAdult}`,
  //     { replace: true }
  //   );
  // };
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
        <Link
          to={`/hotels/${hotel_id}?checkin=${data.checkIn}&checkout=${data.checkOut}&numberOfPerson=${data.numberOfAdult}`}
          reloadDocument
        >
          <button>Modify Your Search</button>
        </Link>
      </div>
    </>
  );
}
