import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
  useTheme,
  Alert,
  Stack,
  Switch,
  styled
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { BsLinkedin } from "react-icons/bs";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {jwtDecode} from 'jwt-decode';
const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 450,       // limit max width
  borderRadius: theme.shape.borderRadius, // nice rounded corners
  boxShadow: theme.shadows[3],  // subtle shadow for depth
  padding: theme.spacing(4),
  background: "rgba(255,255,255,0.95)",
}));

const BackgroundWrapper = styled(Box)({
  minHeight: "100vh",
  background: `linear-gradient(45deg, #2196F3 30%, #21CBF3 90%),
    url("https://i.pinimg.com/736x/e1/96/df/e196df482a0b0d202c70ae5c7164dcc5.jpg")`,
  backgroundBlendMode: "overlay",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px"
});

const SocialButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: "100%",
  borderRadius: "25px",
  textTransform: "none",
  border: "1px solid #e0e0e0"
}));

const LoginPage = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const redirectToRegister = () => {
    navigate('/register'); };
  const redirectToDashboard = () => {
    navigate('/dashboard'); };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const testBackendConnection = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/ping");
    const data = await res.json();
    console.log("Backend response:", data);
    alert(`Success: ${data.message}`); // shows "pong" if working
  } catch (err) {
    console.error("Error connecting to backend:", err);
    alert("Failed to connect to backend.");
  }
};


  const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateEmail(email) || !validatePassword(password)) {
    setError("Please check your email and password");
    return;
  }

  setLoading(true);
  setError(""); // clear previous error

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {  // replace with your backend URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // handle HTTP errors
      const errorData = await response.json();
      setError(errorData.message || "Login failed. Please try again.");
      return;
    }

    const data = await response.json();
    // e.g. data might include user info and JWT token
    console.log("Login success:", data);

    // TODO: Save token (e.g. localStorage), redirect user, etc.
    localStorage.setItem("token", data.token);
    const decodedToken = jwtDecode(data.token);

    const dashboardByRole = {
      employer: '/v2' ,
      jobseeker: '/dashboard'
    };
    navigate(dashboardByRole[decodedToken.role] || '/');


    // Example: redirect or update UI
    // navigate("/dashboard");

  } catch (err) {
    setError("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <BackgroundWrapper>
      <button onClick={testBackendConnection}>Test Backend</button>

        <StyledCard>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Welcome Back
              </Typography>
              <FormControlLabel
                control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
                label="Dark Mode"
              />
            </Box>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={email && !validateEmail(email)}
                helperText={email && !validateEmail(email) ? "Please enter a valid email" : ""}
                InputProps={{
                  "aria-label": "Email Address"
                }}
              />

              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={password && !validatePassword(password)}
                helperText={
                  password && !validatePassword(password)
                    ? "Password must be at least 8 characters long"
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  "aria-label": "Password"
                }}
              />

              <Box sx={{ mt: 2, mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={loading || !validateEmail(email) || !validatePassword(password)}
                sx={{ mb: 2, height: 48, borderRadius: "24px" }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
              </Button>

              <Stack spacing={2}>
                <SocialButton startIcon={<FcGoogle />} variant="outlined">
                  Continue with Google
                </SocialButton>
                <SocialButton
                  startIcon={<BsLinkedin style={{ color: "#0077b5" }} />}
                  variant="outlined"
                >
                  Continue with LinkedIn
                </SocialButton>
              </Stack>

              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, cursor: "pointer", textDecoration: "underline" }}
              >
                Forgot your password?
              </Typography>
              
              <Typography
                variant="body2"
                align="center"
                sx={{ 
                  mt: 1, 
                  cursor: "pointer", 
                  textDecoration: "underline",
                  color: theme.palette.primary.main
                }}
                onClick={redirectToRegister} 
              >
              
                  Don't have an account? <a href="/register">Register here</a>
                

              </Typography>
            </form>
          </CardContent>
        </StyledCard>

        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError("")}>
          <Alert onClose={() => setError("")} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
    </BackgroundWrapper>
  );
};

export default LoginPage;