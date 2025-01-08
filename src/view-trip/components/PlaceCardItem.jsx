import { IoLocationSharp } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function PlaceCardItem({ place }) {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}
      target="_blank"
    >
      <div className="shadow-md border rounded-xl p-3 flex flex-col md:flex-row gap-5">
        <img
          className="w-[130px] h-[130px] rounded-xl"
          src="../../../public/road-trip-vacation.jpg"
        />
        <div>
          <h2 className="text-lg font-bold">{place.placeName}</h2>
          <p className="text-sm text-gray-500">{place.placeDetails}</p>
          <h2 className="text-sm my-2">🕙 {place.time}</h2>
          <h2 className="text-sm my-2">🎫 {place.ticketPricing}</h2>
          <h2 className="text-sm">⭐ {place.rating}</h2>
          {/* <div className="flex flex-row mt-5 md:mt-0 md:justify-end cursor-pointer">
            <Button className="h-[30px] bg-orange-500 hover:bg-orange-600 rounded-full w-[10px]">
              <IoLocationSharp height={"5 rem"} />
            </Button>
          </div> */}
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
