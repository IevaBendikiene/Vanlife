import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'


export default function Dashboard() {
  const {user} = useAuthContext()
  return (
    <>
    <h1>Welcome {user.email}</h1>
   </>
  )
}
