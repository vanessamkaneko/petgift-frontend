import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import api, { API_BASE_URL } from "../../services/api";

export function AdoptionSection() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ sex: '', age: '', species: '' });
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchPets();
    
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Erro ao ler usuário:", e);
    }
  }, []);

  const fetchPets = async () => {
    try {
      const response = await api.get('/pets');
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao carregar pets:", error);
    }
  };

  const handleFilter = async () => {
    try {
      // Remove empty keys to avoid sending empty parameters
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      );
      
      const response = await api.get('/pets/filter', { params });
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao filtrar pets:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleAdopt = async (petId) => {
    try {
        await api.post(`/pet/adopt/${petId}`);
        alert("Sua intenção de adoção foi registrada. Aguarde que em breve entraremos em contato para mais detalhes!");
        fetchPets(); // Atualiza a lista removendo o pet adotado
    } catch (error) {
        console.error(error);
        const msg = error.response?.data?.message || error.message;
        alert(`Não foi possível realizar a adoção. Motivo: ${msg}`);
    }
  };

  const getImageUrl = (photoPath) => {
    if (!photoPath) return "/placeholder.svg";
    if (photoPath.startsWith('http')) return photoPath;
    return `${API_BASE_URL}${photoPath}`;
  };

  return (
    <Box id="quero-adotar" sx={{ py: 6, px: { xs: 2, md: 8 }, textAlign: "center" }}>
      {/* Cabeçalho */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#f44336", flex: 1, textAlign: "center" }}
        >
          Quero Adotar
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={fetchPets}
        sx={{
          backgroundColor: "#f44336",
          color: "black",
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: "20px",
          px: 3,
          marginBottom: "40px",
          "&:hover": { backgroundColor: "#d32f2f" },
        }}
      >
        Ver todos pets disponíveis
      </Button>

      {/* Filtros */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 6 }}>
        <Grid item>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sexo</InputLabel>
            <Select 
              name="sex" 
              value={filters.sex} 
              onChange={handleFilterChange} 
              label="Sexo"
            >
              <MenuItem value="">Ambos os sexos</MenuItem>
              <MenuItem value="M">Macho</MenuItem>
              <MenuItem value="F">Fêmea</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Idade</InputLabel>
            <Select 
              name="age" 
              value={filters.age} 
              onChange={handleFilterChange} 
              label="Idade"
            >
              <MenuItem value="">Todas as idades</MenuItem>
              <MenuItem value="Filhote">Filhote</MenuItem>
              <MenuItem value="Adulto">Adulto</MenuItem>
              <MenuItem value="Idoso">Idoso</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Espécie</InputLabel>
            <Select 
              name="species" 
              value={filters.species} 
              onChange={handleFilterChange} 
              label="Espécie"
            >
              <MenuItem value="">Ambas as espécies</MenuItem>
              <MenuItem value="dog">Canina</MenuItem>
              <MenuItem value="cat">Felina</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleFilter}
            sx={{
              backgroundColor: "#f44336",
              textTransform: "none",
              color: "black",
              fontWeight: "bold",
              borderRadius: "20px",
              marginTop: "10px",
              px: 3,
              "&:hover": { backgroundColor: "#d32f2f" },
            }}
          >
            Filtrar pets
          </Button>
        </Grid>
      </Grid>

      {/* Lista de pets */}
      <Typography
        variant="h5"
        sx={{
          color: "#f44336",
          fontWeight: 500,
          mb: 4,
        }}
      >
        Pets para adoção
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {pets && pets.length > 0 ? pets.map((pet) => (
          <Grid item key={pet.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 300,
                mx: "auto",
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={getImageUrl(pet.photo)}
                alt={pet.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Nome: {pet.name}
                </Typography>
                <Typography>Sexo: {pet.sex === 'M' ? 'Macho' : pet.sex === 'F' ? 'Fêmea' : pet.sex}</Typography>
                <Typography>Idade: {pet.age}</Typography>
                <Typography>Espécie: {pet.species === 'dog' ? 'Canina' : pet.species === 'cat' ? 'Felina' : pet.species}</Typography>
                <Typography>Status: {pet.status === 'available' ? "Disponível" : pet.status === 'adopted' ? "Adotado" : pet.status}</Typography>
              </CardContent>

              {user?.type === 'adopter' && (
                <Button
                  onClick={() => handleAdopt(pet.id)}
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#f44336",
                    borderRadius: "20px",
                    textTransform: "none",
                    mb: 2,
                    "&:hover": { backgroundColor: "#d32f2f" },
                  }}
                >
                  Quero Adotar!
                </Button>
              )}
            </Card>
          </Grid>
        )) : (
          <Typography sx={{ mt: 4, color: 'text.secondary', width: '100%' }}>Nenhum pet encontrado com os filtros selecionados.</Typography>
        )}
      </Grid>
    </Box>
  );
}
