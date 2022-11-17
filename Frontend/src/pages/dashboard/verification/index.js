import { Box, HStack, Text , VStack, Stack, useToast, Input, Button, Img} from '@chakra-ui/react'
import React from 'react'
import usersLayout from '../../../components/HOC/usersLayout'
import { useFormik } from 'formik';
 import * as Yup from 'yup';
 import Link from 'next/link'
 
 import { useRouter } from "next/router";
 import jwt_decode from 'jwt-decode'

const index = () => {

    const toast = useToast()
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
           email:"",
           password:""
        
        },
        validationSchema: Yup.object({
		email: Yup.string().email().required("email is required"),
        password: Yup.string().required("password is required"),

        }),
        onSubmit: async (values, {resetForm}) => {
            
         
        },
      });

  return (
    <Box>
        <HStack>
           <Text color="#747474" fontSize="25px" fontWeight="500">Dashboard</Text>
           <Text color="#747474" fontSize="18px" fontWeight="600">-Verification</Text>
        </HStack>
        <Text pt="5px" color="#747474" fontSize="16px" fontWeight="600">Vendor Verification</Text>
        <Box m="40px ">
        <form onSubmit={formik.handleSubmit}>
                                
            <Stack w="70%" spacing="4">
                
               
                 <HStack align="baseline">
                    <Text w="20%" fontWeight="700" fontSize={["12px","14px"]} color="#747474">Account Number</Text>
                    <Input 
                        w="70%"
                         p="25px"
                        name="email" type="text"
                        placeholder="Enter your account number" 
                        fontSize={["12px","14px"]} color="#4F4F4F" 
                        bg="#ffffff"
                        id="email"
                        {...formik.getFieldProps('account_number')}
                        border="1.5px solid #4E598C"/>
                        {formik.touched.account_number && formik.errors.account_number ? (
                        <Text fontWeight="500" fontSize="10px" color="red">{formik.errors.account_number}</Text>
                        ) : null}
                 </HStack>
                 <HStack align="baseline">
                    <Text w="20%" fontWeight="700" fontSize={["12px","14px"]} color="#747474">Bank Name</Text>
                    <Input 
                        w="70%"
                         p="25px"
                        name="password" type="text"
                        placeholder="Enter your bank name" 
                        fontSize={["12px","14px"]} color="#4F4F4F" 
                        bg="#ffffff"
                        id="password"
                        {...formik.getFieldProps('bank_name')}
                        border="1.5px solid #4E598C"/>
                        {formik.touched.bank_name && formik.errors.bank_name ? (
                        <Text fontWeight="500" fontSize="10px" color="red">{formik.errors.bank_name}</Text>
                        ) : null}
                 </HStack>
                 <HStack align="baseline">
                    <Text w="20%" fontWeight="700" fontSize={["12px","14px"]} color="#747474">Account Name</Text>
                    <Input 
                        w="70%"
                         p="25px"
                        name="password" type="text"
                        placeholder="Enter your account name" 
                        fontSize={["12px","14px"]} color="#4F4F4F" 
                        bg="#ffffff"
                        id="account_name"
                        {...formik.getFieldProps('account_name')}
                        border="1.5px solid #4E598C"/>
                        {formik.touched.account_name && formik.errors.account_name ? (
                        <Text fontWeight="500" fontSize="10px" color="red">{formik.errors.account_name}</Text>
                        ) : null}
                 </HStack>
                 <HStack align="baseline">
                    <Text w="20%" fontWeight="700" fontSize={["12px","14px"]} color="#747474">BVN</Text>
                    <Input 
                        w="70%"
                         p="25px"
                        name="bvn" type="text"
                        placeholder="Enter your bank name" 
                        fontSize={["12px","14px"]} color="#4F4F4F" 
                        bg="#ffffff"
                        id="bvn"
                        {...formik.getFieldProps('bvn')}
                        border="1.5px solid #4E598C"/>
                        {formik.touched.bvn && formik.errors.bvn ? (
                        <Text fontWeight="500" fontSize="10px" color="red">{formik.errors.bvn}</Text>
                        ) : null}
                 </HStack>
                 
                 
                  <HStack>
                    <Img src="/icons/face-capture.png"/>
                  <Text fontSize="20px" fontWeight={600} color="rgba(0, 133, 101, 1)" p="10px 0">
                     Face Capture
                  </Text>
                  </HStack>
                  <Text fontSize="14px" fontWeight={400} color="rgba(0, 0, 0, 1)" p="10px 0" >
                    By checking this box you agree to <Link href="/signup">
                    <span style={{color:"rgba(0, 133, 101, 1)", fontWeight:"700"}}>AMnid Terms and Conditions</span></Link>
                  </Text>      
                  <Button 
                  color="#ffffff" 
                  bg="#CCCCCC" 
                  w="full"
                  type='submit'
                  > Verify
                    </Button>   
                       
            </Stack>

                                
        </form>
        </Box>
    </Box>
  )
}

export default usersLayout(index)
