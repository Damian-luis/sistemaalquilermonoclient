
import { AuthProvider } from '../context/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';



export default function App({ Component, pageProps }) {

  useEffect(() => {
    AOS.init({ duration: 1000 });
}, []);
  return (

    <AuthProvider>
  <Component {...pageProps} />
  </AuthProvider>
  )
  
}
