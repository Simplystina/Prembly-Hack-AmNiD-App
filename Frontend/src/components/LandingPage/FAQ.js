import { Box, 
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon, } from '@chakra-ui/react'
import React from 'react'


const faq = [
    {
        title: "What Is AmNiD",
        content: ""
    },
    {
        title: "How do I verify a vendor on AmNiD ",
        content: ""
    },
    {
        title: "How do I verify a vendor on AmNiD",
        content: ""
    },
    {
        title: "How do I verify a vendor on AmNiD",
        content: ""
    },
    
]
const FAQ = () => {
  return (
    <Box p="30px 60px">
        <Text color="#2E2E2E" fontWeight="600" fontSize="26px" textAlign="center">Frequently Asked Questions</Text>
        <Accordion m="0px auto" pt="80px" pb="50px" w="50%" allowToggle defaultIndex={[0]}>
            {
                faq.map((item)=>{
                    return (
                        <Box >
                            <AccordionItem  boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.08)" borderRadius={6} m="3px 0" >
                                <h2>
                                    <AccordionButton p="15px 20px">
                                        <Box flex='1'  textAlign='left'><Text color="#747474" fontSize="14px" fontWeight={600}>
                                        {
                                            item.title
                                        }
                                        </Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    </AccordionPanel>
                            </AccordionItem>
                           
                        </Box>
                    )
                })
            }
        </Accordion>
    </Box>
  )
}

export default FAQ
