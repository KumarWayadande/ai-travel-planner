import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

import { useGoogleLogin } from "@react-oauth/google";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import from "";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "../constants/options";
import { Button } from "@/components/ui/button";
import { chatSession } from "../service/AIModal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { useFetcher, useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
  });

  const GetUserProfile = async (tokenInfo) => {
    // axios
    //   .get(
    //     `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}&loading=async`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${tokenInfo?.access_token}`,
    //         Accept: "Application/json",
    //       },
    //     }
    //   )
    //   .then((resp) => {
    //     console.log("GetUserProfile callded");
    //     console.log(resp);
    //     if (resp) {
    //       localStorage.setItem("user", JSON.stringify(resp.data));
    //       setOpenDialog(false);
    //       onGenerateTrip();
    //     }
    //   });

    const resp = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}&loading=async`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      }
    );

    console.log(resp);
    if (resp) {
      localStorage.setItem("user", JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    }
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) setOpenDialog(true);

    if (
      formData?.noOfDays > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please make sure you have entered all the details");
      return;
    }

    if (!openDialog) {
      setLoading(true);

      const finalPrompt = AI_PROMPT.replace(
        "{location}",
        formData?.location.label
      )
        .replace("{totalDays}", formData?.noOfDays)
        .replace("{totalDays}", formData?.noOfDays)
        .replace("{traveler}", formData?.traveler)
        .replace("{budget}", formData?.budget);

      const res = await chatSession.sendMessage(finalPrompt);
      setLoading(false);
      saveAITrip(res.response.text());
    }
  };

  
  const saveAITrip = async (tripData) => {
    setLoading(true);
    const tripId = Date.now().toString();
    const userData = JSON.parse(localStorage.getItem("user"));
    await setDoc(doc(db, "AI-Trip-Information", tripId), {
      userSelection: formData,
      fetchedTripData: JSON.parse(tripData),
      userData: userData,
      id: tripId,
    });
    setLoading(false);
    navigate("/view-trip/" + tripId);
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
        <Button disabled={loading} className="mt-10" onClick={onGenerateTrip}>
          {`${loading ? `Loading...` : `Generate Trip`}`}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="">
              <img src="../../public/logo.svg" />
              <h2 className="text-2xl font-bold mt-8">Sign In with Google</h2>
              <h2 className="text-lg">
                Sign In to this app using google authentication securely
              </h2>
              <Button className="mt-6 w-full" onClick={login}>
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
