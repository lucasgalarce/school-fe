import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { CreateStudentType } from "@/context/types";
import { createStudent } from "../../api/student";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalInterface {
  handleModal: () => void;
  open: boolean;
  fetchTableData: (id?: number) => {};
}
const StudentModal: React.FC<ModalInterface> = ({
  handleModal,
  open,
  fetchTableData,
}) => {
  const router = useRouter();
  const id = Number(router.query.id);
  const [student, setStudent] = React.useState<CreateStudentType>({
    firstname: "",
    lastname: "",
    gender: "",
    age: "",
    courseId: id || undefined,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createStudent(student);
      if (id) fetchTableData(id);
      else fetchTableData();
      handleModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container justifyContent="center" alignItems="center">
          <form onSubmit={handleSubmit}>
            <Grid item style={{ marginBottom: 10 }}>
              <Typography variant="h5" component="h1" align="center">
                Add student
              </Typography>
            </Grid>
            <Grid item style={{ paddingBottom: 5 }}>
              <TextField
                label="Student firstname"
                name="firstname"
                value={student.firstname}
                onChange={handleInputChange}
                style={{ width: "220px" }}
                required
              />
            </Grid>
            <Grid item style={{ paddingBottom: 5 }}>
              <TextField
                label="Student lastname"
                name="lastname"
                value={student.lastname}
                onChange={handleInputChange}
                style={{ width: "220px" }}
                required
              />
            </Grid>
            <Grid item style={{ paddingBottom: 5 }}>
              <TextField
                label="Student gender"
                name="gender"
                value={student.gender}
                onChange={handleInputChange}
                style={{ width: "220px" }}
                required
              />
            </Grid>
            <Grid item style={{ paddingBottom: 5 }}>
              <TextField
                label="Student age"
                name="age"
                value={student.age}
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
                Add student
              </Button>
            </Grid>
          </form>
        </Grid>
      </Box>
    </Modal>
  );
};

export default StudentModal;
