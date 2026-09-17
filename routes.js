(()=>{
const id=String(window.EP_PAGE),groups={R:2,S:3,J:4,Y:5,C:6,K:7,V:8,N:9,G:10};
const group=Object.keys(groups).find(k=>groups[k]===Number(id))||id[0];
function go(route){if(parent!==window)parent.postMessage({educationPlusRoute:route},location.origin);else location.href=(/^[A-Z]/.test(id)?'../':'')+'index.html#'+route}
window.epGo=go;
const hooks={R01:{openCourseDetail:'R02'},R03:{handleLectureClick:'R04'},R05:{openReviewDetail:'R06'},R07:{handleAction:'R08'},J01:{navigateToApply:'J02'},J02:{goToPass:'J03'},Y03:{handleDirectToSubmission:'Y04'},N04:{closeAndRedirect:'N05'}};
Object.entries(hooks[id]||{}).forEach(([fn,r])=>window[fn]=()=>go(r));
if(id==='2'){window.handleQuickNav=x=>go(/领读/.test(x)?'R01':/大家|校园|读后感/.test(x)?'R12':'R03');window.handleJoinBook=()=>go('R08')}
const textRoutes={
'1':[['正在直播','C02'],['今日推荐','G07']],
'2':[['查看全省读书会','R12'],['大家一起读','R12'],['来做领读员','R01'],['名家谈阅读','R03'],['更多书库','R07']],
'3':[['成长档案','S06'],['名师指导','S05'],['去投稿','S02'],['赛事详情','S03']],
'4':[['我要在线投稿','J02'],['在线投稿','J02'],['投稿进度','J03'],['作品档案','J04'],['荣誉证书','J06'],['小记者风采','J05'],['阅读全文','J01']],
'5':[['发布创作','Y04'],['我的发布','Y05']],
'6':[['进入直播','C02'],['观看回放','C03'],['课程详情','C01']],
'7':[['开始答题','K03'],['立即报名','K05']],
'8':[['进入服务','V01']],
'9':[['发票管理','N05'],['我的订单','N03']],
'10':[['我的收藏','G03'],['我的投稿','G05'],['我的报名','G04'],['个人资料','G06']],
'11':[['阅读积分','R10']],
'12':[['查看详情','K05']],
'J01':[['在线投稿','J02'],['作品档案','J04'],['荣誉证书','J06'],['小记者风采','J05']],
'J02':[['投稿进度','J03'],['返回小记者工作台','4']],
'J03':[['查看见报文章','J01'],['荣誉证书','J06'],['撰写新采写文稿','J02']],
'J04':[['作品详情','J01'],['录用进度','J03'],['直达修改','J03'],['发起新稿件投稿','J02']],
'J05':[['阅读全文','J01'],['荣誉证书','J06'],['投稿成为风采小记者','J02']],
'J06':[['返回小记者','4']],
'R12':[['进入读书会主页','R13'],['返回读书会','2']],
'R13':[['阅读打卡','R09'],['读后感投稿','R05'],['阅读积分','R10'],['校园排行','R11'],['更多书目','R07'],['书目详情','R08'],['全部精选','R05'],['阅读全文','R06'],['返回全省校园读书会','R12']]
};
document.addEventListener('click',e=>{const b=e.target.closest('button,a,[onclick],[role="button"]');if(!b)return;const t=b.textContent.trim(),h=b.getAttribute('onclick')||'',a=b.getAttribute('aria-label')||'';let r=b.dataset.epRoute;
if(/history.back/.test(h)||a==='返回'){e.preventDefault();e.stopImmediatePropagation();go(groups[group]||1);return}
if(!r&&b.closest('nav')){r=({首页:1,书会:2,服务:11,活动:12,我的:10})[t.replace(/[a-z_]+/g,'').trim()]}
if(!r&&/alert|Toast|handleNavigation|handleLaunchDirect/.test(h)){const m=h.match(/\b([RSJYCKVNG]\d{2})\b/);if(m)r=m[1]}
if(!r)for(const [label,target]of textRoutes[id]||[]){if(t.includes(label)){r=target;break}}
if(r){e.preventDefault();e.stopImmediatePropagation();go(r)}
},true);
// Make every exported screen reachable on mobile without changing its layout.
fetch((/^[A-Z]/.test(id)?'../':'')+'stitch-pages.json').then(r=>r.json()).then(pages=>{
 const menu=document.createElement('details');menu.id='ep-page-menu';const title=document.createElement('summary');title.textContent='页面导航';menu.append(title);const box=document.createElement('div');const back=document.createElement('button');back.textContent='返回'+({R:'读书会',S:'少年派',J:'小记者',Y:'致青春',C:'公益课',K:'科学港',V:'填志愿',N:'订报刊',G:'我的'}[group]||'首页');back.onclick=()=>go(groups[group]||1);box.append(back);
 for(const [r,name] of Object.entries(pages)){if(r[0]===group||r[0]==='G'){const b=document.createElement('button');b.textContent=name;b.onclick=()=>go(r);if(r===id)b.disabled=true;box.append(b)}}menu.append(box);document.body.append(menu);
});
const style=document.createElement('style');style.textContent='#ep-page-menu{position:fixed;right:8px;top:48px;z-index:9999;font:13px -apple-system,sans-serif;color:#075e54}#ep-page-menu summary{cursor:pointer;background:#fff;border:1px solid #bddbd4;border-radius:18px;padding:7px 12px;box-shadow:0 2px 8px #1232;list-style:none}#ep-page-menu>div{position:absolute;right:0;top:36px;width:220px;max-height:65vh;overflow:auto;background:white;padding:8px;border-radius:14px;box-shadow:0 8px 28px #1234}#ep-page-menu button{display:block;text-align:left;width:100%;border:0;border-bottom:1px solid #edf4f1;background:white;color:#075e54;padding:11px;cursor:pointer}#ep-page-menu button:disabled{background:#e2f3ed}';document.head.append(style);
})();
