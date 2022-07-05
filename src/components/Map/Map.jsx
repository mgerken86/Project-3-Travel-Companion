import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import './Map.css'

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


export default function Map({ lat, lng }) {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_API_KEY,
    });
    if (!isLoaded) return <div>Loading...</div>
    else return <MapContainer lat={lat} lng={lng} />

}

function MapContainer({ lat, lng }) {
    const center = { lat: lat, lng: lng }
    return (
        <GoogleMap
            zoom={8}
            center={center}
            mapContainerClassName="map-container"
        >
            {/* <Marker position={center} /> */}
            <MarkerF position={{ lat: 44, lng: -80 }} />
        </GoogleMap>
    )
}