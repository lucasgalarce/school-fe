import { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { createCourse } from "../../api/course";
import { CreateCourseType } from "../../context/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "500px",
      margin: "auto",
      "& > *": {
        margin: theme.spacing(1),
        width: "100%",
        maxWidth: "500px",
      },
    },
    listItem: {
      background: theme.palette.background.paper,
    },
  })
);

const CreateCourse = () => {
  const router = useRouter();
  const classes = useStyles();
  const [course, setCourse] = useState<CreateCourseType>({ name: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      createCourse({ name: course.name });
      setCourse({ name: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Typography variant="h5" component="h1" align="center">
        Create a new course
      </Typography>
      <TextField
        label="Course name"
        name="name"
        value={course.name}
        onChange={handleInputChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Create course
      </Button>
    </form>
  );
};

export default CreateCourse;
