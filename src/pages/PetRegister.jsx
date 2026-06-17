import React from 'react';
import { Box } from '@mui/material';
import { Header } from '../components/home/Header';
import { RegisterPetForm } from '../components/pet/RegisterPetForm';

function PetRegister() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#D1D1D1' }}>
      <Header />
      <Box sx={{ py: 6, px: 2 }}>
        <RegisterPetForm />
      </Box>
    </Box>
  );
}

export default PetRegister;
