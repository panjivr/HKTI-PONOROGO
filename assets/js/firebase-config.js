/* =====================================================================
   KONFIGURASI DATABASE (Firebase Firestore) — HKTI DPC Ponorogo
   ---------------------------------------------------------------------
   Isi nilai di bawah dengan konfigurasi proyek Firebase Anda agar data
   anggota tersimpan di DATABASE (lintas perangkat), bukan hanya di
   perangkat ini. Bila dibiarkan kosong, situs tetap jalan memakai
   penyimpanan lokal (localStorage) sebagai cadangan.

   Cara mengisi (sekali saja) — lihat DATABASE.md:
   1. Buka https://console.firebase.google.com → Add project.
   2. Build → Firestore Database → Create database (mode uji dulu).
   3. Project settings → Your apps → Web (</>) → daftarkan app →
      salin nilai firebaseConfig ke bawah ini.
   ===================================================================== */
window.FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",            // WAJIB diisi agar database aktif
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
