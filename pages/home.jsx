import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../utils/protectedRoute';
import { historicalService, getStationsService, reservationService } from './api';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import BalanceInfo from '../componentes/BalanceInfo';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Chip from '@mui/material/Chip';
function Home() {
  const dni = sessionStorage.getItem('dni');
  const { user,userData } = useAuth();
  const [historical, setHistorial] = useState([]);
  const [stations, setStations] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [rentalDate, setRentalDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [openRerservationModal, setOpenReservetionModal] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenReservationModal = () => setOpenReservetionModal(true);
  const handleCloseRerservationModal = () => setOpenReservetionModal(false);
  const fetchHistorical = async () => {
    try {
      const historical = await historicalService(dni);
      const stations = await getStationsService();
      console.log(historical)
        setHistorial(historical);
        setStations(stations);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistorical();
  }, []);

  const handleSelectScooter = (station, scooter) => {
    setSelectedScooter({ station, scooter });
  };

  const handleMakeReservation = async (e) => {
    e.preventDefault();
    const reservationData = {
      station_name:selectedScooter.station.name,
      user_id: user.id,
      user_dni:user?.username,
      scooter_id: selectedScooter.scooter.id,
      location_rental:selectedScooter.scooter.location,
      scooter_identifier:selectedScooter.scooter.identifier,
      rentalDate: rentalDate,
      returnDate: returnDate,
      start_station_id: selectedScooter.station.id,
      end_station_id: null,
      usedMinutes: 0,
      status: 'active',
    };

    try {
      await reservationService(reservationData);
      console.log('Reservation made successfully');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <ProtectedRoute>
        
<div
      style={{
        fontFamily: '"Work Sans", "Noto Sans", sans-serif',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div style={{ flex: '1', display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
          <div style={{ maxWidth: '960px', flex: '1', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
              <div style={{ minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Typography variant="h3" style={{ color: '#111418', fontSize: '32px', fontWeight: 'bold', lineHeight: 'normal' }}>
                  Hola, {user?user:<p>Cargando</p>} !
                </Typography>
                <Typography style={{ color: '#637488', fontSize: '14px', fontWeight: 'normal', lineHeight: 'normal' }}>
                  Listo para un viaje hoy?
                </Typography>
              </div>
              <div style={{ minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <BalanceInfo/>
              </div>
            </div>
            


            {userData && userData.rentedScooterId !== null && (
  <>
    <Typography
      variant="h3"
      style={{
        color: '#111418',
        fontSize: '24px',
        fontWeight: 'bold',
        lineHeight: 'normal',
        letterSpacing: '-0.015em',
        paddingLeft: '10px',
        paddingTop: '20px',
        paddingBottom: '10px',
      }}
    >
      Tu alquiler actual
    </Typography>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#FFFFFF',
        padding: '10px',
        minHeight: '72px',
      }}
    >
      <div
        style={{
          width: '70px',
          height: '70px',
          backgroundSize: 'cover',
          backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/330ad497-9f04-45b9-95d0-462b31fe53ab.png")',
        }}
      ></div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography style={{ color: '#111418', fontSize: '16px', fontWeight: 'medium', lineHeight: 'normal' }}>
          {userData ? userData.rentedScooterId : <p>Cargando</p>}
        </Typography>
        <Typography style={{ color: '#637488', fontSize: '14px', fontWeight: 'normal', lineHeight: 'normal' }}>
          Battery: 50%
        </Typography>
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
      <Button
      onClick={handleOpen}
        style={{
          display: 'flex',
          minWidth: '84px',
          maxWidth: '480px',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: '20px',
          height: '40px',
          padding: '0 20px',
          backgroundColor: '#f8d518',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
          lineHeight: 'normal',
          letterSpacing: '0.015em',
        }}
        variant="contained"
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Realizar entrega</span>
      </Button>
    </div>
  </>
)}




  <Typography
                      variant="h3"
                      style={{
                        color: '#111418',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        lineHeight: 'normal',
                        letterSpacing: '-0.015em',
                        paddingLeft: '10px',
                        paddingTop: '20px',
                        paddingBottom: '10px',
                      }}
                    >
                      Estaciones cercanas
                    </Typography>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(158px, 1fr))', gap: '10px', padding: '10px' }}>
                      {stations.map((station) => (
                        <div key={station.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '10px',alignItems:"center",width:"100px" }}>
                          <AccountBalanceIcon style={{width:"50px",height:"50px"}}/>

                          <Typography
                            style={{
                              color: '#111418',
                              fontSize: '16px',
                              fontWeight: 'medium',
                              lineHeight: 'normal',
                            }}
                          >
                            {station.name}
                            <br />
                            {station.location}
                          </Typography>
                          <div>
                          
                          {userData && userData.rentedScooterId === null && (
  station.scooter.map((scooter) => (
    <Button key={scooter.id} onClick={() => handleSelectScooter(station, scooter)}>
      <Typography
        style={{
          color: '#111418',
          fontSize: '14px',
          fontWeight: 'medium',
          lineHeight: 'normal',
        }}
      >
        <Chip
          label={scooter.identifier}
          color={
            scooter.status === "available"
              ? "success" 
              : "error"
          }
          clickable={scooter.status === "available"} 
          onClick={scooter.status === "available" ? handleOpenReservationModal : null}
        />
      </Typography>
    </Button>
  ))
)}


                          </div>
                        </div>
                      ))}
                    </div>
                  


            




            
                    {historical.length === 0 ? (
        <Typography variant="h3" style={{ color: '#111418', fontSize: '24px', fontWeight: 'bold', lineHeight: 'normal', letterSpacing: '-0.015em', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px' }}>
          No se tienen reservas registradas para este usuario
        </Typography>
      ) : (
        <>
          <Typography variant="h3" style={{ color: '#111418', fontSize: '24px', fontWeight: 'bold', lineHeight: 'normal', letterSpacing: '-0.015em', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px' }}>
            Historial de alquiler
          </Typography>

          {historical.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#FFFFFF',
              padding: '10px',
              minHeight: '72px'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                backgroundSize: 'cover',
                backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/84af32d5-dfd9-4b9a-9314-f4ec8aed86d4.png")`
              }}></div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <Typography style={{
                  color: '#111418',
                  fontSize: '16px',
                  fontWeight: 'medium',
                  lineHeight: 'normal'
                }}>
                  {item.rental.scooter_identifier}
                </Typography>
                <Typography style={{
                  color: '#637488',
                  fontSize: '14px',
                  fontWeight: 'normal',
                  lineHeight: 'normal'
                }}>
                  {item.rental.rentalDate}
                </Typography>
              </div>
            </div>
          ))}
        </>
      )}

          </div>
        </div>
      </div>
    </div>

    
    

    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Realizar devolución?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Debe entregar el rodado a la autoridad compotente. <br/>
            Tenga en cuenta la hora de devolución, cualquier demora se registrará en el sistema.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose} autoFocus>
            Devolver
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openRerservationModal}
        onClose={handleCloseRerservationModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Realizar reserva?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Reservar unidad. <br/>
            Tenga en cuenta la hora de devolución, cualquier demora se registrará en el sistema.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRerservationModal}>Cancelar</Button>
          <Button onClick={handleMakeReservation} autoFocus>
            Reservar
          </Button>
        </DialogActions>
      </Dialog>

      </ProtectedRoute>
    </div>
  );
}

export default Home;

