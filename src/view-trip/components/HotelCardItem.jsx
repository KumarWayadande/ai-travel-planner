/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";
import { useEffect, useState } from "react";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  const getPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
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
    hotel && getPlacePhoto();
  }, [hotel]);

  return (
    <Link
      target="_blank"
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName} ${hotel.hotelAddress}&loading=async`}
    >
      <div className="cursor-pointer hover:scale-110 transition-all">
        <img
          className="rounded-xl h-[170px] w-full object-cover"
          src={photoUrl ? photoUrl : "../../../public/road-trip-vacation.jpg"}
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
