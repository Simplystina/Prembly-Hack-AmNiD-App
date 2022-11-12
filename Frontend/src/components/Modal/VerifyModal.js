import { Box,Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button, 
    Lorem, 
    Img, 
    Flex,
    Text,
    Heading,
    VStack,
    HStack} from '@chakra-ui/react'
import React,{useRef, useState} from 'react'
import {AiFillStar} from "react-icons/ai"
import RatingModal from './RatingModal'

const VerifyModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)
  const [showRating, setShowRating] = useState(false)


  return (
   <Box w="50%">

      <Button mt={4} onClick={onOpen}>
        Open Modal
      </Button>
      <Modal w="plenty" finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Flex justifyContent="center">
                <Box m="20px auto" >
                    <Img src="/images/vendor-pic.png"/>
                    <Box w="90px" h="30px" bg="rgba(144, 255, 169, 0.2)
                            " borderRadius={6} m="10px auto">
                        <Text  p="10px"  color="#56FC7B" fontWeight="600" fontSize={18}textAlign="center">Verified
                        </Text>
                    </Box>
                    <Text textAlign="center" color="#2E2E2E" fontWeight={600} fontSize="18px" mt="25px">ID:AMN10000</Text>
                    <HStack m="20px auto" spacing={6}>
                        <VStack spacing={4}>
                            <Text fontSize="18px" color="#747474" fontWeight={600}>Account Holder:</Text>
                            <Text fontSize="18px" color="#747474" fontWeight={600}>Account Number:</Text>
                            <Text fontSize="18px" color="#747474" fontWeight={600}>Bank Name:</Text>
                        </VStack>
                        <VStack spacing={4}>
                            <Text fontSize="18px" color="#747474" fontWeight={600}> John Kennedy</Text>
                            <Text fontSize="18px" color="#747474" fontWeight={600}> 02232322222</Text>
                            <Text fontSize="18px" color="#747474" fontWeight={600}>Access Bank</Text>
                        </VStack>
                        
                    </HStack>                                                                           
                    <HStack justify="center">
                        <Box  color="#FFCC16"><AiFillStar/></Box>
                        <Text fontSize={14}>...4.5/5 out of 10 ratings</Text>
                    </HStack>
                    <Text  p="40px 0" textAlign="center"  fontSize="15px" color="#008565" fontWeight={600} cursor="pointer" >See Reviews</Text>
                    <RatingModal/>
                   
                   
                </Box>  
           </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
   </Box>
  )
}

export default VerifyModal
