/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-showcase. Base block: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Model (simple block): text (richtext), image1/image2/image3 (references).
 * Each unique field group = one row, single column.
 */
export default function parse(element, { document }) {
  // Build a single-cell fragment prefixed with a UE field hint comment.
  const cellWithHint = (field, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    nodes.filter(Boolean).forEach((n) => frag.appendChild(n));
    return frag;
  };

  // --- Extract text content (heading, subheading, CTAs) ---
  const heading = element.querySelector('h1, h2, .h1-heading, [class*="heading"]');
  const subheading = element.querySelector('.subheading, p');
  const buttonGroup = element.querySelector('.button-group');
  const textNodes = [heading, subheading, buttonGroup].filter(Boolean);

  // --- Extract images (first three become image1/image2/image3) ---
  const images = Array.from(element.querySelectorAll('img'));

  // Empty-block guard
  if (!textNodes.length && !images.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  if (textNodes.length) cells.push([cellWithHint('text', ...textNodes)]);
  if (images[0]) cells.push([cellWithHint('image1', images[0])]);
  if (images[1]) cells.push([cellWithHint('image2', images[1])]);
  if (images[2]) cells.push([cellWithHint('image3', images[2])]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-showcase', cells });
  element.replaceWith(block);
}
