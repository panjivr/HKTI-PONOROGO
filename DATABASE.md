# Aktifkan Database (agar data tersimpan lintas perangkat)

Secara default situs menyimpan data anggota di **localStorage** (hanya di perangkat
yang dipakai). Agar data yang diinput di **Portal Admin** dan **Profil Anggota**
tersimpan di **database** dan bisa dibuka dari perangkat mana pun, aktifkan
**Firebase Firestore** (gratis, tanpa server). Sekali setup, selesai.

## Langkah setup (± 5 menit)

1. Buka <https://console.firebase.google.com> → **Add project** → beri nama
   (mis. `hkti-ponorogo`) → buat.
2. Menu **Build → Firestore Database → Create database**.
   - Pilih lokasi (mis. `asia-southeast2` / Jakarta).
   - Mulai dengan **Test mode** (agar cepat jalan). *Lihat catatan keamanan di bawah.*
3. Menu **Project settings** (⚙️) → tab **General** → bagian **Your apps** →
   klik ikon **Web `</>`** → daftarkan app (Register app).
4. Firebase menampilkan objek `firebaseConfig`. **Salin** nilainya ke file
   **`assets/js/firebase-config.js`** di repo ini, contoh:

   ```js
   window.FIREBASE_CONFIG = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "hkti-ponorogo.firebaseapp.com",
     projectId: "hkti-ponorogo",
     storageBucket: "hkti-ponorogo.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef123456"
   };
   ```
5. `git commit` + `git push` → Vercel auto-deploy. Selesai.
   Di Portal Admin akan muncul badge **"☁️ Database aktif — tersimpan lintas perangkat"**.

Data anggota disimpan di koleksi **`members`** (1 dokumen per anggota, id = ID kartu,
mis. `HKTI-PNG-0032`). Data awal 35 anggota tetap dari `assets/js/data.js`; database
menambah/menimpa (foto, alamat, status, jabatan, dll).

## Catatan keamanan (penting untuk produksi)

**Test mode** mengizinkan siapa saja membaca/menulis database selama ±30 hari.
Untuk dipakai sungguhan, batasi aksesnya. Contoh paling sederhana — **publik boleh
baca, tapi tulis hanya untuk yang login** (Firestore → tab **Rules**):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /members/{id} {
      allow read: if true;             // verifikasi kartu bisa dibaca umum
      allow write: if request.auth != null;  // hanya pengurus login yang boleh simpan
    }
  }
}
```

Agar aturan `write` di atas jalan, perlu ditambah **login pengurus** (Firebase
Authentication). Bila diperlukan, minta saya menambahkan login admin berbasis
Firebase Auth — saat ini Portal Admin masih memakai kata sandi demo (`hkti2024`)
di sisi browser.

## Tanpa setup?

Tidak apa-apa. Situs tetap berfungsi penuh memakai localStorage sebagai cadangan —
hanya saja datanya tidak berpindah antar-perangkat sampai Firestore diaktifkan.
