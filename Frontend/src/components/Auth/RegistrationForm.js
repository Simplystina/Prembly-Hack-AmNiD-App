import { Box, Input, Text, VStack, Select, Stack, Button, Flex, useToast } from '@chakra-ui/react'
import React from 'react'
import { useFormik } from 'formik';
 import * as Yup from 'yup';
 import { registerUser } from '../../../utils/services';
 import { useRouter } from "next/router";
import Link from 'next/link';

const RegistrationForm = () => {

    const toast = useToast()
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
          first_name: '',
          last_name: '',
          email: '',
          password: "",
        },
        validationSchema: Yup.object({
         first_name: Yup.string().required("first name is required"),
         last_name: Yup.string().required("last name is required"),
         email: Yup.string().email('Invalid email').required('Required'),
         password: Yup.string().required("password is required")
         
        }),
        onSubmit: async (values, { setSubmitting, resetForm })=> {
            
          console.log("submitted details", values)
          try {
            
            setSubmitting(true);
            const data  = await registerUser(values);
             console.log(data, "dataa")

             if(data.message === "User created!"){
              toast({ 
                position: "top-right",
                title: "Sign up Info",
                description: data.message,
                status: "success",
                isClosable: true,
              });
              console.log(data, "dataaaaaaa")
              const { redirect: redirectUrl = "/login" } =
                router.query;
              router.push(redirectUrl);
              resetForm();
              return
             }

            toast({ 
              position: "top-right",
              title: "Successfully registered",
              description: data.message,
              status: "error",
              isClosable: true,
            });
            console.log(data, "dataaaaaaa")
        
          } catch (error) {
            console.log(error, "erorrr")
            toast({
              position: "top-right",
              title: "Signup failed",
              description: data.message,
               status: "error",
              isClosable: true,
            });
          } finally {
            setSubmitting(false);
          
          }
        },
      });

  return (
    <Box p="20px">
        <Text fontWeight={600} fontSize="16px" color="#008767" textAlign="right">Need Any Help?</Text>

        <Box m="40px 80px">
        <form onSubmit={formik.handleSubmit}>
                                
            <Stack w="full" spacing="4">
                <VStack align="baseline">
                    <Text fontWeight="700" fontSize={["12px","14px"]} color="#747474">First name</Text>
                    <Input 
                        p="25px"
                        name="first_name" type="text"
                        placeholder="Enter your first name" 
                        fontSize={["12px","14px"]} color="#4F4F4F" 
                        bg="#ffffff"
                        id="first_name"
                        {...formik.getFieldProps('first_name')}
                        border="1.5px solid #4E598C"/>
                        {formik.touched.first_name && formik.errors.first_name ? (
                        <Text fontWeight="500" fontSize="10px" color="red">{formik.errors.first_name}</Text>
                        ) : null}
                 </VStack>
                 <VStack align="baseline">
                    <Text fontWeight="700" fontSize={["12px","14px"]} color="#747474">last name</Text>
                    <Input 
                         p="25px"
                        name="last_name" type="text"
                        placeholder="Enter your last name" 
                        fontSize={["12px","14px"]} color="#4F4F4F" 
                        bg="#ffffff"
                        id="first_name"
                        {...formik.getFieldProps('last_name')}
                        border="1.5px solid #4E598C"/>
                        {formik.touched.last_name && formik.errors.last_name ? (
                        <Text fontWeight="500" fontSize="10px" color="red">{formik.errors.last_name}</Text>
                        ) : null}
                 </VStack>
                 <VStack align="baseline">
                    <Text fontWeight="700" fontSize={["12px","14px"]} color="#747474">Email address</Text>
                    <Input 
                         p="25px"
                        name="email" type="text"
                        placeholder="Enter your Email address" 
                        fontSize={["12px","14px"]} color="#4F4F4F" 
                        bg="#ffffff"
                        id="email"
                        {...formik.getFieldProps('email')}
                        border="1.5px solid #4E598C"/>
                        {formik.touched.email && formik.errors.email ? (
                        <Text fontWeight="500" fontSize="10px" color="red">{formik.errors.email}</Text>
                        ) : null}
                 </VStack>
                 <VStack align="baseline">
                    <Text fontWeight="700" fontSize={["12px","14px"]} color="#747474">Password</Text>
                    <Input 
                         p="25px"
                        name="password" type="text"
                        placeholder="Enter your password" 
                        fontSize={["12px","14px"]} color="#4F4F4F" 
                        bg="#ffffff"
                        id="password"
                        {...formik.getFieldProps('password')}
                        border="1.5px solid #4E598C"/>
                        {formik.touched.password && formik.errors.password ? (
                        <Text fontWeight="500" fontSize="10px" color="red">{formik.errors.password}</Text>
                        ) : null}
                 </VStack>
                
                  <Text fontSize="12px" fontWeight={500} color="rgba(116, 116, 116, 1)" p="20px 0">
                      By clicking on register you agree to AMnid <span style={{color:"rgba(0, 133, 101, 1)", fontWeight:"700"}}>Terms and Conditions</span>
                  </Text>
                  <Button 
                  _hover={{bg:"white", color:"#008565", border:"1px solid #008565"}} 
                  color="#ffffff" 
                  bg="rgba(0, 133, 101, 1)"
                   w="full"
                    type="submit"
                   
								     isLoading={formik.isSubmitting}
                    > Register
                    </Button>   
                    <Text fontSize="16px" fontWeight={700} color="rgba(0, 0, 0, 1)" p="10px 0" textAlign="center">
                     Already Have an Account? <Link href="/login"><span style={{color:"rgba(0, 133, 101, 1)", fontWeight:"700"}}>Login</span></Link>
                  </Text>         
            </Stack>

                                
        </form>
        </Box>
    </Box>
  )
}

export default RegistrationForm
