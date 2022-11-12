import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

const Store = () => {

    const store = [
        1,2
    ]
  return (
    <Box>
        <Text color="#ABAAAA" fontSize="20px" fontWeight={500}>Stores</Text>
        <SimpleGrid>
            {
                store.map(()=>{
                    return(
                        <Box>
                            
                        </Box>
                    )
                })
            }
        </SimpleGrid>
    </Box>
  )
}

export default Store
