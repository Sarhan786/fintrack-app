import { useState } from "react";
import { signUp, confirmSignUp } from "aws-amplify/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import { SignUpStep } from "./SignUpPage.type";

export default function SignUpPage() {
  const [step, setStep] = useState<SignUpStep>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            given_name: name,
            email: email,
          },
        },
      });
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await confirmSignUp({ username: email, confirmationCode });
      alert("Account confirmed successfully! Please log in.");
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <WalletIcon
          sx={{
            m: 1,
            bgcolor: "primary.main",
            color: "white",
            borderRadius: "50%",
            p: 1,
            fontSize: 40,
          }}
        />
        <Typography component="h1" variant="h5">
          {step === 1 ? "Create Account" : "Confirm Your Email"}
        </Typography>

        {step === 1 && (
          <Box component="form" onSubmit={handleSignUp} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
            <Typography variant="body2" align="center">
              <Link to="/login">Already have an account? Login</Link>
            </Typography>
          </Box>
        )}

        {step === 2 && (
          <Box component="form" onSubmit={handleConfirmSignUp} sx={{ mt: 3 }}>
            <Typography sx={{ textAlign: "center", mb: 2 }}>
              A confirmation code has been sent to {email}.
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmationCode"
              label="Confirmation Code"
              name="confirmationCode"
              autoFocus
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Confirming..." : "Confirm Sign Up"}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
