import { Box,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, 
    useDisclosure, Button, Input, Text, HStack, Flex, Center} from '@chakra-ui/react'
import React from 'react'
import DashboardMenu from './DashboardMenu'
import { FiLogOut } from 'react-icons/fi'
import { logoutUser } from '../../../utils/api'
import { HamburgerIcon } from '@chakra-ui/icons'



const DashboardSidebar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
     <Flex cursor="pointer" justifyContent="center" alignItems="center" bg="#008565" color="white" fontSize={20}  m="10px " h="30px" w="30px" borderRadius={5} onClick={onOpen} display={["block","block","none"]} >
          <Center><Box><HamburgerIcon m="0 auto"/></Box></Center>
      </Flex>
      
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader><Text pb="20px" fontWeight={600} fontSize="35px" color="#008565" >AmNiD</Text></DrawerHeader>

          <DrawerBody>
            <DashboardMenu/>
          </DrawerBody>

          <DrawerFooter>
              <HStack color="#FC5656">
                <FiLogOut/>
                <Text cursor="pointer" fontWeight="600" fontSize="14px" color="#FC5656" onClick={logoutUser}>Logout</Text>
              </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
 
}

export default DashboardSidebar
