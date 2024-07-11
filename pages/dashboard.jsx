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
export default function Dashboard() {
  const { user } = useAuth();

  const [openModalStation, setOpenModalStation] =useState(false);
  const [openModalScooter, setOpenModalScooter] =useState(false);

  const [stationName, setStationName] = useState('');
  const [stationLocation, setStationLocation] = useState('');
  const [scooterName, setScooterName] = useState('');
  const [stationId, setStationId] = useState('');


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

  return (
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
      <p style={{ color: "#1c190d", fontSize: "24px", fontWeight: "bold", lineHeight: "1.25", letterSpacing: "0" }}>142,367</p>
      <p style={{ color: "#078812", fontSize: "16px", fontWeight: "500", lineHeight: "1.5" }}>+15%</p>
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
      <p style={{ color: "#1c190d", fontSize: "24px", fontWeight: "bold", lineHeight: "1.25", letterSpacing: "0" }}>1,620,572</p>
      <p style={{ color: "#078812", fontSize: "16px", fontWeight: "500", lineHeight: "1.5" }}>+12%</p>
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
      <p style={{ color: "#1c190d", fontSize: "24px", fontWeight: "bold", lineHeight: "1.25", letterSpacing: "0" }}>1,203</p>
      <p style={{ color: "#078812", fontSize: "16px", fontWeight: "500", lineHeight: "1.5" }}>+5%</p>
    </div>
  </div>



          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "16px",
              gap: "32px",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "32px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                <h3 style={{ color: "#1c190d", fontSize: "14px", fontWeight: "500", lineHeight: "1.25", letterSpacing: "-0.015em" }}>
                  Your next payment
                </h3>
                <div style={{ display: "flex", alignItems: "center", padding: "16px", gap: "12px", border: "1px solid #f4f1e7", borderRadius: "8px" }}>
                  <div
                    style={{
                      backgroundImage: 'url("https://cdn.usegalileo.ai/stability/0fd6cc26-0ec6-47cb-bda3-e0010a4e105e.png")',
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      aspectRatio: "1",
                      backgroundSize: "cover",
                      borderRadius: "9999px",
                      width: "48px",
                      height: "48px",
                    }}
                  ></div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p style={{ color: "#1c190d", fontSize: "14px", fontWeight: "500", lineHeight: "1.25", letterSpacing: "-0.015em" }}>
                        John Doe
                      </p>
                      <p style={{ color: "#1c190d", fontSize: "14px", fontWeight: "normal", lineHeight: "1.25", letterSpacing: "-0.015em" }}>
                        $ 34.90
                      </p>
                    </div>
                    <p style={{ color: "#9c8c49", fontSize: "14px", fontWeight: "normal", lineHeight: "1.5" }}>Due: July 31, 2024</p>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                <h3 style={{ color: "#1c190d", fontSize: "14px", fontWeight: "500", lineHeight: "1.25", letterSpacing: "-0.015em" }}>
                  Your last ride
                </h3>
                <div style={{ display: "flex", alignItems: "center", padding: "16px", gap: "12px", border: "1px solid #f4f1e7", borderRadius: "8px" }}>
                  <div
                    style={{
                      backgroundImage: 'url("https://cdn.usegalileo.ai/stability/20e17e6a-553b-4b4d-96b0-f183b57a7b4e.png")',
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      aspectRatio: "1",
                      backgroundSize: "cover",
                      borderRadius: "9999px",
                      width: "48px",
                      height: "48px",
                    }}
                  ></div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p style={{ color: "#1c190d", fontSize: "14px", fontWeight: "500", lineHeight: "1.25", letterSpacing: "-0.015em" }}>
                        John Doe
                      </p>
                      <p style={{ color: "#1c190d", fontSize: "14px", fontWeight: "normal", lineHeight: "1.25", letterSpacing: "-0.015em" }}>
                        14:00
                      </p>
                    </div>
                    <p style={{ color: "#9c8c49", fontSize: "14px", fontWeight: "normal", lineHeight: "1.5" }}>Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "32px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                <h3 style={{ color: "#1c190d", fontSize: "14px", fontWeight: "500", lineHeight: "1.25", letterSpacing: "-0.015em" }}>
                  Your reports
                </h3>
                <div style={{ display: "flex", alignItems: "center", padding: "16px", gap: "12px", border: "1px solid #f4f1e7", borderRadius: "8px" }}>
                  <div
                    style={{
                      backgroundImage: 'url("https://cdn.usegalileo.ai/stability/268897b4-6699-43a1-9da1-9d60a5466e68.png")',
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      aspectRatio: "1",
                      backgroundSize: "cover",
                      borderRadius: "9999px",
                      width: "48px",
                      height: "48px",
                    }}
                  ></div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p style={{ color: "#1c190d", fontSize: "14px", fontWeight: "500", lineHeight: "1.25", letterSpacing: "-0.015em" }}>
                        John Doe
                      </p>
                      <p style={{ color: "#1c190d", fontSize: "14px", fontWeight: "normal", lineHeight: "1.25", letterSpacing: "-0.015em" }}>
                        $ 34.90
                      </p>
                    </div>
                    <p style={{ color: "#9c8c49", fontSize: "14px", fontWeight: "normal", lineHeight: "1.5" }}>Due: July 31, 2024</p>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                <h3 style={{ color: "#1c190d", fontSize: "14px", fontWeight: "500", lineHeight: "1.25", letterSpacing: "-0.015em" }}>
                  Your last ride
                </h3>
                <div style={{ display: "flex", alignItems: "center", padding: "16px", gap: "12px", border: "1px solid #f4f1e7", borderRadius: "8px" }}>
                  <div
                    style={{
                      backgroundImage: 'url("https://cdn.usegalileo.ai/stability/20e17e6a-553b-4b4d-96b0-f183b57a7b4e.png")',
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      aspectRatio: "1",
                      backgroundSize: "cover",
                      borderRadius: "9999px",
                      width: "48px",
                      height: "48px",
                    }}
                  ></div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p style={{ color: "#1c190d", fontSize: "14px", fontWeight: "500", lineHeight: "1.25", letterSpacing: "-0.015em" }}>
                        John Doe
                      </p>
                      <p style={{ color: "#1c190d", fontSize: "14px", fontWeight: "normal", lineHeight: "1.25", letterSpacing: "-0.015em" }}>
                        14:00
                      </p>
                    </div>
                    <p style={{ color: "#9c8c49", fontSize: "14px", fontWeight: "normal", lineHeight: "1.5" }}>Yesterday</p>
                  </div>
                </div>
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
      Ride activity
    </h2>
    <div style={{ paddingLeft: "16px", paddingRight: "16px", paddingTop: "12px", paddingBottom: "12px" }}>
      <div style={{ display: "flex", overflow: "hidden", borderRadius: "12px", border: "1px solid #e8e3ce", backgroundColor: "#fcfbf8" }}>
        <table style={{ flex: 1 }}>
          <thead>
            <tr style={{ backgroundColor: "#fcfbf8" }}>
              <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Rider</th>
              <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Start</th>
              <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>End</th>
              <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Duration</th>
              <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Distance</th>
              <th style={{ padding: "12px", textAlign: "left", color: "#1c190d", width: "400px", fontSize: "14px", fontWeight: "500", lineHeight: "1.5" }}>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderTop: "1px solid #e8e3ce" }}>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#1c190d", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>Luisa M.</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>7:45 AM</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>8:00 AM</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>15 minutes</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>2.5 miles</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>$5.50</td>
            </tr>
            <tr style={{ borderTop: "1px solid #e8e3ce" }}>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#1c190d", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>Mike L.</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>8:15 AM</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>8:30 AM</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>15 minutes</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>2.0 miles</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>$4.50</td>
            </tr>
            <tr style={{ borderTop: "1px solid #e8e3ce" }}>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#1c190d", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>Jenny P.</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>8:30 AM</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>8:45 AM</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>15 minutes</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>2.5 miles</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>$5.50</td>
            </tr>
            <tr style={{ borderTop: "1px solid #e8e3ce" }}>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#1c190d", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>Sam H.</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>9:00 AM</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>9:15 AM</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>15 minutes</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>2.0 miles</td>
              <td style={{ height: "72px", padding: "8px", width: "400px", color: "#9c8c49", fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>$4.50</td>
            </tr>
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
  
  );
}
