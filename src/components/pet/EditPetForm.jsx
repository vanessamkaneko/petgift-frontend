import React, { useState, useEffect } from 'react';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export function EditPetForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photoName, setPhotoName] = useState('192x192 pixels (.jpg)');
  const [formData, setFormData] = useState({
    name: '',
    sex: 'F',
    age: 'Adulto',
    species: 'dog',
    photo: null,
  });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await api.get(`/pet/${id}`);
        const data = response.data;
        setFormData({
          name: data.name || '',
          sex: data.sex || 'F',
          age: data.age || 'Adulto',
          species: data.species || 'dog',
          photo: null,
        });
        if (data.photo) setPhotoName(data.photo);
      } catch (error) {
        console.error('Erro ao buscar o pet:', error);
      }
    };
    if (id) fetchPet();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
      setPhotoName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, sex, age, species, photo } = formData;
      await api.put(`/pet/update/${id}`, { name, sex, age, species });

      if (photo) {
        const fileData = new FormData();
        fileData.append('file', photo);
        await api.post(`/pet/${id}/photo`, fileData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      alert('Edição salva com sucesso!');
      navigate('/');
    } catch (error) {
      console.error("Erro na edição:", error);
      alert("Erro ao editar o pet.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Deseja realmente excluir este pet?")) {
      try {
        await api.delete(`/pet/${id}`);
        alert("Pet excluído!");
        navigate('/');
      } catch (error) {
        console.error("Erro ao excluir", error);
        alert("Erro ao excluir pet.");
      }
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

        {/* Botoes de acao (Editar e Excluir) */}
        <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
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
            Editar
          </Button>

          <Button
            type="button"
            variant="contained"
            onClick={handleDelete}
            sx={{
              position: 'absolute',
              right: 0,
              backgroundColor: '#E08787', // Tom mais claro pedido no layout
              color: '#551111', // Letra vermelha escuro / marrom escuro
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: 6,
              px: { xs: 4, md: 5 },
              py: 1.5,
              fontSize: '1rem',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#D17C7C',
                boxShadow: 'none', 
              }
            }}
          >
            Excluir
          </Button>
        </Box>

      </Box>
    </Box>
  );
}
