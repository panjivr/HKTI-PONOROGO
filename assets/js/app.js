/* Shared chrome + helpers for HKTI Ponorogo */
(function(){
  var MENU=[
    ['index.html','Beranda'],
    ['tentang.html','Tentang'],
    ['program.html','Program'],
    ['berita.html','Berita'],
    ['keanggotaan.html','Keanggotaan'],
    ['verifikasi.html','Verifikasi Kartu']
  ];
  var active=(document.body.getAttribute('data-page')||'index.html');

  function header(){
    var items=MENU.map(function(m){
      var a=m[0]===active?' class="active"':'';
      return '<li><a href="'+m[0]+'"'+a+'>'+m[1]+'</a></li>';
    }).join('');
    return ''+
    '<div class="topbar"><div class="container">'+
      '<span>📍 Kabupaten Ponorogo, Jawa Timur</span>'+
      '<div class="tb-right"><a href="tel:081360725055">☎ 0813-6072-5055</a>'+
      '<a href="mailto:mediacenterhkti@gmail.com">✉ mediacenterhkti@gmail.com</a>'+
      '<span>🕗 08.00–17.00 WIB</span></div>'+
    '</div></div>'+
    '<div class="container"><nav class="nav">'+
      '<a class="brand" href="index.html">'+
        '<span class="brand__logo">HK</span>'+
        '<span><span class="brand__t">HKTI Ponorogo</span><br>'+
        '<span class="brand__s">Himpunan Kerukunan Tani Indonesia</span></span>'+
      '</a>'+
      '<ul class="menu" id="menu">'+items+'</ul>'+
      '<div class="nav__cta">'+
        '<a class="btn btn--outline btn--sm" href="admin.html">Admin</a>'+
        '<a class="btn btn--gold btn--sm" href="keanggotaan.html#daftar">Daftar Anggota</a>'+
        '<button class="hamburger" id="burger" aria-label="Menu">'+
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>'+
      '</div>'+
    '</nav></div>';
  }

  function footer(){
    return '<div class="container"><div class="footer__grid">'+
      '<div><div class="brand" style="margin-bottom:14px">'+
        '<span class="brand__logo">HK</span>'+
        '<span><span class="brand__t" style="color:#fff">HKTI Ponorogo</span><br>'+
        '<span class="brand__s">Sekretariat Kabupaten</span></span></div>'+
        '<p style="color:#a9c9b0;font-size:.88rem;max-width:34ch">Wadah penghimpun potensi insan tani Kabupaten Ponorogo menuju pertanian yang maju, mandiri, dan sejahtera.</p></div>'+
      '<div><h4>Tautan</h4><a href="tentang.html">Tentang HKTI</a><a href="program.html">Program</a><a href="berita.html">Berita</a><a href="keanggotaan.html">Keanggotaan</a></div>'+
      '<div><h4>Layanan</h4><a href="verifikasi.html">Verifikasi Kartu</a><a href="keanggotaan.html#daftar">Pendaftaran</a><a href="admin.html">Portal Admin</a><a href="https://hkti.org" target="_blank" rel="noopener">HKTI Pusat ↗</a></div>'+
      '<div><h4>Kontak</h4>'+
        '<a href="mailto:mediacenterhkti@gmail.com">mediacenterhkti@gmail.com</a>'+
        '<a href="tel:081360725055">0813-6072-5055</a>'+
        '<span style="display:block;color:#a9c9b0;font-size:.88rem;margin-top:6px">Sekretariat DPC HKTI Kabupaten Ponorogo, Jawa Timur</span></div>'+
    '</div><div class="footer__bottom">'+
      '<span>© '+new Date().getFullYear()+' HKTI Kabupaten Ponorogo. Seluruh data anggota bersifat internal.</span>'+
      '<span>Dibuat untuk digitalisasi keanggotaan HKTI Ponorogo</span>'+
    '</div></div>';
  }

  function mount(){
    var h=document.getElementById('site-header');
    if(h){h.className='site-header';h.innerHTML=header();}
    var f=document.getElementById('site-footer');
    if(f){f.className='footer';f.innerHTML=footer();}
    var burger=document.getElementById('burger'),menu=document.getElementById('menu');
    if(burger)burger.addEventListener('click',function(){menu.classList.toggle('open');});
  }

  // ---- helpers exposed globally ----
  window.HKTI={
    members:function(){return window.HKTI_MEMBERS||[];},
    find:function(id){id=(id||'').trim().toUpperCase();
      return this.members().find(function(m){
        return m.id.toUpperCase()===id||m.nia===id||m.nia.replace(/\D/g,'')===id.replace(/\D/g,'');});},
    verifyUrl:function(id){var b=location.href.replace(/[^/]*$/,'');return b+'verifikasi.html?id='+encodeURIComponent(id);},
    esc:function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  };

  if(document.readyState!=='loading')mount();else document.addEventListener('DOMContentLoaded',mount);
})();
