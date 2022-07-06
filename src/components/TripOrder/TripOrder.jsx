import * as ordersAPI from "../../utilities/tripOrders-api"; 
import { useNavigate } from "react-router-dom";

export default function TripOrder({ trip }) {
    // console.log(trip)
    const handleCancelBtn = async (orderId) => {
        // console.log(orderId)
        await ordersAPI.cancelTrip(orderId);
    }
    return (
        <>
        <h2>{trip.hotelName}</h2>
        <h3>{trip.roomName}</h3>
        <img src={trip.hotelPhoto} alt="" />
        <p></p>
        <p>Check-in: {trip.checkIn.slice(0, 10)} </p>
        <p>Check-out: {trip.checkOut.slice(0, 10)}</p>
        <button onClick={() => handleCancelBtn(trip._id)}>Cancel This Trip</button>
        </>
    )
}