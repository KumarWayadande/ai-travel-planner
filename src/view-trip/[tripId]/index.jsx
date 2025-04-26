import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";
function Viewtrip() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [trip, setTrip] = useState();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
      window.location.reload();
    }
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, "AI-Trip-Information", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      toast("No data found for this trip id");
    }
  };

  return (
    <div className="p-12 md:px-25 lg:px-44 xl:px:56">
      {/* INformation Section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}
      <Hotels trip={trip} />

      {/* Days Plan for trip */}
      <PlacesToVisit trip={trip} />
      {/* Footer */}
      <Footer trip={trip} />
    </div>
  );
}

export default Viewtrip;
