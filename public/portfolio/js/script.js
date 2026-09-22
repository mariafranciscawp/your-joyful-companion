/* =========================================================
   script.js — comportamento do site
   Depende de: config.js (CONFIG, waLink) e projects.js (PROJECTS)
   ========================================================= */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const brl = (n) => "R$ " + Number(n).toLocaleString("pt-BR");
  /** Escapa texto antes de inserir no HTML (segurança básica). */
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- CONTEÚDO ESTÁTICO (fácil de editar) ---------- */
  const SERVICES = [
    { icon: "rocket", title: "Landing Pages", text: "Páginas focadas em campanhas, anúncios, produtos e conversão." },
    { icon: "building-2", title: "Sites Institucionais", text: "Sites profissionais para empresas, profissionais liberais e negócios locais." },
    { icon: "layout-dashboard", title: "WordPress", text: "Criação e personalização de sites utilizando WordPress e Elementor." },
    { icon: "shopping-bag", title: "E-commerce", text: "Estruturação de lojas virtuais modernas e responsivas." },
    { icon: "wand-sparkles", title: "Redesign", text: "Modernização de sites antigos para melhorar aparência e experiência." },
    { icon: "wrench", title: "Manutenção", text: "Atualizações, correções, melhorias e manutenção do site." },
  ];

  const PROCESS = [
    ["Conversa inicial", "Entendimento da necessidade."],
    ["Briefing", "Definição do objetivo, público e funcionalidades."],
    ["Estrutura", "Planejamento das páginas e conteúdo."],
    ["Design", "Criação da interface visual."],
    ["Desenvolvimento", "Construção do site."],
    ["Testes", "Responsividade, links, formulários e funcionalidades."],
    ["Entrega", "Publicação e orientação ao cliente."],
  ];

  const PLANS = [
    { name: "Básico", price: "R$ 500", featured: false, items: ["Landing Page", "Responsivo", "WhatsApp", "Formulário", "SEO básico"] },
    { name: "Profissional", price: "R$ 1.200", featured: true, items: ["Até 5 páginas", "Design personalizado", "WhatsApp", "Formulário", "SEO básico", "Redes sociais"] },
    { name: "Premium", price: "R$ 2.000", featured: false, items: ["Até 8 páginas", "Design personalizado", "Animações", "Integrações", "SEO básico", "Otimização", "Suporte inicial"] },
  ];

  const DIFFERENTIALS = [
    { icon: "target", title: "Design pensado para seu negócio", text: "Cada projeto parte do seu público e do seu objetivo, não de um modelo pronto." },
    { icon: "smartphone", title: "Experiência responsiva", text: "O site funciona bem no celular, tablet e computador." },
    { icon: "code-2", title: "Código organizado", text: "Estrutura limpa, fácil de manter e evoluir." },
    { icon: "message-square", title: "Comunicação direta", text: "Você fala diretamente com quem desenvolve o site." },
    { icon: "list-checks", title: "Processo transparente", text: "Etapas, prazos e entregas combinados desde o início." },
    { icon: "life-buoy", title: "Suporte após entrega", text: "Acompanhamento para ajustes iniciais após a publicação." },
  ];

  const FAQ = [
    ["Quanto custa um site?", "Depende do tipo de site, quantidade de páginas e funcionalidades. Os planos desta página são referências iniciais e a calculadora gera uma estimativa."],
    ["Quanto tempo demora?", "Landing pages simples costumam levar de 5 a 10 dias. Sites institucionais e lojas, de 2 a 5 semanas, dependendo do envio dos conteúdos."],
    ["O domínio está incluído?", "Não. O domínio é contratado no seu nome, mas eu oriento e ajudo na configuração."],
    ["A hospedagem está incluída?", "Não. A hospedagem é contratada por você; indico opções confiáveis e configuro o site nela."],
    ["Posso alterar o site depois?", "Sim. Em projetos WordPress você mesma pode editar textos e imagens; em sites em código, faço as alterações sob demanda."],
    ["Vocês fazem manutenção?", "Sim, ofereço manutenção mensal ou pontual: atualizações, correções e melhorias."],
    ["O site funciona no celular?", "Sim. Todos os projetos são testados em celular, tablet e computador."],
    ["Posso solicitar alterações?", "Sim. Durante o desenvolvimento há rodadas de ajustes combinadas no início do projeto."],
    ["Como funciona o pagamento?", "Normalmente 50% no início e 50% na entrega. Formas e parcelas são combinadas antes de começar."],
  ];

  /* ---------- RENDER ---------- */
  function renderServices() {
    const el = $("#servicesGrid");
    if (!el) return;
    el.innerHTML = SERVICES.map((s, i) => `
      <article class="card card--hover service" data-reveal data-delay="${(i % 3) + 1}">
        <span class="service__num">${String(i + 1).padStart(2, "0")}</span>
        <div class="service__icon"><i data-lucide="${s.icon}" aria-hidden="true"></i></div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        <a class="service__link" href="#orcamento">Saiba mais <i data-lucide="arrow-right" aria-hidden="true"></i></a>
      </article>`).join("");
  }

  function projectCard(p, i) {
    return `
      <article class="card card--hover project" data-category="${esc(p.category)}" data-reveal data-delay="${(i % 3) + 1}">
        <div class="project__media">
          <img src="${esc(p.image)}" alt="Prévia do projeto ${esc(p.title)}" loading="lazy" width="1280" height="800" />
        </div>
        <div class="project__body">
          <span class="tag">${esc(p.categoryLabel)}</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.description)}</p>
          <div class="project__techs">${p.technologies.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
          <button class="btn btn--ghost" type="button" data-project="${i}">Ver projeto <i data-lucide="arrow-up-right" aria-hidden="true"></i></button>
        </div>
      </article>`;
  }

  function renderProjects(filter = "all") {
    const el = $("#projectsGrid");
    if (!el) return;
    const list = PROJECTS.map((p, i) => ({ p, i })).filter(({ p }) => filter === "all" || p.category === filter);
    el.innerHTML = list.length
      ? list.map(({ p, i }) => projectCard(p, i)).join("")
      : `<p class="empty-state">Nenhum projeto nesta categoria por enquanto.</p>`;
    refreshIcons();
    observeReveals();
  }

  function renderFeatured() {
    const el = $("#featuredProject");
    if (!el || typeof FEATURED_PROJECT === "undefined") return;
    const f = FEATURED_PROJECT;
    el.innerHTML = `
      <div class="featured__media"><img src="${esc(f.image)}" alt="Prévia do projeto ${esc(f.title)}" loading="lazy" width="1280" height="800" /></div>
      <div class="featured__body">
        <span class="tag">${esc(f.categoryLabel)}</span>
        <h3 style="font-size:1.5rem">${esc(f.title)}</h3>
        <p>${esc(f.description)}</p>
        <div class="featured__block"><h4>Desafio</h4><p>${esc(f.challenge)}</p></div>
        <div class="featured__block"><h4>Solução</h4><p>${esc(f.solution)}</p></div>
        <div class="project__techs">${f.technologies.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        <button class="btn btn--primary" type="button" data-project="0" style="align-self:flex-start;margin-top:8px">Ver detalhes</button>
      </div>`;
  }

  function renderProcess() {
    const el = $("#processTimeline");
    if (!el) return;
    el.innerHTML = PROCESS.map((s, i) => `
      <div class="step" data-reveal="left">
        <span class="step__num">${String(i + 1).padStart(2, "0")}</span>
        <h3>${esc(s[0])}</h3>
        <p>${esc(s[1])}</p>
      </div>`).join("");
  }

  function renderPlans() {
    const el = $("#plansGrid");
    if (!el) return;
    el.innerHTML = PLANS.map((pl, i) => `
      <article class="card plan ${pl.featured ? "plan--featured" : ""}" data-reveal data-delay="${i + 1}">
        ${pl.featured ? '<span class="tag">Mais escolhido</span>' : ""}
        <h3>${esc(pl.name)}</h3>
        <p class="plan__price">${esc(pl.price)}</p>
        <span class="plan__from">A partir de</span>
        <ul class="plan__list">${pl.items.map((it) => `<li><i data-lucide="check" aria-hidden="true"></i><span>${esc(it)}</span></li>`).join("")}</ul>
        <a class="btn ${pl.featured ? "btn--primary" : "btn--ghost"}" data-wa href="#contato"
           data-wa-message="Olá, Maria! Tenho interesse no plano ${esc(pl.name)} e gostaria de solicitar um orçamento.">Solicitar orçamento</a>
      </article>`).join("");
  }

  function renderDifferentials() {
    const el = $("#diffGrid");
    if (!el) return;
    el.innerHTML = DIFFERENTIALS.map((d, i) => `
      <article class="card card--hover" data-reveal data-delay="${(i % 3) + 1}">
        <div class="diff__icon"><i data-lucide="${d.icon}" aria-hidden="true"></i></div>
        <h3>${esc(d.title)}</h3>
        <p style="margin-top:6px">${esc(d.text)}</p>
      </article>`).join("");
  }

  function renderFaq() {
    const el = $("#faqList");
    if (!el) return;
    el.innerHTML = FAQ.map((f, i) => `
      <div class="faq__item" data-reveal>
        <h3 style="margin:0">
          <button class="faq__trigger" type="button" aria-expanded="false" aria-controls="faq-panel-${i}" id="faq-trigger-${i}">
            <span>${esc(f[0])}</span><i data-lucide="plus" aria-hidden="true"></i>
          </button>
        </h3>
        <div class="faq__panel" id="faq-panel-${i}" role="region" aria-labelledby="faq-trigger-${i}"><p>${esc(f[1])}</p></div>
      </div>`).join("");

    el.addEventListener("click", (e) => {
      const btn = e.target.closest(".faq__trigger");
      if (!btn) return;
      const item = btn.closest(".faq__item");
      const panel = $("#" + btn.getAttribute("aria-controls"));
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
    });
  }

  function renderContacts() {
    const waHref = waLink();
    const mail = CONFIG.email;
    const items = [
      ["message-circle", "WhatsApp", waHref, CONFIG.whatsapp],
      ["mail", "E-mail", mail && mail.includes("@") ? `mailto:${mail}` : "#contato", mail],
      ["instagram", "Instagram", CONFIG.instagram.startsWith("http") ? CONFIG.instagram : "#contato", CONFIG.instagram],
      ["github", "GitHub", CONFIG.github.startsWith("http") ? CONFIG.github : "#contato", CONFIG.github],
      ["linkedin", "LinkedIn", CONFIG.linkedin.startsWith("http") ? CONFIG.linkedin : "#contato", CONFIG.linkedin],
    ];
    const list = $("#contactList");
    if (list) {
      list.innerHTML = items.map(([icon, label, href, value]) => `
        <li><a href="${esc(href)}" ${href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""} aria-label="${esc(label)}">
          <i data-lucide="${icon}" aria-hidden="true"></i>
          <span><strong>${esc(label)}</strong><br />${esc(value)}</span>
        </a></li>`).join("");
    }
    const social = $("#footerSocial");
    if (social) {
      social.innerHTML = items.slice(0, 5).map(([icon, label, href]) =>
        `<a class="icon-btn" href="${esc(href)}" ${href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""} aria-label="${esc(label)}"><i data-lucide="${icon}" aria-hidden="true"></i></a>`
      ).join("");
    }
    // Todos os links marcados com data-wa usam o CONFIG
    $$("[data-wa]").forEach((a) => {
      a.href = waLink(a.dataset.waMessage);
      if (a.href.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
    });
    const float = $("#waFloat");
    if (float) {
      float.href = waHref;
      if (waHref.startsWith("http")) { float.target = "_blank"; float.rel = "noopener"; }
    }
  }

  /* ---------- ÍCONES ---------- */
  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  /* ---------- HEADER / NAV ---------- */
  function initHeader() {
    const header = $("#header");
    const nav = $("#nav");
    const toggle = $("#navToggle");
    const toTop = $("#toTop");

    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 24);
      toTop.classList.toggle("is-visible", y > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // Active link conforme seção visível
    const links = $$(".nav__link");
    const sections = links
      .map((l) => document.querySelector(l.getAttribute("href")))
      .filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + entry.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- TEMA CLARO / ESCURO ---------- */
  function initTheme() {
    const html = document.documentElement;
    const saved = localStorage.getItem("mf-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    html.setAttribute("data-theme", saved || (prefersLight ? "light" : "dark"));
    $("#themeToggle").addEventListener("click", () => {
      const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      localStorage.setItem("mf-theme", next);
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  let revealObserver;
  function observeReveals() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = $$("[data-reveal]:not(.is-visible)");
    if (reduced) { targets.forEach((t) => t.classList.add("is-visible")); return; }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    }
    targets.forEach((t) => revealObserver.observe(t));
  }

  function initSkillBars() {
    const bars = $$(".skill__fill");
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.style.width = (e.target.dataset.level || 70) + "%";
        o.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    bars.forEach((b) => obs.observe(b));
  }

  /* ---------- MODAL DE PROJETO ---------- */
  function initModal() {
    const modal = $("#projectModal");
    let lastFocused = null;

    function open(index) {
      const p = PROJECTS[index];
      if (!p) return;
      lastFocused = document.activeElement;
      $("#modalImage").src = p.image;
      $("#modalImage").alt = "Prévia do projeto " + p.title;
      $("#modalCategory").textContent = p.categoryLabel;
      $("#modalTitle").textContent = p.title;
      $("#modalDescription").textContent = p.description;
      $("#modalObjective").textContent = p.objective || "—";
      $("#modalTechs").innerHTML = p.technologies.map((t) => `<span class="chip">${esc(t)}</span>`).join("");
      const visit = $("#modalVisit");
      if (p.url && p.url !== "#") { visit.href = p.url; visit.style.display = ""; }
      else { visit.style.display = "none"; }
      const similar = $("#modalSimilar");
      similar.href = waLink(`Olá, Maria! Vi o projeto "${p.title}" no seu portfólio e gostaria de algo parecido.`);
      if (similar.href.startsWith("http")) { similar.target = "_blank"; similar.rel = "noopener"; }

      modal.hidden = false;
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      refreshIcons();
      $(".modal__close", modal).focus();
    }

    function close() {
      modal.classList.remove("is-open");
      modal.hidden = true;
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-project]");
      if (trigger) { open(Number(trigger.dataset.project)); return; }
      if (e.target.closest("[data-close-modal]")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close();
      // foco preso dentro do modal
      if (e.key === "Tab" && modal.classList.contains("is-open")) {
        const f = $$('a[href], button, [tabindex]:not([tabindex="-1"])', modal).filter((el) => el.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- FILTROS ---------- */
  function initFilters() {
    $$(".filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".filter").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        renderProjects(btn.dataset.filter);
      });
    });
  }

  /* ---------- CALCULADORA ---------- */
  const TYPE_LABEL = {
    landing: "Landing Page", institucional: "Site Institucional",
    wordpress: "WordPress", ecommerce: "E-commerce", personalizado: "Site personalizado",
  };
  const FEATURE_LABEL = {
    whatsapp: "WhatsApp", formulario: "Formulário", galeria: "Galeria", blog: "Blog",
    animacoes: "Animações", seo: "SEO básico", redes: "Redes sociais",
  };

  function initCalculator() {
    const form = $("#calcForm");
    if (!form) return;

    function update() {
      const data = new FormData(form);
      const type = data.get("type");
      const pages = data.get("pages");
      const features = data.getAll("features");
      const pr = CONFIG.pricing;
      let total = pr.base[type] + (pr.pages[pages] || 0);
      features.forEach((f) => { total += pr.features[f] || 0; });

      $("#calcPrice").textContent = `${brl(total)} – ${brl(Math.round(total * 1.35))}`;

      const msg =
        `Olá, Maria! Fiz uma estimativa no seu site.\n\n` +
        `• Tipo de site: ${TYPE_LABEL[type]}\n` +
        `• Páginas: ${pages}\n` +
        `• Recursos: ${features.length ? features.map((f) => FEATURE_LABEL[f]).join(", ") : "nenhum selecionado"}\n` +
        `• Estimativa inicial: ${brl(total)} – ${brl(Math.round(total * 1.35))}\n\n` +
        `Gostaria de conversar sobre o projeto.`;
      const link = $("#calcWhatsapp");
      link.href = waLink(msg);
      if (link.href.startsWith("http")) { link.target = "_blank"; link.rel = "noopener"; }
    }

    form.addEventListener("change", update);
    form.addEventListener("submit", (e) => e.preventDefault());
    update();
  }

  /* ---------- FORMULÁRIO DE CONTATO ---------- */
  function initContactForm() {
    const form = $("#contactForm");
    const status = $("#formStatus");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form-status is-visible form-status--info";

      // Validação básica no cliente (nunca confie apenas nela; valide no backend)
      if (!form.checkValidity()) {
        status.className = "form-status is-visible form-status--error";
        status.textContent = "Preencha nome, e-mail e mensagem corretamente.";
        form.reportValidity();
        return;
      }

      // MODO DEMONSTRAÇÃO: sem backend configurado.
      if (!CONFIG.formEndpoint) {
        status.textContent =
          "Este formulário está em modo demonstração. Configure um serviço de formulário ou backend antes da publicação. Enquanto isso, fale pelo WhatsApp.";
        return;
      }

      // INTEGRAÇÃO FUTURA: endpoint próprio, Formspree, Resend, etc.
      try {
        status.textContent = "Enviando...";
        const res = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        if (!res.ok) throw new Error("Falha no envio");
        status.textContent = "Mensagem enviada! Responderei em breve.";
        form.reset();
      } catch (err) {
        status.className = "form-status is-visible form-status--error";
        status.textContent = "Não foi possível enviar agora. Tente pelo WhatsApp ou e-mail.";
      }
    });
  }

  /* ---------- INIT ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();

    renderServices();
    renderProjects();
    renderFeatured();
    renderProcess();
    renderPlans();
    renderDifferentials();
    renderFaq();
    renderContacts();

    initTheme();
    initHeader();
    initFilters();
    initModal();
    initCalculator();
    initContactForm();
    initSkillBars();
    observeReveals();
    refreshIcons();
    // Lucide carrega com "defer"; garante ícones mesmo se terminar depois.
    window.addEventListener("load", refreshIcons);
  });
})();
