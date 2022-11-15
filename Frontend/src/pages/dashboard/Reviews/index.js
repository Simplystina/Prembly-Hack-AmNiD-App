import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'
import usersLayout from '../../../components/HOC/usersLayout'
import { UsersReview } from '../../../components'


const index = () => {
  return (
    <Box>
        <HStack>
           <Text color="#747474" fontSize="25px" fontWeight="500">Dashboard</Text>
           <Text color="#747474" fontSize="18px" fontWeight="600">-Vendor Reviews</Text>
        </HStack>
         <Text pt="5px" color="#747474" fontSize="16px" fontWeight="600">Vendor Reviews</Text>
         <UsersReview/>
    </Box>
  )
}

export default usersLayout(index)