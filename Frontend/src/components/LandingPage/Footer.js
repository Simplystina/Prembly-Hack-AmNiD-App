import { Box, Button, Flex, HStack , SimpleGrid, Stack, Text, VStack} from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
   <Box bg="#008565" p={["10px",null,"30px"]}>
    <Flex justifyContent="center">
        <Stack direction={["column","row","row"]} justify="space-between" w={["90%","70%"]}>
           <Text color="#FFFFFF" fontWeight="600" fontSize={["20px" ,"26px" ,"32px"]} lineHeight="34px">LETS GET YOU STARTED</Text>
           <Button bg="white" w={["150px","200px","302px"]} h={["40px","40px","56px"]} borderRadius={6} color="#008565">Register Now</Button>
        </Stack>
    </Flex>
    <Box h="1px" opacity="0.3" w={["90%","80%"]} bg="white" m="30px auto"></Box>
    <SimpleGrid columns={[1,2,3,4]} m="30px auto"  w={["90%","80%"]}>
        <Flex>
            <VStack align="baseline" spacing={4}>
                <Text fontWeight="500" color="white" fontSize={["15px","20px","26px" ]} lineHeight="34px">Company</Text>
                <Text fontWeight="500" color="white" fontSize={["12px","14px","18px"]} lineHeight="24px">About</Text>
                <Text fontWeight="500" color="white" fontSize={["12px","14px","18px"]} lineHeight="24px">Service</Text>
                <Text fontWeight="500" color="white" fontSize={["12px","14px","18px"]} lineHeight="24px">Solution</Text>
                <Text fontWeight="500" color="white" fontSize={["12px","14px","18px"]} lineHeight="24px">Developers</Text>
            </VStack>
        </Flex>
        <Flex>
            <VStack align="baseline" spacing={4}>
                <Text fontWeight="500" color="white" fontSize={["15px","20px","26px" ]} lineHeight="34px">Help and Support</Text>
                <Text fontWeight="500" color="white" fontSize={["12px","14px","18px"]}lineHeight="24px">FAQs</Text>
                <Text fontWeight="500" color="white" fontSize={["12px","14px","18px"]}lineHeight="24px">Contact Us</Text>
            </VStack>
        </Flex>
        <Flex justifyContent="flex-end" >
            <VStack align="baseline" spacing={4}>
                <Text fontWeight="500" color="white" fontSize={["15px","20px","26px" ]}  lineHeight="34px">Legal</Text>
                <Text fontWeight="500" color="white" fontSize={["12px","14px","18px"]}lineHeight="24px">Privacy Policy</Text>
                <Text fontWeight="500" color="white" fontSize={["12px","14px","18px"]} lineHeight="24px">Legal Terms</Text>
            </VStack>
        </Flex>
        <Flex justifyContent="flex-end">
            <VStack  align="flex-start" spacing={4} >
                <Text fontWeight="500" color="white" fontSize={["15px","20px","26px" ]} lineHeight="34px">Join Amnid</Text>
                <Text fontWeight="500" color="white" fontSize={["12px","14px","18px"]} lineHeight="24px" >Careers</Text>
            </VStack>
        </Flex>
    </SimpleGrid>
    <Box h="1px" opacity="0.3" w="80%" bg="white" m="30px auto"></Box>
   </Box>
  )
}

export default Footer
