import React, { useCallback, useEffect, useState } from "react";
import CreateStudent from "../../components/student/CreateStudent";
import StudentTable from "../../components/student/StudentTable";
import { fetchStudents } from "@/api/student";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { Student } from "@/context/types";
import SearchCourse from "@/components/course/SearchCourse";

const StudentPage = () => {
  const [data, setData] = useState<Student[]>([]);

  const fetchTableData = useCallback(async (name?: string) => {
    try {
      const items = await fetchStudents(name);
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
      <CreateStudent fetchTableData={fetchTableData} />
      <SearchCourse fetchTableData={fetchTableData} />
      <StudentTable students={data} />
    </div>
  );
};

export default StudentPage;
function handleOpenSnackbar(arg0: { message: string; type: string }) {
  throw new Error("Function not implemented.");
}
