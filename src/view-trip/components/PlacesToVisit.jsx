import PlaceCardItem from "./PlaceCardItem";
/* eslint-disable react/prop-types */
function PlacesToVisit({ trip }) {
  // console.log(trip?.fetchedTripData?.itinerary);
  
  return (
    <div>
      <h2 className="font-bold text-lg my-10">Place to visit</h2>
      <div>
        {trip?.fetchedTripData?.itinerary?.map((item, index) => {
          return (
            <div key={index}>
              <h2 className="font-medium text-lg mt-10">Day {item.day}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {item?.plan?.map((place, indexInner) => {
                  return (
                    <div key={`${index}${indexInner}`} className="my-3">
                      <h2 className="font-medium text-sm text-orange-400 my-2">
                        {place.time}
                      </h2>
                      <PlaceCardItem place={place} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
