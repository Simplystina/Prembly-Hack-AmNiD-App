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
            <Img objectFit="contain" w="300px" h="300px" m="0 auto" borderRadius="50%" src="/images/no-reviews.png"/>
        </Flex>
        :
        <VStack spacing={[4]}>
            {
                ratingsData.map((items)=>{
                    const {rater_name, rater_image, comment, rate} = items
                    return (
                        <Box key={items.id} bg="white" p="20px" pb="10px" borderRadius={6}>
                            <HStack align="flex-start">
                                  <Avatar w="50px" h="50px"/> 
                                   <Box>
                                        <Text fontSize="15px" fontWeight="600" color="#2E2E2E" mb="6px">{rater_name}</Text>
                                        <Text fontSize="14px" lineHeight="23px" fontWeight="500">
                                        {comment}
                                        </Text>
                                        <Text fontSize="12px" fontWeight="500" color="#ABAAAA" textAlign="right">rated {rate} points</Text>
                                   </Box>
                                </HStack>
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
