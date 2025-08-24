import { useState } from "react";
import { signIn } from "aws-amplify/auth";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import { AuthPageWrapper, AuthForm } from "./LoginPage.styles";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const welcomeText = t("loginPage.title");
  const emailLabelText = t("loginPage.emailLabel");
  const passwordLabelText = t("loginPage.passwordLabel");
  const loginText = t("loginPage.buttonText");
  const loadingButtonText = t("loginPage.loadingButtonText");
  const signupPrompt = t("loginPage.signupPrompt");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { isSignedIn } = await signIn({ username: email, password });
      if (isSignedIn) {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <AuthPageWrapper>
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
          {welcomeText}
        </Typography>
        <AuthForm onSubmit={handleSignIn}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={emailLabelText}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={passwordLabelText}
            type="password"
            id="password"
            autoComplete="current-password"
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
            {loading ? loadingButtonText : loginText}
          </Button>
          <Typography variant="body2" align="center">
            <Link to="/signup">{signupPrompt}</Link>
          </Typography>
        </AuthForm>
      </AuthPageWrapper>
    </Container>
  );
}
