import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  MenuItem,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export function LoginRegisterSection() {
  const navigate = useNavigate();

  // Registration State
  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    email: "",
    document: "",
    password: "",
    role: "Adotante",
  });

  // Login State
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const endpoint = registerData.role === "Adotante" ? "/adopter" : "/protector";
      await api.post(endpoint, {
        name: registerData.name,
        phone: registerData.phone,
        email: registerData.email,
        document: registerData.document,
        password: registerData.password,
      });
      alert("Conta criada com sucesso! Faça seu login.");
      
      setRegisterData({
        name: "", phone: "", email: "", document: "", password: "", role: "Adotante"
      });
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      alert("Erro ao criar a conta. Verifique os dados.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", loginData);
      
      const userData = response.data.user;
      const token = response.data.token;
      
      localStorage.setItem("user", JSON.stringify({
         id: userData.id,
         name: userData.name,
         email: userData.email,
         type: userData.type,
         photo: userData.photo
      }));
      if (token) {
        localStorage.setItem("token", token);
      }
      
      window.dispatchEvent(new Event("storage"));
      
      alert("Login efetuado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Credenciais incorretas.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#e0e0e0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingY: 6,
        px: 2,
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
      >
        {/* ----------- Criar Conta ----------- */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: "#fff",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#e57373",
                mb: 3,
                textAlign: "center",
              }}
            >
              Criar conta
            </Typography>

            <Box component="form" onSubmit={handleRegister}>
              <TextField
                fullWidth
                label="Nome Completo"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                variant="outlined"
                margin="normal"
                InputProps={{ sx: { borderRadius: 2 } }}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    name="phone"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    placeholder="(99) 9999-9999"
                    variant="outlined"
                    margin="normal"
                    InputProps={{ sx: { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="E-mail"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="email@teste.com"
                    variant="outlined"
                    margin="normal"
                    InputProps={{ sx: { borderRadius: 2 } }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Documento (CPF)"
                    name="document"
                    value={registerData.document}
                    onChange={handleRegisterChange}
                    variant="outlined"
                    margin="normal"
                    InputProps={{ sx: { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Senha"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    type="password"
                    variant="outlined"
                    margin="normal"
                    InputProps={{ sx: { borderRadius: 2 } }}
                  />
                </Grid>
              </Grid>

              <TextField
                select
                fullWidth
                label="Eu sou:"
                name="role"
                value={registerData.role}
                onChange={handleRegisterChange}
                variant="outlined"
                margin="normal"
                InputProps={{ sx: { borderRadius: 2 } }}
              >
                <MenuItem value="Adotante">Adotante</MenuItem>
                <MenuItem value="Protetor">Protetor</MenuItem>
              </TextField>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#e57373",
                  borderRadius: 10,
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#d32f2f" },
                }}
              >
                Criar
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* ----------- Login ----------- */}
        <Grid item xs={12} md={5} >
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 2,
              textAlign: "center",
              backgroundColor: "#fff",
              height: "100%",
              display: "flex", flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#e57373",
                mb: 3,
              }}
            >
              Acesse sua conta
            </Typography>

            <Box component="form" onSubmit={handleLogin} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <TextField
                fullWidth
                label="E-mail"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="email@teste.com"
                variant="outlined"
                margin="normal"
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <TextField
                fullWidth
                label="Senha"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Digite sua senha"
                variant="outlined"
                margin="normal"
                InputProps={{ sx: { borderRadius: 2 } }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#e57373",
                  borderRadius: 10,
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#d32f2f" },
                }}
              >
                Entrar
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
