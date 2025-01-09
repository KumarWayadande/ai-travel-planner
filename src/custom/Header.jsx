import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";

function Header() {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  const handleSignUp = () => {
    alert("e");
  };
  const handleSignIn = () => {
    alert("e");
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="../../public/logo.svg" />
      <div>
        {!userData && <Button onClick={handleSignIn}>Sign In</Button>}
        {userData && (
          <div className="flex flex-row items-center gap-3">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handleSignUp}
            >
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
    </div>
  );
}

export default Header;
