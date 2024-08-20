import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export function useAuthHandlers() {
  const { login, loginAdmin } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (username) => {
    try {
      setLoading(true);
      await login(username);
      router.push('/home');
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleSubmitAdmin = async (usernameAdmin, passwordAdmin) => {
    try {
      setLoading(true);
      await loginAdmin({ username: usernameAdmin, password: passwordAdmin });
      router.push('/dashboard');
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return { handleSubmit, handleSubmitAdmin, loading };
}
