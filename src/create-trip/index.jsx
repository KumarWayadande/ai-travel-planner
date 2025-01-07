import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import { SelectBudgetOptions } from "../constants/options";
function CreateTrip() {
  const [place, setPlace] = useState();
  console.log(place);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 pb-20">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information and our trip planner will generate a
        customized iltinery based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">Select Your Destination</h2>
          <GooglePlacesAutocomplete
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                console.log(v);
              },
            }}
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days for the trip?
          </h2>
          <Input type="number" placeholder="Ex.3" />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => {
              return (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:shadow-lg"
                >
                  <h1 className="text-4xl">{item.icon}</h1>
                  <h1 className="font-bold text-lg">{item.title}</h1>
                  <h1 className="text-sm text-gray-500">{item.desc}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
