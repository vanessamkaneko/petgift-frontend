import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export function RegisterPetForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    sex: 'F',
    age: 'Adulto',
    species: 'dog',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, sex, age, species, photo } = formData;
      const petResponse = await api.post('/pet', { name, sex, age, species });
      const newPetId = petResponse.data.id;

      if (photo) {
        const fileData = new FormData();
        fileData.append('file', photo);
        await api.post(`/pet/${newPetId}/photo`, fileData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      
      alert('Pet cadastrado com sucesso!');
      navigate('/'); 
    } catch (error) {
      console.error('Erro ao cadastrar pet:', error);
      alert('Erro ao cadastrar o pet.');
    }
  };

  const inputStyles = {
    backgroundColor: '#EAEAEA',
    borderRadius: 2,
    '& fieldset': { border: 'none' },
    height: 50,
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 750,
        backgroundColor: '#F8F8F8', // Lighter background inside card matching layout
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        p: { xs: 4, md: 8 },
        mx: 'auto',
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          color: '#E05D5D',
          fontWeight: 800,
          mb: 5,
        }}
      >
        Informações do Pet
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 1, color: '#000' }}>Nome</Typography>
          <TextField
            fullWidth
            name="name"
            placeholder="Ex: Lilica"
            value={formData.name}
            onChange={handleChange}
            sx={{
              ...inputStyles,
              '& .MuiInputBase-input': { padding: '12px 16px' }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1, color: '#000' }}>Sexo</Typography>
            <Select
              fullWidth
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              sx={inputStyles}
            >
              <MenuItem value="F">Fêmea</MenuItem>
              <MenuItem value="M">Macho</MenuItem>
            </Select>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1, color: '#000' }}>Idade</Typography>
            <Select
              fullWidth
              name="age"
              value={formData.age}
              onChange={handleChange}
              sx={inputStyles}
            >
              <MenuItem value="Filhote">Filhote</MenuItem>
              <MenuItem value="Adulto">Adulto</MenuItem>
              <MenuItem value="Idoso">Idoso</MenuItem>
            </Select>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 4, mb: 6 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1, color: '#000' }}>Espécie</Typography>
            <Select
              fullWidth
              name="species"
              value={formData.species}
              onChange={handleChange}
              sx={inputStyles}
            >
              <MenuItem value="dog">Canina</MenuItem>
              <MenuItem value="cat">Felina</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1, color: '#000' }}>Foto:</Typography>
            <Box
              sx={{
                ...inputStyles,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
              }}
            >
              <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                {formData.photo ? formData.photo.name : '192x192 pixels (.jpg)'}
              </Typography>
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: '#A9A9A9',
                  color: '#212121',
                  textTransform: 'none',
                  borderRadius: 0.5,
                  minWidth: 'auto',
                  px: 2,
                  py: 0.3,
                  fontSize: '0.85rem',
                  boxShadow: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#8E8E8E',
                    boxShadow: 'none',
                  }
                }}
              >
                carregar
                <input
                  type="file"
                  hidden
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                />
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#DE5E5E',
              color: '#000',
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: 6,
              px: { xs: 6, md: 10 },
              py: 1.5,
              fontSize: '1rem',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#CA5252',
                boxShadow: 'none',
              }
            }}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
