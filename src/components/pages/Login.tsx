import React from "react";
import {
  Avatar,
  Alert,
  Button,
  CssBaseline,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLoginWithGoogle } from "../../hooks/useAuth";

export const Login = () => {
  const { loginWithGoogle, error, success } = useLoginWithGoogle();

  const onClickGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={onClickGoogleLogin}
        >
          googleログイン
        </Button>
      </Box>
      {error && <Alert severity="error">ログインできませんでした</Alert>}
      {success && <Alert severity="success">ログインしました</Alert>}
    </Container>
  );
};
