import axios from 'axios';

const API_URL = {
  patient: {
    register: 'http://localhost:8557/patient/register',
    login: 'http://localhost:8557/patient/login',
  },
  tpa: {
    register: 'http://localhost:8569/tpa/register',
    login: 'http://localhost:8569/tpa/login',
  },
  admin: {
    register: 'http://localhost:8562/admin/register',
    login: 'http://localhost:8562/admin/login',
  },
  admission:{
    request: 'http://localhost:8563/admission/request',
    getAdmissionByEmail: 'http://localhost:8563/admission/'
  },
};

export const registerPatient = async (userData) => {
  try {
    const response = await axios.post(API_URL.patient.register, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginPatient = async (userData) => {
  try {
    const response = await axios.post(API_URL.patient.login, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerTpa = async (userData) => {
  try {
    const response = await axios.post(API_URL.tpa.register, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginTpa = async (userData) => {
  try {
    const response = await axios.post(API_URL.tpa.login, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerAdmin = async (userData) => {
  try {
    const response = await axios.post(API_URL.admin.register, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginAdmin = async (userData) => {
  try {
    const response = await axios.post(API_URL.admin.login, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const admissionRequest = async (formData) => {
  try {
    const response = await axios.post(API_URL.admission.request, formData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getAdmissionByEmail = async (email) => {
  try {
    const response = await axios.get(`http://localhost:8563/admission/${email}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch patient by email');
  }
};
