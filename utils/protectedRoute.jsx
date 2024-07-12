/*import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isAuthVerified, setIsAuthVerified] = useState(false);

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push('/');
        } else {
          setIsAuthVerified(true);
        }
      }
    }, [user, loading, router]);

    if (loading || !isAuthVerified) {
      return <p>Loading...</p>;
    }

    return <Component {...props} />;
  };
}

*/

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user, isAdmin, router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
