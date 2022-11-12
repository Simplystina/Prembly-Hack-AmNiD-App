import { Box, Button, HStack, Text , Flex} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <Flex boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.08)" alignItems="center" justifyContent="space-between" p="10px 30px 30px 30px">
        <Text fontWeight={600} fontSize="30px" color="#008565">AmNiD</Text>
        <HStack spacing={10}>
            <Text fontWeight={600} fontSize="14px" color="#008565">Home</Text>
            <Text fontWeight={600} fontSize="14px" color="#008565">Support</Text>
            <Text fontWeight={600} fontSize="14px" color="#008565">FAQ</Text>
            
        </HStack>
        <Link href="/signup">
            <Button _hover={{bg:"white", color:"#008565", border:"1px solid #008565"}} bg="#008565" color="white" fontSize="14px">Register</Button>
        </Link>
    </Flex>
  )
}

export default Navbar
