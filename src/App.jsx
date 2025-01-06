import "./App.css";
import { Button } from "@/components/ui/button";
function App() {
  return (
    <div className="text-center p-4">
      <div className="first-part">
        <h1 className="text-stone-700 p-4 text-6xl font-black">
          Home Page - Introduction to Javascript and Typescript
        </h1>
        <Button
          onClick={() => alert("Hello World thank you for clicking")}
          className="m-4"
        >
          Logo
        </Button>
      </div>
      <div className="second-part">
        
      </div>
    </div>
  );
}

export default App;
