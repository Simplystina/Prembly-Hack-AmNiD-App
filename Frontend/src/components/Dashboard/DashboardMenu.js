import { Box, VStack, Text, HStack, Img, Flex, Link as ChakraLink, } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useRouter } from "next/router";


const DashboardMenu = () => {

    const router = useRouter()

    const menu = [
        {
            id: 1,
            title: "Dashboard",
            path: "/dashboard/home",
            icon: "/icons/dashboard.png",
        },
        {
            id: 2,
            title: "Store",
            path: "/dashboard/stores",
            icon: "/icons/store.png",
        },
        {
            id: 3,
            title: "Verification",
            path: "/dashboard/verification",
            icon: "/icons/verify.png",
        },
        { 
            id: 4,
            title: "Reviews",
            path: "/dashboard/Reviews",
            icon: "/icons/reviews.png",
        },
        {
            id: 5,
            title: "Profile",
            path: "/dashboard/Profile",
            icon: "/icons/reviews.png",

        },
    
       
        
    ]
  return (
    <Flex >
     <Box >
        <VStack align="baseline" spacing={6}>
            <Text fontWeight="500" fontSize="15px" lineHeight="20px" color="#747474">Home</Text>
            {
                menu.map((page)=>{
                    const linkIsActive = router.pathname.startsWith(page.path);
                    return (
                      <ChakraLink textDecoration="none" as={Link} key={page.id} href={page.path}>
                          <HStack spacing={2}>
                          <Img opacity={linkIsActive ? "1" : "0.5"} 
								objectFit="contain" w="15px" h="15px" src={page.icon}/>
                          <Text  color={linkIsActive ? "#008565" : "#747474"} fontWeight="600" fontSize="16px" lineHeight="20px" >{page.title}</Text>
                          </HStack>
                      </ChakraLink>
           
                    )
                })
            }
        </VStack>
       </Box>
    </Flex>
  )
}

export default DashboardMenu
