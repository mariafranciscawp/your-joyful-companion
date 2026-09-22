# Portfólio — Maria Francisca

Site portfólio profissional em **HTML5, CSS3 e JavaScript puro** (sem frameworks).
Ícones: Lucide (CDN). Fontes: Google Fonts (Sora + Inter).

## 1. Estrutura

```
portfolio/
├── index.html          # todo o HTML (seções e modal)
├── README.md
├── robots.txt
├── sitemap.xml
├── css/
│   ├── style.css       # tokens de cor, base e componentes
│   ├── responsive.css  # breakpoints 1440 → 360px
│   └── animations.css  # reveal, fade, float + prefers-reduced-motion
├── js/
│   ├── config.js       # SEUS contatos e preços (edite primeiro)
│   ├── projects.js     # lista de projetos e projeto em destaque
│   └── script.js       # comportamento (menu, filtros, modal, calculadora, tema…)
├── images/
│   ├── profile/        # sua foto
│   ├── projects/       # prints dos projetos
│   ├── services/
│   └── icons/
└── assets/             # favicon e outros arquivos
```

## 2. Execução local

Basta abrir `index.html` no navegador. Para um servidor local (recomendado):

```bash
# Python
python3 -m http.server 5500
# ou Node
npx serve .
```
Depois acesse `http://localhost:5500`.

## 3. Alterar suas informações

Abra `js/config.js` e preencha:

```js
whatsapp: "5511999999999",   // só números, com código do país
email: "contato@seudominio.com",
instagram: "https://instagram.com/seuusuario",
github: "https://github.com/seuusuario",
linkedin: "https://linkedin.com/in/seuusuario",
```
Todos os links do site (botão flutuante, planos, calculadora, rodapé, contato) usam esses valores automaticamente.

Textos de seções (serviços, processo, planos, diferenciais, FAQ) estão no topo de `js/script.js`, em arrays fáceis de editar. Textos do Hero e do "Sobre" ficam direto em `index.html`.

## 4. Alterar imagens

Substitua os arquivos em `images/profile/` e `images/projects/` mantendo os mesmos nomes, ou atualize os caminhos em `js/projects.js` / `index.html`. Use JPG/WebP com no máximo ~300 KB.

## 5. Adicionar novos projetos

Em `js/projects.js`, adicione um objeto ao array `PROJECTS`:

```js
{
  title: "Nome do projeto",
  categoryLabel: "Categoria visível",
  category: "landing", // institucional | landing | wordpress | ecommerce | uiux
  description: "Resumo curto.",
  objective: "Objetivo do projeto.",
  image: "images/projects/arquivo.jpg",
  technologies: ["HTML", "CSS"],
  url: "https://site-do-cliente.com" // use "#" se não houver link
}
```
O card, o filtro e o modal são gerados automaticamente.

## 6. Alterar preços

- Planos: array `PLANS` em `js/script.js`.
- Calculadora: objeto `pricing` em `js/config.js` (`base`, `pages`, `features`).

## 7. Alterar cores / tema

Em `css/style.css`, blocos `:root` (escuro) e `html[data-theme="light"]` (claro).
O botão de tema salva a preferência em `localStorage` (`mf-theme`).

## 8. Formulário de contato

Sem backend, o formulário fica em **modo demonstração** e avisa o visitante.
Para ativar, informe uma URL em `CONFIG.formEndpoint` (Formspree, EmailJS, Resend, endpoint próprio).
O envio já faz POST em JSON. Valide sempre os dados também no servidor.

## 9. Publicação

1. Envie a pasta inteira para a hospedagem (ou Netlify / Vercel / GitHub Pages).
2. Aponte seu domínio para a hospedagem (registro A ou CNAME informado pelo provedor).
3. Ative HTTPS.
4. Em `robots.txt` e `sitemap.xml`, troque `SEU-DOMINIO.com.br` pelo domínio real.
5. Atualize `canonical` e `og:url` em `index.html` para a URL final e adicione uma imagem `og:image` de 1200x630.
6. Cadastre o site no Google Search Console e envie o sitemap.

## 10. Antes de colocar em produção

- [ ] Preencher `js/config.js` (WhatsApp, e-mail, redes).
- [ ] Substituir a foto de perfil e os prints dos projetos pelos reais.
- [ ] Trocar os depoimentos de exemplo por depoimentos reais (ou remover a seção).
- [ ] Configurar o formulário (`formEndpoint`) ou remover o formulário.
- [ ] Revisar preços dos planos e da calculadora.
- [ ] Trocar o domínio em `robots.txt`, `sitemap.xml`, `canonical` e `og:url`.

## 11. Segurança

Nenhuma chave, token ou senha deve ser colocada nestes arquivos — todo o código é público no navegador. Integrações que exigem chave secreta precisam de um backend.
