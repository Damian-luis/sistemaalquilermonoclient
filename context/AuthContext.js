import { createContext, useContext, useState } from 'react';
import { userService } from '../pages/api';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false)

  const login = async (userData) => {
    setLoading(true);
    try{
      const datauserforcontext=await userService(userData)
      setUser(datauserforcontext)
      setUserData(datauserforcontext.user)
      console.log("aui viene use de contex")
      console.log(datauserforcontext)
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

  const loginAdmin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const datauserforcontext = await adminService(credentials);;
      setIsAdmin(true);
      console.log(isAdmin)
    } catch (e) {
      console.error(e);
      setError(e.message || 'Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user,  isAdmin,loginAdmin,login, logout, loading, error,userData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

