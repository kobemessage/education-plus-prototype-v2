(() => {
  const page = String(window.EP_PAGE || document.documentElement.dataset.page || '');
  const activeRoute = page === '1' ? '1' : page === '12' ? '12' : page === '10' ? '10' : '11';
  const items = [
    ['1', '首页', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 10.7 12 3l8.5 7.7v9.8h-6v-6h-5v6h-6z"/></svg>'],
    ['11', '服务', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z"/></svg>'],
    ['12', '活动', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v3m12-3v3M4 8h16v12H4zm4 4h3v3H8z"/></svg>'],
    ['10', '我的', '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-2.3c0-3.2 3.1-5.7 7-5.7s7 2.5 7 5.7V21z"/></svg>']
  ];

  const labels = ['首页', '书会', '读书会', '少年派', '小记者', '致青春', '公益课', '科学港', '填志愿', '订报刊', '服务', '活动', '我的'];
  const iconLabels = {
    arrow_back: '返回', arrow_back_ios: '返回', arrow_back_ios_new: '返回', close: '关闭',
    more_horiz: '更多', person: '个人中心', account_circle: '个人中心', notifications: '消息通知',
    share: '分享', favorite: '点赞', favorite_border: '点赞', bookmark: '收藏', bookmark_border: '收藏',
    search: '搜索', tune: '筛选', fullscreen: '全屏', volume_up: '音量', play_arrow: '播放',
    chevron_right: '查看详情', expand_more: '展开详情', download: '保存', delete: '删除'
  };

  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('alt')) img.alt = img.dataset.alt || '';
  });
  document.querySelectorAll('button,a,[role="button"]').forEach(control => {
    if (control.getAttribute('aria-label') || control.getAttribute('title')) return;
    const text = (control.textContent || '').replace(/\s+/g, ' ').trim();
    const icon = control.querySelector('.material-symbols-outlined');
    const iconName = (icon?.textContent || '').trim();
    if (text && text !== iconName) return;
    control.setAttribute('aria-label', iconLabels[iconName] || '操作');
  });
  const isLegacyNav = nav => {
    const text = (nav.textContent || '').replace(/\s+/g, '');
    const count = labels.filter(label => text.includes(label)).length;
    const cls = String(nav.className || '');
    const knownBottomNav = nav.id === 'ep-nav' || /(^|\s)(science-nav|bottomnav|tabbar)(\s|$)/.test(cls);
    return knownBottomNav || (count >= 3 && nav.querySelectorAll('button,a').length >= 4);
  };

  document.querySelectorAll('nav').forEach(nav => {
    if (!isLegacyNav(nav)) return;
    let target = nav;
    const parent = nav.parentElement;
    if (parent && /(^|\s)(fixed|tabbar|bottom-nav)(\s|$)/.test(parent.className || '') && /bottom-0|tabbar|bottom-nav/.test(parent.className || '')) {
      target = parent;
    }
    target.classList.add('ep-nav-legacy');
    target.setAttribute('aria-hidden', 'true');
  });

  document.querySelectorAll('body > footer, body > div, main > footer, main > div').forEach(el => {
    const cls = String(el.className || '');
    if (el.classList.contains('ep-nav-legacy')) return;
    if ((cls.includes('fixed') || cls.includes('sticky')) && cls.includes('bottom-0')) {
      el.classList.add('ep-bottom-action');
      document.body.classList.add('ep-has-bottom-action');
    }
  });

  const style = document.createElement('style');
  style.id = 'ep-global-nav-style';
  style.textContent = `
    .ep-nav-legacy{display:none!important}
    html body{padding-bottom:calc(72px + env(safe-area-inset-bottom,0px))!important}
    html body.ep-has-bottom-action{padding-bottom:calc(136px + env(safe-area-inset-bottom,0px))!important}
    .ep-bottom-action{bottom:64px!important}
    #ep-global-nav{position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:9998!important;height:calc(64px + env(safe-area-inset-bottom,0px))!important;padding:0 8px env(safe-area-inset-bottom,0px)!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;align-items:stretch!important;background:rgba(255,255,255,.97)!important;border-top:1px solid #e4eee9!important;box-shadow:0 -5px 22px rgba(24,87,68,.06)!important;backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;font-family:"PingFang SC","Microsoft YaHei",-apple-system,sans-serif!important}
    #ep-global-nav button{appearance:none!important;border:0!important;background:transparent!important;margin:0!important;padding:7px 2px 5px!important;min-width:0!important;min-height:56px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;color:#7c9089!important;font:500 11px/1.1 "PingFang SC","Microsoft YaHei",-apple-system,sans-serif!important;letter-spacing:0!important;box-shadow:none!important;border-radius:0!important;transform:none!important}
    #ep-global-nav button:active{background:#f1f8f5!important}
    #ep-global-nav button:focus-visible{outline:3px solid #efbd23!important;outline-offset:-3px!important}
    #ep-global-nav svg{display:block!important;width:23px!important;height:23px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.8!important;stroke-linecap:round!important;stroke-linejoin:round!important;flex:none!important}
    #ep-global-nav button[data-active="true"]{color:#087f73!important;font-weight:700!important}
    #ep-global-nav button[data-active="true"] svg{stroke-width:2.25!important}
    @media(max-width:360px){#ep-global-nav button{font-size:10px!important}}
  `;
  document.head.append(style);

  const nav = document.createElement('nav');
  nav.id = 'ep-global-nav';
  nav.setAttribute('aria-label', '全局底部导航');
  items.forEach(([route, label, icon]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.epRoute = route;
    button.dataset.active = String(route === activeRoute);
    if (route === activeRoute) button.setAttribute('aria-current', 'page');
    button.setAttribute('aria-label', label);
    button.innerHTML = icon + `<span>${label}</span>`;
    nav.append(button);
  });
  nav.addEventListener('click', event => {
    const button = event.target.closest('button[data-ep-route]');
    if (!button) return;
    const route = button.dataset.epRoute;
    if (typeof window.epGo === 'function') {
      window.epGo(route);
      return;
    }
    if (parent !== window) {
      parent.postMessage({educationPlusRoute: route}, location.origin === 'null' ? '*' : location.origin);
      return;
    }
    const prefix = location.pathname.includes('/stitch/') ? '../' : '';
    location.href = prefix + 'index.html#' + route;
  });
  document.body.append(nav);
  document.body.classList.add('ep-global-nav-ready');
})();
