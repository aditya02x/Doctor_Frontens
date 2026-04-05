import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const BookAppointment = () => {
  const { doctorId } = useParams()

  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/slots/${doctorId}`)

        console.log('API Response:', res.data)

        // ✅ Safe fallbac
        setSlots(res.data?.slots || [])
      } catch (err) {
        console.error(err)
        setError("Failed to load slots")
      } finally {
        setLoading(false)
      }
    }

    if (doctorId) fetchSlots()
  }, [doctorId])

  // ✅ UI States
  if (loading) return <p>Loading slots...</p>
  if (error) return <p>{error}</p>
  if (!slots || slots.length === 0) return <p>No slots available</p>

  return (
    <div>
      {slots.map((slot) => (
        <div key={slot._id}>
          <p>
            {slot.date} — {slot.startTime} to {slot.endTime}
          </p>
          <button>Book Now</button>
        </div>
      ))}
    </div>
  )
}

export default BookAppointment