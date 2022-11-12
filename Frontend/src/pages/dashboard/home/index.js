import { Avatar, Box , Button, Center, Flex, HStack, SimpleGrid, Text, VStack} from '@chakra-ui/react'
import React from 'react'
import { Store } from '../../../components'
import DasboardLayout from '../../../components/Dashboard/DashboardLayout'
import DashboardSidebar from '../../../components/Dashboard/DashboardSidebar'
import usersLayout from '../../../components/HOC/usersLayout'

const index = () => {
  return (
    <Box>
       <Text color="#747474" fontSize="30px" fontWeight="500">Dashboard</Text>
       <Text pt="5px" color="#747474" fontSize="20px" fontWeight="600">Welcome John</Text>
       <SimpleGrid columns={[1,2]} m="20px 0" spacing={4}>
        <Box p="20px"  bg="white" borderRadius={6}>
          <HStack alignItems="flex-start" spacing={10}>
            <Box>
              <Avatar size="lg" />
              <Text color="#747474" fontWeight="600" fontSize="10px" mt="10px">ID:AMN10000</Text>
            </Box>
            <Box w="100%">
                <Text color="#747474" fontWeight="500" fontSize="14px">Account Holder:  John Kennedy</Text>
                <Text color="#747474" fontWeight="500" fontSize="14px" p="5px 0">Account Number:   022323222</Text>
                <Text color="#747474" fontWeight="500" fontSize="14px">Bank Name:  Access Bank</Text>

              <Box w="100%" h="1px" m="10px auto" bg="rgba(171,170,170,1)"></Box>

              <HStack m="0px auto" spacing={20}>
                  <VStack spacing={2} alignItems="flex-start">
                    <Text fontSize="12px" color="#747474" fontWeight={500}>Tiktok:</Text>
                      <Text fontSize="12px" color="#747474" fontWeight={500}>Instagram</Text>
                      <Text fontSize="12px" color="#747474" fontWeight={500}>Twitter</Text>
                      <Text fontSize="12px" color="#747474" fontWeight={500}>Facebook</Text>
                   </VStack>
                  <VStack spacing={2}>
                    <Text fontSize="12px" color="#747474" fontWeight={500}> http/facebook.com</Text>
                    <Text fontSize="12px" color="#747474" fontWeight={500}> http/facebook.com</Text>
                    <Text fontSize="12px" color="#747474" fontWeight={500}> http/facebook.com</Text>
                    <Text fontSize="12px" color="#747474" fontWeight={500}> http/facebook.com</Text>
                </VStack>
                        
              </HStack>   
            </Box>
          </HStack>
        </Box>
        <Flex bg="white" justifyContent="center" alignItems="center" >
          <Button bg="#747474" color="white">Create a new store</Button>
        </Flex>
       </SimpleGrid>
       <Flex>
         <Store/>
       </Flex>
    </Box>
  )
}

export default usersLayout(index)
