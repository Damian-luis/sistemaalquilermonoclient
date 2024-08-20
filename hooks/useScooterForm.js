import { useState } from 'react';
import { addScooterToStationService } from "../pages/api/index"
import notify from '../utils/notify';

export const useScooterForm = (getData, fetchHistorical, stations) => {
  const [openModalScooter, setOpenModalScooter] = useState(false);
  const [scooterName, setScooterName] = useState('');
  const [stationId, setStationId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickOpenScooter = () => {
    setOpenModalScooter(true);
  };

  const handleCloseScooter = () => {
    setOpenModalScooter(false);
  };

  const handleAddScooter = async () => {
    try {
      setErrorMessage("");
      if (!scooterName || !stationId) {
        setErrorMessage('Este valor es obligatorio');
        return;
      }

      const newScooter = {
        status: "available",
        station_id: stationId,
        identifier: scooterName
      };

      await addScooterToStationService(newScooter, stationId);
      notify('success', 'Unidad agregada exitosamente');
      handleCloseScooter();
      getData();
      fetchHistorical();
    } catch (error) {
      notify('error', 'No se ha podido agregar la unidad');
      console.error('Error al añadir el monopatín:', error);
    }
  };

  return { 
    openModalScooter, handleClickOpenScooter, handleCloseScooter, 
    scooterName, setScooterName, stationId, setStationId, 
    handleAddScooter, errorMessage 
  };
};
