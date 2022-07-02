export default function HotelListCard({ hotel }) {
  return (
    <div>
      <h2>{hotel.hotel_name}</h2>
      <h3>Review Score: {hotel.review_score}</h3>
      <img src={hotel.main_photo_url} alt="" />
    </div>
  );
}
