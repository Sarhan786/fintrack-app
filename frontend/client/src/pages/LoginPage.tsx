import { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
// (You will need to add MUI components for a full UI)

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { isSignedIn } = await signIn({ username: email, password });
      if (isSignedIn) {
        // On success, navigate to the main dashboard
        navigate('/dashboard'); // We will create this page next
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSignIn}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}