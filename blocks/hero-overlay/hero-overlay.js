/**
 * Hero Overlay — a dark, full-bleed banner with a background image and
 * overlaid heading, subheading and CTA button.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const content = document.createElement('div');
  content.className = 'hero-overlay-content';

  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      const pic = cell.querySelector('picture, img');
      if (pic && !cell.textContent.trim()) {
        // Background image cell.
        const media = document.createElement('div');
        media.className = 'hero-overlay-media';
        media.append(pic.closest('picture') || pic);
        block.prepend(media);
      } else {
        // Text cell → overlaid content.
        [...cell.childNodes].forEach((node) => content.append(node));
      }
    });
  });

  // Remove now-empty original rows, keep any prepended media.
  [...block.children].forEach((child) => {
    if (!child.classList.contains('hero-overlay-media')) child.remove();
  });

  block.append(content);
}
