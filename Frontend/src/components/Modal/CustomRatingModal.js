import React, {useState} from 'react'
import {Box, Flex,
    Text,
   
    HStack,
    Button,
    Input,
    Textarea, useToast} from "@chakra-ui/react"
import {AiFillStar, AiOutlineStar, AiOutlineClose} from "react-icons/ai"
import {rateAVendor} from "../../../utils/services"
import { useRouter } from 'next/router'

const CustomRatingModal = () => {
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
      const [currentRate, setCurrentRate] = useState(1)
      let [review, setReview] = useState('')
      const toast = useToast()
      const router = useRouter()

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setReview(inputValue)
  }
  const ratingsInfo = (id)=>{
    setCurrentRate(id)
  }

 
  const submitComment = async()=>{
       console.log(currentRate, review)

       const user = JSON.parse(localStorage.getItem('user'))
       const vendor_id = localStorage.getItem('vendor_id')
       console.log(user, "userrrrrrrrrrrr")
      const  values = {
        user_id : user.user_id,
        vendor_id : vendor_id,
        rate: parseInt(currentRate),
        comment : review
    }
    console.log(values)

    if(currentRate === 0){
        toast({ 
            position: "top-right",
            title: "Error picking a rating",
            description: "Please pass a suitable rating",
            status: "error",
            isClosable: true,
          });
          return
    }
       try {
        const data = await rateAVendor(values)
        console.log(data, "data")
        toast({ 
            position: "top-right",
            title: "Vendor has been rated!",
            description: "Rated successfully",
            status: "success",
            isClosable: true,
          });
        setCurrentRate(0)
        setReview('')
        const modal = document.getElementById("myModal");
        modal.style.display = "none"
        router.push('/')

       } catch (error) {
           console.log(error, "error")
           toast({ 
            position: "top-right",
            title: "Error rating vendor",
            description: error.response.data.message || "Error occurred while trying to rate",
            status: "error",
            isClosable: true,
          });
       }
  }


const closeModal =()=> {
    const modal = document.getElementById("myModal");
    console.log(modal,"modaall")
     modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it

  return (
    <>
    <Box  display="flex" justifyContent="center">
        <div id="myModal" class="modal">
            <Box w={["80%","70%",null,"50%" ]}>
             <div class="modal-content">
                <div class="modal-header">
                    <span onClick={closeModal} class="close"><AiOutlineClose/></span>
                </div>
            <div class="modal-body">
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
                        <Box mt="30px">
                            <Text pb="10px" color="#000000" fontWeight={600} fontSize="14px" >Service Review</Text>
                            <Textarea h="140px" _placeholder={{fontSize:"12px"}} placeholder='Input your text' value={review}  onChange={handleInputChange}/>
                        </Box>
                        
                          <Button mt="35px" fontSize="13px" bg="#008565" w="100%" color="white" onClick={submitComment} _hover={{color:"#008565", bg:"none"}}>Submit Review</Button>
                        </Box>  
                    </Flex>
                 </div>
                 </div>

             </Box>
        </div>
    </Box>
    </>

  )
}

export default CustomRatingModal
