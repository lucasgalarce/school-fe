import { Button } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const auth = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <h2 className={styles.container__title}>School-app</h2>
      <div className={styles.container__links}>
        <Link href="/course">
          <Button color="inherit">Courses</Button>
        </Link>
        <Link href="/student">
          <Button color="inherit">Students</Button>
        </Link>

        {auth.user ? (
          <Link href="/login">
            <Button color="inherit" onClick={auth.logout}>
              Admin Logout
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
