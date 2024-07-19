


import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { Typography } from '@mui/material';
const CountdownTimer = ({ rentalDate, durationMinutes }) => {
  if (!rentalDate || !durationMinutes) {
    return <div>No hay datos de renta disponibles</div>;
  }

  const rentalDateTime = new Date(rentalDate);
  const endDate = new Date(rentalDateTime.getTime() + durationMinutes * 60000);

  const {
    seconds,
    minutes,
    hours,
    days,
    restart,
  } = useTimer({ expiryTimestamp: endDate, onExpire: () => console.warn('¡Tiempo de renta expirado!') });

  useEffect(() => {
    restart(endDate);
  }, [rentalDate, durationMinutes, restart, endDate]);

  return (
    <div style={{padding:"20px"}}>
        <Typography style={{ color: 'red', fontSize: '40px', fontWeight: '800', lineHeight: 'normal' }}>{hours} : {minutes}' : {seconds} '' </Typography>
    </div>
  );
};

export default CountdownTimer;
