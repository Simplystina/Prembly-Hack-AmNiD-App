import { Box, Modal,
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
    IconButton,
    Input,
    Textarea, useToast} from '@chakra-ui/react'
import React,{useRef, useState} from 'react'
import { createStore } from '../../../utils/services'


const CreateStoreModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = useRef(null)

    const toast = useToast()

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [twitter, setTwitter] = useState('')
    const [facebook, setFacebook] = useState('')
    const [tiktok, setTiktok] = useState('')
    const [instagram, setInstagram] = useState('')


    const [nameError, setNameError] = useState('')
    const [descError, setDescError] = useState('')

    const clearInputs =() =>{
        setName('')
        setDesc('')
        setTwitter('')
        setFacebook('')
        setTiktok('')
        setInstagram('')
    }

    const submit = async ()=>{
    
        console.log(name)
             
        if(name.trim()=== '' && desc.trim()=== ''){
            setNameError('Name is required')
            setDescError('Description is required')
            return
        }
      
        if(name.trim()=== ''){
            setNameError('Name is required')
            return
        }
        if(desc.trim()=== ''){
            setDescError('Description is required')
            return
        }
        if(name.length <= 3){
            setNameError('Name should be more than 3 characters')
            return
        }
        
        setNameError('')
        setDescError('')

        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user, "userrrrrrrrrrrr")
        
        const values = {
            
        }
        values.user_id = user.user_id
        values.name = name
        values.description = desc
        

        if( facebook || tiktok || twitter || instagram){
            values.social_media = {}
        }
       
       
        if (facebook){
            values.social_media.facebook = facebook
        }
        if(twitter){
            values.social_media.twitter = twitter
        }
        if(tiktok){
            values.social_media.tiktok = tiktok
        }
        if(instagram){
            values.social_media.instagram = instagram
        }

        console.log(values, "valuesssssssss")


      
        
        try {
            const data = await createStore(values)
            console.log(data, "dataa create store")
            clearInputs()
            toast({
                position: "top-right",
                title: "store created successfully",
                description: "store has been created",
                 status: "success",
                isClosable: true,
              });
              const closeModal = () => onClose()
              closeModal()
        } catch (error) {
            console.log(error,"err")
            toast({
                position: "top-right",
                title: "store creation failed",
                description: error.response.data.message || "ensure details are unique",
                 status: "error",
                isClosable: true,
              });
        }
    }

  return (
    <Box >
        <Button _hover={{border:"1px solid #747474", color:"#747474", bg:"white" }} bg="#747474" color="white" w="100%" onClick={onOpen}>
        Create a new store
        </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton onClick={clearInputs}/>
          <ModalBody w="100%" >
          
                <Box m="10px auto" >
                    <Text color="#2E2E2E" fontWeight={600} fontSize="18px">Click to create a store</Text>
                    <Text color="#747474" fontWeight={500} fontSize="14px" ></Text>              
                    <Box mt="10px">
                        <Text pb="10px" color="#000000" fontWeight={600} fontSize="14px" >Store Name</Text>
                        <Input placeholder='Example; good, very good' _placeholder={{fontSize:"12px"}} value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
                        <Text pb="5px" color="red" fontWeight={500} fontSize="10px" >{nameError}</Text>
                    </Box>
                    <Box mt="15px">
                        <Text pb="10px" color="#000000" fontWeight={600} fontSize="14px" >Description</Text>
                        <Textarea h="100px" _placeholder={{fontSize:"12px"}} placeholder='Input your text' value={desc} onChange={(e)=>setDesc(e.currentTarget.value)}/>
                        <Text pb="5px" color="red" fontWeight={500} fontSize="10px" >{descError}</Text>
                    </Box>
                    <Box mt="15px">
                        <Text pb="10px" color="#000000" fontWeight={600} fontSize="14px" >Facebook</Text>
                        <Input placeholder='Enter your name' _placeholder={{fontSize:"12px"}}  onChange={(e)=>setFacebook(e.currentTarget.value)}/>
                    </Box>
                    <Box mt="15px">
                        <Text pb="10px" color="#000000" fontWeight={600} fontSize="14px" >Twitter</Text>
                        <Input placeholder='Enter your name' _placeholder={{fontSize:"12px"}}  onChange={(e)=>setTwitter(e.currentTarget.value)}/>
                    </Box>
                    <Box mt="15px">
                        <Text pb="10px" color="#000000" fontWeight={600} fontSize="14px" >Instagram</Text>
                        <Input placeholder='Enter your name' _placeholder={{fontSize:"12px"}}  onChange={(e)=>setInstagram(e.currentTarget.value)}/>
                    </Box>
                    <Box mt="15px">
                        <Text pb="10px" color="#000000" fontWeight={600} fontSize="14px" >Tiktok</Text>
                        <Input placeholder='Enter your name' _placeholder={{fontSize:"12px"}}  onChange={(e)=>setTiktok(e.currentTarget.value)}/>
                    </Box>
                    
                    <Button mt="15px" fontSize="13px" bg="#008565" w="100%" color="white" onClick={submit}>Submit Review</Button>
                </Box>  
           
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default CreateStoreModal
