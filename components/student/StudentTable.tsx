import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { Students } from "@/context/types";
import { useRouter } from "next/router";

const StudentTable: React.FC<Students> = ({ students }) => {
  const router = useRouter();

  const handleStudentClick = (id: number) => {
    router.push(`/student/${id}`);
  };

  return (
    <TableContainer
      component={Paper}
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      <Table style={{ minWidth: 650 }} aria-label="student table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Firstname</TableCell>
            <TableCell align="center">Lastname</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students &&
            students.map((student) => (
              <TableRow
                key={student.id}
                hover
                onClick={() => handleStudentClick(student.id)}
              >
                <TableCell component="th" scope="row">
                  {student.id}
                </TableCell>
                <TableCell align="center">{student.firstname}</TableCell>
                <TableCell align="center">{student.lastname}</TableCell>
                <TableCell align="center">{student.gender}</TableCell>
                <TableCell align="center">{student.age}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
