import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Navbar , Header, AboutUs, Services, GetStarted, FAQ, HowItWorks, Footer, VerifyModal } from '../components'



const Home = () => {
  return (
   <Box>
     <Navbar/>
      <Header/>
      <AboutUs/>
      <Services/>
      <GetStarted/>
      <HowItWorks/>
      <FAQ/>
      <Footer/>
   </Box>
  )
}

export default Home
