import API from './axios'

export const generateToken = (patientId, doctorId) => {
  return API.post(
    `/tokens/generate?patientId=${patientId}&doctorId=${doctorId}`
  )
}

export const getDoctorTodayTokens = (doctorId) => {
  return API.get(`/tokens/doctor/${doctorId}/today`)
}

export const getPatientTokens = (patientId) => {
  return API.get(`/tokens/patient/${patientId}`)
}

export const updateTokenStatus = (tokenId, status) => {
  return API.put(`/tokens/${tokenId}/status?status=${status}`)
}