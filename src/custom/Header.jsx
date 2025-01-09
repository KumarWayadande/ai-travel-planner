import { Button } from "@/components/ui/button";
function Header() {
  const userData = localStorage.getItem("user");
  console.log(JSON.parse(userData));

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
          <div>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handleSignUp}
            >
              My Trips
            </Button>
            <img src={userData.picture} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
