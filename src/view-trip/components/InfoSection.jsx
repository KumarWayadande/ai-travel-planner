/* eslint-disable react/prop-types */
import { PiShareFatFill } from "react-icons/pi";
import { Button } from "../../components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";
import { useEffect, useState } from "react";
function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  
  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    await GetPlaceDetails(data).then((resp) => {
      const photoUrlTemp = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );

    });
  };

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  return (
    <div>
      <img
        src="../../../public/road-trip-vacation.jpg"
        // photoUrl ? photoUrl : `../../../public/road-trip-vacation.jpg`
        className="h-[330px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between flex-col md:flex-row">
        <div className="my-6 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-6 mt-4 flex-col md:flex-row">
            <h2 className="w-fit bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md">
              🗓️ {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="w-fit bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md">
              👩‍👧‍👦 Number of Traveler : {trip?.userSelection?.traveler}
            </h2>
            <h2 className="w-fit bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md">
              💵 {trip?.userSelection?.budget} Budget{" "}
            </h2>
          </div>
        </div>
        <Button>
          <PiShareFatFill />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
