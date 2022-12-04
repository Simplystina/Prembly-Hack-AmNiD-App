import { Box, Flex, Img } from '@chakra-ui/react'
import Link from 'next/link'
import React, { Children } from 'react'



const AuthRegistration = (Children) => {
  return (props)=>{

    return(
      (
        <Flex w="100%"  pos="relative">
            <Link href="/">
               <Box  h="100%" pos="fixed" zIndex={1} top="0" overflowX="hidden" pt="20px" left="0" display={["none","block"]} w="50%"     bgImage={`url("/images/welcome-img.png")`}  bgRepeat="no-repeat" bgSize="cover" >
                
                
                </Box>
            </Link>
            <Box h="100%" pos="fixed" zIndex={1} top="0" overflowX="hidden" pt="20px" right="0"  w={["100%","50%"]} >
                <Children {...props}/>
            </Box>
        </Flex>
      )
    )
  }

}

export default AuthRegistration
