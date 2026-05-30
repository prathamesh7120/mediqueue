import { createContext, useContext, useState, useEffect } from 'react'

// Step 1 - Create the context
const AuthContext = createContext()

// Step 2 - Create the provider component
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Step 3 - On app load, check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      setUser(JSON.parse(userData))
    }

    setLoading(false)
  }, [])

  // Step 4 - Login function - saves user data to state and localStorage
  const login = (userData, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  // Step 5 - Logout function - clears everything
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  // Step 6 - Check if user is logged in
  const isLoggedIn = () => {
    return user !== null
  }

  // Step 7 - Check user role
  const isPatient = () => user?.role === 'PATIENT'
  const isDoctor = () => user?.role === 'DOCTOR'

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isLoggedIn,
        isPatient,
        isDoctor,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Step 8 - Custom hook to use auth context easily
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}