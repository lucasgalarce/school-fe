import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@material-ui/core";

import { fetchCourse } from "../../api/course";
import { CourseType } from "@/context/types";

const CourseDetails = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const [course, setCourse] = useState<CourseType>();

  const fetchTableData = async (id: number) => {
    try {
      const item = await fetchCourse(id);
      console.log("item ", item);
      if (!item) return <Typography variant="h5">Room not found.</Typography>;
      setCourse(item);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTableData(id);
  }, [id]);

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        {course ? `Course: ${course.name}` : "None"}
      </Typography>
      <TableContainer style={{ paddingLeft: 20, paddingRight: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Firstname</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Siblings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {course?.students?.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.firstname}</TableCell>
                <TableCell>{student.lastname}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>
                  {student?.siblings?.length === 0 ? (
                    <p>None</p>
                  ) : (
                    <ul>
                      {student?.siblings?.map((sibling) => (
                        <li key={sibling.id}>
                          {sibling.firstname} {sibling.lastname}
                        </li>
                      ))}
                    </ul>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CourseDetails;
