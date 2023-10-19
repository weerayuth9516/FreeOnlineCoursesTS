import { useState } from "react";
import supabase from "../supabase/client";
import { useParams } from "react-router-dom";

function useLearningPage() {
  const [selectedItem, setSelectedItem] = useState(0);
  const [courses, setCourses] = useState<{ [k: string]: any }>({});
  const [userCourse, setUserCourse] = useState<{ [key: string]: string }>({});
  const [lessons, setLessons] = useState<any[] | null>([]);
  const [powerLevel, setPowerLevel] = useState(0);
  const [lessonIdArray, setLessonIdArray] = useState<any[]>([]);
  const [userId, setUserId] = useState("");
  const [videoStatus, setVideoStatus] = useState<string[]>([]);
  const [currentLesson, setCurrentLesson] = useState<{ [k: string]: any }>({
    videoTitle: "",
    videoId: "",
    videoLessonId: "",
  });

  const params = useParams();

  const goToNextLesson = () => {
    if (lessons !== null) {
      if (selectedItem < lessons.length - 1) {
        setSelectedItem(selectedItem + 1);
        setCurrentLesson({
          videoTitle: lessons[selectedItem + 1].video_lessons.video_title,
          videoId: lessons[selectedItem + 1].video_lessons.video_id,
          videoLessonId:
            lessons[selectedItem + 1].video_lessons.video_lesson_id,
        });
      }
    }
  };

  const goToPreviousLesson = () => {
    if (selectedItem > 0) {
      setSelectedItem(selectedItem - 1);
      if (lessons !== null) {
        setCurrentLesson({
          videoTitle: lessons[selectedItem - 1].video_lessons.video_title,
          videoId: lessons[selectedItem - 1].video_lessons.video_id,
          videoLessonId:
            lessons[selectedItem - 1].video_lessons.video_lesson_id,
        });
      }
    }
  };

  const calculatePowerLevel = () => {
    if (lessons !== null) {
      const totalSublesson = lessons.length;
      const countCompleted = videoStatus.filter(
        (status) => status === "completed"
      ).length;
      if (totalSublesson === 0) {
        setPowerLevel(0);
      } else {
        const percentProgress = Math.floor(
          (countCompleted / totalSublesson) * 100
        );
        setPowerLevel(percentProgress);
      }
    }
  };

  const fetchUserCourse = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("user_courses")
        .select("*")
        .eq("course_id", params.courseId)
        .eq("user_id", userId);
      return data?.[0];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const updateCourseStatus = async () => {
    if (
      userCourse.status === "not_started" &&
      videoStatus.every((status) => status === "not_started")
    ) {
      try {
        const { error } = await supabase
          .from("user_courses")
          .update([
            {
              status: "in_progress",
            },
          ])
          .eq("course_id", params.courseId)
          .eq("user_id", userId)
          .select();
        if (error) {
          console.error("Error:", error.message);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (
      videoStatus.length > 0 &&
      videoStatus.every((status) => status === "completed")
    ) {
      try {
        const { error } = await supabase
          .from("user_courses")
          .update([
            {
              status: "completed",
            },
          ])
          .eq("course_id", params.courseId)
          .eq("user_id", userId)
          .select();
        if (error) {
          console.error("Error:", error.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleTitleClick = (
    videoTitle: string,
    videoId: string,
    videoLessonId: string
  ) => {
    setCurrentLesson({
      videoTitle: videoTitle,
      videoId: videoId,
      videoLessonId: videoLessonId,
    });
    window.scrollTo(0, 0);
  };

  const updateLessonStatusStart = async () => {
    try {
      const { error } = await supabase
        .from("user_lesson_progress")
        .update([
          {
            status: "in_progress",
          },
        ])
        .eq("course_id", params.courseId)
        .eq("user_id", userId)
        .eq("video_lesson_id", currentLesson.videoLessonId)
        .select();
      if (error) {
        console.error("Error:", error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPlay = () => {
    const currentIndex = lessonIdArray.findIndex(
      (item) => item === currentLesson.videoLessonId
    );
    if (currentIndex !== -1) {
      const updatedStatus: string[] = [...videoStatus];
      if (updatedStatus[currentIndex] === "not_started") {
        updatedStatus[currentIndex] = "in_progress";
        setVideoStatus(updatedStatus);
        updateLessonStatusStart();
      }
    }
  };

  const updateLessonStatusEnd = async () => {
    try {
      const { error } = await supabase
        .from("user_lesson_progress")
        .update([
          {
            status: "completed",
          },
        ])
        .eq("course_id", params.courseId)
        .eq("user_id", userId)
        .eq("video_lesson_id", currentLesson.videoLessonId)
        .select();

      if (error) {
        console.error("Error:", error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEnd = () => {
    const currentIndex = lessonIdArray.findIndex(
      (item) => item === currentLesson.videoLessonId
    );
    if (currentIndex !== -1) {
      const updatedStatus: string[] = [...videoStatus];
      if (updatedStatus[currentIndex] === "in_progress") {
        updatedStatus[currentIndex] = "completed";
        setVideoStatus(updatedStatus);
        updateLessonStatusEnd();
      }
    }
  };

  const fetchLessons = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("user_lesson_progress")
        .select(`status,video_lessons(*)`)
        .eq("course_id", params.courseId)
        .eq("user_id", userId)
        .order("created_at", { ascending: true });
      if (data !== null) {
        setVideoStatus(data.map((item) => item.status));
        setLessonIdArray(
          data.map(
            (item: { [k: string]: any }) => item.video_lessons.video_lesson_id
          )
        );
      }
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchCourse = async () => {
    try {
      const { data } = await supabase
        .from("courses")
        .select("*")
        .eq("course_id", params.courseId);
      return data?.[0];
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  return {
    selectedItem,
    setSelectedItem,
    courses,
    setCourses,
    userCourse,
    setUserCourse,
    lessons,
    setLessons,
    powerLevel,
    setPowerLevel,
    lessonIdArray,
    setLessonIdArray,
    userId,
    setUserId,
    videoStatus,
    setVideoStatus,
    currentLesson,
    setCurrentLesson,
    goToNextLesson,
    goToPreviousLesson,
    calculatePowerLevel,
    fetchUserCourse,
    updateCourseStatus,
    handleTitleClick,
    onPlay,
    onEnd,
    fetchLessons,
    fetchCourse,
  };
}
export default useLearningPage;
