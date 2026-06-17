import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Erro ao ler usuário:", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", background: "#D9D9D9" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={() => navigate('/')}>
          <img src="../logo.png" alt="Logo" style={{ height: 120 }} />
        </Box>

        {/* Itens de navegação */}
        <Box sx={{ display: "flex", gap: 4 }}>
          {user?.type?.toLowerCase() === 'protector' && (
            <Button color="inherit" sx={{ fontWeight: 700 }} onClick={() => navigate('/pet/register')}>
              Cadastrar Pet
            </Button>
          )}
          <Button color="inherit" sx={{ fontWeight: 700 }} href="/#sobre-nos">
            Sobre Nós
          </Button>
          <Button color="inherit" sx={{ fontWeight: 700 }} href="/#quero-adotar">
            Quero Adotar
          </Button>
          <Button color="inherit" sx={{ fontWeight: 700 }} href="/#faq">
            FAQ
          </Button>
        </Box>

        {/* Botão de login ou Perfil */}
        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ width: 60, height: 60, bgcolor: "#BDBDBD" }} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: "#000" }}>
                Olá, {user?.name ? user.name.split(' ')[0] : 'Usuário'}
              </Typography>
              <Typography
                variant="body2"
                onClick={() => navigate('/profile')}
                sx={{ color: "#E05D5D", cursor: "pointer", fontWeight: 500, "&:hover": { textDecoration: "underline" }, mt: 0.5 }}
              >
                Ver Perfil
              </Typography>
              <Typography
                variant="body2"
                onClick={handleLogout}
                sx={{ color: "#E05D5D", cursor: "pointer", fontWeight: 500, "&:hover": { textDecoration: "underline" } }}
              >
                Sair
              </Typography>
            </Box>
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={() => navigate('/account')}
            sx={{
              borderRadius: "20px", textTransform: "none",
              backgroundColor: "#E05D5D", fontWeight: 700, color: "black"
            }}
          >
            Entrar | Cadastrar-se
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
