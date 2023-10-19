import { useNavigate } from "react-router-dom";

function ConfirmationEmailAlert() {
  const navigate = useNavigate();
  return (
    <div className="w-screen fixed inset-0 bg-black opacity-90 flex justify-center items-center z-100 ">
      <div className="w-full sm:w-[41rem] xl:w-[41rem] bg-white rounded-3xl shadow-3xl">
        <div className="w-full flex justify-between text-black text-[1.5rem] pl-6 borer-2 border-b-gray-400 mb-4 mt-4 pr-6">
          <p>Email Confirmation</p>
          <p
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            X
          </p>
        </div>
        <hr className="w-full border-1 border-gray-500" />
        <div className="w-full pl-6 mb-5 mt-5 text-[1.1rem] text-gray-600">
          An email has been sent. Please verify your email by clicking the link.
        </div>
        <div className="w-full flex justify-start mb-5 ml-6">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="border-2 border-orange-500 rounded-xl text-orange-500 text-[1.1rem] font-bold ml-2 p-6 pt-5 pb-5"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationEmailAlert;
