import { Box, SimpleGrid, Text, Img ,Thead, Table,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption, HStack,
    TableContainer,} from '@chakra-ui/react'
import React,{useState, useEffect} from 'react'
import {getAllStores} from "../../../../utils/services"
import { AiFillFacebook, AiFillTwitterSquare, AiOutlineInstagram } from 'react-icons/ai'
import {SiTiktok} from "react-icons/si"
import {MdModeEdit, MdDelete} from "react-icons/md"

const Store = () => {

    const data = [1,2,3,4,5]
    const [id, setId] = useState()
    const [stores, setStores] = useState([])

    const getStores = async ()=>{
        const user = JSON.parse(localStorage.getItem('user'))
       console.log(user.user_id, "iddddddddddd")
       try {
        const data = await getAllStores(user.user_id)
        console.log(data.data.stores, "dattaaa")
        setStores(data.data.stores)
       } catch (error) {
        console.log(error)
       }
    }

   
   
    useEffect(()=>{
        getStores()
    },[])
  return (
    <Box pb="50px" w="50%"  borderRadius={6} m="20px 0" >
        <Text color="#ABAAAA" fontSize="20px" fontWeight={500}>Stores</Text>
        
        <TableContainer variant="unstyled">
            <Table variant="unstyled">
                <Thead>
                <Tr textTransform="capitalize" bg="white" borderRadius={6}>
                    <Th textTransform="capitalize" fontSize="17px" color="#747474" fontWeight={500} >Store</Th>
                    <Th fontWeight={500}  textTransform="capitalize" fontSize="16px" color="#747474">Description</Th>
                    <Th fontWeight={500} textTransform="capitalize" fontSize="16px" color="#747474">Social</Th>
                    <Th fontWeight={500}  textTransform="capitalize" fontSize="16px" color="#747474">Action</Th>
                </Tr>
               </Thead>
               <Tbody>
                  {
                    stores.map((item)=>{
                        return (
                        <Tr key={item.id} bg="white" m="20px 0">
                            <Td fontSize="16px" color="#747474" fontWeight="500">{item.name}</Td>
                            <Td fontSize="16px" color="#747474" fontWeight="500">{item.description}</Td>
                            <Td isNumeric>
                                <HStack color="#008565">
                                    <AiFillFacebook/>
                                    <AiOutlineInstagram/>
                                    <AiFillTwitterSquare/>
                                    <SiTiktok/>
                                </HStack>
                            </Td>
                            <Td>
                                <HStack>
                                    <Box color="green">
                                       <MdModeEdit/>
                                    </Box>
                                    <Box color="red"><MdDelete/></Box>
                                </HStack>
                            </Td>
                        </Tr>
                        )
                    })
                  }
            </Tbody>
        </Table>
        </TableContainer>
   
    </Box>
  )
}

export default Store
