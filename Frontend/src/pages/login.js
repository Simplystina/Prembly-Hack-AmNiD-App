import React,{useEffect} from 'react'
import { LoginForm } from '../components'
import Head from 'next/head'
import AuthRegistration from '../components/HOC/AuthRegistration'


const login = () => {
    

  return (
    <>
    <Head>
        <title>AmNiD - Driver Signup</title>
            <meta property="og:title" content="AmNiD - Login" key="title" />
            <meta
                property="og:description"
                content="AmNiD- The best out there"
                key="description"
            />
    </Head>
     <AuthRegistration>
        <LoginForm/>
     </AuthRegistration>
  
    </>)
}

export default login
