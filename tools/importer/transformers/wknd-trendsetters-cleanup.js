/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters site-wide cleanup.
 * All selectors verified against migration-work/cleaned.html.
 *
 * NOTE: The first authorable section of every page is <header class="section secondary-section">
 * (the hero). A generic `header` removal would delete authorable content, so the site chrome is
 * targeted by its specific classes (.navbar, .skip-link, footer.footer) instead.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Non-authorable breadcrumb navigation inside the article section.
    // Found in cleaned.html: <div class="breadcrumbs"> ... </div>
    WebImporter.DOMUtils.remove(element, [
      '.breadcrumbs',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Site chrome (non-authorable). Found in cleaned.html:
    //   <a class="skip-link">, <div class="navbar">, <footer class="footer inverse-footer">
    WebImporter.DOMUtils.remove(element, [
      '.skip-link',
      '.navbar',
      'footer.footer',
    ]);

    // Strip Astro build attributes left on the markup (e.g. data-astro-cid-37fxchfa).
    element.querySelectorAll('*').forEach((el) => {
      [...el.attributes].forEach((attr) => {
        if (attr.name.startsWith('data-astro-cid')) el.removeAttribute(attr.name);
      });
    });
  }
}
