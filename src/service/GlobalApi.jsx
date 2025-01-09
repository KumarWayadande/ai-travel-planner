import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": "AIzaSyA3qR3cksJzDU9sb7aMnJpI4xTT_N58JqI",
    // "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};

export const GetPlaceDetails = (data) => {
  // console.log(data);
  return axios.post(BASE_URL, data, config);
};
export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=AIzaSyA3qR3cksJzDU9sb7aMnJpI4xTT_N58JqI`;
