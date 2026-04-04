import React from 'react'
import {useParams} from "react-router-dom";


const BookAppointment = () => {
    const {doctorId} = useParams()
  return (
    
    <div>
      <p>Doctor Id : {doctorId} </p>
    </div>
  )
}

export default BookAppointment
