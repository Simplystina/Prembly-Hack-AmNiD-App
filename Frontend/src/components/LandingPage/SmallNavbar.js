import React from 'react'
import { Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,Box,Text, useDisclosure, Button,
VStack} from "@chakra-ui/react"
import {AiOutlineMenu} from "react-icons/ai"
import  Link  from 'next/link'

export const SmallNavbar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [placement, setPlacement] = React.useState('top')

    return (
          <>
            <Button display={["block", "block", "none"]} ref={btnRef} colorScheme='teal' onClick={onOpen}>
              <AiOutlineMenu/>
            </Button>
            <Drawer
        isOpen={isOpen}
        placement='top'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton/>
          <DrawerHeader>
            <Text fontWeight={600} fontSize="30px" color="#008565">AmNiD</Text>
        </DrawerHeader>
          <DrawerBody>
          
                        <Text fontWeight={600} fontSize="14px" color="#008565">Home</Text>
                        <Text fontWeight={600} fontSize="14px" color="#008565">Support</Text>
                        <Text fontWeight={600} fontSize="14px" color="#008565">FAQ</Text>
                   
                      <VStack align="baseline">
                        
                      <Link href="/login">
                         <Button _hover={{bg:"white", color:"#008565", border:"1px solid #008565"}} bg="#008565" color="white" fontSize="14px">Login</Button>
                      </Link>
                          
                        <Link href="/signup">
                          <Button _hover={{bg:"white", color:"#008565", border:"1px solid #008565"}} bg="#008565" color="white" fontSize="14px">Register</Button>
                        </Link>
                     
                      </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
          </>
        )
      
 }



