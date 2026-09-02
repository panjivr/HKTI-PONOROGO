/* Shared chrome + helpers for HKTI DPC Ponorogo */
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
      '<a class="brand" href="index.html" id="brand-link" title="Beranda">'+
        '<span class="brand__logo"><img src="assets/img/logo-hkti.png" alt="HKTI"></span>'+
        '<span><span class="brand__t">HKTI DPC Ponorogo</span><br>'+
        '<span class="brand__s">Himpunan Kerukunan Tani Indonesia</span></span>'+
      '</a>'+
      '<ul class="menu" id="menu">'+items+'<li class="menu-cta"><a class="btn btn--gold btn--block" href="keanggotaan.html#daftar">＋ Daftar Anggota</a></li></ul>'+
      '<div class="nav__cta">'+
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
        '<span><span class="brand__t" style="color:#fff">HKTI DPC Ponorogo</span><br>'+
        '<span class="brand__s">Sekretariat Kabupaten</span></span></div>'+
        '<p style="color:#a9c9b0;font-size:.88rem;max-width:34ch">Wadah penghimpun potensi insan tani Kabupaten Ponorogo menuju pertanian yang maju, mandiri, dan sejahtera.</p></div>'+
      '<div><h4>Tautan</h4><a href="tentang.html">Tentang HKTI</a><a href="program.html">Program</a><a href="berita.html">Berita</a><a href="keanggotaan.html">Keanggotaan</a></div>'+
      '<div><h4>Layanan</h4><a href="verifikasi.html">Verifikasi Kartu</a><a href="keanggotaan.html#daftar">Pendaftaran</a><a href="profil.html">Profil Anggota</a><a href="https://hkti.id" target="_blank" rel="noopener">HKTI Pusat (hkti.id) ↗</a></div>'+
      '<div><h4>Kontak</h4>'+
        '<a href="mailto:mediacenterhkti@gmail.com">mediacenterhkti@gmail.com</a>'+
        '<a href="tel:081360725055">0813-6072-5055</a>'+
        '<span style="display:block;color:#a9c9b0;font-size:.88rem;margin-top:6px">Sekretariat DPC HKTI Kabupaten Ponorogo, Jawa Timur</span></div>'+
    '</div><div class="footer__bottom">'+
      '<span>© '+new Date().getFullYear()+' HKTI DPC Ponorogo. Seluruh data anggota bersifat internal.</span>'+
      '<span>Dibuat untuk digitalisasi keanggotaan HKTI DPC Ponorogo</span>'+
    '</div></div>';
  }

  function mount(){
    var h=document.getElementById('site-header');
    if(h){h.className='site-header';h.innerHTML=header();}
    var f=document.getElementById('site-footer');
    if(f){f.className='footer';f.innerHTML=footer();}
    var burger=document.getElementById('burger'),menu=document.getElementById('menu');
    if(burger)burger.addEventListener('click',function(){menu.classList.toggle('open');});
    // Admin tersembunyi: klik logo/brand 2x untuk masuk portal admin
    var bl=document.getElementById('brand-link');
    if(bl){var tmr=null;
      bl.addEventListener('click',function(e){e.preventDefault();clearTimeout(tmr);
        tmr=setTimeout(function(){location.href='index.html';},250);});
      bl.addEventListener('dblclick',function(e){e.preventDefault();clearTimeout(tmr);location.href='admin.html';});
    }
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
    // Payload QR ringkas (cuma NIA) → sedikit kotak, tahan blur; dibaca "Pindai QR" di verifikasi
    qrText:function(m){var d=String((m&&m.nia)||'').replace(/\D/g,'');return d||String((m&&m.id)||'');},
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
    // Render Kartu Tanda Anggota (layout foto+data) ke PNG seukuran kartu
    cardPNG:function(m,cb){
      var self=this,W=1350,H=855,c=document.createElement('canvas');c.width=W;c.height=H;
      var g=c.getContext('2d');
      function paint(){
        g.clearRect(0,0,W,H);
        g.fillStyle='#f3f4f1';g.fillRect(0,0,W,H);
        g.fillStyle='rgba(20,60,30,0.04)';
        for(var yy=40;yy<H-40;yy+=28)for(var xx=24;xx<W;xx+=28){g.beginPath();g.arc(xx,yy,1.5,0,7);g.fill();}
        function bar(y0){var lg=g.createLinearGradient(0,0,W,0);lg.addColorStop(0,'#164e26');lg.addColorStop(1,'#43a047');g.fillStyle=lg;g.fillRect(0,y0,W,70);}
        bar(0);bar(H-70);
        var px=110,py=300,pw=280,ph=350;
        // header: logo besar di KIRI + judul di kanan (layout seperti contoh)
        var lh=176,lw=(logo&&logo.width)?logo.width*(lh/logo.height):176;
        var t1='KARTU TANDA ANGGOTA',t2='HIMPUNAN KERUKUNAN TANI INDONESIA';
        g.textAlign='left';g.textBaseline='alphabetic';
        g.font='800 50px "Plus Jakarta Sans",system-ui,sans-serif';var w1=g.measureText(t1).width;
        g.font='500 31px "Plus Jakarta Sans",system-ui,sans-serif';var w2=g.measureText(t2).width;
        var gap=32,total=lw+gap+Math.max(w1,w2),sx=(W-total)/2,cy=158;
        if(logo&&logo.width)g.drawImage(logo,sx,cy-lh/2,lw,lh);
        var tx=sx+lw+gap;
        g.fillStyle='#1b241d';g.font='800 50px "Plus Jakarta Sans",system-ui,sans-serif';g.fillText(t1,tx,cy-2);
        g.fillStyle='#3a3f3a';g.font='500 31px "Plus Jakarta Sans",system-ui,sans-serif';g.fillText(t2,tx,cy+38);
        // foto
        if(photo&&photo.width){var s=Math.max(pw/photo.width,ph/photo.height),dw=photo.width*s,dh=photo.height*s;
          g.save();g.beginPath();g.rect(px,py,pw,ph);g.clip();g.drawImage(photo,px+(pw-dw)/2,py+(ph-dh)/2,dw,dh);g.restore();
        }else{g.fillStyle='#e8f3ea';g.fillRect(px,py,pw,ph);g.fillStyle='#1b5e20';g.font='800 96px system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(self.initials(m&&m.nama),px+pw/2,py+ph/2);g.textAlign='left';}
        g.strokeStyle='#cfd8d0';g.lineWidth=2;g.strokeRect(px,py,pw,ph);
        // data
        var rows=[['No. ID',m.nia],['Nama',m.nama],['Alamat',(m.alamat&&m.alamat!=='-')?m.alamat:'-'],['Desa/Kelurahan',m.desa||'-'],['Kecamatan',m.kecamatan||'-'],['Kota/Kab','Kab. Ponorogo'],['Provinsi','Jawa Timur']];
        var bx=470,cx=bx+278,vx=bx+312,vy=326,rh=48,vmax=W-vx-40;g.textBaseline='alphabetic';
        for(var i=0;i<rows.length;i++){var y=vy+i*rh;
          g.fillStyle='#1b241d';g.font='400 31px "Plus Jakarta Sans",system-ui,sans-serif';
          g.fillText(rows[i][0],bx,y);g.fillText(':',cx,y);
          g.font='600 31px "Plus Jakarta Sans",system-ui,sans-serif';
          var val=String(rows[i][1]||'-');if(g.measureText(val).width>vmax){while(g.measureText(val+'…').width>vmax&&val.length>4)val=val.slice(0,-1);val+='…';}
          g.fillText(val,vx,y);
        }
        // Barcode QR: payload ringkas (NIA) + EC tinggi → kotak sedikit & besar, tahan blur
        var qs=210,pad=30,qx=W-qs-82,qy=H-qs-124;
        function finish(){cb(c.toDataURL('image/png'));}
        if(window.QRCode){
          var box=document.createElement('div');box.style.cssText='position:absolute;left:-9999px;top:0';document.body.appendChild(box);
          try{new QRCode(box,{text:self.qrText(m),width:qs,height:qs,colorDark:'#0f3d1e',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.Q});}catch(e){}
          setTimeout(function(){
            var qc=box.querySelector('canvas')||box.querySelector('img');
            g.fillStyle='#ffffff';g.fillRect(qx-pad,qy-pad,qs+pad*2,qs+pad*2);
            g.strokeStyle='#cfd8d0';g.lineWidth=2;g.strokeRect(qx-pad,qy-pad,qs+pad*2,qs+pad*2);
            if(qc){g.imageSmoothingEnabled=false;try{g.drawImage(qc,qx,qy,qs,qs);}catch(e){}g.imageSmoothingEnabled=true;}
            g.fillStyle='#5c6b60';g.font='500 22px "Plus Jakarta Sans",system-ui,sans-serif';g.textAlign='center';
            g.fillText('Pindai untuk verifikasi',qx+qs/2,qy+qs+pad+8);g.textAlign='left';
            document.body.removeChild(box);finish();
          },60);
        } else finish();
      }
      var logo=null,photo=null,pending=1;
      function done(){if(!--pending)paint();}
      function loadImg(src,set){pending++;var im=new Image();im.crossOrigin='anonymous';im.onload=function(){set(im);done();};im.onerror=function(){done();};im.src=src;}
      loadImg('assets/img/logo-hkti.png',function(i){logo=i;});
      if(m&&m.foto)loadImg(m.foto,function(i){photo=i;});
      var ready=(document.fonts&&document.fonts.ready)?document.fonts.ready:Promise.resolve();
      ready.then(done);
    },
    downloadCardPNG:function(m){this.cardPNG(m,function(url){var a=document.createElement('a');a.href=url;a.download='KTA_'+String(m.nia||m.id).replace(/[^\w.-]/g,'')+'.png';document.body.appendChild(a);a.click();a.remove();});},
    resizePhoto:function(file,cb){var r=new FileReader();r.onload=function(ev){var img=new Image();
      img.onload=function(){var s=360,cv=document.createElement('canvas');
        var sc=Math.min(s/img.width,s/img.height,1),w=img.width*sc,h=img.height*sc;
        cv.width=w;cv.height=h;cv.getContext('2d').drawImage(img,0,0,w,h);cb(cv.toDataURL('image/jpeg',0.82));};
      img.src=ev.target.result;};r.readAsDataURL(file);}
  };

  if(document.readyState!=='loading')mount();else document.addEventListener('DOMContentLoaded',mount);
})();
