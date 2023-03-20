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
import { Courses } from "@/context/types";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CourseTable: React.FC<Courses> = ({ courses }) => {
  const classes = useStyles();
  const router = useRouter();

  const handleCourseClick = (id: number) => {
    router.push(`/course/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="course table">
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
