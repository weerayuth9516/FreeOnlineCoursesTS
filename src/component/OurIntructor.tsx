import teacher1 from "../assets/home/teacher1.png";
import teacher2 from "../assets/home/teacher2.png";
import teacher3 from "../assets/home/teacher3.png";

function OurIntructor() {
  return (
    <div className="flex flex-col items-center mt-[5rem]">
      <div className="mb-[4rem] text-black text-[1.5rem] font-bold">
        Our Professional Intructor
      </div>
      <div className="flex flex-col xl:flex-row items-center gap-x-5">
        <div className="w-[20rem] flex flex-col items-center mb-5">
          <img src={teacher1} />
          <p className="text-black text-[1.2rem] font-bold mt-5">Jane Cooper</p>
          <p className="text-blue-400">UX/UI Designer</p>
        </div>
        <div className="w-[20rem] flex flex-col items-center mb-5">
          <img src={teacher2} />
          <p className="text-black text-[1.2rem] font-bold mt-5">
            Esther Howard
          </p>
          <p className="text-blue-400">Program Manager</p>
        </div>
        <div className="w-[20rem] flex flex-col items-center mb-5">
          <img src={teacher3} />
          <p className="text-black text-[1.2rem] font-bold mt-5">
            Brooklyn Simmons
          </p>
          <p className="text-blue-400">Software Engineer</p>
        </div>
      </div>
    </div>
  );
}

export default OurIntructor;
