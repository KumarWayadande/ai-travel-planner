/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function HotelCardItem({ hotel }) {
  return (
    <Link
      target="_blank"
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName} ${hotel.hotelAddress}`}
    >
      <div className="cursor-pointer hover:scale-110 transition-all">
        <img
          className="rounded-xl"
          // src={hotel.hotelImageUrl}
          src="../../../public/road-trip-vacation.jpg"
        />

        <div className="my-2">
          <h2 className="font-medium ">{hotel.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍{hotel.hotelAddress}</h2>
          <h2 className="text-sm">💰{hotel.price}</h2>
          <h2 className="text-sm">⭐{hotel.rating}</h2>
        </div>
      </div>
    </Link>
);
}

export default HotelCardItem;
