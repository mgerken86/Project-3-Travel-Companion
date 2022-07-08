import './TripOrder.css'
import * as ordersAPI from "../../utilities/tripOrders-api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

// This function is called for default state of check-in/out. It gives us 'yyyy-mm-dd' format for our fetch call
const getDateString = (date) => {
    let dateString = new Date(date);
    return dateString = dateString.toISOString().slice(0, 10);
}

export default function TripOrder({ trip }) {
    const [rooms, setRooms] = useState([])
    const [roomPhoto, setRoomPhoto] = useState([])
    const [checkIn, setCheckIn] = useState(getDateString(trip.checkIn))
    const [checkOut, setCheckOut] = useState(getDateString(trip.checkOut))
    const [showRooms, setShowRooms] = useState(false)
    const [people, setPeople] = useState(trip.numberOfPeople)
    const navigate = useNavigate()
    const [data, setData] = useState({
        checkIn: checkIn,
        checkOut: checkOut,
        people: people
    })

    console.log('trip in jsx component', trip)

    const getRoomDetails = async (checkIn, checkOut, people, hotelId) => {
        const options = {
            method: "GET",
            url: "https://booking-com.p.rapidapi.com/v1/hotels/room-list",
            params: {
                checkin_date: checkIn,
                units: "metric",
                checkout_date: checkOut,
                currency: "USD",
                locale: "en-gb",
                adults_number_by_rooms: people,
                hotel_id: hotelId,
                // children_ages: "",
                // children_number_by_rooms: "",
            },
            headers: {
                "X-RapidAPI-Key": process.env.REACT_APP_BOOKING_API_KEY,
                "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
            },
        };
        const response = await axios.request(options).catch(function (error) {
            console.error(error);
        });
        const rooms = response.data[0].block.slice(0, 6);
        const room = response.data[0].rooms;

        setRoomPhoto(room);
        setRooms(rooms);
        setCheckIn(checkIn)
        setCheckOut(checkOut)
        setPeople(people)
    };

    // console.log(trip)

    const handleCancelBtn = async (orderId) => {
        // console.log(orderId)
        await ordersAPI.cancelTrip(orderId);
    }
    const handleEdit = async (room) => {
        await setShowRooms(false)
        navigate(0)
        await ordersAPI.updateTrip(
            trip.id,
            room,
            checkIn,
            checkOut,
            people
        )
    }
    const changeData = (e) => {
        const newData = {
          ...data,
          [e.target.name]: e.target.value,
        };
        setData(newData);
      };


    return (
        <div className="tripOrder-container">
            <h2>{trip.hotelName}</h2>
            <h3>{trip.roomName}</h3>
            <img src={trip.hotelPhoto} alt="" />
            <p></p>
            <p>Check-in: {trip.checkIn.slice(0, 10)} Check-out: {trip.checkOut.slice(0, 10)}</p>
            <p>Total Price: {trip.totalPrice}</p>
            <p>Number of Guests: {trip.numberOfPeople}</p>
            <button onClick={() => {
                handleCancelBtn(trip._id)
                //This re-renders the component through useNavigate
                navigate(0)
            }}>
                Cancel This Trip
            </button>
            <h3>Want to Choose a New Room at the Same Hotel?</h3>
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
                    <label>Number of People</label>
                    <input
                        type="number"
                        name="people"
                        value={data.people}
                        onChange={changeData}
                        required
                    />
                </div>
            </div>
            <button onClick={() => {
                getRoomDetails(data.checkIn, data.checkOut, data.people, trip.hotelId)
                setShowRooms(!showRooms)

            }}>
                Edit Your Stay at {trip.hotelName}
            </button>
            {showRooms && <>
                <h3>Select a New Room For Your Reservation</h3>
                {rooms &&
                    rooms.map((room, index) => {
                        return (
                            <div key={index}>
                                <img
                                    src={roomPhoto[room.room_id].photos[0].url_original}
                                    alt=""
                                />
                                <h4>{room.name}</h4>
                                <h4>Max Occupancy: {room.max_occupancy}</h4>
                                <h4>Total Cost: $ {room.price_breakdown.gross_price}</h4>
                                <button onClick={() => { handleEdit(room) }}>
                                    Change to This Room
                                </button>
                            </div>
                        );
                    })}
            </>}
        </div>
    )
}