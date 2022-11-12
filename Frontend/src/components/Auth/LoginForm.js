import { Box, Input, Text, VStack, Select, Stack, Button, Flex, useToast } from '@chakra-ui/react'
import React from 'react'
import { useFormik } from 'formik';
 import * as Yup from 'yup';
 import Link from 'next/link'
 import { loginUser } from '../../../utils/services';
 import { loginAndStoreToken } from '../../../utils/api';
 import { useRouter } from "next/router";


const LoginForm = () => {


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
            
          try {
            const data = await loginUser(values)
            console.log(data,"data")
            loginAndStoreToken(data.jwt_token)

            if(data.message === "User logged in!"){
              toast({ 
                position: "top-right",
                title: "Welcome!",
                description: "User logged in successfully",
                status: "success",
                isClosable: true,
              });

              const { redirect: redirectUrl = "/dashboard/home" } =
                router.query;
              router.push(redirectUrl);
              resetForm();
              return
            }
            toast({ 
              position: "top-right",
              title: "Error logging in",
              description: "Incorrect username or password entered",
              status: "error",
              isClosable: true,
            });
          } catch (error) {
            console.log(error)
            toast({
              position: "top-right",
              title: "Login failed",
              description: "Incorrect username or password entered",
               status: "error",
              isClosable: true,
            });
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
                 
                  <Text fontSize="12px" fontWeight={500} color="rgba(0, 133, 101, 1)" p="20px 0" textAlign="right">
                     forgot your password?
                  </Text>
                  <Button 
                  color="#ffffff" 
                  bg="rgba(0, 133, 101, 1)" 
                  w="full"
                  type='submit'
                  > Login
                    </Button>   
                    <Text fontSize="16px" fontWeight={500} color="rgba(0, 0, 0, 1)" p="10px 0" textAlign="center">
                    Are You New To AMniD? <Link href="/signup">
                    <span style={{color:"rgba(0, 133, 101, 1)", fontWeight:"700"}}>SignUp</span></Link>
                  </Text>         
            </Stack>

                                
        </form>
        </Box>
    </Box>
  )
}

export default LoginForm
