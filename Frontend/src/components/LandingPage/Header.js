import React from 'react'
import { Box, Button, Flex, HStack, Img, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import {SearchIcon} from '@chakra-ui/icons'
import VerifyModal from '../Modal/VerifyModal'

const Header = () => {
  return (
    <Flex p="20px 60px" w="100%">
        <Box w="40%" mt="70px">
            <Text color="#008565" fontWeight={500} fontSize="40px" lineHeight="45px">
            Secure Your Online Shopping With Just A Few Clicks..
            </Text>

            <HStack m="40px 0" borderRadius={6} p="10px" border="1px solid #ABAAAA"  >
               <Input variant='unstyled'   placeholder='Search by vendor Id, product, store name...' outline="none"/>
               <SearchIcon/>
            </HStack>
            <Button color="white" bg="#008565" h="52px" w="300px"  borderRadius={6}>Click to search</Button>
            <VerifyModal/>
        </Box>
        <Box w="60%">
            <Img src="/images/laptop-img.png"/>
        </Box>
    </Flex>
  )
}

export default Header
