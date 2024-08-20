import { useState } from 'react';
import { addStationService } from '../pages/api/index';

import notify from '../utils/notify';

export const useStationForm = (getData, fetchHistorical) => {
  const [openModalStation, setOpenModalStation] = useState(false);
  const [stationName, setStationName] = useState('');
  const [stationLocation, setStationLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickOpenStation = () => {
    setOpenModalStation(true);
  };

  const handleCloseStation = () => {
    setOpenModalStation(false);
  };

  const handleAddStation = async () => {
    try {
      setErrorMessage("");
      if (!stationName || !stationLocation) {
        setErrorMessage('Este valor es obligatorio');
        return;
      }

      await addStationService({ 
        name: stationName,
        location: stationLocation
      });
      notify('success', 'Estación agregada exitosamente');
      setStationName("");
      setStationLocation("");
      handleCloseStation();
      getData();
      fetchHistorical();
    } catch (error) {
      notify('error', 'No se ha podido añadir la estación');
      console.error('Error al añadir la estación:', error);
    }
  };

  return { 
    openModalStation, handleClickOpenStation, handleCloseStation, 
    stationName, setStationName, stationLocation, setStationLocation, 
    handleAddStation, errorMessage 
  };
};
