import { useEffect, useState } from "react";
import Clock from "../pages/Clock";
import Grocery1 from "../assets/Grocery1.png";
import Grocery2 from "../assets/Grocery2.png";
import Gallery3 from "../assets/g3.jpg";
import Gallery4 from "../assets/g1.jpg";
import Gallery5 from "../assets/g10.jpg";
import Gallery6 from "../assets/g11.jpg";
import Gallery7 from "../assets/g7.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    title: "We Bring the Store to Your Door",
    description: "NOW! Get 5% Off On Orders Above ₹1000/-",
    image: Gallery6,
    bgColor: "bg-red-800",
    buttonText: "Shop Now",
    buttonColor: "bg-yellow-500",
  },
  {
    title: "Your Daily Needs, Delivered Daily",
    description: "Your daily essentials, delivered daily",
    image: Gallery5,
    // bgColor: "bg-slate-900",
    bgColor: "bg-amber-700",
    buttonText: "Shop Now",
    buttonColor: "bg-red-700",
  },

  {
    title: "Hurry Up! Limited Time Offer",
    description: "Order Quickly To get Extra 5% Off",
    image: Gallery3,
    bgColor: "bg-yellow-600",
    buttonText: "Shop Now",
    buttonColor: "bg-red-700",
  },
  {
    title: "More Than 10k+ Items",
    description: "Get Delivered Straight To Your Home",
    image: Gallery7,
    bgColor: "bg-teal-900",
    buttonText: "Explore Now",
    buttonColor: "bg-red-700",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full sm:max-w-full mx-auto md:px-5 px-2">
      <Carousel className="overflow-hidden relative">
        <CarouselContent
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="w-full flex-shrink-0 py-2 px-1 md:py-0 box-border"
            >
              <div
                className={`flex flex-col-reverse md:flex-row items-center justify-between gap-6 p-6 sm:p-1 md:p-10 rounded-[25px] shadow-lg h-[400px] md:h-[360px] lg:h-[400px] ${slide.bgColor}`}
              >
                {/* Left Side */}
                <div className="md:w-1/2 text-white space-y-3 sm:space-y-4">
                  <h1 className="text-lg md:text-3xl font-bold">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-xl font-light">
                    {slide.description}
                  </p>
                  {/* {index === 3 && (
                    <div className="mt-4">
                      <Clock />
                    </div>
                  )} */}

                  <button
                    className={`mt-4 ${slide.buttonColor} text-white px-5 py-2 sm:px-6 sm:py-3 rounded-full md:text-lg text-base md:font-semibold font-medium`}
                  >
                    {slide.buttonText}
                  </button>
                </div>

                {/* Right Side */}

                <div className="w-full flex justify-center md:justify-end">
                  {slide.image && (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className=" w-[350px] sm:w-[380px] md:w-[480px] h-[220px] lg:h-[350px] rounded-2xl object-cover shadow-md"
                    />
                  )}
                </div>

                {/* <div className="w-full flex justify-center md:justify-end">
                  {slide.image && (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-[200px] sm:w-[280px] md:w-[380px] lg:w-[450px] max-w-full h-auto rounded-lg object-cover"
                    />
                  )}
                </div> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        {/* <CarouselPrevious
          className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black text-white p-2 sm:p-3 rounded-full cursor-pointer"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? slides.length - 1 : prevIndex - 1
            )
          }
        />
        <CarouselNext
          className="absolute right-3 sm:right-5 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black text-white p-2 sm:p-3 rounded-full cursor-pointer"
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
          }
        /> */}
      </Carousel>
    </div>
  );
};

export default HeroSection;
