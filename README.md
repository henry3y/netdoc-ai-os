# NetDoc AI OS™ — Network Documentation AI OS
### Versi React + Next.js (PWA — bisa diinstall di HP)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/henry3y/netdoc-ai-os&project-name=netdoc-ai-os&repository-name=netdoc-ai-os)

> 👆 Klik tombol di atas untuk deploy instan ke akun Vercel Anda sendiri
> (gratis, ~2 menit, tidak perlu coding).

Aplikasi audit & dokumentasi jaringan berbasis **S.D.D.A.V Framework™**
(Score → Diagnose → Decide → Act → Verify), dibangun dari blueprint
`Network_Documentation_AI_OS_Blueprint.md`.

Ini adalah **Progressive Web App (PWA)** — bukan file Google Sheets.
Setelah di-deploy, aplikasi bisa di-*install* langsung ke layar utama
Android maupun iPhone, dan berjalan seperti aplikasi native (tanpa address
bar, punya ikon sendiri, bisa dibuka offline).

---

## 🚀 Menjalankan di komputer (development)

Butuh [Node.js](https://nodejs.org) versi 18 ke atas.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` di browser.

## 📦 Build untuk production

```bash
npm run build
npm start
```

## ☁️ Deploy supaya bisa diinstall di HP

PWA butuh HTTPS untuk bisa di-install. Ada 3 opsi gratis:

### Opsi A — GitHub Pages (paling simpel, langsung dari GitHub)

Project ini sudah dilengkapi workflow otomatis (`.github/workflows/deploy.yml`).

1. Buat repo baru di GitHub, upload seluruh folder project ini.
2. Buka **Settings → Pages** di repo tsb → bagian "Build and deployment" →
   pilih Source: **GitHub Actions**.
3. Push ke branch `main` (atau jalankan workflow manual di tab **Actions**).
4. Tunggu ±1-2 menit sampai workflow selesai (centang hijau).
5. URL situs muncul di **Settings → Pages**, formatnya:
   `https://<username>.github.io/<nama-repo>/`

Workflow otomatis mendeteksi nama repo dan mengatur `basePath` — tidak perlu
edit kode apa pun, cukup upload dan aktifkan Pages.

> Catatan: kalau nama repo persis `<username>.github.io` (repo halaman utama
> akun), situs akan tersedia di root domain tanpa subfolder.

### Opsi B — Vercel (mendukung fitur Next.js paling lengkap)
1. Push folder ini ke repo GitHub.
2. Buka [vercel.com](https://vercel.com) → New Project → pilih repo tsb.
3. Klik Deploy. Selesai — dapat URL `https://nama-app.vercel.app`.

### Opsi C — Netlify
1. Push ke GitHub.
2. Buka [netlify.com](https://netlify.com) → Add new site → Import from Git.
3. Build command: `npm run build`, Publish directory: `out`

---

Setelah live di HTTPS (dari opsi mana pun), buka link tersebut di HP:
- **Android (Chrome)**: menu ⋮ → "Install app"
- **iPhone (Safari)**: tombol Share → "Add to Home Screen"

(Panduan lengkap juga tersedia di dalam app: menu **Lainnya → Cara Install**.)

---

## 🗂 Struktur Proyek

```
app/                     → Halaman (Next.js App Router)
  page.tsx               → Dashboard (Health Score)
  audit/                 → Audit checklist (4 kategori)
  data/                  → Asset Database, Topology, Config Backup,
                           Change Log, Gap Detection
  actions/               → AI Diagnosis, Decision Engine, Action Plan,
                           Verification, Progress Tracker
  more/                  → Troubleshooting, Install Guide, About, Backup Data
components/              → Komponen UI (ScoreGauge, BottomNav, dll)
lib/
  data/                  → Data checklist, troubleshooting, decision rules,
                           seed data (porting dari blueprint)
  hooks/useLocalStorage.ts
  store.tsx              → State management global (React Context)
  scoring.ts             → Logika perhitungan Health Score & Gap Detection
public/
  manifest.json          → PWA manifest
  sw.js                  → Service worker (offline & installability)
  icons/                 → Ikon aplikasi
```

## 💾 Penyimpanan Data

Semua data (Asset Database, jawaban checklist, Action Plan, dll) disimpan
di **localStorage** perangkat pengguna — tidak ada server/database eksternal.
Gunakan menu **Lainnya → Export Backup (JSON)** secara berkala agar data
tidak hilang jika cache browser dibersihkan.

## 🎨 Desain

- Tema gelap "network operations" dengan aksen violet (`#7C5CFF`)
- Data teknis (IP, device name, skor) ditampilkan dengan font monospace
- Komponen andalan: **ScoreGauge** — radial gauge mirip monitor ping/latency
- Mobile-first, bottom navigation 5 tab: Beranda, Audit, Data, Aksi, Lainnya

## 🧠 S.D.D.A.V Framework™

| Tahap | Implementasi |
|---|---|
| **S — Score** | `/audit/*` — 4 checklist kategori dengan bobot |
| **D — Diagnose** | `/actions/ai-diagnosis` — prompt AI auto-compile |
| **D — Decide** | `/actions/decision` — rule engine otomatis |
| **A — Act** | `/actions/plan` — Action Plan bertahap |
| **V — Verify** | `/actions/verification` + `/actions/progress` |

---

## 💼 Menjual Produk Ini?

- **`SELLER_SETUP.md`** — setup sekali di awal: siapkan tombol "Deploy to
  Vercel" & white-label branding sebelum dijual.
- **`PANDUAN_PEMBELI.md`** — file siap kirim ke pembeli setelah checkout.
- **`LICENSE.md`** — draf ketentuan lisensi (batasi resell source code,
  izinkan penggunaan & white-label). Sesuaikan dengan kebijakan Anda.
