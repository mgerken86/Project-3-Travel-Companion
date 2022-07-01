

export default function SearchBar(){
    
    return (
        <form autoComplete="off" >
          <label>Destination</label>
          <input type="text" name="destination" value={credentials.email} required />
          <label>Check In</label>
          <input type="date" name="checkIn" value={credentials.password} required />
          <label>Check Out</label>
          <input type="date" name="checkOut" value={credentials.password} required />
          <button type="submit">Search</button>
        </form>
    )
}