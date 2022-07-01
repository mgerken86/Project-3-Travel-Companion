import { useEffect, useState } from "react"

const starterData = {
    destination: '',
    checkIn: Date.now(),
    checkOut: Date.now()
}

export default function SearchBar() {
    const [data, setData] = useState(starterData)
    const [search, setSearch] = useState({})

    const changeData = (e) => {
        const newData = {
            ...data,
            [e.target.name]: e.target.value
        }
        setData(newData)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(data)
        setSearch(data)
        setData(starterData)
    }

    return (
        <>
        <form onSubmit={(e) => handleSearch(e)} autoComplete="off" >
            <label>Destination</label>
            <input
                type="text"
                name="destination"
                value={data.destination}
                onChange={changeData}
                required
            />
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
        </form>
        <p>{search.destination}</p>
        <p>{search.checkIn}</p>
        <p>{search.checkOut}</p>
        </>
    )
}