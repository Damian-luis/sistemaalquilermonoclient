import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <p>This is your dashboard</p>
    </div>
  );
}
