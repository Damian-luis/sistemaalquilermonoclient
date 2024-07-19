import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../utils/protectedRoute';
import { historicalService, getStationsService, reservationService, makeDevolutionScooterService } from './api';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useState, useEffect } from 'react';
import { Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Chip, Select, MenuItem } from '@mui/material';
import BalanceInfo from '../componentes/BalanceInfo';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import notify from "../utils/notify";
import { Toaster } from 'react-hot-toast';
import { userService } from './api';
import {formatDate} from "../utils/time";
import LogoutIcon from '@mui/icons-material/Logout';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CountdownTimer from "../componentes/CountdownTimer"
import {checkPunishment} from "../utils/checkPunishment"
import styles from './home.module.css';
function Home() {
  const [loading, setLoading] = useState(false)
  const { user} = useAuth();
  const [historical, setHistorial] = useState([]);
  const [stations, setStations] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [rentalDate, setRentalDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [openRerservationModal, setOpenReservetionModal] = useState(false);
  const [stationId, setStationId] = useState(false);
  const [userData, setUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenReservationModal = () => setOpenReservetionModal(true);
  const handleCloseRerservationModal = () => setOpenReservetionModal(false);
  const punishmentMessage = checkPunishment(userData);
  const fetchHistorical = async () => {
    try {
      setLoading(true)
      const historical = await historicalService(user);
      const stations = await getStationsService();
      const userData= await userService(user)
        setHistorial(historical);
        setStations(stations);
        setUser(userData.user)
        setLoading(false)
        console.log(historical)
    } catch (error) {
      console.log(error);
      setLoading(false)
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
    setLoading(true)
    const reservationData = {
      station_name:selectedScooter.station.name,
      user_id: user.id,
      user_dni:user,
      scooter_id: selectedScooter.scooter.id,
      location_rental:selectedScooter.scooter.location,
      scooter_identifier:selectedScooter.scooter.identifier,
      rentalDate: rentalDate,
      returnDate: returnDate,
      start_station_id: selectedScooter.station.id,
      end_station_id: null,
      usedMinutes: selectedTime,
      status: 'active',
      isBonusBeingUsed:userData.bonusIsBeingUsed
    };

    try {
      const data=await reservationService(reservationData);
      if(data.status===200){
        notify('success', 'Unidad reservada exitosamente');
        await fetchHistorical();
        setOpenReservetionModal(false)
        setLoading(false)
      }
      else {
        notify('error', 'No se pudo reservar unidad')
        setOpenReservetionModal(false)
        setLoading(false)
      }

    } catch (e) {
      notify('error', 'No se reservar unidad')
      console.log(e);
      setLoading(false)
    }
  };

  const handleMakeDevolution = async (e) => {
    e.preventDefault();

    if (!stationId) {
      setErrorMessage("Este valor es obligatorio")
      return;
    }
    setLoading(true)
    try {
      const devolutionData = {
        ...historical.actualScooter,
        station_name_devolution:stationId ,
      };
      await makeDevolutionScooterService(devolutionData);
      await fetchHistorical();
      notify('success', 'Unidad devuelta exitosamente');
      setOpen(false);
      console.log('Reservation made successfully');
      setLoading(false)
    } catch (e) {
      notify('error', 'No se ha podido procesar la devolución')
      console.log(e);
      setLoading(false)
    }
  };

  const [selectedTime, setSelectedTime] = useState(30);

  const handleChange = (event) => {
    console.log("handleChange event:", event.target.value);
    setSelectedTime(event.target.value);
    console.log("selectedTime after handleChange:", selectedTime);
  };
  

  
  const activateBonus = () => {
    setUser(prevUserData => ({
      ...prevUserData,
      available_minutes:30,
      bonusMinutes:0,
      bonusIsBeingUsed:true
    }));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dni');
    window.location.href = '/';
  };
  return (
    <div>
      <ProtectedRoute>
      <Button variant="contained" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px',backgroundColor:"#2e7d32",borderRadius:"10px" }}>
      <Typography style={{fontSize:"12px"}}>Salir</Typography>
      <LogoutIcon />
    </Button>
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
                  {punishmentMessage && (
        <div className={styles.containerPunishment}>{punishmentMessage}</div>
      )}
                </Typography>
              </div>
              <div style={{ minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <BalanceInfo userData={userData} activateBonus={activateBonus}/>
              </div>
            </div>
            

            



            {userData && userData.rentedScooterId !== null && (
  <div className={styles.containerCenter}>
  <div >
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
          {historical && historical.actualScooter ? (
            <>
              <span>{historical.actualScooter.scooter_identifier}</span>
            </>
          ) : (
            <p>Cargando</p>
          )}
        </Typography>
        <Typography style={{ color: '#637488', fontSize: '14px', fontWeight: 'normal', lineHeight: 'normal' }}>
          Tiempo de alquiler: {historical && historical.actualScooter ? (
            <>
              <span>{historical.actualScooter.usedMinutes}</span> m.
            </>
          ) : (
            <p>Cargando</p>
          )}
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
    </div>


      
 



    {historical.actualScooter && historical.actualScooter.rentalDate && historical.actualScooter.usedMinutes ? (
        <CountdownTimer
          rentalDate={historical.actualScooter.rentalDate}
          durationMinutes={historical.actualScooter.usedMinutes}
        />
      ) : (
        <div>Elige una unidad para empezar.</div>
      )}


    
    </div>
)}







{userData && userData.available_minutes < 30 ? (
  <Typography
    style={{
      color: 'red',
      fontSize: '14px',
      fontWeight: 'bold',
      lineHeight: 'normal',
      marginTop: '10px',
    }}
  >
    Te quedaste sin minutos disponibles
  </Typography> 
) : (
  <div>
    <p>Minutos disponibles: {userData ? userData.available_minutes : 'Cargando...'}</p>
  </div>
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(158px, 1fr))', gap: '10px', paddingTop: '50px' }}>
                      {stations.map((station) => (
                        <div key={station.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '10px',alignItems:"center",width:"100%" }}>
                          <AccountBalanceIcon style={{width:"50px",height:"50px"}}/>

                          <Typography
                            style={{
                              color: '#111418',
                              fontSize: '16px',
                              fontWeight: 'medium',
                              lineHeight: 'normal',
                              textAlign:"center"
                            }}
                          >
                            {station.name}
                            <br />
                            {station.location}
                          </Typography>
                          <div>
                          
                          
                          {userData && userData.rentedScooterId === null && !userData.punishment&& (
  station.scooters.map((scooter) => (
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
            scooter.status === "available" && userData.available_minutes >= 30
              ? "success" 
              : "error"
          }
          clickable={scooter.status === "available" && userData.available_minutes >= 30} 
          onClick={scooter.status === "available" && userData.available_minutes >= 30 ? handleOpenReservationModal : null}
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

          {historical.historical.map(item => (
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
                  {item.scooter_identifier}
                </Typography>
                <Typography style={{
                  color: '#637488',
                  fontSize: '14px',
                  fontWeight: 'normal',
                  lineHeight: 'normal'
                }}>
                  {formatDate(item.rentalDate)}
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
          <DialogContentText id="alert-dialog-description">
            Selecciona la estación en donde devolverás la unidad.
          </DialogContentText>
          {errorMessage}

          
        </DialogContent>
        <Select
              error={!!errorMessage}
              labelId="stationIdLabel"
              id="stationId"
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              fullWidth
            >
              {stations.map((station) => (
                <MenuItem key={station.id} value={station.name}>
                  {station.name}
                </MenuItem>
              ))}
            </Select>
            
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleMakeDevolution} autoFocus>
            Devolver
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster />
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
            Tenga en cuenta el tiempo de devolución, cualquier demora se registrará en el sistema.
          </DialogContentText>
        </DialogContent>
                <Select
          labelId="time-select-label"
          id="time-select"
          value={selectedTime}
          onChange={handleChange}
          label="Tiempo"
        >
          { userData.bonusIsBeingUsed ? (
            [<MenuItem key={30} value={30}>30 minutos</MenuItem>]
          ) : (
            [
              <MenuItem key={30} value={30}>30 minutos</MenuItem>,
              <MenuItem key={60} value={60}>1 hora</MenuItem>,
              <MenuItem key={90} value={90}>1 hora y 30 minutos</MenuItem>,
              <MenuItem key={120} value={120}>2 horas</MenuItem>,
            ] 
          ) }
        </Select>



        <DialogActions>
          <Button onClick={handleCloseRerservationModal}>Cancelar</Button>
          <Button onClick={handleMakeReservation} autoFocus>
            Reservar
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        //onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      </ProtectedRoute>
    </div>
  );
}

export default Home;

