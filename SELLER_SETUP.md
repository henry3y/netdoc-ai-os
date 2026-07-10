# 🧑‍💼 Panduan Setup untuk Penjual (Dilakukan SEKALI di Awal)

Dokumen ini untuk **Anda** (pemilik produk), bukan untuk pembeli. Tujuannya:
menyiapkan tombol "Deploy" sekali klik supaya pembeli tidak perlu repot
upload file manual seperti panduan GitHub sebelumnya.

Setelah setup ini selesai, yang Anda kirim ke pembeli **hanya**
`PANDUAN_PEMBELI.md` (atau isi filenya Anda salin ke halaman produk/PDF
Anda sendiri).

---

## Langkah 1 — Push Project ke GitHub (Repo Anda Sendiri)

1. Buat repo baru di GitHub, **Public**, nama bebas (misal `netdoc-ai-os`).
2. Upload seluruh isi folder project ini ke repo tersebut (drag & drop lewat
   web, sama seperti panduan GitHub Pages sebelumnya).
3. Repo ini adalah **"master copy"** milik Anda — pembeli tidak akan upload
   ke sini, mereka nanti dapat salinan sendiri lewat tombol Deploy.

> 💡 Karena repo-nya Public, siapa saja bisa melihat kodenya. Ini konsekuensi
> dari tombol "Deploy" sekali klik (Vercel butuh akses baca ke repo publik).
> Kalau Anda tidak ingin kode terlihat publik, gunakan Opsi B di bagian
> bawah (private + invite manual).

## Langkah 2 — Buat Tombol "Deploy to Vercel"

1. Salin URL repo Anda, contoh: `https://github.com/johndoe/netdoc-ai-os`
2. Buka `README.md`, cari baris:
   ```
   https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO&project-name=netdoc-ai-os&repository-name=netdoc-ai-os
   ```
3. Ganti `YOUR_USERNAME/YOUR_REPO` dengan punya Anda, misal:
   ```
   https://vercel.com/new/clone?repository-url=https://github.com/johndoe/netdoc-ai-os&project-name=netdoc-ai-os&repository-name=netdoc-ai-os
   ```
4. Commit perubahan ini ke repo (upload ulang `README.md` yang sudah diedit).
5. Selesai — link inilah yang dipakai di tombol Deploy.

## Langkah 3 — Tes Sendiri Dulu

1. Buka link Vercel yang sudah Anda edit di Langkah 2 (di browser mode
   Incognito supaya simulasi seperti pembeli baru).
2. Vercel akan minta login/daftar (pakai akun GitHub pembeli sendiri) →
   klik "Create" → tunggu ±1 menit → dapat link live.
3. Pastikan situsnya terbuka normal dan bisa di-install di HP.

## Langkah 4 — White-Label Sebelum Dijual (Opsional tapi Disarankan)

Buka `lib/config.ts`, ganti sesuai brand Anda:

```ts
export const APP_CONFIG = {
  name: "Nama Produk Anda™",
  shortName: "Nama Pendek",
  tagline: "Tagline Anda",
  description: "...",
  themeColor: "#0B1016",   // warna tema PWA
  accentColor: "#7C5CFF",  // warna aksen tombol/gauge
  version: "1.0",
};
```

Satu file ini otomatis mengubah nama di: tab browser, dashboard, PWA
manifest, halaman About, install prompt, dsb.

Ganti juga ikon di `public/icons/` (ukuran 192x192 dan 512x512 px, format
PNG) kalau ingin logo sendiri.

## Langkah 5 — Siapkan Materi Jualan

- Ambil isi `PANDUAN_PEMBELI.md` → jadikan bagian "Cara Install" di halaman
  produk Anda (Gumroad/Lynk.id/Mayar/dsb), atau kirim sebagai file terpisah
  setelah pembeli checkout.
- Sertakan `LICENSE.md` sebagai lampiran (lindungi hak Anda atas source
  code — baca & sesuaikan dulu isinya).
- Rekomendasi platform jualan (support pengiriman file/link otomatis
  setelah bayar): Gumroad, Lemonsqueezy, Mayar.id, Lynk.id, Payhip.

---

## 🇮🇩 Setup Khusus Lynk.id

Lynk.id punya fitur "Produk Digital" yang otomatis kirim file + pesan WA
ke pembeli setelah bayar. Berikut cara mengisinya:

1. Login ke [lynk.id](https://lynk.id) → dashboard → **My Lynk**.
2. Klik **Add Block** → pilih **"Produk Digital"**.
3. Pilih template **"Simple Template"**.
4. Isi field-field berikut:

| Field | Isi dengan |
|---|---|
| **Add Image** | Screenshot dashboard aplikasi (ambil dari HP setelah install, atau screenshot browser) |
| **Title** | Misal: "NetDoc AI OS™ — Audit Jaringan dari HP, Siap Pakai" |
| **Description** | Salin bagian "Apa yang Anda Dapatkan" dari `PANDUAN_PEMBELI.md` |
| **Upload file** | Upload **PDF panduan** (`Panduan_Install_NetDoc_AI_OS.pdf`) — ini yang otomatis dikirim ke pembeli |
| **Price** | Sesuai harga jual Anda |
| **Sale price** | Isi kalau ada diskon (opsional) |
| **WhatsApp Notification** | Aktifkan (toggle ON) |
| **Custom Message** | Salin teks siap pakai di bawah ⬇️ |

**Custom Message yang disarankan** (muncul di WA pembeli setelah bayar):

```
Terima kasih sudah beli NetDoc AI OS™! 🎉

Buka file PDF yang terlampir untuk panduan install (5 menit, tanpa perlu
bisa coding). Kalau ada kendala, balas chat ini ya.

Selamat mengaudit jaringan tanpa ribet! 📡
```

5. Klik **Add Digital** — produk langsung tayang di halaman Lynk Anda.

> 💡 Karena file yang di-upload adalah PDF (bukan source code), source
> code project tetap hanya bisa diakses lewat tombol Deploy di dalam PDF
> tersebut — sesuai dengan Opsi A/B yang dijelaskan di atas.

---

## Opsi B — Kalau Tidak Ingin Repo Publik (Lebih Aman, Lebih Manual)

Kalau khawatir source code terlihat orang lain di repo publik:

1. Buat repo **Private** alih-alih Public.
2. Tombol "Deploy to Vercel" otomatis tidak akan berfungsi untuk orang lain
   (karena mereka tidak punya akses ke repo private Anda).
3. Sebagai gantinya, tiap ada pembeli baru:
   - Anda **fork/duplicate** repo private Anda, atau kirim ulang file zip.
   - Pembeli tetap ikuti `PANDUAN_Upload_GitHub_dan_Install_HP.md` (upload
     manual ke repo mereka sendiri) — sedikit lebih ribet tapi source code
     Anda tidak pernah terekspos publik.

Trade-off: Opsi A (repo publik + tombol Deploy) = pengalaman pembeli mulus
tapi kode terlihat semua orang. Opsi B (repo private) = kode aman tapi
pembeli perlu effort manual (~15 menit, sesuai panduan GitHub sebelumnya).

Banyak penjual template memilih Opsi A karena barrier "menyalin kode dari
repo publik lalu deploy sendiri" tetap cukup tinggi untuk kebanyakan
pembeli non-teknis, sementara pengalaman beli jadi jauh lebih premium.
