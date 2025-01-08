/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl my-5">Hotels Recommendation</h2>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {trip?.fetchedTripData?.hotelOptions.map((hotel, index) => {
          return (
            <Link
              key={index}
              target="_blank"
              to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName} ${hotel.hotelAddress}`}
            >
              <div className="cursor-pointer hover:scale-110 transition-all">
                <img
                  className="rounded-xl"
                  // src={hotel.hotelImageUrl}
                  src="../../../public/road-trip-vacation.jpg"
                  alt=""
                />

                <div className="my-2">
                  <h2 className="font-medium ">{hotel.hotelName}</h2>
                  <h2 className="text-xs text-gray-500">
                    📍{hotel.hotelAddress}
                  </h2>
                  <h2 className="text-sm">💰{hotel.price}</h2>
                  <h2 className="text-sm">⭐{hotel.rating}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;