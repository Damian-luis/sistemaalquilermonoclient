import { useState } from 'react';
import { getStationsService } from '../pages/api/index';

export const useStations = () => {
  const [stations, setStations] = useState([]);

  const fetchHistorical = async () => {
    try {
      const stationsData = await getStationsService();
      setStations(stationsData);
    } catch (error) {
      console.error(error);
    }
  };

  return { stations, fetchHistorical };
};
