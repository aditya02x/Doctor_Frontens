import { useState, useEffect } from 'react'
import axios from '../../utils/axios.js'
import { toast } from 'react-toastify'
import PaitentDashboard from '../patitient/Dashboard.jsx'

const Dashboard = () => {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('/appointment/my-appointments')
        setAppointments(res.data.appointments)
      } catch (error) {
        console.log('error:', error.message)
      }
    }
    fetchAppointments()
  }, [])

  const handleCancel = async (appointmentId) => {
    try {
      await axios.put(`/appointment/cancel/${appointmentId}`)
      toast.success('Appointment cancelled')
      setAppointments(appointments.filter(apt => apt._id !== appointmentId))
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <h1 className='text-2xl font-semibold text-gray-800 mb-6'>My Appointments</h1>

      {appointments.length === 0 && (
        <p className='text-gray-400 text-sm'>No appointments found</p>
      )}

      {appointments.map((apt) => (
        <div key={apt._id} className='bg-white border rounded-xl p-4 mb-3 flex justify-between items-center'>
          <div>
            <p className='font-semibold text-gray-800'>{apt.doctorId?.name}</p>
            <p className='text-sm text-gray-500'>{apt.doctorId?.specialization}</p>
            <p className='text-sm text-gray-500'>{apt.slotId?.date} · {apt.slotId?.startTime} - {apt.slotId?.endTime}</p>
            <p className='text-sm text-gray-500'>Amount: ₹{apt.amount}</p>
          </div>

          <div className='flex flex-col items-end gap-2'>
            <span className={`text-xs px-3 py-1 rounded-full font-medium
              ${apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
              ${apt.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
              ${apt.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
            `}>
              {apt.status}
            </span>

            {apt.status === 'pending' && (
              <button
                onClick={() => handleCancel(apt._id)}
                className='text-xs border border-red-400 text-red-500 px-3 py-1 rounded-lg hover:bg-red-50'>
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Dashboard