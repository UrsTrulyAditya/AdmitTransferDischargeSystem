import axios from 'axios';
import { toJS } from 'mobx';

const API_URL = {
  patient: {
    updatePatientById: `http://localhost:8557/patient/updatePatientById`
  },
  tpa: {
    updateTPAbyId: `http://localhost:8569/tpa/update`,
  },
  admin: {
    updateAdminProfile: 'http://localhost:8562/admin/updateProfile',
  },
  rooms:{
    updateRoomById: `http://localhost:8592/rooms/updateroom`,
  }
};


export const updateRoomById = async (roomId, roomData) => {
    try {
      const response = await axios.put(`${API_URL.rooms.updateRoomById}/${roomId}`, roomData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  
// export const updateAdminById = async (id, data) => {
//   try {
//     const response = await axios.put(`${API_URL.admin.updateAdminProfile}`, {data});
//     return response.data;
//   } catch (error) {
//     console.error(toJS(data),'eeeee');
//     throw error;
//   }
// };

export const updateAdminById = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL.admin.updateAdminProfile}`, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const updateAdminPassword = async (id, password) => {
  try {
    const response = await axios.put(`http://localhost:8562/admin/updateProfile/${id}/${password}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
