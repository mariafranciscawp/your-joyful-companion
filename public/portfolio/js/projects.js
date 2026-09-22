/* =========================================================
   PROJETOS
   Adicione novos projetos apenas neste array.
   category deve ser uma de: institucional | landing | wordpress | ecommerce | uiux
   ========================================================= */
const PROJECTS = [
  {
    title: "Andrade & Associados",
    categoryLabel: "Advocacia / Institucional",
    category: "institucional",
    description:
      "Site institucional moderno para escritório de advocacia, com foco em credibilidade e captação de clientes.",
    objective:
      "Transmitir autoridade e facilitar o contato de novos clientes pelo WhatsApp e formulário.",
    image: "images/projects/andrade.jpg",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "#",
  },
  {
    title: "Arqline",
    categoryLabel: "Arquitetura",
    category: "uiux",
    description:
      "Experiência visual sofisticada para escritório de arquitetura, valorizando fotografia e espaços em branco.",
    objective:
      "Criar uma navegação silenciosa onde os projetos são o protagonista.",
    image: "images/projects/arqline.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "Figma"],
    url: "#",
  },
  {
    title: "Streetwear",
    categoryLabel: "E-commerce",
    category: "ecommerce",
    description:
      "Loja virtual moderna para marca de moda, com grid de produtos e navegação simples.",
    objective: "Reduzir atrito na jornada de compra em telas pequenas.",
    image: "images/projects/streetwear.jpg",
    technologies: ["WordPress", "WooCommerce", "Elementor"],
    url: "#",
  },
  {
    title: "Google Ads Landing",
    categoryLabel: "Landing Page",
    category: "landing",
    description:
      "Landing page focada em campanhas e geração de leads, com formulário acima da dobra.",
    objective: "Aumentar a taxa de conversão do tráfego pago.",
    image: "images/projects/ads-landing.jpg",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "#",
  },
  {
    title: "Honda X-ADV",
    categoryLabel: "Landing Page",
    category: "landing",
    description:
      "Página de produto com apresentação visual forte e destaque para especificações técnicas.",
    objective: "Apresentar o produto de forma imersiva e responsiva.",
    image: "images/projects/honda.jpg",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "#",
  },
  {
    title: "Logitech Gaming",
    categoryLabel: "Landing Page",
    category: "landing",
    description:
      "Landing page de linha de periféricos, com cards de produto e microinterações discretas.",
    objective: "Destacar diferenciais de cada produto sem poluir a página.",
    image: "images/projects/logitech.jpg",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "#",
  },
];

/* Projeto em destaque (usa o primeiro por padrão) */
const FEATURED_PROJECT = {
  ...PROJECTS[0],
  challenge:
    "O escritório não tinha presença digital e perdia contatos por não ter um canal claro de atendimento.",
  solution:
    "Estrutura objetiva, áreas de atuação em destaque, provas de credibilidade e contato sempre visível.",
};
