import { Avatar, Box , Button, Center, Flex, HStack, SimpleGrid, Text, VStack} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CreateStoreModal, Reviews, Store } from '../../../components'
import DasboardLayout from '../../../components/Dashboard/DashboardLayout'
import DashboardSidebar from '../../../components/Dashboard/DashboardSidebar'
import moment from "moment"

import usersLayout from '../../../components/HOC/usersLayout'
import {BsFillPersonFill} from "react-icons/bs"
import {AiFillFacebook,AiOutlineInstagram, AiFillTwitterCircle, AiFillStar} from 'react-icons/ai'
import {FaTiktok} from 'react-icons/fa'

const Index = () => {

  const [details, setDetails] = useState({})

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user, "userrrrrrrrrrrr")
    setDetails(user)
  },[])
  
  return (
    <Box>
       <Text color="#747474" fontSize="25px" fontWeight="500">Dashboard</Text>
       <Text pt="5px" color="#747474" fontSize="20px" fontWeight="600">Welcome {details.first_name}</Text>
       <SimpleGrid columns={[1,2]} m="20px 0" spacing={4}>
        <Box p="30px"  bg="white" borderRadius={6}>
          <HStack alignItems="flex-start" spacing={10}>
            <Box bg="#F7F7F7" p={3}>
              <Avatar size="lg" />
              <Text color="#747474" fontWeight="600" fontSize="10px" mt="10px">ID:{details.user_id}</Text>
              <Box  bg={details.verified? "rgba(144, 255, 169, 0.2)":"red.100"} 
                            borderRadius={6} m="10px auto">
                  <Text  p="10px"  color= {details.verified ===true? "#56FC7B": "red"} fontWeight="600" fontSize={[12,14]} textAlign="center">{details.verified? "Verified" :"Not Verified"}
                    </Text>
                  </Box>
            </Box>
            <Box w="100%">
                <Text color="#747474" fontWeight="500" fontSize="16px">Account Holder:  {details.first_name + " " + details.last_name}</Text>
                <Text color="#747474" fontWeight="500" fontSize="16px" p="5px 0">Account Number: {details.verified===true? "022323222" :"Nil"}  </Text>
                <Text color="#747474" fontWeight="500" fontSize="16px">Bank Name:  {details.verified===true? "Access Bank": "NIl"}</Text>

              <Box w="100%" h="0.3px" m="30px auto" bg="#ABAAAA"></Box>
              <HStack>
                 <HStack>
                   <Box fontSize={20} color="#ABAAAA"><AiFillStar/></Box>
                    <Text color="#ABAAAA" fontSize={[12]}>Ratings: {details.verified===true?"4.9(4 review)" : "NIl"}</Text>
                  </HStack>
                  <HStack>
                     <Box fontSize={20} color="#ABAAAA"><BsFillPersonFill/></Box>
                        <Text color="#ABAAAA" fontSize={[12]}>Joined Since: 2 days ago</Text>
                     </HStack>
              </HStack>
              <HStack color="#ABAAAA" spacing={5} mt="20px">
                 <HStack>
                 < Box color="#008565" fontSize={20}><AiFillFacebook /></Box>
                 <Text color="#008565" fontSize={16}>Facebook</Text>
                 </HStack>
                    <HStack>
                    <Box color="#008565" fontSize={20}><AiOutlineInstagram/></Box>
                    <Text color="#008565" fontSize={16}>Instagram</Text>
                    </HStack>
                  <HStack>
                    <Box color="#008565" fontSize={20}><AiFillTwitterCircle/></Box>
                    <Text color="#008565" fontSize={16}>Twitter</Text>
                  </HStack>
                   <HStack>
                     <Box color="#008565" fontSize={20}><FaTiktok/>   </Box>  
                     <Text color="#008565" fontSize={16}>Tiktok</Text>
                    </HStack>   
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

export default usersLayout(Index)
