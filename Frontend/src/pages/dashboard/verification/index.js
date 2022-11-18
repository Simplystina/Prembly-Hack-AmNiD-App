import { Box, HStack, Text , VStack, Stack, useToast, Input, Button, Img, Select, Flex} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import usersLayout from '../../../components/HOC/usersLayout'
import { useFormik } from 'formik';
 import * as Yup from 'yup';
 import Link from 'next/link'
 import {getBankList, getAccountName, verify} from "../../../../utils/services"
 import Webcam from "react-webcam";

 import { useRouter } from "next/router";
 import jwt_decode from 'jwt-decode'
import { TakePic } from '../../../components';



const Index = () => {

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  const [image, setImage] = useState('')


  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc, "opennnnn")
        const imageData = imageSrc.split(',')[1]
       
      setImage(imageData)
    },
    [webcamRef]
  );



    const toast = useToast()
    const router = useRouter()
    const [banks, setBanks] = useState([])
  
    const [account, setAccount] = useState('')
    const [filled, setFilled] = useState(false)
    const [verified, setVerified] = useState(false)
    


    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('user'))
      console.log(user.verified, "userrrrrrrrrrrr")
      setVerified(user.verified)
    },[])

    const getbanks = async()=>{
      const  data = await getBankList()
      console.log(data, "bankss")
      setBanks(data)

      
    }

    const getbankName =async (code)=>{
      const  data = await getBankList()
      
       const bank_name = await data.filter((item)=>{
            return item.bank_code === code})
       return bank_name[0].name
      
    }

    useEffect(()=>{
      getbanks()
    },[account])

  

    const formik = useFormik({
        initialValues: {
           account_number:"",
          bvn:"",
          bank_code:"",
        },
        validationSchema: Yup.object({
		   account_number: Yup.string().required("Account number is required"),
       bvn: Yup.string().required("BVN is required"),
       bank_code: Yup.string().required("Bank name is required"),
        }),
        onSubmit: async (values, {resetForm}) => {
            const user = JSON.parse(localStorage.getItem('user'))
            const  dataValues = {
             user_id: user.user_id,
             bank_code: values.bank_code,
             number: values.account_number,
             }                                                                   
             const account_details = {}                                                      
             const accountData = await getAccountName(dataValues)
            
             account_details["account_name"] = accountData.data.account_name
             account_details["bank_code"] = values.bank_code
             account_details["account_number"] = values.account_number
             const bank_name = await getbankName(values.bank_code)
             account_details["bank_name"] = bank_name

             const parameters = {
              user_id: user.user_id,
              account_details: account_details,
              bvn: values.bvn,
              image: image
             }

             
             toast({ 
              position: "top-right",
              title: "Successful Verification!",
              description: "You have been successfully verified",
              status: "success",
              isClosable: true,
            });
             
             
             try {
               const data =  await verify(parameters)
               console.log(data, "dataaa")

             } catch (error) {
              console.log(error)
             }
            
        },
      });

  return (
    <Box>
        <HStack>
           <Text color="#747474" fontSize="25px" fontWeight="500">Dashboard</Text>
           <Text color="#747474" fontSize="18px" fontWeight="600">-Verification</Text>
        </HStack>
        <Text pt="5px" color="#747474" fontSize="16px" fontWeight="600">Vendor Verification</Text>
       { !verified? <Box m="40px ">
        <form onSubmit={formik.handleSubmit}>
                                
            <Stack w="70%" spacing="4">
                
               
                 <HStack align="baseline">
                    <Text w="20%" fontWeight="700" fontSize={["12px","14px"]} color="#747474">Account Number</Text>
                    <Input 
                        w="70%"
                         p="25px"
                        name="account_number" type="text"
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
                    <Select 
                        w="70%"
                         p="25px"
                         type="text"
                        placeholder="Enter your bank name" 
                        fontSize={["12px","14px"]} color="#4F4F4F" 
                        bg="#ffffff"
                        id="bank_code"
                        {...formik.getFieldProps('bank_code')}
                        border="1.5px solid #4E598C" > 
                        {
                          banks?.map((bank)=>{
                            return (
                              <option key={bank.bank_code} value={bank.bank_code}>{bank.name}</option>
                            )
                          })
                        }
                        </Select>
                        {formik.touched.bank_code && formik.errors.bank_code ? (
                        <Text fontWeight="500" fontSize="10px" color="red">{formik.errors.bank_code}</Text>
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
                 
                 
                  
                    <Webcam
                        audio={false}
                        height={720}
                         ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={1280}
                       videoConstraints={videoConstraints}
                     />
                        <HStack onClick={capture} cursor="pointer">
                          <Img src="/icons/face-capture.png"/>
                             <Text  fontSize="20px" fontWeight={600} color="rgba(0, 133, 101, 1)" p="10px 0">
                               Face Capture
                            </Text>
                          </HStack>
                        
                  <Text fontSize="14px" fontWeight={400} color="rgba(0, 0, 0, 1)" p="10px 0" >
                    By checking this box you agree to <Link href="/signup">
                    <span style={{color:"rgba(0, 133, 101, 1)", fontWeight:"700"}}>AMnid Terms and Conditions</span></Link>
                  </Text>      
                  <Button 
                  color="#ffffff" 
                  bg={image?"rgba(0, 133, 101, 1)":"#CCCCCC"} 
                  w="full"
                  type='submit'
                  > Verify
                    </Button>   
                       
            </Stack>

                                
        </form>
        </Box> :
        <Flex justifyContent="center" >
           <Img w="300px" h="300px" src="/images/verified_user.png" borderRadius="50%"/>
        </Flex>
      }
    </Box>
  )
}

export default usersLayout(Index)
