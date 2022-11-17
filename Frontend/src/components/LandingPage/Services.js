import { Box , HStack, Img, SimpleGrid, Text} from '@chakra-ui/react'
import React from 'react'


const services =[
   {
      id: 1,
      title: "Get A Unique AmNiD ID",
      content:"Get a unique amnid key to share with your custormers accross all platforms",
      img:"/icons/id-card.png"
   },
   {
      id: 2,
      title: "Building Trust",
      content:"We understand the risk, when it comes to online transaction so we help you build trust and grow your busniness.",
      img:"/icons/trust-icon.png"
   },
   {
      id: 3,
      title: "Become a Buyer or Seller",
      content:"Easily switch from buyers account to become a seller with just a few steps.",
      img:"/icons/buySell-icon.png"
   }
]
const Services = () => {
  return (
    <Box  p="30px 60px" w="100%" >

        <Text color="#2E2E2E" fontWeight="600" fontSize="26px" textAlign="center">Our Services</Text>
        <SimpleGrid columns={[3]} mt="30px" spacing={4}>
           {
            services.map((item)=>{
               return (
                  <HStack key={item.id} boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.1)" p="20px 20px 30px 20px" spacing={4} alignItems="flex-start">
                     <Img w="60px" h="60px" src={item.img}/>
                     <Box maxW="200px">
                        <Text mb="15px" color="#2E2E2E" fontWeight="600" fontSize="16px">{item.title}</Text>
                        <Text color="#747474" fontWeight={500} fontSize="14px" lineHeight="17px">{item.content}</Text>
                     </Box>
                  </HStack>
           
               )
            })
           }
          
        </SimpleGrid>
    </Box>
  )
}

export default Services
