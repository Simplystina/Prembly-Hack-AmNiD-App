import { Box, Flex, Img } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'


const AuthRegistration = ({children}) => {
  return (
    <Flex w="100%"  pos="relative">
        <Box w="50%"  pos="fixed" h="auto" top="0" left="0" minH="100%" bgImage={`url("/images/welcome-img.png")`}  bgRepeat="no-repeat" bgSize="cover" >
            <Link href="/"><Box transition="all 0.5s linear" w="120px" h="55px" pos="absolute" top="20px" left="33px" ></Box></Link>
            
        </Box>
        <Box w="50%" pos="absolute" right="0%" >
            {children}
        </Box>
    </Flex>
  )
}

export default AuthRegistration
