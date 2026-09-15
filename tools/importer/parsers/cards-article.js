/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article. Base block: cards (container).
 * Source: https://www.wknd-trendsetters.site/
 * Card model (article-card): image (reference) + text (richtext).
 * Each <a class="article-card"> = one card row with 2 cells: image | text.
 * The card is a link, so a CTA anchor wrapping the heading text is placed in the text cell.
 */
export default function parse(element, { document }) {
  const cellWithHint = (field, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    nodes.filter(Boolean).forEach((n) => frag.appendChild(n));
    return frag;
  };

  // Each card is an <a class="article-card"> (fallback: direct child anchors/divs).
  let cardEls = Array.from(element.querySelectorAll(':scope > a.article-card, :scope > .article-card'));
  if (!cardEls.length) cardEls = Array.from(element.querySelectorAll(':scope > a, :scope > div'));

  // Empty-block guard
  if (!cardEls.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const href = (el) => (el.tagName === 'A' ? el.getAttribute('href') : (el.querySelector('a') ? el.querySelector('a').getAttribute('href') : null));

  const cells = [];
  cardEls.forEach((card) => {
    const img = card.querySelector('img');
    const imageCell = img ? cellWithHint('image', img) : '';

    // Text content: meta tags/date and heading from the card body.
    const meta = card.querySelector('.article-card-meta');
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"]');
    const link = href(card);

    const textParts = [];
    if (meta) textParts.push(meta);
    if (heading) {
      if (link) {
        // Wrap the heading text in an anchor so the card link is preserved as a CTA.
        const a = document.createElement('a');
        a.setAttribute('href', link);
        a.textContent = (heading.textContent || '').trim();
        const wrapper = document.createElement(heading.tagName.toLowerCase());
        wrapper.appendChild(a);
        textParts.push(wrapper);
      } else {
        textParts.push(heading);
      }
    }

    const textCell = textParts.length ? cellWithHint('text', ...textParts) : '';
    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
