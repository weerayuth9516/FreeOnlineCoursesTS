import courseLessons from "../assets/courses/courseLessons.png";
import courseHours from "../assets/courses/courseHours.png";
import { Link } from "react-router-dom";

interface Course {
  course_id: string;
  cover_image: string;
  course_title: string;
  course_summary: string;
  video_lessons: string;
  video_hours: number;
}

interface DisplayCoursesProps {
  courses: Course[] | null;
  sendDataBack?: (data: boolean) => void;
}

function DisplayCourses({ courses, sendDataBack }: DisplayCoursesProps) {
  return (
    <>
      {courses !== null
        ? courses.map((item: Course) => {
            return (
              <Link
                key={item.course_id}
                to={`/coursedetail/${item.course_id}`}
                onClick={() => {
                  sendDataBack?.(true);
                }}
              >
                <div className="relative w-[21rem] h-[30rem] border-2 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
                  <div className="w-full">
                    <img
                      src={item.cover_image}
                      className="w-full h-[13rem] object-cover rounded-lg"
                    />
                  </div>
                  <div className="text-orange-500 pl-2 mt-4">Course</div>
                  <div className="mb-1 font-bold text-[1.5rem] p-2 pb-1">
                    {item.course_title}
                  </div>
                  <div className="mt-1 p-2 pt-1">
                    {item.course_summary.length > 80
                      ? `${item.course_summary.slice(0, 80)}...`
                      : item.course_summary}
                  </div>
                  <div className="absolute w-full h-[3rem] bottom-0 left-0 text-[1rem] p-2 text-gray-500 border-t-2 border-t-gray-200">
                    <div className="inline">
                      <img src={courseLessons} className="inline" />
                      <div className="inline ml-2">
                        {item.video_lessons.length} Lessons
                      </div>
                    </div>
                    <div className="inline ml-5">
                      <img src={courseHours} className="inline" />
                      <div className="inline ml-2">
                        {item.video_hours} Hours
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        : null}
    </>
  );
}

export default DisplayCourses;
