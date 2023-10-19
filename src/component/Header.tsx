import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/header/background1.png";
import desktopImage from "../assets/header/desktopImage.png";
import imageContent1 from "../assets/content/content1.png";
import secureIcon from "../assets/content/secure.png";
import allAges from "../assets/content/allAges.png";

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`w-full h-full xl:h-[700px] bg-cover bg-no-repeat bg-center z-0`}
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="flex flex-col xl:flex-row justify-center items-center mt-[5rem] p-8">
          <div className="xl:w-[40rem] sm:h-[27rem] xl:h-[23rem]">
            <p className="text-[3.8rem] font-bold">Best Free</p>
            <p className="text-[3.8rem] font-bold mb-4">Online Courses</p>
            <p>
              Welcome to Free Online Coureses! The stop platform online learning
              that will help your track progress.
            </p>
            <button
              onClick={() => {
                navigate("/courses");
              }}
              className="w-[12rem] h-[3rem] text-[1rem] rounded-lg bg-[#2f5fac] text-white font-bold mt-10"
            >
              Explore Courses
            </button>
          </div>
          <div>
            <img src={desktopImage} />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-[8rem] mb-5">
        <div className="w-full flex flex-wrap xl:flex-row justify-center sm:gap-x-[2rem] xl:gap-x-[4rem]">
          <div>
            <img
              src={imageContent1}
              className="w-[27rem] rounded-lg mb-10 p-4"
            />
          </div>
          <div className="w-[35rem] h-full p-4">
            <p className="text-[1.8rem] font-bold text-black mb-4">
              Learning experience has been enhanced with new technologies{" "}
            </p>
            <p className="text-[1.3rem] font-bold">
              <img src={secureIcon} className="inline mr-4" />
              Secure & Easy
            </p>
            <p className="ml-[3.2rem]">
              Offering flexibility and security for learners in their own place.
            </p>
            <p className="text-[1.3rem] font-bold mt-4">
              <img src={allAges} className="inline mr-4" />
              Support All Ages
            </p>
            <p className="ml-[3.2rem]">
              Our platform supports learners of all ages, allowing you to track
              your learning and study at your convenience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
