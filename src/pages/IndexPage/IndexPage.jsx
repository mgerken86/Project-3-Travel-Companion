// import { LoadScript } from '@react-google-maps/api';

import {
  Wrapper,
  Status,
} from '@googlemaps/react-wrapper'
import Map from "../../components/Map/Map";
import FavoritePlaces from "../../components/FavoritePlaces/FavoritePlaces";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// const render = (status: Status) => {
//   return <h1>{status}</h1>;
// };

export default function IndexPage() {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: GOOGLE_API_KEY,
  //   libraries: ["places"],
  // });

  // if (!isLoaded) return <div>Loading...</div>

  return (
    <div>
      {/* <FavoritePlaces /> */}
      <Wrapper apiKey={GOOGLE_API_KEY} >
        <Map />
      </Wrapper>
    </div>
  );
}
