import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import './Map.css'

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


export default function Map() {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_API_KEY,
    });
    if (!isLoaded) return <div>Loading...</div>
     else return <MapContainer />

}

function MapContainer() {
    const center = { lat: 44, lng: -80 }
    return (
        <GoogleMap zoom={5} center={center} mapContainerClassName="map-container">
            {/* <Marker position={center} /> */}
            <MarkerF position={{ lat: 44, lng: -80 }} />
        </GoogleMap>
    )
}