import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { Courses } from "@/context/types";
import { useRouter } from "next/router";

const CourseTable: React.FC<Courses> = ({ courses }) => {
  const router = useRouter();

  const handleCourseClick = (id: number) => {
    router.push(`/course/${id}`);
  };

  return (
    <TableContainer
      component={Paper}
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      <Table style={{ minWidth: 650 }} aria-label="course table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses &&
            courses.map((course) => (
              <TableRow
                key={course.id}
                hover
                onClick={() => handleCourseClick(course.id)}
              >
                <TableCell component="th" scope="row">
                  {course.id}
                </TableCell>
                <TableCell align="center">{course.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseTable;
