import { useState } from 'react';
import { getDashboardInfoService } from '../pages/api/index';

export const useDashboardData = () => {
  const [adminData, setAdminData] = useState(null);

  const getData = async () => {
    try {
      const data = await getDashboardInfoService();
      console.log("pasa")
      console.log(data)
      setAdminData(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  return { adminData, getData };
};
