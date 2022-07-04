

const ourFavoritePlaces = [
    {
        place: Boulder, Colorado, USA,

    }
]

export default function FavoritePlaces() {

    const handleFavoritePlaces() => {
        randomIndex = Math.floor(Math.random() * ourFavoritePlaces * length)
        randomPlace = ourFavoritePlaces[randomIndex]
    }

    return (
        <div>
            <h1>Need Help Deciding Where to Go?</h1>
             <h2>Click Here To Get Some of Our Favorite Places in the World</h2>
             <button>Random Places</button>
        </div>
    )
}