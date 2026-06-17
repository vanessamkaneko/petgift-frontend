import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Paper,
  Avatar,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api, { API_BASE_URL } from "../../services/api";
import { EditPetModal } from "../pet/EditPetModal";

export function UpdateUser() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    document: "",
    email: "",
    password: "",
    role: "Adotante",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [myPets, setMyPets] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  const getImageUrl = (photoPath) => {
    if (!photoPath) return "/placeholder.svg";
    if (photoPath.startsWith('http')) return photoPath;
    return `${API_BASE_URL}${photoPath}`;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/account");
      return;
    }
    
    try {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
      const roleMapped = parsedUser.type === "protector" ? "Protetor" : "Adotante";
      setUserRole(roleMapped);
      
      setFormData(prev => ({ ...prev, role: roleMapped, name: parsedUser.name, email: parsedUser.email }));

      const fetchProfile = async () => {
        try {
          const endpoint = parsedUser.type === "protector" ? `/protector/${parsedUser.id}` : `/adopter/${parsedUser.id}`;
          const response = await api.get(endpoint);
          
          if (response.data) {
            setFormData(prev => ({
              ...prev,
              name: response.data.name || prev.name,
              phone: response.data.phone || "",
              document: response.data.document || "",
              email: response.data.email || prev.email,
              role: roleMapped,
            }));

            if (response.data.photo) {
              setPhotoPreview(`${API_BASE_URL}${response.data.photo}`);
            }
          }
        } catch (err) {
          console.error("Erro ao puxar dados do perfil:", err);
        }
      };

      const fetchMyPets = async () => {
        try {
           if (roleMapped === "Adotante") {
              const res = await api.get('/pet/my-adoptions');
              setMyPets(res.data);
           } else if (roleMapped === "Protetor") {
              const res = await api.get('/pet/my-registrations');
              setMyPets(res.data);
           }
        } catch(e) {
           console.error("Erro ao puxar meus pets", e);
        }
      };

      fetchProfile();
      fetchMyPets();
    } catch (e) {
      console.error("Erro ao validar sessao", e);
      navigate("/account");
    }
  }, [navigate, refreshTrigger]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = userRole === "Protetor" ? `/protector` : `/adopter`;
      
      // Update basic fields
      const patchData = {
        name: formData.name,
        phone: formData.phone,
        document: formData.document,
        email: formData.email,
      };
      // Password is only sent if changed
      if (formData.password) {
        patchData.password = formData.password;
      }

      await api.put(`${endpoint}/update/${userId}`, patchData);

      let updatedPhotoUrl = null;

      // Upload photo if new selected
      if (formData.photo) {
        const fileData = new FormData();
        fileData.append("file", formData.photo);
        const photoRes = await api.post(`${endpoint}/${userId}/photo`, fileData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (photoRes.data && photoRes.data.photo) {
           updatedPhotoUrl = photoRes.data.photo;
        }
      }

      // Sync name changes to local session header
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        storedUser.name = formData.name;
        if (updatedPhotoUrl) {
          storedUser.photo = updatedPhotoUrl;
        }
        localStorage.setItem("user", JSON.stringify(storedUser));
        
        // Disparar evento customizado para o Header atualizar a foto imediatamente
        window.dispatchEvent(new Event("storage"));
      }

      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao realizar update:", err);
      // Extrair mensagem exata do NestJS
      const backendError = err.response?.data?.message;
      const errorMsg = Array.isArray(backendError) ? backendError.join(', ') : backendError;
      alert(`Erro ao atualizar o perfil.\nMotivo: ${errorMsg || err.message}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#e0e0e0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 8,
      }}
    >
      <Paper
        elevation={4}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "90%",
          maxWidth: 750,
          p: 5,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ color: "#e57373", fontWeight: "bold", mb: 3 }}
        >
          Suas Informações
        </Typography>

        <Grid item xs={12}>
          <TextField
            label="Nome Completo"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
            sx={{ marginBottom: 3 }}
          />
        </Grid>

        <Box sx={{ height: "auto", display: "flex", justifyContent: "space-between", flexWrap: { xs: "wrap", md: "nowrap" } }}>

          <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column", width: "100%" }}>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Telefone"
                name="phone"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
                placeholder="(99) 9999-9999"
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
                sx={{ marginBottom: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Documento (CPF ou CNPJ)"
                name="document"
                fullWidth
                value={formData.document}
                onChange={handleChange}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
                sx={{ marginBottom: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                disabled
                label="Você é:"
                name="role"
                fullWidth
                value={formData.role}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2, backgroundColor: "#f5f5f5" } }}
              >
                <MenuItem value="Adotante">Adotante</MenuItem>
                <MenuItem value="Protetor">Protetor</MenuItem>
              </TextField>
            </Grid>

          </Grid>

          <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column", width: "100%", ml: { xs: 0, md: 2 }, mt: { xs: 2, md: 0 } }}>

            <Grid item xs={12} sm={6}>
              <TextField
                label="E-mail"
                name="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
                sx={{ marginBottom: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Senha (Deixe em branco para ignorar)"
                name="password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
                sx={{ marginBottom: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar src={photoPreview || ""} sx={{ width: 56, height: 56, bgcolor: "#bdbdbd" }} />
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    backgroundColor: "#9e9e9e",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#757575" },
                  }}
                >
                  Carregar Foto
                  <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Botão editar */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#e57373",
              color: "black",
              fontWeight: "bold",
              borderRadius: "20px",
              px: 6,
              textTransform: "none",
              "&:hover": { backgroundColor: "#d32f2f" },
            }}
          >
            Editar
          </Button>
        </Box>
      </Paper>

      {(userRole === "Adotante" || userRole === "Protetor") && myPets.length > 0 && (
        <Paper elevation={4} sx={{ width: "90%", maxWidth: 1000, p: 5, borderRadius: 3, mt: 4 }}>
           <Typography variant="h5" align="center" sx={{ color: "#f44336", fontWeight: "bold", mb: 4 }}>
             {userRole === "Adotante" ? "Bichinhos que você adotou / demonstrou interesse ❤️" : "Bichinhos que você cadastrou 🐾"}
           </Typography>
           <Grid container spacing={4} justifyContent="center">
             {myPets.map(pet => (
                <Grid item key={pet.id} xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 300, mx: "auto", borderRadius: 3, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", display: 'flex', flexDirection: 'column' }}>
                     <CardMedia component="img" height="250" image={getImageUrl(pet.photo)} alt={pet.name} sx={{ objectFit: "cover" }} />
                     <CardContent sx={{ flexGrow: 1 }}>
                       <Typography variant="body1" sx={{ fontWeight: "bold" }}>Nome: {pet.name}</Typography>
                       <Typography>Espécie: {pet.species === 'dog' ? 'Canina' : pet.species === 'cat' ? 'Felina' : pet.species}</Typography>
                       <Typography>Idade: {pet.age}</Typography>
                       {userRole === "Adotante" ? (
                         <Typography>Status: Aguardando contato</Typography>
                       ) : (
                         <Typography>Status: {pet.status === 'available' ? 'Disponível' : 'Adotado'}</Typography>
                       )}
                     </CardContent>
                     {userRole === "Protetor" && (
                       <Box sx={{ p: 2, pt: 0 }}>
                         <Button
                           fullWidth
                           variant="outlined"
                           sx={{ color: '#E05D5D', borderColor: '#E05D5D', '&:hover': { borderColor: '#CA5252', backgroundColor: '#fff5f5' } }}
                           onClick={() => {
                              setEditingPet(pet);
                              setEditModalOpen(true);
                           }}
                         >
                           Editar Pet
                         </Button>
                       </Box>
                     )}
                  </Card>
                </Grid>
             ))}
           </Grid>
        </Paper>
      )}

      <EditPetModal 
         open={isEditModalOpen}
         onClose={() => setEditModalOpen(false)}
         pet={editingPet}
         onSuccess={() => setRefreshTrigger(prev => prev + 1)}
      />
    </Box>
  );
}
