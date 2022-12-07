import { Box, Text, VStack, Avatar, Flex, HStack , Img} from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import {getVendorRatings} from "../../../utils/services"

const UsersReview = () => {

   
    

    const [ratingsData, setRatingsData] = useState([])

    
    const Reviews = async ()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user, "userrrrrrrrrrrr")
        const values = {
            vendor_id : user?.user_id
        }
        const data = await getVendorRatings(values)
        console.log(data.data.data,"reviews dataa")
        setRatingsData(data.data.data)
    }
    useEffect(()=>{
        Reviews()

    },[])
  return (
    <Box m="30px 0">
        { 
        ratingsData.length==0? 
        <Flex  justifyContent="center">
            <Img objectFit="contain" w="100%" h="300px" m="0 auto"  src="/images/no-reviews.png"/>
        </Flex>
        :
        <VStack spacing={[4]} w="100%" align="normal">
            {
                ratingsData.map((items)=>{
                    const {rater_name, rater_image, comment, rate} = items
                    return (
                        <Box w="100%" key={items.id} bg="white" p="20px" borderRadius={6}>
                            <HStack align="flex-start">
                                  <Avatar w="50px" h="50px"/> 
                                
                                   <Box>
                                        <Text fontSize="15px" fontWeight="600" color="#2E2E2E" mb="6px">{rater_name}</Text>
                                        <Text fontSize="14px" lineHeight="23px" fontWeight="500">
                                        {comment}
                                        </Text>
                                        
                                   </Box>
                                </HStack>
                                <Text fontSize="12px" fontWeight="500" color="#ABAAAA" textAlign="right">rated {rate} points</Text>
                        </Box>
                    )
                })
            }
        </VStack>
        }
        
    </Box>
  )
}

export default UsersReview
