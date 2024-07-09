import { createContext, useContext, useState } from 'react';
import { userService } from '../pages/api';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
 

  const login = async (userData) => {
    setLoading(true);
    try{
      const datauserforcontext=await userService(userData)
      setUser(datauserforcontext)
      setUserData(datauserforcontext.user)
      
      sessionStorage.setItem('dni', datauserforcontext.user.dni);
    }
    catch(e){
      console.log(e)
    }
    setError(null);
        setUser(userData);
        setLoading(false);

    
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error,userData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

