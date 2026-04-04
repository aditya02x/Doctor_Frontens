import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import PatientDashboard from './pages/patitient/Appintements'
import DoctorDashboard from './pages/doctor/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/patient/dashboard' element={<PatientDashboard />} />
          <Route path='/doctor/dashboard' element={<DoctorDashboard />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App