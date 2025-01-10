import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import LandingPageImg from "../../public/landing.png";
function Hero() {
  return (
    <div className="flex flex-col items-center sm:mx-5 md:mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover your next adventure ti AI :
        </span>{" "}
        Personalized ltineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personalized trip planner and travel curator, creating custom
        places tailored to your interests and budget.
      </p>
      <Link to={"/create-trip"}>
        <Button>Get Started, It&apos; Free!</Button>
      </Link>

      <img src={LandingPageImg} alt="" />
    </div>
  );
}
export default Hero;
