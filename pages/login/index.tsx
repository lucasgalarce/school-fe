import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import MuiCard, { CardProps } from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import { yupResolver } from "@hookform/resolvers/yup";

import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

import { FormHelperText } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: 450 },
}));

const defaultValues = {
  email: "",
  password: "",
};

interface FormData {
  email: string;
  password: string;
}

export const loginSchema = yup.object().shape({
  email: yup.string().min(6).required(),
  password: yup.string().min(3).required(),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const auth = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = (data: FormData) => {
    console.log("handleLogin ", data);
    const { email, password } = data;

    auth.login({ email, password });
  };

  return (
    <Box className="content-center">
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{ p: (theme) => `${theme.spacing(13, 7, 6.5)} !important` }}
        >
          <Box
            sx={{
              mb: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <img
              alt={"logo"}
              src={"/images/logo.png"}
              style={{ height: "5em", width: "auto" }}
            /> */}
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{ mb: 1.5, fontWeight: 600, letterSpacing: "0.18px" }}
            >
              Welcome to
            </Typography>
            <Typography variant="body2">Use your email and password</Typography>
          </Box>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleLogin)}
          >
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label="Email"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder="juan.perez@gmail.com"
                  />
                )}
              />
              {errors.email && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="auth-login-password"
                error={Boolean(errors.password)}
              >
                Password
              </InputLabel>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value}
                    onBlur={onBlur}
                    label="Password"
                    onChange={onChange}
                    id="auth-login-password"
                    error={Boolean(errors.password)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: "error.main" }} id="">
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
            <Box
              sx={{
                mb: 4,
                mt: 2,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {/* <Link passHref href="/forgot-password">
                <Typography
                  component={MuiLink}
                  variant="body2"
                  sx={{ color: "secondary.light" }}
                >
                  Forgot your password?
                </Typography>
              </Link> */}
            </Box>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color={"primary"}
              sx={{ mb: 7 }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
