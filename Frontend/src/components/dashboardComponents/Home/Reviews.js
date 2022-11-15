import { Avatar, Box, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Reviews = () => {
    const reviews = [
        1, 2,3
    ]
  return (
    <Box w="45%">
        <Flex justifyContent="space-between">
            <Text color="#ABAAAA" fontSize="20px" fontWeight={500}>Reviews</Text>
            <Text color="#008565" fontSize="15px" fontWeight={500}>All Reviews</Text>
        </Flex>
        <VStack spacing={[4]}>
            {
                reviews.map(()=>{
                    return (
                        <Box bg="white" p="20px">
                            <Flex justifyContent="space-between" pb="10px">
                                <HStack>
                                    <Avatar/>
                                    <Text fontSize="15px" fontWeight="600" color="#ABAAAA">John Nate</Text>
                                </HStack>
                                <Text fontSize="12px" fontWeight="500" color="#ABAAAA">01 - 11- 22</Text>
                            </Flex>
                            <Text fontSize="12px" lineHeight="18px" fontWeight="500">
                            I have always been afraid of shopping online since the last time I went through a lot of stress and lost a whole lots of money...
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
