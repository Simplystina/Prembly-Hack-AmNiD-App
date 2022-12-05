// eslint-disable-next-line react/display-name

import React, { useEffect } from 'react'
import { logoutUser } from '../../../utils/api'
import DasboardLayout from '../Dashboard/DashboardLayout'


// eslint-disable-next-line react/display-name
const usersLayout = (WrappedComponent) => {
  
  // eslint-disable-next-line react/display-name
  return (props)=>{

    const loggedUser = ()=>{
      let tokenData = localStorage.getItem("token")
    if(!tokenData){
      return logoutUser()
    }

    }
  
    useEffect(()=>{
      loggedUser()
    })
    return (
        <>
        <DasboardLayout>
            <WrappedComponent {...props} />
        </DasboardLayout>
        </>
      )
  }
}



export default usersLayout
