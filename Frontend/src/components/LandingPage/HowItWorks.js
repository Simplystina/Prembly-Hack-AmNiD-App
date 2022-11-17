import { Box, flexbox, SimpleGrid, Text , HStack, Img, VStack} from '@chakra-ui/react'
import React from 'react'


const data = [
    {
        id:1,
        img:"/icons/create-form.png",
        text:"Create An Account",
        content: "Create an account on the Amnid platform with just a few clicks"
    },
    {
        id:2,
        img:"/icons/search-icon.png",
        text:"Search For Vendor",
        content: "You can search for vendors by a vendor’s uniqe Id, or by store name"
    },
    {
        id:3,
        img:"/icons/vendor-id.png",
        text:"Verify Vendor",
        content: "Only shop with a veryfied vendor to avoid any form of untrusted deals"
    },
    {
        id: 4,
        img:"/icons/rate.png",
        text:"Rate Your Experience",
        content: "Go beyond just transacting let us know about your experience"
    },

]
const HowItWorks = () => {
  return (
    <Box p="30px 60px" w="100%" >
        <Text color="#2E2E2E" fontWeight="600" fontSize="26px" textAlign="center">How it Works</Text>
        <SimpleGrid columns={[4]} mt="30px" spacing={4}>
           {
            data.map((item)=>{
               return (
                  <VStack key={item.id} boxShadow="0px 2px 0px 0px rgba(0, 133, 101, 1) 
                  " spacing={4} alignItems="center" p="20px 10px"  borderBottomRadius={6}>
                     <Img w="60px" h="60px" src={item.img}/>
                        <Text mb="15px" color="#008565" fontWeight="600" fontSize="16px">{item.text}</Text>
                        <Text maxW="500px" textAlign="center" color="#2E2E2E" fontWeight={500} fontSize="14px" lineHeight="17px">{item.content}</Text>
                  </VStack>
           
               )
            })
           }
          
        </SimpleGrid>
    </Box>
  )
}

export default HowItWorks
