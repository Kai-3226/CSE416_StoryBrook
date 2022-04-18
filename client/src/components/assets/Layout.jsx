import React from 'react'
import { Box, Container } from '@chakra-ui/react'

export function Layout({ children }) {
  return (
    <Box mb={16}>

      <Container maxW='container.lg'>{children}</Container>
    </Box>
  )
}
