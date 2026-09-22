import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Maria Francisca | Desenvolvedora Web & Criadora de Sites" },
      {
        name: "description",
        content:
          "Portfólio de Maria Francisca, desenvolvedora web freelancer especializada em criação de sites, WordPress, landing pages e interfaces responsivas.",
      },
      {
        property: "og:title",
        content: "Maria Francisca | Desenvolvedora Web & Criadora de Sites",
      },
      {
        property: "og:description",
        content:
          "Criação de sites modernos, responsivos e personalizados para empresas, profissionais e negócios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

/**
 * O portfólio é um site estático completo em HTML/CSS/JS puro,
 * servido a partir de /portfolio/index.html. Aqui ele é exibido
 * em tela cheia para a pré-visualização.
 */
function Index() {
  return (
    <iframe
      src="/portfolio/index.html"
      title="Portfólio de Maria Francisca"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: 0,
      }}
    />
  );
}
