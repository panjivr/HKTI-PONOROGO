/* Shared chrome + helpers for HKTI Ponorogo */
(function(){
  var MENU=[
    ['index.html','Beranda'],
    ['tentang.html','Tentang'],
    ['program.html','Program'],
    ['berita.html','Berita'],
    ['keanggotaan.html','Keanggotaan'],
    ['verifikasi.html','Verifikasi'],
    ['profil.html','Profil']
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
        '<span class="brand__logo"><img src="assets/img/logo-hkti.png" alt="HKTI"></span>'+
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
        '<span class="brand__logo"><img src="assets/img/logo-hkti.png" alt="HKTI"></span>'+
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
    document.addEventListener('click',function(e){
      var t=e.target.closest&&e.target.closest('[data-flip]');
      if(t){var el=document.getElementById(t.getAttribute('data-flip'));if(el)el.classList.toggle('flip');}
    });
  }

  // ---- helpers exposed globally ----
  window.HKTI={
    members:function(){return window.HKTI_MEMBERS||[];},
    find:function(id){id=(id||'').trim().toUpperCase();
      return this.members().find(function(m){
        return m.id.toUpperCase()===id||m.nia===id||m.nia.replace(/\D/g,'')===id.replace(/\D/g,'');});},
    verifyUrl:function(id){var b=location.href.replace(/[^/]*$/,'');return b+'verifikasi.html?id='+encodeURIComponent(id);},
    esc:function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});},
    initials:function(nama){var p=String(nama||'?').replace(/[^A-Za-z\s]/g,'').trim().split(/\s+/);
      return ((p[0]||'?')[0]+(p.length>1?p[p.length-1][0]:'')).toUpperCase();},
    avatar:function(m,cls){cls=cls||'';
      if(m&&m.foto)return '<div class="avatar '+cls+'"><img src="'+this.esc(m.foto)+'" alt="'+this.esc(m.nama)+'"></div>';
      return '<div class="avatar avatar--init '+cls+'">'+this.esc(this.initials(m&&m.nama))+'</div>';},
    // Kartu Tanda Anggota dua sisi (depan artwork resmi, belakang data + QR)
    ktaCard:function(m,suffix){suffix=suffix||'x';
      var photo=(m&&m.foto)?'<img class="kta__photo" src="'+this.esc(m.foto)+'" alt="Foto '+this.esc(m.nama)+'">':'<div class="kta__photo avatar avatar--init">'+this.esc(this.initials(m&&m.nama))+'</div>';
      return '<div class="kta" id="kta-'+suffix+'"><div class="kta__inner">'+
        '<div class="kta__face kta__front"><img src="assets/img/kta-front.jpg" alt="Kartu Tanda Anggota HKTI"></div>'+
        '<div class="kta__face kta__back"><div class="kta__bar"></div>'+
          '<div class="kta__bhead"><img src="assets/img/logo-hkti.png" alt="HKTI">'+
          '<span style="display:flex;flex-direction:column"><b>KARTU TANDA ANGGOTA</b><span>Himpunan Kerukunan Tani Indonesia</span></span></div>'+
          '<div class="kta__bbody">'+photo+
            '<dl class="kta__rows">'+
              '<div><dt>No. ID</dt><dd>'+this.esc(m.nia)+'</dd></div>'+
              '<div><dt>Nama</dt><dd>'+this.esc(m.nama)+'</dd></div>'+
              '<div><dt>Kecamatan</dt><dd>'+this.esc(m.kecamatan||'-')+'</dd></div>'+
              '<div><dt>Kab/Kota</dt><dd>Kab. Ponorogo</dd></div>'+
              '<div><dt>Provinsi</dt><dd>Jawa Timur</dd></div>'+
            '</dl>'+
            '<div class="kta__qr" id="ktaqr-'+suffix+'"></div></div>'+
          '<div class="kta__bar kta__bar--b"></div></div>'+
        '</div></div>'+
        '<div class="kta-actions no-print"><button class="btn btn--outline btn--sm" data-flip="kta-'+suffix+'">🔄 Balik Kartu</button>'+
        '<button class="btn btn--outline btn--sm" onclick="window.print()">🖨 Cetak</button></div>';},
    drawKtaQR:function(suffix,id){var el=document.getElementById('ktaqr-'+suffix);
      if(el&&window.QRCode){el.innerHTML='';new QRCode(el,{text:this.verifyUrl(id),width:60,height:60,colorDark:'#0f3d1e',colorLight:'#fff',correctLevel:QRCode.CorrectLevel.M});}},
    // ---- shared member overrides (self-service edits + admin) ----
    LS_KEY:'hkti_members_override',
    overrides:function(){try{return JSON.parse(localStorage.getItem(this.LS_KEY)||'{}');}catch(e){return {};}},
    saveOverride:function(m){var o=this.overrides();o[m.id]=Object.assign(o[m.id]||{},m);localStorage.setItem(this.LS_KEY,JSON.stringify(o));},
    merged:function(){var o=this.overrides(),map={};this.members().forEach(function(m){map[m.id]=Object.assign({},m);});
      Object.keys(o).forEach(function(id){map[id]=Object.assign(map[id]||{},o[id]);});
      return Object.keys(map).map(function(k){return map[k];}).sort(function(a,b){return a.id.localeCompare(b.id);});},
    mergedFind:function(id){id=(id||'').trim().toUpperCase();return this.merged().find(function(m){
      return m.id.toUpperCase()===id||m.nia===id||m.nia.replace(/\D/g,'')===id.replace(/\D/g,'');});},
    resizePhoto:function(file,cb){var r=new FileReader();r.onload=function(ev){var img=new Image();
      img.onload=function(){var s=360,cv=document.createElement('canvas');
        var sc=Math.min(s/img.width,s/img.height,1),w=img.width*sc,h=img.height*sc;
        cv.width=w;cv.height=h;cv.getContext('2d').drawImage(img,0,0,w,h);cb(cv.toDataURL('image/jpeg',0.82));};
      img.src=ev.target.result;};r.readAsDataURL(file);}
  };

  if(document.readyState!=='loading')mount();else document.addEventListener('DOMContentLoaded',mount);
})();
