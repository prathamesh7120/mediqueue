import API from './axios'

export const registerPatient = (data) => {
  return API.post('/auth/register/patient', data)
}

export const loginPatient = (data) => {
  return API.post('/auth/login/patient', data)
}

export const registerDoctor = (data) => {
  return API.post('/auth/register/doctor', data)
}

export const loginDoctor = (data) => {
  return API.post('/auth/login/doctor', data)
}