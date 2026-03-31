import type { SitePage } from './siteStorage';

export function exportToHTML(components: any[], title: string, pages?: SitePage[]): string {
  const css = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; }
    .section { padding: 80px 24px; }
    .container { max-width: 1200px; margin: 0 auto; }
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .justify-between { justify-content: space-between; }
    .text-center { text-align: center; }
    .gap-2 { gap: 8px; }
    .gap-4 { gap: 16px; }
    .gap-6 { gap: 24px; }
    .gap-8 { gap: 32px; }
    .grid { display: grid; }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    img { max-width: 100%; height: auto; }
    .page { display: none; }
    .page.active { display: block; }
    nav a { cursor: pointer; }
    nav a.active-link { opacity: 1; font-weight: 600; }
    @media (max-width: 768px) {
      .grid-3, .grid-2 { grid-template-columns: 1fr; }
      .section { padding: 48px 16px; }
      h1 { font-size: 32px !important; }
      h2 { font-size: 28px !important; }
    }
  `;

  // Build pages HTML
  const allPages: { name: string; components: any[] }[] = [
    { name: 'Home', components },
    ...(pages || []),
  ];

  const pageLinks = allPages.map(p => p.name);

  const pagesHtml = allPages.map((page, idx) => {
    const body = page.components.map(c => renderComponent(c, pageLinks)).join('\n');
    return `<div class="page${idx === 0 ? ' active' : ''}" id="page-${page.name.toLowerCase().replace(/\s+/g, '-')}">\n${body}\n</div>`;
  }).join('\n');

  const pageScript = allPages.length > 1 ? `
<script>
function navigateToPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  var target = document.getElementById('page-' + name.toLowerCase().replace(/\\s+/g, '-'));
  if (target) target.classList.add('active');
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle('active-link', a.getAttribute('data-page') === name);
  });
  window.scrollTo(0, 0);
}
</script>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>${css}</style>
</head>
<body>
${pagesHtml}
${pageScript}
</body>
</html>`;
}

function renderComponent(c: any, pageLinks?: string[]): string {
  const p = c.props;
  switch (c.type) {
    case 'navbar': {
      const links = (p.links || []).map((l: string) => {
        if (pageLinks && pageLinks.some(pl => pl.toLowerCase() === l.toLowerCase())) {
          return `<a data-page="${l}" onclick="navigateToPage('${l}')" style="color:${p.textColor};text-decoration:none;cursor:pointer">${l}</a>`;
        }
        return `<a href="#" style="color:${p.textColor};text-decoration:none">${l}</a>`;
      }).join('');
      return `<nav style="background:${p.bgColor};color:${p.textColor};padding:16px 24px;position:sticky;top:0;z-index:100"><div class="container flex justify-between items-center"><strong style="font-size:20px">${p.brand}</strong><div class="flex gap-6">${links}</div></div></nav>`;
    }
    case 'hero':
      return `<section class="section" style="background:${p.bgImage ? `url(${p.bgImage}) center/cover no-repeat,` : ''}${p.bgColor};color:${p.textColor};text-align:${p.textAlign || 'center'};padding:${p.paddingY || '120px'} 24px"><div class="container"><h1 style="font-size:56px;font-weight:800;margin-bottom:24px">${p.heading}</h1><p style="font-size:20px;opacity:0.8;max-width:600px;margin:0 auto 40px">${p.subheading}</p><div class="flex gap-4 justify-center">${p.buttonText ? `<a href="#" style="display:inline-block;background:${p.buttonColor || p.accentColor};color:#fff;padding:16px 40px;border-radius:12px;text-decoration:none;font-weight:600;font-size:18px">${p.buttonText}</a>` : ''}${p.secondaryButtonText ? `<a href="#" style="display:inline-block;border:2px solid currentColor;color:${p.textColor};padding:14px 40px;border-radius:12px;text-decoration:none;font-weight:600;font-size:18px;opacity:0.8">${p.secondaryButtonText}</a>` : ''}</div></div></section>`;
    case 'features':
      return `<section class="section" style="background:${p.bgColor};color:${p.textColor}"><div class="container text-center"><h2 style="font-size:36px;font-weight:700;margin-bottom:48px">${p.heading}</h2><div class="grid grid-3 gap-8">${(p.items || []).map((i: any) => `<div style="padding:32px;background:${p.bgColor};border:1px solid rgba(255,255,255,0.1);border-radius:12px"><h3 style="font-size:20px;font-weight:600;margin-bottom:12px;color:${p.accentColor || '#7C3AED'}">${i.title}</h3><p style="opacity:0.7">${i.desc}</p></div>`).join('')}</div></div></section>`;
    case 'stats':
      return `<section class="section" style="background:${p.bgColor};color:${p.textColor}"><div class="container"><div class="grid grid-3 gap-8 text-center">${(p.items || []).map((i: any) => `<div><div style="font-size:48px;font-weight:800;color:${p.accentColor || '#7C3AED'}">${i.value}</div><div style="opacity:0.7;margin-top:8px">${i.label}</div></div>`).join('')}</div></div></section>`;
    case 'testimonial':
      return `<section class="section" style="background:${p.bgColor};color:${p.textColor};text-align:center"><div class="container" style="max-width:700px"><p style="font-size:24px;font-style:italic;margin-bottom:24px">${p.quote}</p><p style="font-weight:600">${p.author}</p><p style="opacity:0.6">${p.role}</p></div></section>`;
    case 'cta':
      return `<section class="section" style="background:${p.bgColor};color:${p.textColor};text-align:center"><div class="container"><h2 style="font-size:40px;font-weight:700;margin-bottom:16px">${p.heading}</h2><p style="opacity:0.7;margin-bottom:40px;font-size:18px">${p.subheading}</p>${p.buttonText ? `<a href="#" style="display:inline-block;background:${p.buttonColor || p.accentColor};color:#fff;padding:16px 40px;border-radius:12px;text-decoration:none;font-weight:600">${p.buttonText}</a>` : ''}</div></section>`;
    case 'pricing':
      return `<section class="section" style="background:${p.bgColor};color:${p.textColor}"><div class="container text-center"><h2 style="font-size:36px;font-weight:700;margin-bottom:48px">${p.heading}</h2><div class="grid grid-3 gap-6">${(p.plans || []).map((pl: any) => `<div style="padding:40px;border:${pl.highlighted ? '2px solid ' + (p.accentColor || '#7C3AED') : '1px solid rgba(255,255,255,0.1)'};border-radius:16px;background:${pl.highlighted ? 'rgba(124,58,237,0.1)' : 'transparent'}"><h3 style="font-size:20px;margin-bottom:8px">${pl.name}</h3><div style="font-size:48px;font-weight:800;margin-bottom:24px;color:${p.accentColor || '#7C3AED'}">${pl.price}</div><ul style="list-style:none;text-align:left">${(pl.features || []).map((f: string) => `<li style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05)">✓ ${f}</li>`).join('')}</ul></div>`).join('')}</div></div></section>`;
    case 'footer':
      return `<footer style="background:${p.bgColor};color:${p.textColor};padding:40px 24px"><div class="container flex justify-between items-center"><span>${p.brand}</span><div class="flex gap-4">${(p.links || []).map((l: string) => `<a href="#" style="color:${p.textColor};text-decoration:none">${l}</a>`).join('')}</div></div><div style="text-align:center;margin-top:24px;opacity:0.5">${p.copyright}</div></footer>`;
    case 'heading':
      return `<div style="padding:24px;text-align:${p.textAlign || 'left'}"><${p.level || 'h2'} style="font-size:${p.fontSize};font-weight:${p.fontWeight};color:${p.textColor}">${p.text}</${p.level || 'h2'}></div>`;
    case 'text':
      return `<div style="padding:16px 24px;color:${p.textColor};font-size:${p.fontSize};text-align:${p.textAlign || 'left'}">${p.text}</div>`;
    case 'richtext':
      return `<div style="padding:16px 24px;color:${p.textColor}">${p.text}</div>`;
    case 'link':
      return `<div style="padding:8px 24px"><a href="${p.url}" style="color:${p.linkColor};font-size:${p.fontSize}">${p.text}</a></div>`;
    case 'image':
      return `<div style="padding:16px 24px"><img src="${p.src}" alt="${p.alt}" style="width:${p.width};border-radius:${p.borderRadius}"/></div>`;
    case 'video':
      return `<div style="padding:16px 24px;aspect-ratio:${p.aspectRatio}"><iframe src="${p.src}" style="width:100%;height:100%;border:none" allowfullscreen></iframe></div>`;
    case 'gallery':
      return `<div style="padding:24px;display:grid;grid-template-columns:repeat(${p.columns || 3},1fr);gap:${p.gap}">${(p.images || []).map((src: string) => `<img src="${src}" style="width:100%;border-radius:8px;aspect-ratio:1;object-fit:cover"/>`).join('')}</div>`;
    case 'divider':
      return `<hr style="border:none;border-top:${p.thickness} solid ${p.color};margin:${p.margin} 24px"/>`;
    case 'spacer':
      return `<div style="height:${p.height}"></div>`;
    case 'button':
      return `<div style="padding:16px 24px"><a href="${p.url}" style="display:inline-block;background:${p.buttonColor};color:${p.buttonTextColor};padding:${p.padding};border-radius:${p.borderRadius};text-decoration:none;font-size:${p.fontSize};font-weight:600">${p.text}</a></div>`;
    case 'form':
      return `<section style="background:${p.bgColor};padding:60px 24px"><div class="container" style="max-width:500px"><form class="flex flex-col gap-4">${(p.fields || []).map((f: string) => `<input placeholder="${f}" style="padding:12px 16px;border:1px solid rgba(255,255,255,0.2);border-radius:8px;background:rgba(255,255,255,0.05);color:${p.textColor}"/>`).join('')}<button style="background:${p.buttonColor};color:#fff;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer">${p.buttonText}</button></form></div></section>`;
    case 'newsletter':
      return `<section style="background:${p.bgColor};padding:60px 24px;text-align:center"><div class="container" style="max-width:500px"><h3 style="color:${p.textColor};font-size:24px;margin-bottom:16px">${p.heading}</h3><div class="flex gap-2"><input placeholder="${p.placeholder}" style="flex:1;padding:12px 16px;border:1px solid rgba(255,255,255,0.2);border-radius:8px;background:rgba(255,255,255,0.05);color:${p.textColor}"/><button style="background:${p.buttonColor};color:#fff;padding:12px 24px;border:none;border-radius:8px;font-weight:600;cursor:pointer">${p.buttonText}</button></div></div></section>`;
    case 'container':
      return `<div style="background:${p.bgColor};padding:${p.padding};border-radius:${p.borderRadius};max-width:${p.maxWidth};margin:0 auto"></div>`;
    case 'columns':
      return `<div style="display:grid;grid-template-columns:repeat(${p.columns},1fr);gap:${p.gap};padding:24px"></div>`;
    case 'icon':
      return `<div style="padding:16px 24px;text-align:center;font-size:${p.size}px;color:${p.color}">★</div>`;
    default:
      return `<div style="padding:16px 24px;color:#999">[${c.type}]</div>`;
  }
}
