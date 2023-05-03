import axios from 'axios';

const API_URL = {
  patient: {
    getAllPAtients: 'http://localhost:8557/patient/viewAllPatients',
  },
  tpa: {
    getAllTpas: 'http://localhost:8569/tpa/viewAllTpas',
  },
  admin: {
    getAllAdmins: 'http://localhost:8562/admin/viewAllAdmins',
    getAdminById: 'http://localhost:8562/admin/viewAdmin',
  },
  rooms:{
    getAllRooms: 'http://localhost:8592/rooms/viewrooms',
  },
  discharge:{
    request: 'http://localhost:8564/discharge/viewAllDischargeDetails',
  },
  admissions:{
    getAllAdmissions: 'http://localhost:8563/admission/all',
    getAdmissionByEmail: 'http://localhost:8563/admission',
    getAdmissionByPatientId : 'http://localhost:8563/admission/updateAdmission'
  }
};


export const getAdmissionByEmail = async (emailId) => {
  try {
    const response = await axios.get(`API_URL.admissions.getAdmissionByEmail/${emailId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const getAdmissionByPatientId = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8563/admission/updateAdmission/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const getAllPatients = async () => {
  try {
    const response = await axios.get(API_URL.patient.getAllPAtients);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllTpas = async () => {
  try {
    const response = await axios.get(API_URL.tpa.getAllTpas);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllAdmins = async () => {
  try {
    const response = await axios.get(API_URL.admin.getAllAdmins);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllRooms = async () => {
  try {
    const response = await axios.get(API_URL.rooms.getAllRooms);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAdminById = async(adminId) => {
  try {
    const response = await axios.get(`${API_URL.admin.getAdminById}/${adminId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getAllDischarges = async () => {
  try {
    const res = axios.get('http://localhost:8564/discharge/viewAllDischargeDetails');
    return res;
  } catch (error) {
    console.error(error);
  }
};


export const getAllAdmissions = async () => {
  try {
    const response = await axios.get(API_URL.admissions.getAllAdmissions);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};