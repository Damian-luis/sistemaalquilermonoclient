import { useAuth } from '../context/AuthContext';
import React from 'react';
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addStationService } from './api';
import { addScooterToStationService,getStationsService } from './api';
import { Select,MenuItem } from '@mui/material';
import notify from "../utils/notify"
import { Toaster } from 'react-hot-toast';
import { getDashboardInfoService } from './api';
import {formatDate} from "../utils/time";
import RentalChart from '../componentes/RentalChart';
import { Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
export default function Dashboard() {
  const { user } = useAuth();

  const [openModalStation, setOpenModalStation] =useState(false);
  const [openModalScooter, setOpenModalScooter] =useState(false);

  const [stationName, setStationName] = useState('');
  const [stationLocation, setStationLocation] = useState('');
  const [scooterName, setScooterName] = useState('');
  const [stationId, setStationId] = useState('');
  const [adminData, setAdminData] = useState(false);
  const getData = async () => {
    try {
      const data = await  getDashboardInfoService()
        setAdminData(data.user)
        console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClickOpenStation = () => {
    setOpenModalStation(true);
  };

  const handleCloseStation = () => {
    setOpenModalStation(false);
  };
  const handleClickOpenScooter = () => {
    setOpenModalScooter(true);
  };

  const handleCloseScooter = () => {
    setOpenModalScooter(false);
  };


  const handleAddStation = async () => {
    try {
     await addStationService({ 
        name: stationName,
        location:stationLocation
       });
      notify('success', 'Estación agregada exitosamente');
      setStationName("")
      setStationLocation("")
      handleCloseStation();
    } catch (error) {
      notify('error', 'No se ha podido añadir la estación')
      console.error('Error al añadir la estación:', error);
    }
  };
  const handleAddScooter = async () => {
    try {
      const newScooter={
        status:"available",
        station_id:stationId,
        identifier:scooterName
      }
      await addScooterToStationService(newScooter,stationId);
      notify('success', 'Unidad agregada exitosamente');
      handleCloseScooter();
    } catch (error) {
      notify('error', 'No se ha podido agregar la unidad')
      console.error('Error al añadir el monopatín:', error);
    }
  };


  //obtengo las estaciones para dash
  const [stations, setStations] = useState([]);
  const fetchHistorical = async () => {
    try {
      const stations = await getStationsService();
      console.log(stations)
        setStations(stations);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistorical();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('dni');
    window.location.href = '/';
  };
  return (
<>
<Button variant="contained" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px',backgroundColor:"#2e7d32",borderRadius:"10px" }}>
      <Typography style={{fontSize:"12px"}}>Salir</Typography>
      <LogoutIcon />
    </Button>
    <div
    style={{
      position: "relative",
      display: "flex",
      width: "100%",
      minHeight: "100vh",
      flexDirection: "column",
      backgroundColor: "#fcfbf8",
      overflowX: "hidden",
      fontFamily: '"Work Sans", "Noto Sans", sans-serif',
    }}
  >

    <div style={{display:"flex",gap:"15px",alignSelf:"end",paddingTop:"20px"}}>
    <Button variant="contained" color="success" onClick={handleClickOpenStation}>
        Añadir stacion
      </Button>
      <Button variant="contained" color="success" onClick={handleClickOpenScooter}>
        Añadir monopatin
      </Button>
    </div>
    
    <div style={{ display: "flex", height: "100%", flexGrow: 1, flexDirection: "column" }}>
      
      <div style={{ padding: "20px 160px", display: "flex", flex: 1, justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "960px", flex: 1 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", padding: "16px" }}>
            <div style={{ display: "flex", minWidth: "288px", flexDirection: "column", gap: "12px" }}>
              <p style={{ color: "#1c190d", letterSpacing: "light", fontSize: "32px", fontWeight: "bold", lineHeight: "1.25" }}>
                Dashboard
              </p>
              <p style={{ color: "#9c8c49", fontSize: "14px", fontWeight: "normal", lineHeight: "1.5" }}>
                Aqui una vista general de tus reportes y estadisticas.
              </p>
            </div>
          </div>

         

          <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
      padding: "16px",
    }}
  >
    <div
      style={{
        display: "flex",
        minWidth: "158px",
        flex: 1,
        flexDirection: "column",
        gap: "8px",
        borderRadius: "12px",
        padding: "24px",
        backgroundColor: "#f4f1e7",
      }}
    >
      <p style={{ color: "#1c190d", fontSize: "16px", fontWeight: "500", lineHeight: "1.5" }}>Total de alquileres</p>
      <p style={{ color: "#1c190d", fontSize: "24px", fontWeight: "bold", lineHeight: "1.25", letterSpacing: "0" }}>{adminData && adminData.rentals && adminData.rentals.length}</p>
    </div>
    <div
      style={{
        display: "flex",
        minWidth: "158px",
        flex: 1,
        flexDirection: "column",
        gap: "8px",
        borderRadius: "12px",
        padding: "24px",
        backgroundColor: "#f4f1e7",
      }}
    >
      <p style={{ color: "#1c190d", fontSize: "16px", fontWeight: "500", lineHeight: "1.5" }}>Minutos alquilados</p>
      <p style={{ color: "#1c190d", fontSize: "24px", fontWeight: "bold", lineHeight: "1.25", letterSpacing: "0" }}>{adminData && adminData.totalRentedMinutes}</p>
    </div>
    <div
      style={{
        display: "flex",
        minWidth: "158px",
        flex: 1,
        flexDirection: "column",
        gap: "8px",
        borderRadius: "12px",
        padding: "24px",
        backgroundColor: "#f4f1e7",
      }}
    >
      <p style={{ color: "#1c190d", fontSize: "16px", fontWeight: "500", lineHeight: "1.5" }}>Alquileres por dia</p>
      <p style={{ color: "#1c190d", fontSize: "24px", fontWeight: "bold", lineHeight: "1.25", letterSpacing: "0" }}>{adminData && adminData.averageRentalsPerDay}</p>
    </div>
  </div>


  {adminData.rentalsPerDay ? (
        <RentalChart data={adminData.rentalsPerDay} />
      ) : (
        <p>No hay datos que mostrar</p>
      )}

  <div>
  <h2
    style={{
      color: "#1c190d",
      fontSize: "22px",
      fontWeight: "bold",
      lineHeight: "1.25",
      letterSpacing: "-0.015em",
      paddingLeft: "16px",
      paddingBottom: "12px",
      paddingTop: "20px",
    }}
  >
    Lista de usuarios
  </h2>
  <div style={{ paddingLeft: "16px", paddingRight: "16px", paddingTop: "12px", paddingBottom: "12px" }}>
    <div style={{ display: "flex", overflow: "hidden", borderRadius: "12px", border: "1px solid #e8e3ce", backgroundColor: "#fcfbf8" }}>
      <table style={{ flex: 1 }}>
        <thead>
          <tr style={{ backgroundColor: "#fcfbf8" }}>
            <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Usuario</th>
            <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Movil alquilado</th>
            <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Alquileres N</th>
            <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Pena</th>
            <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Bonus</th>
            <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Minutos alquilados</th>
            <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Minutos disponibles</th>
          </tr>
        </thead>
        <tbody>
          {adminData && adminData.users && adminData.users.length > 0 ? (
            adminData.users.map((user) => (
              <tr key={user.id} style={{ borderTop: "1px solid #e8e3ce" }}>
                <td style={{ height: "72px", padding: "8px", width: "400px", color: "#1c190d", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
                  {user.dni}
                </td>
                <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
                  {user.rentedScooterId ? user.rentedScooterId : "N/A"}
                </td>
                <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
                  {user.rentalCount}
                </td>
                <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
                  {user.punishment==="false" ? "Sí" : "No"}
                </td>
                <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
                  {user.bonusMinutes===30 ? "Sí" : "No"}
                </td>
                <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
                  {user.historicMinutesRented}
                </td>
                <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
                  {user.available_minutes}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "8px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
                No user data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>




          <div>
    <h2
      style={{
        color: "#1c190d",
        fontSize: "22px",
        fontWeight: "bold",
        lineHeight: "1.25",
        letterSpacing: "-0.015em",
        paddingLeft: "16px",
        paddingBottom: "12px",
        paddingTop: "20px",
      }}
    >
      Historial de alqiuleres
    </h2>
    <div style={{ paddingLeft: "16px", paddingRight: "16px", paddingTop: "12px", paddingBottom: "12px" }}>
      <div style={{ display: "flex", overflow: "hidden", borderRadius: "12px", border: "1px solid #e8e3ce", backgroundColor: "#fcfbf8" }}>
        <table style={{ flex: 1 }}>
          <thead>
            <tr style={{ backgroundColor: "#fcfbf8" }}>
              <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Usuario</th>
              <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Inicio</th>
              <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Fin</th>
              <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Duracion</th>
              <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Estado</th>
              <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Equipo</th>
            </tr>
          </thead>
          <tbody>
  {adminData && adminData.rentals && adminData.rentals.length > 0 ? (
    adminData.rentals.map((rental) => (
      <tr key={rental.id} style={{ borderTop: "1px solid #e8e3ce" }}>
        <td style={{ height: "72px", padding: "8px", width: "400px", color: "#1c190d", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
          {rental.user_dni}
        </td>
        <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
        {formatDate(rental.rentalDate)}         
        </td>
        <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
          {formatDate(rental.returnDate)}
        </td>
        <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
          {rental.usedMinutes}
        </td>
        <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
          {rental.status}
        </td>
        <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
          {rental.scooter_identifier}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" style={{ textAlign: "center", padding: "8px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
        No rental data available.
      </td>
    </tr>
  )}
</tbody>


        </table>
      </div>
    </div>

    
  </div>

        </div>
      </div>
    </div>



    <Toaster />
      <Dialog open={openModalStation} onClose={handleCloseStation}>
        <DialogTitle>Añadir estación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, introduce el nombre de la nueva estación.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="stationName"
            label="Nombre de la estación"
            type="text"
            fullWidth
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
          />
          <DialogContentText>
            Por favor, introduce la dirección de la estación.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="stationName"
            label="Nombre de la estación"
            type="text"
            fullWidth
            value={stationLocation}
            onChange={(e) => setStationLocation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStation}>Cancelar</Button>
          <Button onClick={handleAddStation}>Añadir</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openModalScooter} onClose={handleCloseScooter}>
  <DialogTitle>Añadir monopatín</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Por favor, ingresa un codigo y asignalo a una estación.
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="scooterId"
      label="ID del monopatín"
      type="text"
      fullWidth
      value={scooterName}
      onChange={(e) => setScooterName(e.target.value)}
    />
    <Select
      labelId="stationIdLabel"
      id="stationId"
      value={stationId}
      onChange={(e) => setStationId(e.target.value)}
      fullWidth
    >
      {stations.map((station) => (
        <MenuItem key={station.id} value={station.id}>
          {station.name}
        </MenuItem>
      ))}
    </Select>
    
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseScooter}>Cancelar</Button>
    <Button onClick={handleAddScooter}>Añadir</Button>
  </DialogActions>
</Dialog>


  </div>
  </>
  );
}
