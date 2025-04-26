import { Button } from "@/components/ui/button";
import logo from "../../public/logo.svg"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useContext, useState } from "react";
import { userContext } from "../context-api/context-handler";
// import { useNavigate } from "react-router-dom";

function Header() {
  const {isLoggedIn, setUserLoggedIn} = useContext(userContext);
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const [openDialog, setOpenDialog] = useState(false);
  // const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
  });
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}&loading=async`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        setUserLoggedIn(true);
      });
  };

  const handleSignIn = () => {
    setOpenDialog(true);
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <a href="/">
        {/* <img src="../../public/logo.svg" /> */}
        <img className="h-7 sm:h-10" src="/Logo.png" alt="" />
      </a>
      <div>
        {!isLoggedIn && <Button onClick={handleSignIn}>Sign In</Button>}
        {isLoggedIn && (
          <div className="flex flex-row items-center gap-3">
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">
                Create Trip
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  className="w-[35px] h-[35px] rounded-full"
                  src={user?.picture}
                  alt=""
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    setUserLoggedIn(false);
                    // navigate("/");
                    localStorage.clear();
                    window.location.reload();
                    window.location.replace("/");
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="">
              <img src={logo} />
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

export default Header;
