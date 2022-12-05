import { Box, Flex, Img } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'


// eslint-disable-next-line react/display-name
const AuthRegistration = (Children) => {
  // eslint-disable-next-line react/display-name
  return (props)=>{

    return(
      (
        <Flex w="100%"  pos="relative" flexDir={["column","row"]}>
            <Link href="/">
               <Box  h={["200px","100%"]} pos={["static","fixed"]} zIndex={1} top="0" overflowX="hidden" pt="20px" left="0" w={["100%","50%"]}     bgImage={`url("/images/welcome-img.png")`}  bgRepeat="no-repeat" bgSize="cover" >
                
                
                </Box>
            </Link>
            <Box h="100%" pos={["static","fixed"]} zIndex={1} top="0" overflowX="hidden" pt="20px" right="0"  w={["100%","50%"]} >
                <Children {...props}/>
            </Box>
        </Flex>
      )
    )
  }

}

export default AuthRegistration
