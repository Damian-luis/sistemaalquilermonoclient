import { useState } from 'react';
import { reservationService } from '../pages/api';
import notify from "../utils/notify";

export const useReservation = (fetchHistorical, user, userData, setLoading) => {
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [rentalDate, setRentalDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(30);
  const [openRerservationModal, setOpenReservetionModal] = useState(false);

  const handleOpenReservationModal = () => setOpenReservetionModal(true);
  const handleCloseRerservationModal = () => setOpenReservetionModal(false);

  const handleSelectScooter = (station, scooter) => {
    setSelectedScooter({ station, scooter });
    handleOpenReservationModal();
  };

  const handleChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleMakeReservation = async (e) => {
    e.preventDefault();
    setLoading(true);
    const reservationData = {
      station_name: selectedScooter.station.name,
      user_id: user.id,
      user_dni: user,
      scooter_id: selectedScooter.scooter.id,
      location_rental: selectedScooter.scooter.location,
      scooter_identifier: selectedScooter.scooter.identifier,
      rentalDate: rentalDate,
      returnDate: returnDate,
      start_station_id: selectedScooter.station.id,
      end_station_id: null,
      usedMinutes: selectedTime,
      status: 'active',
      isBonusBeingUsed: userData.bonusIsBeingUsed,
    };

    try {
      const data = await reservationService(reservationData);
      if (data.status === 200) {
        notify('success', 'Unidad reservada exitosamente');
        await fetchHistorical();
        handleCloseRerservationModal();
      } else {
        notify('error', 'No se pudo reservar unidad');
        handleCloseRerservationModal();
      }
    } catch (e) {
      notify('error', 'No se pudo reservar unidad');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedScooter,
    selectedTime,
    openRerservationModal,
    handleSelectScooter,
    handleChange,
    handleMakeReservation,
    handleCloseRerservationModal,
  };
};
