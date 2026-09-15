/**
 * Columns Article — a two-column intro: a large image beside article meta
 * (breadcrumbs, heading, author and date/read-time).
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-article-${cols.length}-cols`);

  // Mark image-only columns so they can be ordered/styled independently.
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-article-img-col');
        }
      }
    });
  });
}
