import { Box, SimpleGrid, Text, Img } from '@chakra-ui/react'
import React from 'react'

const Store = () => {

    const store = [
        1,2
    ]
  return (
    <Box pb="50px" w="50%">
        <Text color="#ABAAAA" fontSize="20px" fontWeight={500}>Stores</Text>
        <SimpleGrid columns={2} spacing={5}>
            {
                store.map(()=>{
                    return(
                        <Box borderRadius={6}>
                            <Img w="100%" src="/images/store-img.png"/>
                            <Box w="100%" p="30px 20px" bg="white">
                                <Text fontSize="20px" fontWeight="600" color="#747474">J.k Home Appliances</Text>
                                <Text fontSize="14px" fontWeight="500" color="#747474">
                                Looking to modernize your home with dazzling looking appliances
                                </Text>
                            </Box>
                        </Box>
                    )
                })
            }
        </SimpleGrid>
    </Box>
  )
}

export default Store
