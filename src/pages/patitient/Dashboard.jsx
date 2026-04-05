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
        setDoctors(res.data?.doctors || [])
      } catch (error) {
        console.log(error)
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

  const filteredDoctors = doctors.filter((doctor) =>
    (doctor?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (doctor?.specialization || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-gray-50'>

      {/* Navbar */}
      <nav className='bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm'>
        <h1 className='text-blue-600 font-bold text-xl'>MediBook</h1>

        <div className='flex items-center gap-6'>
          <span className='text-sm text-gray-500'>
            Hello, <span className='font-medium text-gray-700'>{user?.name || 'Patient'}</span>
          </span>

          <button
            onClick={() => navigate('/patient/appointments')}
            className='text-sm text-gray-600 hover:text-blue-600 transition'>
            My Appointments
          </button>

          <button
            onClick={handleLogout}
            className='text-sm border px-4 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition'>
            Logout
          </button>
        </div>
      </nav>

      <div className='max-w-6xl mx-auto px-6 py-8'>

        {/* Header */}
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>Find a Doctor</h2>
          <p className='text-gray-500 text-sm'>
            Book appointments with top verified doctors
          </p>
        </div>

        {/* Search */}
        <div className='mb-6'>
          <input
            type='text'
            placeholder='Search by name or specialization...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full border px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm'
          />
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='bg-white p-5 rounded-xl border animate-pulse'>
                <div className='w-12 h-12 bg-gray-200 rounded-full mb-3'></div>
                <div className='h-3 bg-gray-200 rounded w-2/3 mb-2'></div>
                <div className='h-3 bg-gray-200 rounded w-1/2 mb-4'></div>
                <div className='h-8 bg-gray-200 rounded'></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredDoctors.length === 0 && (
          <div className='text-center py-20'>
            <p className='text-gray-400 text-sm'>No doctors found</p>
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && filteredDoctors.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className='bg-white border rounded-2xl p-5 hover:shadow-md transition duration-200'>

                {/* Avatar */}
                <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm mb-3'>
                  {doctor?.name?.charAt(0) || 'D'}
                </div>

                <h3 className='font-semibold text-gray-800 text-sm'>
                  {doctor?.name}
                </h3>

                <p className='text-gray-400 text-xs mb-3'>
                  {doctor?.specialization}
                </p>

                <div className='flex justify-between items-center mb-4'>
                  <span className='text-green-600 text-sm font-semibold'>
                    ₹{doctor?.fees}
                  </span>
                  <span className='text-gray-400 text-xs'>
                    {doctor?.experience} yrs exp
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/patient/book/${doctor._id}`)}
                  className='w-full text-sm py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition'>
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard