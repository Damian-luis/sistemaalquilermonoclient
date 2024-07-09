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

export default function Home() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const router = useRouter();
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    await login(username);
    router.push('/home');
    handleClose();
  };

  return (
    <main style={{
    }}>
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        whiteSpace: "nowrap",
        borderBottom: "1px solid #f4f5f0",
        padding: "0 10px",
        py: "3px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#181810" }}>
          <div style={{ width: "4rem" }}>
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 style={{
            color: "#181810",
            fontSize: "1.25rem",
            fontWeight: "bold",
            lineHeight: "1.5",
            letterSpacing: "-0.015em",
          }}>Scoot</h2>
        </div>
        <div style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          gap: "8px",
        }}>
          <div style={{ display: "flex", gap: "2px" }}>
            <button style={{
              display: "flex",
              minWidth: "84px",
              maxWidth: "480px",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: "1rem",
              height: "2.5rem",
              padding: "0 1rem",
              backgroundColor: "#e5ff00",
              color: "#181810",
              fontSize: "0.875rem",
              fontWeight: "bold",
              lineHeight: "1.75",
              letterSpacing: "0.015em",
            }}>
              <span style={{ whiteSpace: "nowrap" }}>Log in</span>
            </button>
            <button style={{
              display: "flex",
              maxWidth: "480px",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: "1rem",
              height: "2.5rem",
              backgroundColor: "#f4f5f0",
              color: "#181810",
              gap: "2px",
              fontSize: "0.875rem",
              fontWeight: "bold",
              lineHeight: "1.75",
              letterSpacing: "0.015em",
              minWidth: "0",
              padding: "0 0.625rem",
            }}>
              <div style={{
                color: "#181810",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }} data-icon="Globe" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48ZM206.37,88H170.94a142.39,142.39,0,0,0-14.92-36.45A88.14,88.14,0,0,1,206.37,88ZM100,51.55A142.39,142.39,0,0,0,85.08,88H55.63A88.14,88.14,0,0,1,100,51.55ZM49.63,168H85.08A142.39,142.39,0,0,0,100,204.45,88.14,88.14,0,0,1,55.63,168Zm106.44,36.45A142.39,142.39,0,0,0,170.94,168h29.45A88.14,88.14,0,0,1,155.1,204.45Z"></path>
                </svg>
              </div>
              <span style={{ whiteSpace: "nowrap" }}>EN</span>
            </button>
          </div>
        </div>
      </header>
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
          variant="h1"
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
