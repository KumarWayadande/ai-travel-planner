import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../service/firebaseConfig";
function MyTrips() {
  const navigate = useNavigate();

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
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };

  return <div>My trips</div>;
}

export default MyTrips;
