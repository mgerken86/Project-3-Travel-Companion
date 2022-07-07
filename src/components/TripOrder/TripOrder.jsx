import * as ordersAPI from "../../utilities/tripOrders-api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



export default function TripOrder({ trip }) {
    const navigate = useNavigate()

    // let checkInToString = trip.checkIn;
    // let checkOutToString = trip.checkOut;
    // useEffect(() => {

    //     // This makes the format 'yyyy-mm-dd' 
    //     checkInToString = checkInToString.toISOString().slice(0, 10);
    //     checkOutToString = checkOutToString.toISOString().slice(0, 10);
    // }, [])


    console.log(trip)

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
            <button onClick={() => {
                handleCancelBtn(trip._id)
                //This re-renders the component through useNavigate
                navigate(0)
            }}>
                Cancel This Trip
            </button>
            <button onClick={() => {
                // we have to re-format our checkIn and checkOut dates to re-direct to show page
                navigate(
                    // `/hotels/${trip.hotelId}?checkin=${checkIn}&checkout=${checkOut}&numberOfPerson=${trip.numberOfPeople}`
                )
            }}>
                Edit Your Stay at {trip.hotelName}
            </button>
        </>
    )
}