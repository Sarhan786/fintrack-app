import { useState } from 'react';
import { signUp } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
// (You will need to add MUI components for a full UI)

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
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
      // On success, you might want to navigate to a "confirm sign up" page
      // or directly to the login page.
      alert('Sign up successful! Please check your email for a verification code.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSignUp}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
