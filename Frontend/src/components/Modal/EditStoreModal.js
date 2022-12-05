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
import React,{useEffect, useRef, useState} from 'react'
import { createStore, getAStore,updateAStore,updateAStoreSocialMedia } from '../../../utils/services'
import {MdModeEdit, MdDelete} from "react-icons/md"





const EditStoreModal = ({id}) => {
   
    console.log(typeof id, "Store id")
   

   
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


    const getStore = async()=>{

        const values = {
                    store_id:id
                   }
 
        const {data} = await getAStore(values)
        console.log(data,data?.social_media?.facebook, "store data")
        setName(data?.name)
        setDesc(data?.description)
        setTwitter(data?.social_media?.twitter)
        setFacebook(data?.social_media?.facebook)
        setTiktok(data?.social_media?.tiktok)
        setInstagram(data?.social_media?.instagram)
    }


    useEffect(()=>{
        getStore()
    },[])
    const submit = async ()=>{

             
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
        
       
        const storeValues = {}
        storeValues.store_id = id,
        storeValues.user_id = user.user_id
        storeValues.name = name
        storeValues.description = desc
        

        const socialmediavalues = {}
        socialmediavalues.store_id = id,
        socialmediavalues.user_id = user.user_id

        if( facebook || tiktok || twitter || instagram){
            socialmediavalues.social_media = {}
        }
       
       
        if (facebook){
            socialmediavalues.social_media.facebook = facebook
        }
        if(twitter){
            socialmediavalues.social_media.twitter = twitter
        }
        if(tiktok){
            socialmediavalues.social_media.tiktok = tiktok
        }
        if(instagram){
            socialmediavalues.social_media.instagram = instagram
        }

        console.log(socialmediavalues, "valuesssssssss")


      
        
        try {
            const updatedData = await updateAStore(storeValues)
            const updatedSocialMediaData = await updateAStoreSocialMedia(socialmediavalues)
            //updateAStore,updateAStoreSocialMedia
            console.log(updatedSocialMediaData,updatedData, "dataa create store")
            clearInputs()
            toast({
                position: "top-right",
                title: "store updated successfully",
                description: "store has been updated",
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
        <Button bg="green" color="white" _hover={{bg:"white",color:"green", border:"1px solid green"}} fontSize={40} w="70%" h="30px" onClick={onOpen}>
          <MdModeEdit/>
        </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton onClick={clearInputs}/>
          <ModalBody w="100%" >
          
                <Box m="10px auto" >
                    <Text color="#2E2E2E" fontWeight={600} fontSize="18px">Edit store</Text>
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
                        <Input placeholder='Enter your name' _placeholder={{fontSize:"12px"}} value={facebook}  onChange={(e)=>setFacebook(e.currentTarget.value)}/>
                    </Box>
                    <Box mt="15px">
                        <Text pb="10px" color="#000000" fontWeight={600} fontSize="14px" >Twitter</Text>
                        <Input placeholder='Enter your name' _placeholder={{fontSize:"12px"}} value={twitter}  onChange={(e)=>setTwitter(e.currentTarget.value)}/>
                    </Box>
                    <Box mt="15px">
                        <Text pb="10px" color="#000000" fontWeight={600} fontSize="14px" >Instagram</Text>
                        <Input placeholder='Enter your name' _placeholder={{fontSize:"12px"}} value={instagram} onChange={(e)=>setInstagram(e.currentTarget.value)}/>
                    </Box>
                    <Box mt="15px">
                        <Text pb="10px" color="#000000" fontWeight={600} fontSize="14px" >Tiktok</Text>
                        <Input placeholder='Enter your name' _placeholder={{fontSize:"12px"}} value={tiktok}  onChange={(e)=>setTiktok(e.currentTarget.value)}/>
                    </Box>
                    
                    <Button mt="15px" fontSize="13px" bg="#008565" w="100%" color="white" _hover={{bg:"#008565"}} onClick={submit}>update store</Button>
                </Box>  
           
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default EditStoreModal
