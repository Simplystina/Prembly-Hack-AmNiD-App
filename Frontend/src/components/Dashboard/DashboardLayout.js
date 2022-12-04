import { Avatar, Box, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import DashboardMenu from './DashboardMenu'
import {FiLogOut} from "react-icons/fi"
import { logoutUser } from '../../../utils/api'
import { useRouter } from 'next/router'
import DashboardSidebar from './DashboardSidebar'

const DasboardLayout = ({children}) => {

	
  return (
    <Flex  w="full" >
			<Box 
				w="56"
				borderRightWidth="thin"
				borderColor="gray.100"
				display={["none", "none", "block"]}
				flexShrink="1"
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
                        <Text cursor="pointer" fontWeight="600" fontSize="14px" color="#FC5656" onClick={logoutUser}>Logout</Text>
                    </HStack>
                </Flex>
			</Box>

			<Flex  minWidth="0"
					 minH="0"
					 overflowX="hidden" flexDir="column" bg="#F7F7F7" flex="1">
			
				<Flex w="100%" justifyContent="space-between" display={["flex","flex","none"]}>
					<DashboardSidebar/>
				    <Flex justify="flex-end" p="20px">
                        <Avatar/>
                     <Box>
                        <Text color="#2E2E2E" fontWeight={600} fontSize="16px">J.K Stores</Text>
                        <Text color="#747474" fontWeight={500} fontSize="14px">John Kennedy</Text>
                     </Box>
                    </Flex>
				</Flex>
				<Flex justify="flex-end" p="20px" display={["none", "none", "flex"]}>
                        <Avatar/>
                     <Box>
                        <Text color="#2E2E2E" fontWeight={600} fontSize="16px">J.K Stores</Text>
                        <Text color="#747474" fontWeight={500} fontSize="14px">John Kennedy</Text>
                     </Box>
                </Flex>
				
				<Box
				    
					px={["4", "4", "4"]}
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
