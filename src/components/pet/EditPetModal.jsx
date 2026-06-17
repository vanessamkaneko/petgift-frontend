import React, { useState, useEffect } from 'react';
import { Box, Button, MenuItem, Select, TextField, Typography, Modal } from '@mui/material';
import api from '../../services/api';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 600,
  maxHeight: '90vh',
  overflowY: 'auto',
  backgroundColor: '#F8F8F8',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const inputStyles = {
  backgroundColor: '#EAEAEA',
  borderRadius: 2,
  '& fieldset': { border: 'none' },
  height: 50,
};

export function EditPetModal({ open, onClose, pet, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    sex: 'F',
    age: 'Adulto',
    species: 'dog',
    photo: null,
  });

  useEffect(() => {
    if (open && pet) {
      setFormData({
        name: pet.name || '',
        sex: pet.sex || 'F',
        age: pet.age || 'Adulto',
        species: pet.species || 'dog',
        photo: null, // Reset photo state on open
      });
    }
  }, [open, pet]);

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
      // PUT requests generally expect exactly the fields required
      await api.put(`/pet/update/${pet.id}`, { name, sex, age, species });

      // Se uma foto nova foi selecionada, envia um patch
      if (photo) {
        const fileData = new FormData();
        fileData.append('file', photo);
        await api.post(`/pet/${pet.id}/photo`, fileData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      
      alert('Pet editado com sucesso!');
      onSuccess(); // Refresh the list
      onClose(); // Close modal
    } catch (error) {
      console.error('Erro ao editar pet:', error);
      alert('Erro ao editar o pet. Verifique os dados.');
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title">
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h5" align="center" sx={{ color: '#E05D5D', fontWeight: 800, mb: 4 }}>
          Editar Pet
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1, color: '#000' }}>Nome</Typography>
          <TextField
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ ...inputStyles, '& .MuiInputBase-input': { padding: '12px 16px' } }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1, color: '#000' }}>Sexo</Typography>
            <Select fullWidth name="sex" value={formData.sex} onChange={handleChange} sx={inputStyles}>
              <MenuItem value="F">Fêmea</MenuItem>
              <MenuItem value="M">Macho</MenuItem>
            </Select>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1, color: '#000' }}>Idade</Typography>
            <Select fullWidth name="age" value={formData.age} onChange={handleChange} sx={inputStyles}>
              <MenuItem value="Filhote">Filhote</MenuItem>
              <MenuItem value="Adulto">Adulto</MenuItem>
              <MenuItem value="Idoso">Idoso</MenuItem>
            </Select>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
          <Box sx={{ flex: 1, minWidth: '40%' }}>
            <Typography variant="body1" sx={{ mb: 1, color: '#000' }}>Espécie</Typography>
            <Select fullWidth name="species" value={formData.species} onChange={handleChange} sx={inputStyles}>
              <MenuItem value="dog">Canina</MenuItem>
              <MenuItem value="cat">Felina</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: 1, minWidth: '40%' }}>
            <Typography variant="body1" sx={{ mb: 1, color: '#000' }}>Nova Foto (Opcional):</Typography>
            <Box sx={{ ...inputStyles, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
              <Typography variant="body2" sx={{ color: '#9E9E9E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 100 }}>
                {formData.photo ? formData.photo.name : 'Selecionar.jpg'}
              </Typography>
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: '#A9A9A9', color: '#212121', textTransform: 'none', borderRadius: 0.5,
                  minWidth: 'auto', px: 2, py: 0.3, fontSize: '0.85rem', boxShadow: 'none', fontWeight: 600,
                  '&:hover': { backgroundColor: '#8E8E8E', boxShadow: 'none' }
                }}
              >
                carregar
                <input type="file" hidden accept="image/jpeg, image/png" onChange={handleFileChange} />
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            onClick={onClose}
            sx={{ color: '#757575', textTransform: 'none', fontWeight: 'bold' }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#DE5E5E', color: '#000', textTransform: 'none', fontWeight: 'bold', borderRadius: 6,
              px: { xs: 4, md: 6 }, py: 1.2, boxShadow: 'none', '&:hover': { backgroundColor: '#CA5252', boxShadow: 'none' }
            }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
