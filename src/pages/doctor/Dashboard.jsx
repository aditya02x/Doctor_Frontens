import { useState, useEffect } from 'react'
import axios from '../../utils/axios.js'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('/appointment/doctor-appointments') // ✅ fixed
        setAppointments(res.data?.appointments || [])
      } catch (error) {
        console.log(error)
      }
    }
    fetchAppointments()
  }, [])

  const handleComplete = async (appointmentId) => {
    try {
      await axios.put(`/appointment/complete/${appointmentId}`) // ✅ fixed
      toast.success('Appointment completed')

      // update UI
      setAppointments(prev =>
        prev.map(apt =>
          apt._id === appointmentId
            ? { ...apt, status: 'completed' }
            : apt
        )
      )
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <h1 className='text-2xl font-semibold text-gray-800 mb-6'>
        Doctor Dashboard
      </h1>

      {appointments.length === 0 && (
        <p className='text-gray-400 text-sm'>No appointments found</p>
      )}

      {appointments.map((apt) => (
        <div
          key={apt._id}
          className='bg-white border rounded-xl p-4 mb-3 flex justify-between items-center hover:shadow-sm transition'>

          {/* Left */}
          <div>
            <p className='font-semibold text-gray-800'>
              {apt.patientId?.name} {/* ✅ fixed */}
            </p>

            <p className='text-sm text-gray-500'>
              {apt.patientId?.email}
            </p>

            <p className='text-sm text-gray-500'>
              {apt.slotId?.date} · {apt.slotId?.startTime} - {apt.slotId?.endTime}
            </p>

            <p className='text-sm text-gray-500'>
              Amount: ₹{apt.amount}
            </p>
          </div>

          {/* Right */}
          <div className='flex flex-col items-end gap-2'>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium
              ${apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
              ${apt.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
              ${apt.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
            `}>
              {apt.status}
            </span>

            {apt.status === 'pending' && (
              <button
                onClick={() => handleComplete(apt._id)} // ✅ fixed
                className='text-xs border border-green-500 text-green-600 px-3 py-1 rounded-lg hover:bg-green-50'>
                Complete {/* ✅ fixed */}
              </button>
            )}

          </div>
        </div>
      ))}
    </div>
  )
}

export default Dashboard