import { Avatar, Box, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getVendorRatings} from "../../../../utils/services"

const Reviews = () => {
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
    <Box w={["100%","100%","45%"]}>
        <Flex justifyContent="space-between">
            <Text color="#ABAAAA" fontSize={["16px","20px"]} fontWeight={500}>Reviews</Text>
            <Text color="#008565" fontSize={["13px","15px"]} fontWeight={500}>All Reviews</Text>
        </Flex>
        <VStack spacing={[[2,4]]}>
            {
                ratingsData.map((item)=>{
                    const {rater_name, rater_image, comment, rate} = item
                    return (
                        <Box key={item.id} bg="white" p="20px">
                            <Flex justifyContent="space-between" pb="10px">
                                <HStack>
                                    <Avatar/>
                                    <Text fontSize="15px" fontWeight="600" color="#ABAAAA">{rater_name}</Text>
                                </HStack>
                                <Text fontSize="12px" fontWeight="500" color="#ABAAAA">{rate} stars</Text>
                            </Flex>
                            <Text fontSize="12px" lineHeight="18px" fontWeight="500">
                            {comment}
                            </Text>
                        </Box>
                    )
                })
            }
        </VStack>
    </Box>
  )
}

export default Reviews
