import { Box, VStack, Text, HStack, Img, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useRouter } from "next/router";


const DashboardMenu = () => {

    const router = useRouter()
  return (
    <Flex >
     <Box >
        <VStack align="baseline" spacing={6}>
            <Text fontWeight="500" fontSize="15px" lineHeight="20px" color="#747474">Home</Text>
            <Link href="/dashboard/home" className={router.pathname == "/dashboard/home" ? "active" : "non_active"}>
                <HStack spacing={2}>
                    <Img objectFit="contain" w="15px" h="15px" src="/icons/dashboard.png"/>
                    <Text fontWeight="600" fontSize="16px" lineHeight="20px" >Dashboard</Text>
                </HStack>
            </Link>
            <Link href="/dashboard/stores" className={router.pathname == "/dashboard/stores" ? "active" : "non_active"}>
            <HStack spacing={2}>
                <Img objectFit="contain" w="15px" h="15px" src="/icons/store.png"/>
                <Text fontWeight="600" fontSize="16px" lineHeight="20px" >Store</Text>
            </HStack>
            </Link>
            <Link href="/dashboard/verification" className={router.pathname == "/dashboard/verification" ? "active" : "non_active"}>
            <HStack spacing={2}>
                <Img objectFit="contain" w="15px" h="15px" src="/icons/verify.png"/>
                <Text fontWeight="600" fontSize="16px" lineHeight="20px" >Easy Verify</Text>
            </HStack>
            </Link>
            <Link href="/dashboard/Reviews" className={router.pathname == "/dashboard/Reviews" ? "active" : "non_active"}>
               <HStack spacing={2}>
                   <Img objectFit="contain" w="15px" h="15px" src="/icons/reviews.png"/>
                    <Text fontWeight="600" fontSize="16px" lineHeight="20px" >Reviews</Text>
               </HStack>
            </Link>
            <Link href="/dashboard/Profile" className={router.pathname == "/dashboard/Profile" ? "active" : "non_active"}>
            <HStack spacing={2}>
                <Img objectFit="contain" w="15px" h="15px" src="/icons/reviews.png"/>
                <Text fontWeight="600" fontSize="16px" lineHeight="20px" >Profile</Text>
            </HStack>
            </Link>
        </VStack>
       </Box>
    </Flex>
  )
}

export default DashboardMenu
