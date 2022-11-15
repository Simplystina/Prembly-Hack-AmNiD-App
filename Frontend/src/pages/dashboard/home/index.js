import { Avatar, Box , Button, Center, Flex, HStack, SimpleGrid, Text, VStack} from '@chakra-ui/react'
import React from 'react'
import { CreateStoreModal, Reviews, Store } from '../../../components'
import DasboardLayout from '../../../components/Dashboard/DashboardLayout'
import DashboardSidebar from '../../../components/Dashboard/DashboardSidebar'

import usersLayout from '../../../components/HOC/usersLayout'

import {AiFillFacebook,AiOutlineInstagram, AiFillTwitterCircle} from 'react-icons/ai'
import {FaTiktok} from 'react-icons/fa'

const index = () => {
  return (
    <Box>
       <Text color="#747474" fontSize="25px" fontWeight="500">Dashboard</Text>
       <Text pt="5px" color="#747474" fontSize="20px" fontWeight="600">Welcome John</Text>
       <SimpleGrid columns={[1,2]} m="20px 0" spacing={4}>
        <Box p="30px"  bg="white" borderRadius={6}>
          <HStack alignItems="flex-start" spacing={10}>
            <Box>
              <Avatar size="lg" />
              <Text color="#747474" fontWeight="600" fontSize="10px" mt="10px">ID:AMN10000</Text>
            </Box>
            <Box w="100%">
                <Text color="#747474" fontWeight="500" fontSize="16px">Account Holder:  John Kennedy</Text>
                <Text color="#747474" fontWeight="500" fontSize="16px" p="5px 0">Account Number:   022323222</Text>
                <Text color="#747474" fontWeight="500" fontSize="16px">Bank Name:  Access Bank</Text>

              <Box w="100%" h="0.3px" m="15px auto" bg="#ABAAAA"></Box>

              <HStack color="#ABAAAA" spacing={5} >
                < Box fontSize={30}><AiFillFacebook /></Box>
                 <Box fontSize={30}><AiOutlineInstagram/></Box>
                 <Box fontSize={30}><AiFillTwitterCircle/></Box>
                 <Box fontSize={30}><FaTiktok/>   </Box>     
              </HStack>   
            </Box>
          </HStack>
        </Box>
        <Flex bg="white" justifyContent="center" alignItems="center" >
          <CreateStoreModal/>
        </Flex>
       </SimpleGrid>
       <Flex w="100%" justifyContent="space-between" m="20px 0px">
         <Store/>
         <Reviews/>
       </Flex>
    </Box>
  )
}

export default usersLayout(index)
