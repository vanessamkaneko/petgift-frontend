import React, { useState, useEffect } from "react";
import { Box, Typography, Link, Stack } from "@mui/material";

export function Footer() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const hydrateUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== "undefined") {
          setUserRole(JSON.parse(storedUser).type);
        } else {
          setUserRole(null);
        }
      } catch (e) {
        console.error("Erro ao ler usuário:", e);
      }
    };
    hydrateUser();
    window.addEventListener("storage", hydrateUser);
    return () => window.removeEventListener("storage", hydrateUser);
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#D9D9D9",
        py: 4,
        px: { xs: 3, md: 12 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "center", md: "flex-start" },
        borderTop: "1px solid #ddd",
      }}
    >
      {/* Logo e texto */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
          <img src="../logo.png" alt="Logo" style={{ height: 120 }} />
        </Box>
        <Typography
          variant="body2"
          color="#E05D5D"
          sx={{ mt: { xs: 1, md: 0 } }}
        >
          <strong>PetGift - Seu melhor presente</strong>
        </Typography>
      </Stack>

      {/* Links (um abaixo do outro) */}
      <Stack
        direction="column"
        spacing={1}
        sx={{
          mt: { xs: 3, md: 0 },
          textAlign: { xs: "center", md: "right" },
        }}
      >
        {!userRole && (
          <>
            <Link href="/account" underline="none" color="text.primary">
              Entrar
            </Link>
            <Link href="/account" underline="none" color="text.primary">
              Cadastrar-se
            </Link>
          </>
        )}
        <Link href="/#sobre-nos" underline="none" color="text.primary">
          Sobre Nós
        </Link>
        {userRole !== "protector" && (
          <Link href="/#quero-adotar" underline="none" color="text.primary">
            Quero Adotar
          </Link>
        )}
        <Link href="/#faq" underline="none" color="text.primary">
          FAQ
        </Link>
      </Stack>
    </Box>
  );
}
