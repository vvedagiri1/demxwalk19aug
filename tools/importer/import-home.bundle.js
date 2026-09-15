/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-home.js
  var import_home_exports = {};
  __export(import_home_exports, {
    default: () => import_home_default
  });

  // tools/importer/parsers/hero-showcase.js
  function parse(element, { document: document2 }) {
    const cellWithHint = (field, ...nodes) => {
      const frag = document2.createDocumentFragment();
      frag.appendChild(document2.createComment(` field:${field} `));
      nodes.filter(Boolean).forEach((n) => frag.appendChild(n));
      return frag;
    };
    const heading = element.querySelector('h1, h2, .h1-heading, [class*="heading"]');
    const subheading = element.querySelector(".subheading, p");
    const buttonGroup = element.querySelector(".button-group");
    const textNodes = [heading, subheading, buttonGroup].filter(Boolean);
    const images = Array.from(element.querySelectorAll("img"));
    if (!textNodes.length && !images.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (textNodes.length) cells.push([cellWithHint("text", ...textNodes)]);
    if (images[0]) cells.push([cellWithHint("image1", images[0])]);
    if (images[1]) cells.push([cellWithHint("image2", images[1])]);
    if (images[2]) cells.push([cellWithHint("image3", images[2])]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-showcase", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-article.js
  function parse2(element, { document: document2 }) {
    const columns = Array.from(element.querySelectorAll(":scope > div"));
    if (!columns.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cells.push(columns.map((col) => col));
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document: document2 }) {
    const cellWithHint = (field, ...nodes) => {
      const frag = document2.createDocumentFragment();
      frag.appendChild(document2.createComment(` field:${field} `));
      nodes.filter(Boolean).forEach((n) => frag.appendChild(n));
      return frag;
    };
    const cardEls = Array.from(element.querySelectorAll(":scope > div"));
    if (!cardEls.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cardEls.forEach((card) => {
      const img = card.querySelector("img");
      const textParts = Array.from(card.children).filter((c) => !c.matches("img") && !c.querySelector("img"));
      const imageCell = img ? cellWithHint("image", img) : "";
      const textCell = textParts.length ? cellWithHint("text", ...textParts) : "";
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document: document2 }) {
    const cellWithHint = (field, ...nodes) => {
      const frag = document2.createDocumentFragment();
      frag.appendChild(document2.createComment(` field:${field} `));
      nodes.filter(Boolean).forEach((n) => frag.appendChild(n));
      return frag;
    };
    const panes = Array.from(element.querySelectorAll(".tab-pane"));
    const menuButtons = Array.from(element.querySelectorAll(".tab-menu-link, .tab-menu button"));
    if (!panes.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    panes.forEach((pane, i) => {
      const photo = pane.querySelector("img");
      const nameEl = pane.querySelector("strong");
      const name = nameEl ? (nameEl.textContent || "").trim() : "";
      const nameContainer = nameEl ? nameEl.closest("div") : null;
      const roleEl = nameContainer && nameContainer.nextElementSibling;
      const role = roleEl ? (roleEl.textContent || "").trim() : "";
      const quote = pane.querySelector("p");
      const avatar = menuButtons[i] ? menuButtons[i].querySelector("img") : null;
      const avatarCell = avatar ? cellWithHint("avatar", avatar) : "";
      const nameCell = name ? cellWithHint("name", document2.createTextNode(name)) : "";
      const roleCell = role ? cellWithHint("role", document2.createTextNode(role)) : "";
      const imageCell = photo ? cellWithHint("image", photo) : "";
      const quoteCell = quote ? cellWithHint("quote", quote) : "";
      cells.push([avatarCell, nameCell, roleCell, imageCell, quoteCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document: document2 }) {
    const cellWithHint = (field, ...nodes) => {
      const frag = document2.createDocumentFragment();
      frag.appendChild(document2.createComment(` field:${field} `));
      nodes.filter(Boolean).forEach((n) => frag.appendChild(n));
      return frag;
    };
    let cardEls = Array.from(element.querySelectorAll(":scope > a.article-card, :scope > .article-card"));
    if (!cardEls.length) cardEls = Array.from(element.querySelectorAll(":scope > a, :scope > div"));
    if (!cardEls.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const href = (el) => el.tagName === "A" ? el.getAttribute("href") : el.querySelector("a") ? el.querySelector("a").getAttribute("href") : null;
    const cells = [];
    cardEls.forEach((card) => {
      const img = card.querySelector("img");
      const imageCell = img ? cellWithHint("image", img) : "";
      const meta = card.querySelector(".article-card-meta");
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"]');
      const link = href(card);
      const textParts = [];
      if (meta) textParts.push(meta);
      if (heading) {
        if (link) {
          const a = document2.createElement("a");
          a.setAttribute("href", link);
          a.textContent = (heading.textContent || "").trim();
          const wrapper = document2.createElement(heading.tagName.toLowerCase());
          wrapper.appendChild(a);
          textParts.push(wrapper);
        } else {
          textParts.push(heading);
        }
      }
      const textCell = textParts.length ? cellWithHint("text", ...textParts) : "";
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document: document2 }) {
    const cellWithHint = (field, ...nodes) => {
      const frag = document2.createDocumentFragment();
      frag.appendChild(document2.createComment(` field:${field} `));
      nodes.filter(Boolean).forEach((n) => frag.appendChild(n));
      return frag;
    };
    const items = Array.from(element.querySelectorAll(":scope > details, :scope > .faq-item"));
    if (!items.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    items.forEach((item) => {
      const summaryEl = item.querySelector("summary, .faq-question");
      const questionSpan = summaryEl ? summaryEl.querySelector("span") : null;
      const question = (questionSpan || summaryEl ? (questionSpan || summaryEl).textContent : "").trim();
      const answer = item.querySelector(".faq-answer");
      const answerParts = answer ? Array.from(answer.childNodes) : [];
      const summaryCell = question ? cellWithHint("summary", document2.createTextNode(question)) : "";
      const textCell = answerParts.length ? cellWithHint("text", ...answerParts) : "";
      cells.push([summaryCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-overlay.js
  function parse7(element, { document: document2 }) {
    const cellWithHint = (field, ...nodes) => {
      const frag = document2.createDocumentFragment();
      frag.appendChild(document2.createComment(` field:${field} `));
      nodes.filter(Boolean).forEach((n) => frag.appendChild(n));
      return frag;
    };
    const bgImage = element.querySelector("img");
    const heading = element.querySelector('h1, h2, h3, .h1-heading, [class*="heading"]');
    const subheading = element.querySelector(".subheading, p");
    const buttonGroup = element.querySelector(".button-group");
    const textNodes = [heading, subheading, buttonGroup].filter(Boolean);
    if (!bgImage && !textNodes.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (bgImage) cells.push([cellWithHint("image", bgImage)]);
    if (textNodes.length) cells.push([cellWithHint("text", ...textNodes)]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-overlay", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".breadcrumbs"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".skip-link",
        ".navbar",
        "footer.footer"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        [...el.attributes].forEach((attr) => {
          if (attr.name.startsWith("data-astro-cid")) el.removeAttribute(attr.name);
        });
      });
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function querySection(root, selectors) {
    for (const sel of selectors) {
      const el = root.querySelector(sel);
      if (el) return el;
    }
    return null;
  }
  function transform2(hookName, element, payload) {
    const sections = payload.template && payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = querySection(element, section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || querySection(element, section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-home.js
  var PAGE_TEMPLATE = {
    name: "home",
    description: "WKND Trendsetters home page",
    urls: [
      "https://www.wknd-trendsetters.site/"
    ],
    blocks: [
      {
        name: "hero-showcase",
        instances: [
          ".grid-layout.tablet-1-column.grid-gap-xxl:has(.button-group)"
        ]
      },
      {
        name: "columns-article",
        instances: [".grid-layout.tablet-1-column.grid-gap-lg"]
      },
      {
        name: "cards-gallery",
        instances: [".grid-layout.desktop-4-column.grid-gap-sm"]
      },
      {
        name: "tabs-testimonial",
        instances: [".tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: [".grid-layout.desktop-4-column.grid-gap-md"]
      },
      {
        name: "accordion-faq",
        instances: [".faq-list"]
      },
      {
        name: "hero-overlay",
        instances: [".utility-position-relative"]
      }
    ],
    sections: [
      { id: "rc1", name: "Intro banner", selector: ["#main-content > header.section.secondary-section"], style: "grey", blocks: ["hero-showcase"], defaultContent: [] },
      { id: "rc2", name: "Case study intro", selector: ["#main-content > section.section:nth-of-type(1)"], style: null, blocks: ["columns-article"], defaultContent: [] },
      { id: "rc3", name: "Style in every snapshot", selector: ["#main-content > section.section.secondary-section:nth-of-type(2)"], style: "grey", blocks: ["cards-gallery"], defaultContent: [".utility-text-align-center"] },
      { id: "rc4", name: "Testimonials", selector: ["#main-content > section.section:nth-of-type(3)"], style: null, blocks: ["tabs-testimonial"], defaultContent: [] },
      { id: "rc5", name: "Latest articles", selector: ["#main-content > section.section.secondary-section:nth-of-type(4)"], style: "grey", blocks: ["cards-article"], defaultContent: [".utility-text-align-center"] },
      { id: "rc6", name: "FAQ", selector: ["#main-content > section.section:nth-of-type(5)"], style: null, blocks: ["accordion-faq"], defaultContent: [] },
      { id: "rc7", name: "Closing CTA", selector: ["#main-content > section.section.inverse-section"], style: "dark", blocks: ["hero-overlay"], defaultContent: [] }
    ]
  };
  var parsers = {
    "hero-showcase": parse,
    "columns-article": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-overlay": parse7
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    const seen = /* @__PURE__ */ new Set();
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          if (seen.has(element)) return;
          seen.add(element);
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_home_default = {
    transform: (payload) => {
      const {
        document: document2,
        url,
        html,
        params
      } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_home_exports);
})();
