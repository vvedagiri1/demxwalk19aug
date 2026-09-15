/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-article. Base block: columns.
 * Source: https://www.wknd-trendsetters.site/
 * Columns block: NO field hints (per hinting rules). Each direct child div = one column cell.
 */
export default function parse(element, { document }) {
  // Direct children of the grid become columns.
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Empty-block guard
  if (!columns.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  // Single content row: one cell per column.
  cells.push(columns.map((col) => col));

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
