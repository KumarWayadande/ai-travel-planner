/* eslint-disable react/prop-types */
import HotelCardItem from "./HotelCardItem";
function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl my-5">Hotels Recommendation</h2>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {trip?.fetchedTripData?.hotelOptions.map((hotel, index) => {
          return <HotelCardItem key={index} hotel={hotel} />;
        })}
      </div>
    </div>
  );
}

export default Hotels;
