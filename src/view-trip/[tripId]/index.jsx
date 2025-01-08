import { useParams } from "react-router-dom";
import { db } from "../../service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import InfoSection from "../components/InfoSection";
function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState();

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, "AI-Trip-Information", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document!");
      toast("No data found for this trip id");
    }
  };

  return (
    <div className="p-12 md:px-25 lg:px-44 xl:px:56">
    {/* INformation Section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}

      {/* Days Plan for trip */}

      {/* Footer */}
    </div>
  );
}

export default Viewtrip;
