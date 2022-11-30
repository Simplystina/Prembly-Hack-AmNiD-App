import { Avatar, Box , Button, Center, Flex, HStack, SimpleGrid, Text, VStack} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CreateStoreModal, Reviews, Store } from '../../../components'


import usersLayout from '../../../components/HOC/usersLayout'
import {BsFillPersonFill} from "react-icons/bs"
import {AiFillFacebook,AiOutlineInstagram, AiFillTwitterCircle, AiFillStar} from 'react-icons/ai'
import {FaTiktok} from 'react-icons/fa'

const Index = () => {

  const [details, setDetails] = useState({})

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    setDetails(user)
  },[])
  
  return (
    <Box w="100%">
       <Text color="#747474" fontSize={["20px","25px"]} fontWeight="500">Dashboard</Text>
       <Text pt="5px" color="#747474" fontSize={["16px","20px"]} fontWeight="600">Welcome {details.first_name}</Text>
       <Flex mt="10px 0" display={["flex","none"]} >
          <CreateStoreModal/>
        </Flex>
       <Flex  m="20px 0" justifyContent="space-between" >
        <Box p="30px"  bg="white" borderRadius={6} w={["100%","60%", "50%"]}>
          <HStack alignItems="flex-start" spacing={[4,5,5,10]}>
            <Box bg="#F7F7F7" p={3}>
              <Avatar size="lg" />
              <Text color="#747474" fontWeight="600" fontSize={["8px","10px"]} mt="10px">ID:{details.user_id}</Text>
              <Box  bg={details.verified? "rgba(144, 255, 169, 0.2)":"red.100"} 
                            borderRadius={6} m="10px auto">
                  <Text  p="10px"  color= {details.verified ===true? "#56FC7B": "red"} fontWeight="600" fontSize={[12,14]} textAlign="center">{details.verified? "Verified" :"Not Verified"}
                    </Text>
                  </Box>
            </Box>
            <Box>
                <Text color="#747474" fontWeight="500" fontSize="16px">Account Holder:  {details.first_name + " " + details.last_name}</Text>
                <Text color="#747474" fontWeight="500" fontSize={["12px","14px","16px"]} p="5px 0">Account Number: {details.verified===true? "022323222" :"Nil"}  </Text>
                <Text color="#747474" fontWeight="500" fontSize={["12px","14px","16px"]} >Bank Name:  {details.verified===true? "Access Bank": "NIl"}</Text>

              <Box w="100%" h="0.3px" m="30px auto" bg="#ABAAAA"></Box>
              <Flex justifyContent="space-between" flexWrap="wrap">
                 <HStack>
                   <Box fontSize={[16,20]} color="#ABAAAA"><AiFillStar/></Box>
                    <Text color="#ABAAAA" fontSize={[12]}>Ratings: {details.verified===true?"4.9(4 review)" : "NIl"}</Text>
                  </HStack>
                  <HStack>
                     <Box fontSize={[16,20]} color="#ABAAAA"><BsFillPersonFill/></Box>
                        <Text color="#ABAAAA" fontSize={[12]}>Joined Since: 2 days ago</Text>
                     </HStack>
              </Flex>
              <Flex flexWrap="wrap" color="#ABAAAA" justifyContent="space-between" mt="20px">
                 <HStack>
                 < Box color="#008565" fontSize={[16,20]}><AiFillFacebook /></Box>
                 <Text color="#008565" fontSize={[12,14,16]}>Facebook</Text>
                 </HStack>
                    <HStack>
                    <Box color="#008565" fontSize={[16,20]}><AiOutlineInstagram/></Box>
                    <Text color="#008565" fontSize={[12,14,16]}>Instagram</Text>
                    </HStack>
                  <HStack>
                    <Box color="#008565" fontSize={[16,20]}><AiFillTwitterCircle/></Box>
                    <Text color="#008565" fontSize={[12,14,16]}>Twitter</Text>
                  </HStack>
                   <HStack>
                     <Box color="#008565" fontSize={[16,20]}><FaTiktok/>   </Box>  
                     <Text color="#008565" fontSize={[12,14,16]}>Tiktok</Text>
                    </HStack>   
              </Flex>   
            </Box>
          </HStack>
        </Box>
        <Flex display={["none","flex"]} bg="white" justifyContent="center" alignItems="center" w={["100%", "38%","47%"]}>
          <CreateStoreModal/>
        </Flex>
      </Flex>
       <Flex flexDir={["column", "column","row"]} w="100%" justifyContent="space-between" m="20px 0px">
         <Store/>
         <Reviews/>
       </Flex>
    </Box>
  )
}

export default usersLayout(Index)
