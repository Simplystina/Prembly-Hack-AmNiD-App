import { Box, Text, VStack, Avatar, Flex, HStack } from '@chakra-ui/react'
import React from 'react'

const UsersReview = () => {

    const reviews = [
        {
            id: 1,
            num: 1
        },
        {
            id: 2,
            num: 2
        },
        {
            id: 3,
            num: 3
        },
        {
            id: 4,
            num: 4
        }
    ]
  return (
    <Box m="30px 0">
        <VStack spacing={[4]}>
            {
                reviews.map((items)=>{
                    return (
                        <Box key={items.id} bg="white" p="20px" pb="10px" borderRadius={6}>
                            <HStack align="flex-start">
                                  <Avatar w="50px" h="50px"/> 
                                   <Box>
                                        <Text fontSize="15px" fontWeight="600" color="#2E2E2E" mb="6px">John Nate</Text>
                                        <Text fontSize="14px" lineHeight="23px" fontWeight="500">
                                        I have always been afraid of shopping online since the last time I went through a lot of stress and lost a whole lots of money, but ever since I have been using Amnid Ihave alwys loved it becaue t gives me a seemless way of verifying the vendor anf  I shop with full confidnce
                                        </Text>
                                        <Text fontSize="12px" fontWeight="500" color="#ABAAAA" textAlign="right">01 - 11- 22</Text>
                                   </Box>
                                </HStack>
                        </Box>
                    )
                })
            }
        </VStack>
    </Box>
  )
}

export default UsersReview
