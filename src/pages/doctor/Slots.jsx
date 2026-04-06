import axios from '../../utils/axios.js'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Slots = () => {
  const [day, setDay] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreateSlot = async (e) => {
    e.preventDefault()


    try {
      setLoading(true)

      await axios.post('/slot/create', {
        day,
        date,
        startTime,
        endTime
      })

      toast.success('Slot created successfully')

      // reset form
      setDay('')
      setDate('')
      setStartTime('')
      setEndTime('')

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error creating slot')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>

      <form
        onSubmit={handleCreateSlot}
        className='bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4'>

        <h2 className='text-xl font-semibold text-gray-800 text-center'>
          Create Slot
        </h2>

        {/* Day */}
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className='w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'>
          <option value=''>Select Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>

        {/* Date */}
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className='w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
        />

        {/* Start Time */}
        <input
          type='time'
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className='w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
        />

        {/* End Time */}
        <input
          type='time'
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className='w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
        />

        {/* Button */}
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50'>
          {loading ? 'Creating...' : 'Create Slot'}
        </button>

      </form>
    </div>
  )
}

export default Slots