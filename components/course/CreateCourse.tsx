import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { createCourse } from "../../api/course";
import { CreateCourseType } from "../../context/types";
import { Grid } from "@material-ui/core";

interface CreateCourseInterface {
  fetchTableData: () => {};
}
const CreateCourse: React.FC<CreateCourseInterface> = ({ fetchTableData }) => {
  const [course, setCourse] = useState<CreateCourseType>({ name: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createCourse({ name: course.name });
      fetchTableData();
      setCourse({ name: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="center"
      style={{ margin: 10 }}
    >
      <form onSubmit={handleSubmit}>
        <Grid item>
          <Typography variant="h5" component="h1" align="center">
            Create a new course
          </Typography>
        </Grid>
        <Grid item style={{ paddingBottom: 5 }}>
          <TextField
            label="Course name"
            name="name"
            value={course.name}
            onChange={handleInputChange}
            style={{ width: "220px" }}
            required
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: "220px" }}
          >
            Create course
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default CreateCourse;
