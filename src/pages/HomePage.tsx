import { useState, useEffect } from "react";
import NavBar from "../component/NavBar";
import Header from "../component/Header";
import Footer from "../component/Footer";
import SubFooter from "../component/SubFooter";
import slide1 from "../assets/autoSlide/slide1.png";
import slide2 from "../assets/autoSlide/slide2.png";
import OurIntructor from "../component/OurIntructor";

function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [images] = useState(() => {
    const numSlides = 30;
    const images = [];

    for (let i = 0; i < numSlides; i++) {
      if (i % 2 === 0) {
        images.push(slide2);
      } else {
        images.push(slide1);
      }
    }
    return images;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        if (newIndex === images.length - 1) {
          clearInterval(interval);
        }
        return newIndex;
      });
    }, 4000);

    // return () => clearInterval(interval);
  }, []);
  return (
    <>
      <NavBar />
      <div className="w-full flex flex-col items-center overflow-hidden">
        <Header />
        <OurIntructor />
        <div className="w-full flex flex-col justify-center items-center p-2">
          <div className="text-[1.8rem] text-black font-bold mt-5 mb-10">
            Our Graduates
          </div>
          <div className="relative w-full mb-15">
            <div
              className="w-full mb-10 flex transition-transform duration-1000"
              style={{
                transform: `translateX(-${
                  slideIndex * (100 / images.length)
                }%)`,
                width: `${images.length * 100}%`,
              }}
            >
              {images.map((image, index) => (
                <div key={index} className="w-[30%] h-[20rem]">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <SubFooter />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
