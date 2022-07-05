import {
  Wrapper,
  Status,
  useLoadScript
} from '@react-google-maps/api'
import Map from "../../components/Map/Map";
import FavoritePlaces from "../../components/FavoritePlaces/FavoritePlaces";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function IndexPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div>
      {/* <FavoritePlaces /> */}
      <Wrapper apiKey={GOOGLE_API_KEY} render={render} >
        <Map />
      </Wrapper>
    </div>
  );
}
