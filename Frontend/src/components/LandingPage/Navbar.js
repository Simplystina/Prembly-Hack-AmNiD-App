import { Box, Button, HStack, Text , Flex} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { SmallNavbar } from './SmallNavbar'

const Navbar = () => {  

 
  return (
    <>
    
     <Flex boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.08)" alignItems="center" justifyContent="space-between" p="10px 30px 30px 30px">
        <Text fontWeight={600} fontSize={["20px","25px","30px"]} color="#008565">AmNiD</Text>
        <HStack display={["none", "none", "flex"]} spacing={10}>
            <Text fontWeight={600} fontSize="14px" color="#008565">Home</Text>
            <Link href="#getstarted">
               <Text fontWeight={600} fontSize="14px" color="#008565">Support</Text>
            </Link>
           <Link href="#faq">
              <Text fontWeight={600} fontSize="14px" color="#008565">FAQ</Text>
           </Link>
            
        </HStack>
        <HStack display={["none", "none","flex"]}>
           <Link href="/login">
            <Button _hover={{bg:"white", color:"#008565", border:"1px solid #008565"}} bg="#008565" color="white" fontSize="14px">Login</Button>
            </Link>
           <Link href="/signup">
            <Button _hover={{bg:"white", color:"#008565", border:"1px solid #008565"}} bg="#008565" color="white" fontSize="14px">Register</Button>
           </Link>
        </HStack>
        <SmallNavbar/>
    </Flex>
    </>
  )
}

export default Navbar
