import React, { useState } from 'react'
import { Box, Button, Flex, HStack, Img, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import {SearchIcon} from '@chakra-ui/icons'
import VerifyModal from '../Modal/VerifyModal'
import {searchAVendor } from '../../../utils/services'
import { useRouter } from 'next/router'
import RatingModal from '../Modal/RatingModal'
import CustomRatingModal from '../Modal/CustomRatingModal'

const Header = () => {

  const router = useRouter()
  const ratingsDisplay = router?.query?.homePage 
  
  console.log(router.query,ratingsDisplay,"ratingsDisplay")

  const toast = useToast()
  const [searchWord, setSearchWord] = useState('')
  const [displayVendor, setDisplayVendor] = useState(false)
  const [loading, setLoading] = useState(false)
  const [vendor, setVendor] = useState({})

  const search = async ()=>{
    setLoading(true)
    try {
      if(!searchWord){
        return
      }
      console.log(searchWord, "searchword")
      const data = await searchAVendor(searchWord)
      console.log(data.data, "dataaaaaa")
      setVendor(data.data)
      setDisplayVendor(true)
    } catch (error) {
       console.log(error.response.data, "error")
       toast({
        position: "top-right",
        title: "Search Vendor",
        description: "Vendor or Store doesn't exist",
         status: "error",
        isClosable: true,
      });
    }finally{
      setLoading(false)
      setSearchWord('')
    }
  }

  const handleChange = (e)=>{
    setDisplayVendor(false)
    setSearchWord(e.currentTarget.value)
  }

  return (
    <Flex p={["20px 30px","15px 40px","20px 60px"]} w="100%" flexDir={["column","column","row"]}>
        <Box w={["100%","100%","40%"]} mt={["30px","40px","70px"]}>
            <Text color="#008565" fontWeight={500} fontSize={["25px","30px","35px","40px"]} lineHeight="45px" textAlign={["center",null,"left"]}>
            Secure Your Online Shopping With Just A Few Clicks..
            </Text>

            <HStack m={["20px 0","40px 0"]} borderRadius={6} p="10px" border="1px solid #ABAAAA"  >
               <Input variant='unstyled'   placeholder='Search by id e.g amn001, amn002...' outline="none" value={searchWord} onChange=
               {handleChange}/>
               <SearchIcon/>
            </HStack>
            {
              loading? 
              <Button _hover={{border:"1px solid #008565", color:"#008565", bg:"white"}} color="white" bg="#008565" h={["32px","32px","52px"]} w={["150px","200px","300px"]} fontSize={[12,14]} borderRadius={6} onClick={search} isLoading>Click to search</Button>
              :
              <Button _hover={{border:"1px solid #008565", color:"#008565", bg:"white"}} color="white" bg="#008565" fontSize={[12,14]} h={["37px","42px","52px"]} w={["150px","200px","300px"]}  borderRadius={6} onClick={search}>Click to search</Button>
            }
            
          {displayVendor &&   <VerifyModal setDisplayVendor={setDisplayVendor} vendor={vendor}/>}
          {ratingsDisplay==='true'? <CustomRatingModal/>:""}
        </Box>
        <Box w={["100%",null,"60%"]}>
            <Img src="/images/laptop-img.png"/>
        </Box>
    </Flex>
  )
}

export default Header
