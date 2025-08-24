import { useState } from "react";
import { signUp, confirmSignUp } from "aws-amplify/auth";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import { SignUpStep } from "./SignUpPage.types";
import { AuthPageWrapper, AuthForm } from "./SignUpPage.styles";
import { useTranslation } from "react-i18next";

export default function SignUpPage() {
  const [step, setStep] = useState<SignUpStep>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const createTitle = t("signUpPage.createTitle");
  const confirmTitle = t("signUpPage.confirmTitle");
  const nameLabel = t("signUpPage.nameLabel");
  const emailLabel = t("signUpPage.emailLabel");
  const passwordLabel = t("signUpPage.passwordLabel");
  const SignupButtonText = t("signUpPage.buttonText");
  const loadingButtonText = t("signUpPage.loadingButtonText");
  const loginPrompt = t("signUpPage.loginPrompt");
  const confirmationMessage = t("signUpPage.confirmationMessage", { email });
  const confirmationCodeLabel = t("signUpPage.confirmationCodeLabel");
  const confirmButtonText = t("signUpPage.confirmButtonText");
  const confirmingButtonText = t("signUpPage.confirmingButtonText");
  const successMessage = t("signUpPage.successMessage");

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
      alert(successMessage);
      navigate("/login");
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
          {step === 1 ? createTitle : confirmTitle}
        </Typography>

        {step === 1 && (
          <AuthForm onSubmit={handleSignUp}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label={nameLabel}
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
              label={emailLabel}
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
              label={passwordLabel}
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
              {loading ? loadingButtonText : SignupButtonText}
            </Button>
            <Typography variant="body2" align="center">
              <Link to="/login">{loginPrompt}</Link>
            </Typography>
          </AuthForm>
        )}

        {step === 2 && (
          <AuthForm onSubmit={handleConfirmSignUp}>
            <Typography sx={{ textAlign: "center", mb: 2 }}>
              {confirmationMessage}
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmationCode"
              label={confirmationCodeLabel}
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
              {loading ? confirmingButtonText : confirmButtonText}
            </Button>
          </AuthForm>
        )}
      </AuthPageWrapper>
    </Container>
  );
}
