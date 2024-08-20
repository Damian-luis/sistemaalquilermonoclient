import { useState } from 'react';
import { makeDevolutionScooterService } from '../pages/api';
import notify from "../utils/notify";

export const useDevolution = (historical, fetchHistorical) => {
  const [stationId, setStationId] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMakeDevolution = async (e) => {
    e.preventDefault();

    if (!stationId) {
      setErrorMessage("Este valor es obligatorio");
      return;
    }
    setLoading(true);
    try {
      const devolutionData = {
        ...historical.actualScooter,
        station_name_devolution: stationId,
      };
      await makeDevolutionScooterService(devolutionData);
      await fetchHistorical();
      notify('success', 'Unidad devuelta exitosamente');
      setOpen(false);
    } catch (e) {
      notify('error', 'No se ha podido procesar la devolución');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    stationId,
    open,
    errorMessage,
    handleOpen,
    handleClose,
    handleMakeDevolution,
    setStationId,
    loading,
  };
};
