const CACHE='fx-shipping-v21';
const FILES=['./','./index.html','./manifest.json','./icon-180.png','./icon-192.png','./icon-512.png'];
const EXT=['https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES).then(()=>Promise.all(EXT.map(u=>fetch(u,{mode:'cors'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{}))))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put('./index.html',c));return r}).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)));
});
