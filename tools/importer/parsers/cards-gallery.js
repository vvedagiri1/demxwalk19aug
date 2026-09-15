/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-gallery. Base block: cards (container).
 * Source: https://www.wknd-trendsetters.site/
 * Card model: image (reference) + text (richtext). Each direct child = one card row.
 * Two columns per row: image cell (field:image) and text cell (field:text).
 * An empty cell must still be present even when no content exists.
 */
export default function parse(element, { document }) {
  const cellWithHint = (field, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    nodes.filter(Boolean).forEach((n) => frag.appendChild(n));
    return frag;
  };

  // Each direct child div is a card.
  const cardEls = Array.from(element.querySelectorAll(':scope > div'));

  // Empty-block guard
  if (!cardEls.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cardEls.forEach((card) => {
    const img = card.querySelector('img');
    // Text = any non-image content within the card (headings, description, CTA).
    const textParts = Array.from(card.children).filter((c) => !c.matches('img') && !c.querySelector('img'));

    // Image cell: field hint only if an image exists (empty cell otherwise, no hint).
    const imageCell = img ? cellWithHint('image', img) : '';
    // Text cell: field hint only if text content exists (empty cell otherwise, no hint).
    const textCell = textParts.length ? cellWithHint('text', ...textParts) : '';

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
