import { Box, Center, Img, Text, Button, Flex } from '@chakra-ui/react'
import React from 'react'

const GetStarted = () => {
  return (
    <Box p={["20px 20px","20px 40px","30px 60px"]}  w="100%" >
        <Center mb={["20px","30px"]}>
            <Button color="white"     fontSize={[12,14]}    bg="#008565" h={["32px","32px","52px"]} w={["150px","200px","300px"]}borderRadius={6}>Get Started
            </Button>
        </Center>
        <Flex alignItems="center" w="100%" pt={["10px","30px","50px","80px"]} direction={['column',null, 'row']}>
            <Box w={["100%",null,"50%"]}>
                <Text color="#747474" fontWeight={500} fontSize={["14px","16px","20px"]} lineHeight="30px" maxW="400px" >
                    It goes beyond normal transaction,build a relationship with your custormer by gaining their trust and get connected to more custormers beyond your imagination
                 </Text>
                <Button mt={["20px","40px"]} color="white"     fontSize={[12,14]}    bg="#008565" h={["32px","32px","52px"]} w={["150px","200px","300px"]} borderRadius={6}>Get a Unique Key
            </Button>
            </Box>
            <Box w={["100%",null,"50%"]} mt={["20px",20,null,0]}>
                <Img src="/images/get-started.png"/>
            </Box>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" w="100%" pt={["50px","80px"]} direction={['column',null, 'row']}>
            <Box w={["100%",null,"50%"]}>
                <Img borderRadius={10} w="100%" src="/images/customers-pic.png"/>
            </Box>
            <Box w={["100%",null,"45%"]}>
                <Text color="#747474" fontWeight={600} fontSize={["18px","23px","28px"]} mb={["10px","20px"]} mt="10px">For Customers</Text>
                <Text color="#747474" fontWeight={500} fontSize= {["14px","16px","20px"]}lineHeight={["20px","30px"]} >
                We gaurantee a safe medium of exchange with 0 tolerance for any form of fraudulent activities.
                As long as you are dealing with a verified vendor, your transactions are safe and secured at all times.
                 </Text>
                <Button mt="40px" color="white"  fontSize={[12,14]}    bg="#008565" h={["32px","32px","52px"]} w={["150px","200px","300px"]}  borderRadius={6}>Get a Unique Key
            </Button>
            </Box>
            
        </Flex>
    </Box>
  )
}

export default GetStarted
