// import { IoLocationSharp } from "react-icons/io5";
// import { FaMapLocationDot } from "react-icons/fa6";
// import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";

/* eslint-disable react/prop-types */
function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  const getPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };

    await GetPlaceDetails(data).then((resp) => {
      const photoUrlTemp = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );

      setPhotoUrl(photoUrlTemp);
    });
  };

  useEffect(() => {
    place && getPlacePhoto();
  }, [place]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}&loading=async`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all shadow-md border rounded-xl p-3 flex flex-col md:flex-row gap-5">
        <img
          className="w-[130px] h-[130px] rounded-xl object-cover"
          src={photoUrl ? photoUrl : "../../../public/road-trip-vacation.jpg"}
          // src="../../../public/road-trip-vacation.jpg"
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
