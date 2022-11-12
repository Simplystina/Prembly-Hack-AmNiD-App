import React from 'react'
import DasboardLayout from '../Dashboard/DashboardLayout'

const usersLayout = (WrappedComponent) => {
  return (props)=>{
    return (
        <>
        <DasboardLayout>
            <WrappedComponent />
        </DasboardLayout>
        </>
      )
  }
}

export default usersLayout
