import React from 'react'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import Signup from './pages/auth/Signup'
import { AuthProvider } from './context/AuthContext'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Login from '../src/pages/auth/Login'
import PaitentDashboard  from '../src/pages/patitient/Dashboard'
import DoctorDashboard from '../src/pages/doctor/Dashboard'
import AdminDashboard from '../src/pages/admin/Dashboard'

const App = () => {
  return (
  <AuthProvider>
    <BrowserRouter>
    <ToastContainer>
      <Routes>
        <Route path='/ ' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/patient/dashboard' element={<PaitentDashboard/>}/>
         <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />




      </Routes>
    </ToastContainer>
    </BrowserRouter>
  </AuthProvider>
  )
}

export default App
