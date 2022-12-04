import { Box, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    HStack, Flex, Img  } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiFillFacebook, AiFillTwitterSquare, AiOutlineInstagram } from 'react-icons/ai'
import {SiTiktok} from "react-icons/si"
import {MdModeEdit, MdDelete} from "react-icons/md"
import {getAllStores} from "../../../utils/services"
import EditStoreModal from '../Modal/EditStoreModal'

const StoreTableComponent = () => {

    const data = [1,2,3,4,5]
    const [id, setId] = useState()
    const [stores, setStores] = useState([])

    const getStores = async ()=>{
        const user = JSON.parse(localStorage.getItem('user'))
       console.log(user?.user_id, "iddddddddddd")
       try {
        const data = await getAllStores(user.user_id)
        console.log(data.data.stores, "dattaaa")
        setStores(data.data.stores)
       } catch (error) {
        console.log(error)
       }
    }


    const editStore = ()=>{

    }
   
   
    useEffect(()=>{
        getStores()
    },[])
  return (
    <Box bg="white" borderRadius={6} m="20px 0" >
        {
            stores.length ===0?
        <Flex  w="100%" h="300px">
            <Img objectFit="contain"  m="0 auto" src="/images/no-store.png"/>
        </Flex>
        :
            <TableContainer variant="unstyled">
            <Table variant="unstyled">
                <Thead>
                    <Tr textTransform="capitalize">
                    <Th textTransform="capitalize" fontSize={["14px","16px"]} color="#747474" fontWeight={500} >Store Name</Th>
                    <Th fontWeight={500}  textTransform="capitalize" fontSize={["14px","16px"]} color="#747474">Description</Th>
                    <Th fontWeight={500} textTransform="capitalize" fontSize={["14px","16px"]} color="#747474">Social</Th>
                    <Th fontWeight={500}  textTransform="capitalize" fontSize={["14px","16px"]} color="#747474">Action</Th>
                </Tr>
               </Thead>
               <Tbody>
                  {
                    stores.map((item)=>{
                        return (
                        <Tr key={item.id}>
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
                                    <EditStoreModal id={item.id}/>
                                    <Box color="red"><MdDelete/></Box>
                                </HStack>
                            </Td>
                        </Tr>
                        )
                    })
                  }
            </Tbody>
        </Table>
        </TableContainer>}
    </Box>
                
  )
}

export default StoreTableComponent
