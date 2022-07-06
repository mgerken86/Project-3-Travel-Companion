import { useEffect, useState } from "react"
import * as tripOrdersAPI from '../../utilities/tripOrders-api'
import TripOrderList from 

export default function AccountPage({ user }) {
    const [tripOrders, setTripOrders] = useState([])

    //Find a user's trip orders when page renders
    useEffect(() => {
        const fetchOrderHistory = async () => {
            const orders = await tripOrdersAPI.getOrderHistory()
            setTripOrders(orders)
        }
        fetchOrderHistory()
    }, [])


    return (
        <>
            <h1>Greetings, {user.name}</h1>
            <h3>Your Previous Trips:</h3>
            <TripOrderList tripOrders={tripOrders} />
            <h3>Edit Your Information</h3>
        </>
    )
}