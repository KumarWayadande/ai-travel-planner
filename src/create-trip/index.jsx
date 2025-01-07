import { useState } from "react";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "../constants/options";
import { Button } from "@/components/ui/button";
import { chatSession } from "../service/AIModal";
function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const onGenerateTrip = async () => {
    if (
      formData?.noOfDays > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please make sure you have entered all the details");
      return;
    }

    const finalPrompt = AI_PROMPT.replace(
      "{location}",
      formData?.location.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    const res = await chatSession.sendMessage(finalPrompt);
    console.log(res.response.text());
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 pb-20">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information and our trip planner will generate a
        customized iltinery based on your preferences 🌴 🏕️
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">Select Your Destination</h2>
          <GooglePlacesAutocomplete
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days for the trip?
          </h2>
          <Input
            min="1"
            type="number"
            placeholder="Ex.3"
            onChange={(e) => {
              handleInputChange("noOfDays", e.target.value);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`p-4 border rounded-lg hover:shadow-lg ${
                    formData.budget === item.title && `shadow-lg border-black`
                  }`}
                  onClick={() => handleInputChange("budget", item.title)}
                >
                  <h1 className="text-4xl">{item.icon}</h1>
                  <h1 className="font-bold text-lg">{item.title}</h1>
                  <h1 className="text-sm text-gray-500">{item.desc}</h1>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan to travel with on your next adventure?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`p-4 border rounded-lg hover:shadow-lg ${
                    formData.traveler === item.people &&
                    `shadow-lg border-black`
                  }`}
                  onClick={() => handleInputChange("traveler", item.people)}
                >
                  <h1 className="text-4xl">{item.icon}</h1>
                  <h1 className="font-bold text-lg">{item.title}</h1>
                  <h1 className="text-sm text-gray-500">{item.desc}</h1>
                  <h1 className="text-sm text-gray-500">{item.people}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <Button className="mt-10" onClick={onGenerateTrip}>
          Generate Trip
        </Button>
      </div>
    </div>
  );
}

export default CreateTrip;
