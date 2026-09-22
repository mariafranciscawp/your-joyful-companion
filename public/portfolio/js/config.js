/* =========================================================
   CONFIGURAÇÃO CENTRAL
   Altere apenas este arquivo para atualizar seus contatos.
   ========================================================= */
const CONFIG = {
  name: "Maria Francisca",
  role: "Desenvolvedora Web & Criadora de Sites",
  // Formato internacional, apenas números. Ex: 5511999999999
  whatsapp: "SEU_NUMERO_AQUI",
  email: "SEU_EMAIL_AQUI",
  instagram: "SEU_INSTAGRAM_AQUI",
  github: "SEU_GITHUB_AQUI",
  linkedin: "SEU_LINKEDIN_AQUI",

  // Mensagem padrão do botão flutuante do WhatsApp
  whatsappMessage:
    "Olá, Maria! Vi seu portfólio e gostaria de conversar sobre a criação de um site.",

  // Preços de referência da calculadora (em R$)
  pricing: {
    base: {
      landing: 500,
      institucional: 1200,
      wordpress: 1500,
      ecommerce: 2500,
      personalizado: 3000,
    },
    pages: { "1": 0, "2-5": 300, "6-10": 700, "10+": 1200 },
    features: {
      whatsapp: 0,
      formulario: 100,
      galeria: 150,
      blog: 400,
      animacoes: 250,
      seo: 200,
      redes: 80,
    },
  },

  /* BACKEND (futuro):
     O formulário de contato está em modo demonstração.
     Para ativar, integre um serviço (Formspree, Resend, EmailJS)
     ou um endpoint próprio em js/script.js -> handleContactForm(). */
  formEndpoint: "", // deixe vazio para modo demonstração
};

/** Monta um link de WhatsApp com mensagem codificada. */
function waLink(message) {
  const phone = String(CONFIG.whatsapp).replace(/\D/g, "");
  const text = encodeURIComponent(message || CONFIG.whatsappMessage);
  if (!phone) return "#contato";
  return `https://wa.me/${phone}?text=${text}`;
}
