import React from 'react';
import { Box } from '@mui/material';
import { Header } from '../components/home/Header';
import { EditPetForm } from '../components/pet/EditPetForm';

function PetEdit() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#D1D1D1' }}>
      <Header />
      <Box sx={{ py: 6, px: 2 }}>
        <EditPetForm />
      </Box>
    </Box>
  );
}

export default PetEdit;
