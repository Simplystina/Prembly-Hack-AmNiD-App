import { Box,Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button, 
    
    Flex,
    Text,
   
    HStack,
    
    Input,
    Textarea,} from '@chakra-ui/react'
import React,{useRef, useState} from 'react'
import {AiFillStar, AiOutlineStar} from "react-icons/ai"


const RatingModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)


  const ratings = [
    {
        id:1,
        rate:"poor"
    },
    {
        id:2,
        rate:"okay"
    },
    {
        id:3,
        rate:"Good"
    },
    {
        id:4,
        rate:"V.Good"
    },
    {
        id:5,
        rate:"Excellence"
    }
  ]
  
  const [currentRate, setCurrentRate] = useState()

  const ratingsInfo = (id)=>{
    setCurrentRate(id)
  }
  return (
   <Box >
      
      
      <Modal finalFocusRef={finalRef} isOpen={onOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton onClick={()=>setCurrentRate(0)}/>
          <ModalBody>
           <Flex justifyContent="center">
                <Box m="10px auto" >
                    <Text color="#2E2E2E" fontWeight={600} fontSize="18px">Hi There, Welcome</Text>
                    <Text p="20px 0" color="#747474" fontWeight={500} fontSize="14px" >Thank you for taking your time to rate this vendor</Text> 
                    <Text color="#747474" fontWeight={600}  fontSize="15px" >How was your experience with this vendor?</Text> 
                    <HStack spacing={4} pt="10px">
                        {
                            ratings.map((rate)=>{
                                return(
                                    <Box key={rate.id} onClick={()=>ratingsInfo(rate.id)}>
                                        <Flex 
                                            border="1px solid #ABAAAA" p="18px" borderRadius={6} justifyContent="center" alignItems="center" 
                                             color={currentRate>=rate.id?"#FFCC16": "#A8A8A7"}
                                            _hover={{color:"#FFCC16"}}
                                          >
                                            {currentRate>=rate.id?<AiFillStar/>: <AiOutlineStar/>}
                                             
                                         </Flex>
                                         <Text color="#747474" fontSize="12px" fontWeight="600">{rate.rate}</Text>
                                     </Box>
                                    )
                                   })
                           }
                    </HStack>                 
                    <Box mt="20px">
                        <Text pb="10px" color="#000000" fontWeight={600} fontSize="14px" >Rating Title</Text>
                        <Input placeholder='Example; good, very good' _placeholder={{fontSize:"12px"}}/>
                    </Box>
                    <Box mt="30px">
                        <Text pb="10px" color="#000000" fontWeight={600} fontSize="14px" >Service Review</Text>
                        <Textarea h="140px" _placeholder={{fontSize:"12px"}} placeholder='Input your text'/>
                    </Box>
                    <Box mt="30px">
                        <Text pb="10px" color="#000000" fontWeight={600} fontSize="14px" >Your Name</Text>
                        <Input placeholder='Enter your name' _placeholder={{fontSize:"12px"}}/>
                    </Box>
                    <Button mt="35px" fontSize="13px" bg="#008565" w="100%" color="white">Submit Review</Button>
                </Box>  
           </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
   </Box>
  )
}

export default RatingModal
