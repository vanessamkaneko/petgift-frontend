import React from "react";
import { Box, Typography } from "@mui/material";

export function FAQSection() {
  const faqs = [
    {
      question: "1. Como faço para adotar um pet?",
      answer:
        'Basta se cadastrar na plataforma, encontrar um pet disponível e clicar em “Quero Adotar”. A ONG ou protetor responsável entrará em contato.',
    },
    {
      question: "2. Preciso pagar para adotar?",
      answer:
        "Não. A adoção é gratuita, mas algumas ONGs podem solicitar ajuda com custos de vacinação ou castração.",
    },
    {
      question: "3. Posso visitar o pet antes de adotar?",
      answer:
        "Sim! A maioria dos responsáveis permite visitas. Os detalhes são combinados diretamente após o pedido de adoção.",
    },
    {
      question: "4. Como posso divulgar um pet para adoção?",
      answer:
        "Faça o cadastro como ONG ou protetor, e depois acesse o painel para cadastrar os pets.",
    },
    {
      question: "5. O que acontece após solicitar uma adoção?",
      answer:
        "Você receberá os dados de contato do responsável e poderá conversar para concluir o processo.",
    },
    {
      question: "6. A PetGift é responsável pelos pets?",
      answer:
        "Não. A PetGift apenas conecta adotantes a protetores e ONGs. A responsabilidade pelos pets é de quem os cadastrou.",
    },
  ];

  return (
    <Box
      id="faq"
      sx={{
        py: 8,
        px: { xs: 3, md: 12 },
        textAlign: "left",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#f44336",
          mb: 4,
        }}
      >
        Perguntas Frequentes (FAQ)
      </Typography>

      {faqs.map((faq, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", mb: 0.5, color: "black" }}
          >
            {faq.question}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: "800px" }}
          >
            {faq.answer}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
