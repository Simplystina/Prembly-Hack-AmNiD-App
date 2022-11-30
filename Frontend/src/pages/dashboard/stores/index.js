import { Box, HStack, Text, } from '@chakra-ui/react'
import React from 'react'
import { StoreTableComponent } from '../../../components'
import usersLayout from '../../../components/HOC/usersLayout'

const index = () => {
  return (
    <Box>
       <HStack>
           <Text color="#747474" fontSize={["20px","25px"]} fontWeight="500">Dashboard</Text>
           <Text color="#747474" fontSize={["16px","18px"]} fontWeight="600">-Stores</Text>
        </HStack>
         <Text pt="5px" color="#747474" fontSize={["14px","16px"]} fontWeight="600">stores</Text>
         <StoreTableComponent/>
    </Box>
  )
}

export default usersLayout(index)
