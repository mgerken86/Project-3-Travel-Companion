import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function Map() {
    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: GOOGLE_API_KEY,
    //   });
    
    //   if (!isLoaded) return <div>Loading...</div>
    //   return <Map />
    // UseMemo prevents map from 're-centering' itself if user scrolls around on map
    const center = useMemo(() => ({ lat: 44, lng: -80 }), [])
    return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={{ lat: 44, lng: -80 }} />
    </GoogleMap>
    )
  }