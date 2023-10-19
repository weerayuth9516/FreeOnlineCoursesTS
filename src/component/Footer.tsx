import fbIcon from "../assets/footer/fb.png";
import twIcon from "../assets/footer/tw.png";
import igIcon from "../assets/footer/ig.png";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[12rem] bg-[#183056] flex justify-center items-center">
      <div className="w-[90%] flex justify-between items-center text-white">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer text-[1.2rem]"
        >
          Free Online Courses
        </div>
        <div
          onClick={() => {
            navigate("/courses");
          }}
          className="cursor-pointer"
        >
          All Courses
        </div>
        <div className="w-[7rem] flex justify-between items-center">
          <Link to="https://www.facebook.com/" target="_blank">
            <img className="w-[2rem]" src={fbIcon} />
          </Link>
          <Link to="https://twitter.com/" target="_blank">
            <img className="w-[2rem]" src={twIcon} />
          </Link>
          <Link to="https://www.instagram.com/" target="_blank">
            <img className="w-[2rem]" src={igIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
