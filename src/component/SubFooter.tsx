import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/subFooter/background.png";
import teaching from "../assets/subFooter/teaching.png";

function SubFooter() {
  const navigate = useNavigate();
  return (
    <div
      className="w-full bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="w-full flex flex-wrap flex-col xl:flex-row justify-between items-center">
        <div className="relative w-full xl:w-[30rem] h-[12rem] xl:mb-20 ml-[2rem] xl:ml-[10rem]">
          <div>
            <p className="text-[2rem] text-white">Interested in Becoming</p>
            <p className="text-[2rem] text-white">a student?</p>
          </div>
          <button
            onClick={() => {
              navigate("/courses");
            }}
            className="w-[17rem] h-[3rem] text-[1.1rem] text-orange-500 bg-white absolute bottom-0 rounded-lg font-bold"
          >
            Check Out Our Courses
          </button>
        </div>
        <img src={teaching} className="w-[90%] sm:w-[35rem] xl:w-[40rem]" />
      </div>
    </div>
  );
}

export default SubFooter;
