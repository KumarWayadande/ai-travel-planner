import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../service/firebaseConfig";
import UserTripCard from "./components/UserTripCard";
function MyTrips() {
  const navigate = useNavigate();

  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    getMyTripDetails();
  }, []);

  const getMyTripDetails = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
      return;
    }
    const userDetails = JSON.parse(user);

    const q = query(
      collection(db, "AI-Trip-Information"),
      where("userData.email", "==", userDetails.email)
    );
    setUserTrips([]);
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

    querySnapshot.forEach((doc) => {
      setUserTrips((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <div className='px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72"'>
      <h2 className="font-bold text-3xl mb-10">My Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-3">
        {userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCard trip={trip} key={index} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[200px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default MyTrips;
