interface BoxProps {
  courseName: string;
  sendDataBack: (data: boolean) => void;
}

export function ConfirmationBox({ courseName, sendDataBack }: BoxProps) {
  return (
    <div className="w-screen fixed inset-0 bg-black opacity-90 flex justify-center items-center z-100 ">
      <div className="w-full sm:w-[41rem] xl:w-[41rem] bg-white rounded-3xl shadow-3xl">
        <div className="w-full flex justify-between text-black text-[1.5rem] pl-6 borer-2 border-b-gray-400 mb-4 mt-4 pr-6">
          <p>Confirmation</p>
          <p
            className="cursor-pointer"
            onClick={() => {
              sendDataBack(false);
            }}
          >
            X
          </p>
        </div>
        <hr className="w-full border-1 border-gray-500" />
        <div className="w-full pl-6 mb-5 mt-5 text-[1.1rem] text-gray-600">
          Do you sure to subscribe {courseName} Course?
        </div>
        <div className="w-full flex justify-center mb-5">
          <button
            onClick={() => {
              sendDataBack(false);
            }}
            className="border-2 border-orange-500 rounded-xl text-orange-500 text-[1.1rem] font-bold ml-2 p-6 pt-5 pb-5"
          >
            No,I don't.
          </button>
          <button
            onClick={() => {
              sendDataBack(true);
            }}
            className="rounded-xl bg-[#2f5fac] text-white text-[1.1rem] font-bold ml-5 mr-2 p-6 pt-5 pb-5"
          >
            Yes,I want to subscribe.
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConfirmationFavorite({ courseName, sendDataBack }: BoxProps) {
  return (
    <div className="w-screen fixed inset-0 bg-black opacity-90 flex justify-center items-center z-100 ">
      <div className="w-full sm:w-[41rem] xl:w-[41rem] bg-white rounded-3xl shadow-3xl">
        <div className="w-full flex justify-between text-black text-[1.5rem] pl-6 borer-2 border-b-gray-400 mb-4 mt-4 pr-6">
          <p>Confirmation</p>
          <p
            className="cursor-pointer"
            onClick={() => {
              sendDataBack(false);
            }}
          >
            X
          </p>
        </div>
        <hr className="w-full border-1 border-gray-500" />
        <div className="w-full pl-6 mb-5 mt-5 text-[1.1rem] text-gray-600">
          Do you sure to add {courseName} Course to your favorites?
        </div>
        <div className="w-full flex justify-center mb-5">
          <button
            onClick={() => {
              sendDataBack(false);
            }}
            className="border-2 border-orange-500 rounded-xl text-orange-500 text-[1.1rem] font-bold ml-2 p-6 pt-5 pb-5"
          >
            No,I don't.
          </button>
          <button
            onClick={() => {
              sendDataBack(true);
            }}
            className="rounded-xl bg-[#2f5fac] text-white text-[1.1rem] font-bold ml-5 mr-2 p-6 pt-5 pb-5"
          >
            Yes,I want to add.
          </button>
        </div>
      </div>
    </div>
  );
}
interface ConfirmationRemoveFavoriteProps {
  courseName: string;
  sendDataBack: (data: boolean) => void;
}
export function ConfirmationRemoveFavorite({
  courseName,
  sendDataBack,
}: ConfirmationRemoveFavoriteProps) {
  return (
    <div className="w-screen fixed inset-0 bg-black opacity-90 flex justify-center items-center z-100 ">
      <div className="w-full sm:w-[41rem] xl:w-[41rem] bg-white rounded-3xl shadow-3xl">
        <div className="w-full flex justify-between text-black text-[1.5rem] pl-6 borer-2 border-b-gray-400 mb-4 mt-4 pr-6">
          <p>Confirmation</p>
          <p
            className="cursor-pointer"
            onClick={() => {
              sendDataBack(false);
            }}
          >
            X
          </p>
        </div>
        <hr className="w-full border-1 border-gray-500" />
        <div className="w-full pl-6 mb-5 mt-5 text-[1.1rem] text-gray-600">
          Do you sure to remove {courseName} Course from your favorites?
        </div>
        <div className="w-full flex justify-center mb-5">
          <button
            onClick={() => {
              sendDataBack(false);
            }}
            className="border-2 border-orange-500 rounded-xl text-orange-500 text-[1.1rem] font-bold ml-2 p-6 pt-5 pb-5"
          >
            No,I don't.
          </button>
          <button
            onClick={() => {
              sendDataBack(true);
            }}
            className="rounded-xl bg-[#2f5fac] text-white text-[1.1rem] font-bold ml-5 mr-2 p-6 pt-5 pb-5"
          >
            Yes,I want to remove.
          </button>
        </div>
      </div>
    </div>
  );
}
