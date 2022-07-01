import SearchBar from "../../components/SearchBar/SearchBar"

export default function AccountPage({ user }) {
    return (
        <>
            <SearchBar />
            <h1>Greetings, {user.name}</h1>
            <h3>Your Previous Trips:</h3>
            <h3>Edit Your Information</h3>
        </>
    )
}