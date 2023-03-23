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

import { fetchStudent } from "../../api/student";
import { Student } from "@/context/types";

const StudentDetails = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const [student, setStudent] = useState<Student>();

  const fetchTableData = async (id: number) => {
    try {
      const item = await fetchStudent(id);
      if (!item)
        return <Typography variant="h5">Student not found.</Typography>;
      setStudent(item);
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
        {student ? `${student.firstname} ${student.lastname}` : "None"}
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
            <TableRow key={student?.id}>
              <TableCell>{student?.firstname}</TableCell>
              <TableCell>{student?.lastname}</TableCell>
              <TableCell>{student?.age}</TableCell>
              <TableCell>{student?.gender}</TableCell>
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
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentDetails;
