import { Box, Button, Flex, HStack , SimpleGrid, Text, VStack} from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
   <Box bg="#008565" p="30px">
    <Flex justifyContent="center">
        <HStack justify="space-between" w="70%">
           <Text color="#FFFFFF" fontWeight="600" fontSize="32px" lineHeight="34px">LETS GET YOU STARTED</Text>
           <Button bg="white" w="302px" h="56px" borderRadius={6} color="#008565">Register Now</Button>
        </HStack>
    </Flex>
    <Box h="1px" opacity="0.3" w="80%" bg="white" m="30px auto"></Box>
    <SimpleGrid columns={[4]} m="30px auto"  w="80%">
        <Flex>
            <VStack align="baseline" spacing={4}>
                <Text fontWeight="500" color="white" fontSize="26px" lineHeight="34px">Company</Text>
                <Text fontWeight="500" color="white" fontSize="18px" lineHeight="24px">About</Text>
                <Text fontWeight="500" color="white" fontSize="18px" lineHeight="24px">Service</Text>
                <Text fontWeight="500" color="white" fontSize="18px" lineHeight="24px">Solution</Text>
                <Text fontWeight="500" color="white" fontSize="18px" lineHeight="24px">Developers</Text>
            </VStack>
        </Flex>
        <Flex>
            <VStack align="baseline" spacing={4}>
                <Text fontWeight="500" color="white" fontSize="26px" lineHeight="34px">Help and Support</Text>
                <Text fontWeight="500" color="white" fontSize="18px" lineHeight="24px">FAQs</Text>
                <Text fontWeight="500" color="white" fontSize="18px" lineHeight="24px">Contact Us</Text>
            </VStack>
        </Flex>
        <Flex justifyContent="flex-end" >
            <VStack align="baseline" spacing={4}>
                <Text fontWeight="500" color="white" fontSize="26px" lineHeight="34px">Legal</Text>
                <Text fontWeight="500" color="white" fontSize="18px" lineHeight="24px">Privacy Policy</Text>
                <Text fontWeight="500" color="white" fontSize="18px" lineHeight="24px">Legal Terms</Text>
            </VStack>
        </Flex>
        <Flex justifyContent="flex-end">
            <VStack  align="flex-start" spacing={4} >
                <Text fontWeight="500" color="white" fontSize="26px" lineHeight="34px">Join Amnid</Text>
                <Text fontWeight="500" color="white" fontSize="18px" lineHeight="24px" >Careers</Text>
            </VStack>
        </Flex>
    </SimpleGrid>
    <Box h="1px" opacity="0.3" w="80%" bg="white" m="30px auto"></Box>
   </Box>
  )
}

export default Footer
