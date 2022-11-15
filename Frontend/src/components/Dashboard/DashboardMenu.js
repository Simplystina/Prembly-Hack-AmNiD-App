import { Box, VStack, Text, HStack, Img, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'


const DashboardMenu = () => {
  return (
    <Flex >
     <Box >
        <VStack align="baseline" spacing={6}>
            <Text fontWeight="500" fontSize="15px" lineHeight="20px" color="#747474">Home</Text>
            <Link href="/dashboard/home">
                <HStack spacing={2}>
                    <Img objectFit="contain" w="15px" h="15px" src="/icons/dashboard.png"/>
                    <Text fontWeight="600" fontSize="16px" lineHeight="20px" color="#747474">Dashboard</Text>
                </HStack>
            </Link>
            <HStack spacing={2}>
                <Img objectFit="contain" w="15px" h="15px" src="/icons/store.png"/>
                <Text fontWeight="600" fontSize="16px" lineHeight="20px" color="#747474">Store</Text>
            </HStack>
            <HStack spacing={2}>
                <Img objectFit="contain" w="15px" h="15px" src="/icons/verify.png"/>
                <Text fontWeight="600" fontSize="16px" lineHeight="20px" color="#747474">Easy Verify</Text>
            </HStack>
            <Link href="/dashboard/Reviews">
               <HStack spacing={2}>
                   <Img objectFit="contain" w="15px" h="15px" src="/icons/reviews.png"/>
                    <Text fontWeight="600" fontSize="16px" lineHeight="20px" color="#747474">Reviews</Text>
               </HStack>
            </Link>
            <Link href="/dashboard/Profile">
            <HStack spacing={2}>
                <Img objectFit="contain" w="15px" h="15px" src="/icons/reviews.png"/>
                <Text fontWeight="600" fontSize="16px" lineHeight="20px" color="#747474">Profile</Text>
            </HStack>
            </Link>
        </VStack>
       </Box>
    </Flex>
  )
}

export default DashboardMenu
