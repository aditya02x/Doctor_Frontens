import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../utils/axios.js'
import { toast } from 'react-toastify'

const BookAppointment = () => {
  const { doctorId } = useParams()
  const navigate = useNavigate()

  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/slot/${doctorId}`)
        setSlots(res.data?.slots || [])
      } catch (err) {
        setError('Failed to load slots')
      } finally {
        setLoading(false)
      }
    }

    if (doctorId) fetchSlots()
  }, [doctorId])

  const handleBook = async () => {
    if (!selectedSlot) return toast.error('Please select a slot')

    try {
     await axios.post('/appointment/book', {
        doctorId,
        slotId: selectedSlot,
      })
      toast.success('Appointment booked successfully')
      navigate('/patient/appointments')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading slots...
      </div>
    )

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    )

  if (!slots.length)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No slots available
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Book Appointment</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => (
          <div
            key={slot._id}
            onClick={() => setSelectedSlot(slot._id)}
            className={`p-4 rounded-xl cursor-pointer border transition shadow-sm hover:shadow-md 
              ${selectedSlot === slot._id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
          >
            <p className="font-medium text-gray-700">
              {slot.date}
            </p>
            <p className="text-sm text-gray-500">
              {slot.startTime} - {slot.endTime}
            </p>

            {selectedSlot === slot._id && (
              <p className="text-blue-600 text-sm mt-2">Selected</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleBook}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Book Appointment
        </button>
      </div>
    </div>
  )
}

export default BookAppointment