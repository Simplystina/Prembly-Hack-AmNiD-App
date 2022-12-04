import { Box, Button, HStack, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import { CreateStoreModal, StoreTableComponent } from '../../../components'
import usersLayout from '../../../components/HOC/usersLayout'

const index = () => {

  
  return (
    <Box>
       <Flex justifyContent="space-between" flexDir={["column", "row"]}>
           <HStack>
              <Text color="#747474" fontSize={["20px","25px"]} fontWeight="500">Dashboard</Text>
              <Text color="#747474" fontSize={["16px","18px"]} fontWeight="600">-Stores</Text>
           </HStack>
           <CreateStoreModal/>
       </Flex>
         <Text pt="5px" color="#747474" fontSize={["14px","16px"]} fontWeight="600">stores</Text>
         <StoreTableComponent/>
    </Box>
  )
}

export default usersLayout(index)
