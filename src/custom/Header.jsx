import { Button } from "@/components/ui/button";
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
import { useState } from "react";

function Header() {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const [openDialog, setOpenDialog] = useState(false);
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
  });
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
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
      });
  };

  const handleSignIn = () => {
    setOpenDialog(true);
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="../../public/logo.svg" />
      <div>
        {!userData && <Button onClick={handleSignIn}>Sign In</Button>}
        {userData && (
          <div className="flex flex-row items-center gap-3">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>

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
                    localStorage.clear();
                    window.location.reload();
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

export default Header;
