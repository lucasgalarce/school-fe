import { useState } from "react";
import Button from "@material-ui/core/Button";

import StudentModal from "./Modal";

interface CreateStudentInterface {
  fetchTableData: () => {};
}
const CreateStudent: React.FC<CreateStudentInterface> = ({
  fetchTableData,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      {showModal && (
        <StudentModal
          handleModal={handleModal}
          open={showModal}
          fetchTableData={fetchTableData}
        />
      )}
      <Button
        onClick={handleModal}
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: "220px", marginTop: 10, marginLeft: 20 }}
      >
        Add student
      </Button>
    </>
  );
};

export default CreateStudent;
