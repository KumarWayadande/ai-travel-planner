/* eslint-disable react/prop-types */
function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Place to visit</h2>
      <div>
        {trip.fetchedTripData.itinerary.map((item, index) => {
          return (
            <div key={index}>
              <h2 className="font-medium text-lg">{item.day}</h2>
              {item.plan.map((place, indexInner) => {
                return (
                  <div key={`${index}${indexInner}`}>
                    <h2>{place.placeName}</h2>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
