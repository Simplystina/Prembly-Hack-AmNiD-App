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
    HStack,
    Center} from '@chakra-ui/react'
import React,{useEffect, useRef, useState} from 'react'
import {AiFillStar} from "react-icons/ai"
import RatingModal from './RatingModal'
import { useRouter } from 'next/router'

const VerifyModal = ({setDisplayVendor, vendor}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)
  const [showRating, setShowRating] = useState(false)
  const router = useRouter()

  const closeModal = ()=>{
    setDisplayVendor(false)

  }


  const rateVendor = ()=>{
    setDisplayVendor(false)
    const token = localStorage.getItem('token')
    if(!token){
      router.push({
        pathname:'/login'
      , query: { rating: 'true' }}
      , '/login');  
      localStorage.setItem("vendor_id", vendor.vendor_id);
      return
    }
    console.log("navigated to homePage")
    router.push({
      pathname:'/'
    , query: { homePage: 'true' }}
    , '/');  
    localStorage.setItem("vendor_id", vendor.vendor_id); //storing the vendor's Id
  }
  return (
   <Box w="50%">

      <Button mt={4} onClick={onOpen} color="green" fontStyle="italic">
        Vendor found! Click to view details
      </Button>
      <Modal closeOnOverlayClick={false} w="plenty" finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton onClick={closeModal} />
          <ModalBody>
           <Flex justifyContent="center">
                <Box m="10px auto" >
                    <Center><Img src="/images/vendor-pic.png"/></Center>
                    <Flex justifyContent="center" >
                       <Box  bg={vendor.verified? "rgba(144, 255, 169, 0.2)":"red.100"} 
                            borderRadius={6} m="10px auto">
                        <Text  p="10px"  color= {vendor.verified? "#56FC7B": "red"} fontWeight="600" fontSize={16} textAlign="center">{vendor.verified? "Verified" :"Not Verified"}
                        </Text>
                       </Box>
                    </Flex>
                    <Text textAlign="center" color="#2E2E2E" fontWeight={600} fontSize="18px" mt="15px">{vendor.vendor_id}</Text>
                    <HStack m="20px auto" spacing={6}>
                        <VStack spacing={4}>
                            <Text fontSize="18px" color="#747474" fontWeight={600}>Account Holder:</Text>
                            <Text fontSize="18px" color="#747474" fontWeight={600}>Account Number:</Text>
                            <Text fontSize="18px" color="#747474" fontWeight={600}>Bank Name:</Text>
                        </VStack>
                        <VStack spacing={4}>
                            <Text fontSize="18px" color="#747474" fontWeight={600}> {vendor.first_name + " "+ vendor.last_name}</Text>
                            <Text fontSize="18px" color="#747474" fontWeight={600}> {vendor.account_number}</Text>
                            <Text fontSize="18px" color="#747474" fontWeight={600}>{vendor.bank_name}</Text>
                        </VStack>
                        
                    </HStack>                                                                           
                    <HStack justify="center">
                        <Box  color="#FFCC16"><AiFillStar/></Box>
                        <Text fontSize={14}>...{vendor.rate}/5 out of {vendor.rating_count} ratings</Text>
                    </HStack>
                    <Text  p="40px 0" textAlign="center"  fontSize="15px" color="#008565" fontWeight={600} cursor="pointer" >See Reviews</Text>
                    
                    <Button bg="#008565" w="100%" color="white"  _hover={{color:"white"}} onClick={rateVendor}>
                          Rate this Vendor
                    </Button>
                    
                </Box>  
           </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
   </Box>
  )
}

export default VerifyModal
