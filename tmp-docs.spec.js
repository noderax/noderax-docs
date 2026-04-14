const { test } = require('@playwright/test');

test('inspect docs page', async ({ page }) => {
  await page.goto('http://localhost:3000/docs/changelog/control-plane-release-identity', { waitUntil: 'networkidle' });
  const data = await page.evaluate(() => {
    const article = document.querySelector('#nd-page');
    const body = article?.querySelector('.prose');
    const h1 = article?.querySelector('h1');
    const h1body = body?.querySelector('h1');
    function rect(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    }
    function style(el) {
      if (!el) return null;
      const s = getComputedStyle(el);
      return { display: s.display, visibility: s.visibility, opacity: s.opacity, color: s.color, background: s.backgroundColor, fontSize: s.fontSize, lineHeight: s.lineHeight, position: s.position, zIndex: s.zIndex, transform: s.transform };
    }
    return {
      scrollY: window.scrollY,
      articleRect: rect(article),
      articleStyle: style(article),
      bodyRect: rect(body),
      bodyStyle: style(body),
      h1Rect: rect(h1),
      h1Style: style(h1),
      h1Text: h1?.textContent,
      bodyH1Rect: rect(h1body),
      bodyH1Style: style(h1body),
      bodyH1Text: h1body?.textContent,
      bodyText: body?.textContent?.slice(0, 500),
      articleInner: article?.innerHTML?.slice(0, 1200),
      elementAtCenter: (() => {
        const x = window.innerWidth / 2;
        const y = 180;
        const el = document.elementFromPoint(x, y);
        return el ? { tag: el.tagName, id: el.id, className: el.className, text: el.textContent?.slice(0,80) } : null;
      })(),
    };
  });
  console.log(JSON.stringify(data, null, 2));
});
