import { Box, Button, Flex, Img, Text } from '@chakra-ui/react'
import React from 'react'

const AboutUs = () => {
  return (
    <Flex p={["20px 30px","20px 40px","30px 60px"]} w="100%" justifyContent="space-between" alignItems="center" flexDir={["column","column","row"]}>
        <Box w={["100%",null,"50%"]} >
            <Img borderRadius="14px" objectFit="contain" w="100%" src="/images/about-us.png"/>
        </Box>
        <Box w={["100%",null,"45%"]}>
            <Text color="#2E2E2E" fontWeight="600" fontSize={["18px","22px","26px"]}>
            About AmNiD
            </Text>
            <Text p="20px 0" color="#747474" fontWeight={500} fontSize={["12px","16px"]} lineHeight={["25px","30px"]}>
               Amnid is a secure and reliable platform that aids in customer and vendor verification to promote trust and lessen fraudulents act.
            </Text>
            <Text color="#747474" fontWeight={500} fontSize={["12px","16px"]}lineHeight="34px">
                Amnid uses the identity pass API to guarantee the security of online transactions and make it possible for both parties to have their identities verified..
            </Text>
            <Button mt="10px" borderRadius={6} color="#008565" border="1px solid #008565" bg="#ffffff">Learn More</Button>
        </Box>
    </Flex>
  )
}

export default AboutUs
