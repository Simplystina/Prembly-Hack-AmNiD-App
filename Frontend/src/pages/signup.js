
import React from 'react'
import { RegistrationForm } from '../components'
import Head from 'next/head'
import AuthRegistration from '../components/HOC/AuthRegistration'
import { registerUser } from '../../utils/services'
const signup = () => {

   
  return (
    <>
    <Head>
        <title>AmNiD - Driver Signup</title>
            <meta property="og:title" content="Awefun - Driver Signup" key="title" />
            <meta
                property="og:description"
                content="Awefun is an amazing platform for advertising and engaging potential customers while on a ride."
                key="description"
            />
    </Head>
     <AuthRegistration>
        <RegistrationForm/>
     </AuthRegistration>
  
    </>)
}

export default signup
