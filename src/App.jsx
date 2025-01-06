import "./App.css";
import { Button } from "@/components/ui/button";

// import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

function App() {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row w-full md:w-[90%] mx-auto items-center">
      <div className="first-part w-full md:w-1/2">
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
      <div className="second-part w-full md:w-1/2 mx-auto">
        <Carousel orientation="horizontal">
          <CarouselContent>
            <CarouselItem>
              <img src="https://picsum.photos/400/400?random=1" />
            </CarouselItem>
            <CarouselItem>
              <img src="https://picsum.photos/400/400?random=2" />
            </CarouselItem>
            <CarouselItem>
              <img src="https://picsum.photos/400/400?random=3" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default App;
