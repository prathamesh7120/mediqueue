import API from './axios'

export const bookAppointment = (data) => {
  return API.post('/appointments/book', data)
}

export const getPatientAppointments = (patientId) => {
  return API.get(`/appointments/patient/${patientId}`)
}

export const getDoctorAppointments = (doctorId) => {
  return API.get(`/appointments/doctor/${doctorId}`)
}

export const cancelAppointment = (id) => {
  return API.put(`/appointments/${id}/cancel`)
}

export const updateAppointmentStatus = (id, status) => {
  return API.put(`/appointments/${id}/status?status=${status}`)
}