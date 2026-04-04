import axios from '../../utils/axios.js'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const [doctors, setDoctors] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('/doctor/all')
        console.log('doctors:', res.data)
        setDoctors(res.data.doctors)
      } catch (error) {
        console.log('error:', error.message)
        toast.error('Failed to load doctors')
      } finally {
        setLoading(false)
      }
    }
    fetchDoctors()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-gray-50'>

      {/* Navbar */}
      <nav className='bg-white border-b px-6 py-4 flex justify-between items-center'>
        <h1 className='text-blue-600 font-semibold text-lg'>MediBook</h1>
        <div className='flex items-center gap-6'>
          <span className='text-sm text-gray-500'>Hello, {user?.name || 'Patient'}</span>
          <button
            onClick={() => navigate('/patient/appointments')}
            className='text-sm text-gray-600 hover:text-blue-600'>
            My Appointments
          </button>
          <button
            onClick={handleLogout}
            className='text-sm border px-3 py-1 rounded text-gray-600 hover:bg-gray-100'>
            Logout
          </button>
        </div>
      </nav>

      <div className='max-w-6xl mx-auto px-6 py-8'>

        {/* Welcome */}
        <h2 className='text-2xl font-semibold text-gray-800 mb-1'>
          Find a Doctor
        </h2>
        <p className='text-gray-500 text-sm mb-6'>
          Book appointments with top verified doctors
        </p>

        {/* Search */}
        <input
          type='text'
          placeholder='Search by name or specialization...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full border px-4 py-2 rounded-lg text-sm mb-6 focus:outline-none focus:border-blue-400'
        />

        {/* Loading */}
        {loading && (
          <p className='text-center text-gray-400 text-sm'>Loading doctors...</p>
        )}

        {/* No doctors */}
        {!loading && filteredDoctors.length === 0 && (
          <p className='text-center text-gray-400 text-sm'>No doctors found</p>
        )}

        {/* Doctors Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className='bg-white border rounded-xl p-5 hover:shadow-sm transition'>

              {/* Avatar */}
              <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm mb-3'>
                {doctor.name.charAt(0)}
              </div>

              <h3 className='font-semibold text-gray-800 text-sm'>{doctor.name}</h3>
              <p className='text-gray-400 text-xs mb-3'>{doctor.specialization}</p>

              <div className='flex justify-between items-center mb-4'>
                <span className='text-green-600 text-sm font-semibold'>₹{doctor.fees}</span>
                <span className='text-gray-400 text-xs'>{doctor.experience} yrs exp</span>
              </div>

              <button
                onClick={() => navigate(`/patient/book/${doctor._id}`)}
                className='w-full text-sm py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition'>
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard