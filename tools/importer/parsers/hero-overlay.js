/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-overlay. Base block: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Model (simple block): image (background reference) + text (richtext).
 * Single column. Optional background image row, then text row (heading + subheading + CTA).
 */
export default function parse(element, { document }) {
  const cellWithHint = (field, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    nodes.filter(Boolean).forEach((n) => frag.appendChild(n));
    return frag;
  };

  // Background image (optional). May be a direct <img> in the overlay container.
  const bgImage = element.querySelector('img');

  // Text content: heading, subheading, CTA buttons.
  const heading = element.querySelector('h1, h2, h3, .h1-heading, [class*="heading"]');
  const subheading = element.querySelector('.subheading, p');
  const buttonGroup = element.querySelector('.button-group');
  const textNodes = [heading, subheading, buttonGroup].filter(Boolean);

  // Empty-block guard
  if (!bgImage && !textNodes.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  if (bgImage) cells.push([cellWithHint('image', bgImage)]);
  if (textNodes.length) cells.push([cellWithHint('text', ...textNodes)]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-overlay', cells });
  element.replaceWith(block);
}
