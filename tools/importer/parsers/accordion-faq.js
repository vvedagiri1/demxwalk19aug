/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base block: accordion (container).
 * Source: https://www.wknd-trendsetters.site/
 * Item model (accordion-faq-item): summary (text/question) + text (richtext/answer).
 * Each <details class="faq-item"> = one row with 2 cells: summary | text.
 */
export default function parse(element, { document }) {
  const cellWithHint = (field, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    nodes.filter(Boolean).forEach((n) => frag.appendChild(n));
    return frag;
  };

  const items = Array.from(element.querySelectorAll(':scope > details, :scope > .faq-item'));

  // Empty-block guard
  if (!items.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  items.forEach((item) => {
    // Question text: prefer the span inside the summary, ignoring the toggle icon.
    const summaryEl = item.querySelector('summary, .faq-question');
    const questionSpan = summaryEl ? summaryEl.querySelector('span') : null;
    const question = (questionSpan || summaryEl ? (questionSpan || summaryEl).textContent : '').trim();

    // Answer content: everything in the answer container.
    const answer = item.querySelector('.faq-answer');
    const answerParts = answer ? Array.from(answer.childNodes) : [];

    const summaryCell = question ? cellWithHint('summary', document.createTextNode(question)) : '';
    const textCell = answerParts.length ? cellWithHint('text', ...answerParts) : '';

    cells.push([summaryCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
