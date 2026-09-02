# HKTI Ponorogo — Website & Kartu Anggota Digital

Website resmi (statis) untuk **HKTI Kabupaten Ponorogo** — Himpunan Kerukunan Tani Indonesia — lengkap dengan sistem **kartu tanda anggota ber-QR** dan **verifikasi keanggotaan**.

## ✨ Fitur

- **Website publik profesional** — Beranda, Tentang, Program, Berita, Keanggotaan. Palet warna hijau tani + emas padi (selaras dengan identitas HKTI).
- **Verifikasi Kartu (`verifikasi.html`)** — pindai QR kartu atau masukkan Nomor Induk Anggota (NIA). Data anggota **tidak tampil ke publik**, hanya muncul setelah verifikasi berhasil.
- **Kartu Tanda Anggota digital** — tiap anggota punya kartu ber-QR yang bisa dicetak. QR memuat tautan verifikasi `verifikasi.html?id=<ID>`.
- **Portal Admin (`admin.html`)** — basis data anggota: cari, filter, tambah/edit anggota & jabatan, cetak kartu. Untuk anggota yang belum lengkap, statusnya *"belum aktif"* dan bisa disusulkan.

## 🔒 Privasi data anggota

Data 32 anggota dari `DATA_ANGGOTA_SEMENTARA` **tidak dipublikasikan** di halaman publik. Data hanya muncul saat kartu diverifikasi melalui pindai QR / input NIA. Data disimpan di `assets/js/data.js`.

## 📁 Struktur

```
index.html          Beranda            verifikasi.html   Verifikasi kartu (scan QR)
tentang.html        Profil organisasi  admin.html        Portal pengurus
program.html        Program & layanan  assets/css/       Desain sistem
berita.html         Berita             assets/js/data.js Data anggota + berita
keanggotaan.html    Info & pendaftaran assets/js/app.js  Header/footer + helper
```

## ▶️ Menjalankan

Situs statis — cukup buka lewat server lokal (kamera QR butuh `https`/`localhost`):

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

Contoh verifikasi: `http://localhost:8000/verifikasi.html?id=HKTI-PNG-0001`
Login admin (demo): kata sandi **`hkti2024`**.

## ⚙️ Menuju produksi (catatan)

Purwarupa ini menyimpan perubahan admin di `localStorage`. Untuk produksi:
1. Ganti login admin demo dengan **autentikasi server** yang aman.
2. Pindahkan data anggota ke **basis data + API** (jangan simpan data pribadi di file statis publik).
3. Terbitkan NIA & jabatan resmi via portal admin.

---

## Catatan data
- **Anggota**: `DATA ANGGOTA HKTI KABUPATEN PONOROGO` (32 anggota) + 3 slot contoh berstatus *belum aktif*.
- **Profil & berita**: hasil rujukan dari [hkti.org](https://hkti.org).
- NIA menggunakan format `3502.24.NNNN` (3502 = kode Kabupaten Ponorogo).
