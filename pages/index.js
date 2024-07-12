import { useAuth } from '../context/AuthContext';
import { useState } from "react";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
export default function Home() {
  const { login,loginAdmin } = useAuth();
  const [username, setUsername] = useState('');
  const [usernameAdmin, setUsernameAdmin] = useState('');
  const [passwordAdmin, setPasswordAdmin] = useState('');
  const router = useRouter();
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [openAdmin, setOpenAdmin] = useState(false);

  const handleClickOpenAdmin = () => {
    setOpenAdmin(true);
  };
  const handleClickCloseAdmin = () => {
    setOpenAdmin(false);
  };
  
  const handleSubmitAdmin = async () => {
    try{
      await loginAdmin({
        username:usernameAdmin,
        password:passwordAdmin
      });
      router.push('/dashboard');
      setUsernameAdmin("")
      setPasswordAdmin("")
      handleClickCloseAdmin();
    }
    catch(e){
      console.log(e)
    }
    
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try{
      await login(username);
      router.push('/home');
      handleClose();
    }
    catch(e){
      console.log(e)
    }
    
  };

  return (
    <main style={{
    }}>
      <div style={{
        backgroundColor:"black",height:"70px",
        display:"flex",alignItems:"center",
        justifyContent:"end",
        paddingRigth:"50px"
      }}>
       <Button
      variant="contained"
      style={{color:"wwhite",backgroundColor:"#2e7d32"}}
      startIcon={<PersonIcon />}
      onClick={handleClickOpenAdmin}
    >
      Admin
    </Button>
      </div>
      <div
        style={{
          position: 'relative',
          height: '500px',
          backgroundImage: "url('/cover.jpeg')", 
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          '@media (max-width: 768px)': {
             fontSize: '30px', 
           },
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            zIndex: 1,
          }}
        ></div>
        
        <Typography
          variant="h2"
          component="h2"
          style={{
            zIndex: 2,
            textAlign: 'center',
            fontFamily:"inherit",
            
          }}
        >
          Monoparati CABA
        </Typography>
      </div>

      

      <div style={{
    position: "relative",
    display: "flex",
    width: "100%",
    minHeight: "100vh",
    flexDirection: "column",
    backgroundColor: "#fff",
    overflowX: "hidden",
    fontFamily: "'Work Sans', 'Noto Sans', sans-serif",
  }}>
    <div style={{ display: "flex", height: "100%", flexGrow: 1, flexDirection: "column" }}>
      
      <div style={{
        flex: 1,
        padding: "4rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        backgroundColor: "#f4f5f0",
        borderBottom: "1px solid #e2e2e2",
      }}>
        <h1 style={{
          color: "#181810",
          fontSize: "2.25rem",
          fontWeight: "bold",
          lineHeight: "1.2",
          letterSpacing: "-0.015em",
          maxWidth: "40rem",
        }}>Listos para andar?</h1>
        <p style={{
          color: "#7d7d7d",
          fontSize: "1rem",
          lineHeight: "1.5",
          maxWidth: "40rem",
          marginTop: "0.5rem",
        }}>Encuentra un monopatín disponible cerca de ti y comienza tu viaje en minutos. ¡Es así de sencillo!</p>
      </div>

      <section style={{ padding: '40px', backgroundColor: 'white', textAlign: 'center' }}>
        <div>
          <Typography style={{fontFamily:"Nunito Sans"}} variant="h3" component="h2">
            ¡Alquila tu monopatín eléctrico y conquista la ciudad!
            </Typography>
            <br />
            <Typography style={{fontFamily:"Nunito Sans"}} variant="h5" component="h2">
            <br />
            ¿Por qué elegirnos?
            <br />
            Monopatines modernos y seguros.
            <br />
            App fácil de usar y tarifas accesibles.
            <br />
          </Typography>
        </div>

        <div style={{
          gap:"10px"
        }}>
        <Typography style={{fontFamily:"Nunito Sans"}} variant="h5" component="h2">
        Sin registros, solo con tu DNI
          </Typography>
          
          <Button style={{backgroundColor:"yellow",color:"black",padding:"10px",margin:"50px"}} variant="contained" onClick={handleClickOpen}>
            Ingresa con tu DNI
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: 'form',
              onSubmit: (event) => {
                event.preventDefault();
                handleSubmit();
              },
            }}
          >
            <DialogTitle>DNI</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Solo ingresa con tu número de documento, podrás solicitar, consultar y ver tu historial de alquileres.
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="dni"
                name="dni"
                label="DNI"
                type="text"
                fullWidth
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="error" onClick={handleClose}>Cancelar</Button>
              <Button type="submit" style={{backgroundColor:"yellow",color:"black"}} variant="contained">
              Ingresa
          </Button>
            </DialogActions>
          </Dialog>


          <Dialog
            open={openAdmin}
            onClose={handleClickCloseAdmin}
            PaperProps={{
              component: 'form',
              onSubmit: (event) => {
                event.preventDefault();
                handleSubmitAdmin();
              },
            }}
          >
            <DialogTitle>Admin</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Ingrese usuario y contraseña por favor para acceder
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="dni"
                name="dni"
                label="username"
                type="text"
                fullWidth
                variant="standard"
                value={usernameAdmin}
                onChange={(e) => setUsernameAdmin(e.target.value)}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="dni"
                name="dni"
                label="password"
                type="text"
                fullWidth
                variant="standard"
                value={passwordAdmin}
                onChange={(e) => setPasswordAdmin(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="error" onClick={handleClickCloseAdmin}>Volver</Button>
              <Button type="submit" style={{backgroundColor:"#2e7d32",color:"white"}} variant="contained">
              Ingresar
          </Button>
            </DialogActions>
          </Dialog>



        </div>
      </section>


      <div style={{
        display: "grid",
        gap: "2rem",
        padding: "2rem 1.5rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      }}>
        <article style={{ position: "relative", display: "flex", padding: "2rem", borderRadius: "0.5rem", border: "1px solid #e2e2e2", backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", flexDirection: "column" }}>
          <h2 style={{ color: "#181810", fontSize: "1.5rem", fontWeight: "bold", lineHeight: "1.2", letterSpacing: "-0.015em" }}>Localizar Monopatines</h2>
          <p style={{ color: "#7d7d7d", fontSize: "1rem", lineHeight: "1.5", marginTop: "0.5rem" }}>Encuentra un monopatín cerca de ti usando nuestra aplicación. ¡Es rápido y fácil de usar!</p>
        </article>
        <article style={{ position: "relative", display: "flex", padding: "2rem", borderRadius: "0.5rem", border: "1px solid #e2e2e2", backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", flexDirection: "column" }}>
          <h2 style={{ color: "#181810", fontSize: "1.5rem", fontWeight: "bold", lineHeight: "1.2", letterSpacing: "-0.015em" }}>Escanea para desbloquear</h2>
          <p style={{ color: "#7d7d7d", fontSize: "1rem", lineHeight: "1.5", marginTop: "0.5rem" }}>Usa tu teléfono para escanear el código QR del monopatín y desbloquéalo.</p>
        </article>
        <article style={{ position: "relative", display: "flex", padding: "2rem", borderRadius: "0.5rem", border: "1px solid #e2e2e2", backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", flexDirection: "column" }}>
          <h2 style={{ color: "#181810", fontSize: "1.5rem", fontWeight: "bold", lineHeight: "1.2", letterSpacing: "-0.015em" }}>Disfruta el Viaje</h2>
          <p style={{ color: "#7d7d7d", fontSize: "1rem", lineHeight: "1.5", marginTop: "0.5rem" }}>
          Sube y viaja hacia tu destino. Asegúrate de seguir todas las pautas de seguridad.</p>
        </article>
      </div>
    </div>
  </div>

    </main>
  );
}
