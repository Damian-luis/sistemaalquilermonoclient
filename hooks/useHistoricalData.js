import { useState } from 'react';
import { historicalService, getStationsService, userService } from '../pages/api';

export const useHistoricalData = (user) => {
  const [historical, setHistorial] = useState([]);
  const [stations, setStations] = useState([]);
  const [userData, setUser] = useState(false);

  const fetchHistorical = async () => {
    try {
      const historical = await historicalService(user);
      const stations = await getStationsService();
      const userData = await userService(user);
      setHistorial(historical);
      setStations(stations);
      setUser(userData.user);
    } catch (error) {
      console.log(error);
    }
  };

  const activateBonus = () => {
    setUser(prevUserData => ({
      ...prevUserData,
      available_minutes: 30,
      bonusMinutes: 0,
      bonusIsBeingUsed: true,
    }));
  };

  return { historical, stations, userData, fetchHistorical, activateBonus };
};
