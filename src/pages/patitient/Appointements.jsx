import { useState, useEffect } from 'react'
import axios from '../../utils/axios.js'

const Appointments = () => {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('/appointment/my-appointments')
        console.log('appointments:', res.data)
        setAppointments(res.data.appointments)
      } catch (error) {
        console.log('error:', error.message)
      }
    }
    fetchAppointments()
  }, [])

  return (
    <div>
      <h1>My Appointments</h1>
      {appointments.map((apt) => (
        <div key={apt._id}>
          <p>{apt.doctorId?.name}</p>
          <p>{apt.slotId?.date}</p>
          <p>{apt.status}</p>
        </div>
      ))}
    </div>
  )
}

export default Appointments