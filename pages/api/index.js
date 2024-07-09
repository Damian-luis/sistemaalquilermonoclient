import apiClient from "../../utils/axios";


export async function historicalService(userDni) {
  try {
    const response = await apiClient.get(`rentals/dni/${userDni}`);
    console.log(response);
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