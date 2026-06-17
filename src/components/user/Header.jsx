import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export function Header() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: "#D9D9D9",
          px: 4,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <img src="../logo.png" alt="Logo" style={{ height: 120 }} />
        </Box>

        {/* Navegação */}
        <Box sx={{ display: "flex", gap: 4 }}>
          <Button color="inherit" sx={{ fontWeight: 700 }}>
            Sobre Nós
          </Button>
          <Button color="inherit" sx={{ fontWeight: 700 }}>
            Quero Adotar
          </Button>
          <Button color="inherit" sx={{ fontWeight: 700 }}>
            FAQ
          </Button>
        </Box>

        {/* Área do Usuário */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src="../user-avatar.png"
            alt="Usuário"
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#BDBDBD",
            }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#000", mb: 0.5 }}
            >
              Olá, Luiza
            </Typography>

            <Typography
              component="a"
              href="#"
              sx={{
                color: "#E05D5D",
                fontSize: "0.9rem",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Ver Perfil
            </Typography>

            <Typography
              component="a"
              href="#"
              sx={{
                color: "#E05D5D",
                fontSize: "0.9rem",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Sair
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
