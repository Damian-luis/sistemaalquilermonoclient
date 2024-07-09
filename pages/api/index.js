import apiClient from "../../utils/axios";


export async function historicalService(userDni) {
  try {
    console.log(userDni)
    const response = await apiClient.get(`rentals/dni/${userDni}`);
    return response.data.rental;
  } catch (error) {
    console.error(error);
    return null;
  }
}


export async function getStationsService() {
  try {
    const response = await apiClient.get(`stations`);;
    
    return response.data.stations;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function reservationService(rental) {
  try {
    const response = await apiClient.post(`rentals/add`, {
      rental
     });
    
    return response.data
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function userService(userDni) {
  try {
    const response = await apiClient.get(`user/${userDni}`);
    
    return response.data
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addScooterToStationService(scooter,stationId) {
  try {
    const response = await apiClient.put(`stations/update/${stationId}`, {
      scooter
     });
    
    return response.data
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addStationService(station) {
  try {
    const response = await apiClient.post(`stations/add`, {
      station
     });
    
    return response.data
  } catch (error) {
    console.error(error);
    return null;
  }
}

/*
export async function getStationsService() {
  try {
    const response = await apiClient.get(`stations`, {
     question
    });
    console.log("respuesta la chat");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
  
*/