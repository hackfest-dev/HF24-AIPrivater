import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import {authContext} from '../context/authContext'

const ProtectedRoute = ({children,allowedRoles}) => {
    const {role} = useContext(authContext)
    
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute