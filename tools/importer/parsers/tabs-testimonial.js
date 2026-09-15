/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-testimonial. Base block: tabs (container).
 * Source: https://www.wknd-trendsetters.site/
 * Item model (tabs-testimonial-item): avatar (ref), name (text), role (text),
 * image (ref/photo), quote (richtext).
 * Each testimonial = one row with 5 cells: avatar | name | role | image | quote.
 * Tab panes hold photo + name + role + quote; tab-menu buttons hold the small avatar.
 */
export default function parse(element, { document }) {
  const cellWithHint = (field, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    nodes.filter(Boolean).forEach((n) => frag.appendChild(n));
    return frag;
  };

  const panes = Array.from(element.querySelectorAll('.tab-pane'));
  const menuButtons = Array.from(element.querySelectorAll('.tab-menu-link, .tab-menu button'));

  // Empty-block guard
  if (!panes.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  panes.forEach((pane, i) => {
    // Large photo lives in the first inner div of the pane.
    const photo = pane.querySelector('img');
    // Name = first <strong> in the pane; role = following sibling text div.
    const nameEl = pane.querySelector('strong');
    const name = nameEl ? (nameEl.textContent || '').trim() : '';
    // Role: the div immediately after the name's container.
    const nameContainer = nameEl ? nameEl.closest('div') : null;
    const roleEl = nameContainer && nameContainer.nextElementSibling;
    const role = roleEl ? (roleEl.textContent || '').trim() : '';
    // Quote: the paragraph in the pane.
    const quote = pane.querySelector('p');

    // Avatar: from the corresponding tab-menu button.
    const avatar = menuButtons[i] ? menuButtons[i].querySelector('img') : null;

    const avatarCell = avatar ? cellWithHint('avatar', avatar) : '';
    const nameCell = name ? cellWithHint('name', document.createTextNode(name)) : '';
    const roleCell = role ? cellWithHint('role', document.createTextNode(role)) : '';
    const imageCell = photo ? cellWithHint('image', photo) : '';
    const quoteCell = quote ? cellWithHint('quote', quote) : '';

    cells.push([avatarCell, nameCell, roleCell, imageCell, quoteCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
