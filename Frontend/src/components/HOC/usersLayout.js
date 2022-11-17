// eslint-disable-next-line react/display-name

import React from 'react'
import DasboardLayout from '../Dashboard/DashboardLayout'


// eslint-disable-next-line react/display-name
const usersLayout = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props)=>{
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
