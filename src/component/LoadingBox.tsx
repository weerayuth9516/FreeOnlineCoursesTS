interface CreatingCourseProps {
  courseName: string;
}

export function CreatingCourse({ courseName }: CreatingCourseProps) {
  return (
    <div className="w-screen fixed inset-0 bg-black opacity-90 flex justify-center items-center z-100 ">
      <div className="w-full sm:w-[41rem] xl:w-[41rem] bg-white rounded-3xl shadow-3xl">
        <div className="w-full flex justify-between text-black text-[1.5rem] pl-6 borer-2 border-b-gray-400 mb-4 mt-4 pr-6">
          <p>Loading...</p>
        </div>
        <hr className="w-full border-1 border-gray-500" />
        <div className="w-full pl-6 mb-5 mt-5 text-[1.1rem] text-gray-600">
          Your {courseName} Course is creating. Please don't refesh the page.
        </div>
        <div className="flex justify-center items-center h-24">
          <div className="w-4 h-4 bg-green-500 rounded-full mx-1 animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full mx-1 animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full mx-1 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

export function RegisterLoading() {
  return (
    <div className="w-screen fixed inset-0 bg-black opacity-90 flex justify-center items-center z-100 ">
      <div className="w-full sm:w-[41rem] xl:w-[41rem] bg-white rounded-3xl shadow-3xl">
        <div className="w-full flex justify-between text-black text-[1.5rem] pl-6 borer-2 border-b-gray-400 mb-4 mt-4 pr-6">
          <p>Loading...</p>
        </div>
        <hr className="w-full border-1 border-gray-500" />
        <div className="w-full pl-6 mb-5 mt-5 text-[1.1rem] text-gray-600">
          Hi! Your account is currently being created. Please do not refresh the
          page.
        </div>
        <div className="flex justify-center items-center h-24">
          <div className="w-4 h-4 bg-green-500 rounded-full mx-1 animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full mx-1 animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full mx-1 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

export function ProfileLoading() {
  return (
    <div className="w-screen fixed inset-0 bg-black opacity-90 flex justify-center items-center z-100 ">
      <div className="w-full sm:w-[41rem] xl:w-[41rem] bg-white rounded-3xl shadow-3xl">
        <div className="w-full flex justify-between text-black text-[1.5rem] pl-6 borer-2 border-b-gray-400 mb-4 mt-4 pr-6">
          <p>Loading...</p>
        </div>
        <hr className="w-full border-1 border-gray-500" />
        <div className="w-full pl-6 mb-5 mt-5 text-[1.1rem] text-gray-600">
          Hi! Your profile is currently being updated. Please do not refresh the
          page.
        </div>
        <div className="flex justify-center items-center h-24">
          <div className="w-4 h-4 bg-green-500 rounded-full mx-1 animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full mx-1 animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full mx-1 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
