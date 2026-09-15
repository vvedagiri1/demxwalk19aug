/**
 * Hero Showcase — a light, split-layout page intro banner.
 * Left column: heading, subheading and CTA buttons.
 * Right column: a cluster of showcase images.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Collect every image on the block into a media cluster, keep the rest as text.
  const media = document.createElement('div');
  media.className = 'hero-showcase-media';

  const content = document.createElement('div');
  content.className = 'hero-showcase-content';

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const pictures = cell.querySelectorAll('picture, img');
      if (pictures.length && !cell.textContent.trim()) {
        // Image-only cell → move each picture/img into the media cluster.
        pictures.forEach((pic) => {
          const wrapper = document.createElement('div');
          wrapper.className = 'hero-showcase-media-item';
          wrapper.append(pic.closest('picture') || pic);
          media.append(wrapper);
        });
      } else if (cell.textContent.trim() || pictures.length) {
        // Text (and any inline media) → content column.
        [...cell.childNodes].forEach((node) => content.append(node));
      }
    });
  });

  block.textContent = '';
  block.append(content);
  if (media.children.length) block.append(media);
}
