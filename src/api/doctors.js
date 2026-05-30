import API from './axios'

export const getAllDoctors = () => {
  return API.get('/doctors/all')
}

export const getAvailableDoctors = () => {
  return API.get('/doctors/available')
}

export const getDoctorsBySpecialization = (specialization) => {
  return API.get(`/doctors/specialization/${specialization}`)
}

export const getDoctorById = (id) => {
  return API.get(`/doctors/${id}`)
}

export const updateAvailability = (id, isAvailable) => {
  return API.put(`/doctors/${id}/availability?isAvailable=${isAvailable}`)
}