import { Avatar, Box, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import DashboardMenu from './DashboardMenu'
import {FiLogOut} from "react-icons/fi"

const DasboardLayout = ({children}) => {
  return (
    <Flex w="full" minH="100vh">
			<Box
				w="56"
				borderRightWidth="thin"
				borderColor="gray.100"
				display={["none", "none", "block"]}
				flexShrink="0"
				h="100vh"
				position="sticky"
				top="0"
                p="10px 30px"
			>
				 <Text pb="20px" fontWeight={600} fontSize="35px" color="#008565" >AmNiD</Text>
                 <DashboardMenu/>
                <Flex pos="absolute" bottom={3}>
                    <HStack color="#FC5656">
                        <FiLogOut/>
                        <Text fontWeight="600" fontSize="14px" color="#FC5656">Logout</Text>
                    </HStack>
                </Flex>
			</Box>
			<Flex flex="1" w="full" flexDir="column" bg="#F7F7F7">
				<Flex justify="flex-end" p="20px">
                    <Avatar/>
                     <Box>
                        <Text color="#2E2E2E" fontWeight={600} fontSize="16px">J.K Stores</Text>
                        <Text color="#747474" fontWeight={500} fontSize="14px">John Kennedy</Text>
                     </Box>
                </Flex>
				{/* <Container maxW="sm" bg="white" shadow="md" rounded="md" position="relative"> */}
				<Box
					px={["2", "2", "4"]}
					h="full"
					flex="1"
					w="full"
					bg="#f3f5f7"
				>
					{children}
				</Box>
				{/* </Container> */}
			</Flex>
		</Flex>
  )
}

export default DasboardLayout
