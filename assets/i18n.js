// Tiny EN/PT switcher: elements with data-i18n="key" get their text from the page dictionary
(function () {
  let saved = null;
  try {
    saved = localStorage.getItem('lang');
  } catch {}
  window.LANG = saved || ((navigator.language || 'en').toLowerCase().startsWith('pt') ? 'pt' : 'en');

  window.applyI18n = function (dict) {
    const d = dict[window.LANG] || dict.en;
    document.documentElement.lang = window.LANG === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const v = d[el.dataset.i18n];
      if (v !== undefined) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
      const v = d[el.dataset.i18nPh];
      if (v !== undefined) el.placeholder = v;
    });
    document.querySelectorAll('[data-src-en]').forEach((img) => {
      img.src = window.LANG === 'pt' ? img.dataset.srcPt : img.dataset.srcEn;
    });
    if (d._title) document.title = d._title;
    document.querySelectorAll('.lang button').forEach((b) => b.classList.toggle('on', b.dataset.lang === window.LANG));
  };

  window.setLang = function (l, dict) {
    window.LANG = l;
    try {
      localStorage.setItem('lang', l);
    } catch {}
    window.applyI18n(dict);
  };
})();
