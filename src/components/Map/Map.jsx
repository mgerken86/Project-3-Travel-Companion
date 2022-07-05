import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import './Map.css'

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


export default function Map({ lat, lng, markers }) {
    console.log(markers)
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_API_KEY,
    });
    if (!isLoaded) return <div>Loading...</div>
    else return <MapContainer
        lat={lat}
        lng={lng}
        markers={markers}
    />

}

function MapContainer({ lat, lng, markers }) {
    const center = { lat: lat, lng: lng }
    return (
        <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
        >
            {/* <Marker position={center} /> */}
            { markers.map((marker, index) => {
                return <MarkerF 
                position={{ lat: marker.lat, lng: marker.lng }} 
                key={index}
                />
            }) }
        </GoogleMap>
    )
}