import React from 'react'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import Services from '../pages/Services'
import Signup from '../pages/Signup'
import Doctors from '../pages/Doctors/Doctors'
import DoctorDetail from '../pages/Doctors/DoctorDeatail'
import Chatbot from '../pages/Chatbot'

import {Routes , Route } from 'react-router-dom'
import MedicalReport from '../pages/MedicalReport'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<Services />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/doctors" element={<Doctors />} />
      {/* <Route path="/users/profile/me" element={<MyAccount />} /> */}
      <Route path="/Chatbot" element={<Chatbot />} />
      <Route path="/doctors/:id" element={<DoctorDetail />} />
      <Route path='/medical' element={<MedicalReport />} />  
      <Route path ="/contact" element = {<Contact />} />
    </Routes>
  )
}

export default Router