/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";
import HotelCardItem from "./HotelCardItem";
function Hotels({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  const getPlacePhoto = async (hotelName) => {
    const data = {
      textQuery: trip?.fetchedTripData?.hotelOptions?.label,
    };

    await GetPlaceDetails(data).then((resp) => {
      const photoUrlTemp = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );

      setPhotoUrl(photoUrlTemp);
    });
  };

  // useEffect(() => {
  //   trip && getPlacePhoto();
  // }, [trip]);

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
