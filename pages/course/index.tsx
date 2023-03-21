import React, { useCallback, useEffect, useState } from "react";
import CreateCourse from "../../components/course/CreateCourse";
import CourseTable from "../../components/course/CourseTable";
import { fetchCourses } from "@/api/course";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { CourseType } from "@/context/types";
import SearchBar from "@/components/SearchBar";

const CoursePage = () => {
  const [data, setData] = useState<CourseType[]>([]);

  const fetchTableData = useCallback(async (name?: string) => {
    try {
      const items = await fetchCourses(name);
      setData(items);
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      if (error?.response?.data?.message) {
        handleOpenSnackbar({
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  }, []);

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div>
      <CreateCourse fetchTableData={fetchTableData} />
      <SearchBar fetchTableData={fetchTableData} label="Course name" />
      <CourseTable courses={data} />
    </div>
  );
};

export default CoursePage;
function handleOpenSnackbar(arg0: { message: string; type: string }) {
  throw new Error("Function not implemented.");
}
