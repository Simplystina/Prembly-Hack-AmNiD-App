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
    Avatar,
    Center} from '@chakra-ui/react'
import React,{useEffect, useRef, useState} from 'react'
import {AiFillStar} from "react-icons/ai"
import RatingModal from './RatingModal'
import { useRouter } from 'next/router'
import {getVendorRatings} from "../../../utils/services"
import Reviews from '../../pages/dashboard/Reviews'

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

  const [ratingsData, setRatingsData] = useState([])
  const [displayReviews, setDisplayReviews] = useState(false)

    
  const Reviews = async ()=>{
      
      const values = {
          vendor_id : vendor?.vendor_id
      }
      const data = await getVendorRatings(values)
      console.log(data.data.data,"reviews dataa")
      setRatingsData(data.data.data)
  }
 useEffect(()=>{
  Reviews()
 },[])
  return (
   <Box w={["100%","80%","50%"]}>

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
                    <Text cursor="pointer" p="40px 0" textAlign="center"  fontSize="15px" color="#008565" fontWeight={600}  onClick={()=>setDisplayReviews(!displayReviews)}>See Reviews</Text>
                    {displayReviews && <VStack spacing={[[2,4]]} m="10px 0" w="100%" align="normal" h={ ratingsData.length>=3 ?"300px": "unset"} overflowY={ratingsData.length>=3 ?"scroll": "auto"}>
                       {
                        ratingsData.map((item)=>{
                            const {rater_name, rater_image, comment, rate} = item
                              return (
                              <Box  w="100%" key={item.id} bg="whitesmoke" p="20px">
                                 <Flex justifyContent="space-between" pb="10px">
                                   <HStack>
                                   
                                    <Text fontSize="15px" fontWeight="600" color="#ABAAAA">{rater_name}</Text>
                                  </HStack>
                                  <Text fontSize="12px" fontWeight="500" color="#ABAAAA">{rate} stars</Text>
                               </Flex>
                                <Text fontSize="12px" lineHeight="18px" fontWeight="500">
                               {comment}
                               </Text>
                         </Box>
                           )
                          })
                        }
                      </VStack>}
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
