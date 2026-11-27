# Website-RNBC

Website untuk keperluan share informasi R’nB Startup Competition (R’nB Startup Hackathon 2022), UKM Research and Business Universitas Diponegoro.

Deployed: https://rnbc-2022.web.app/

## Struktur

Situs statis (HTML + CSS + sedikit JavaScript), tanpa build step.

| Halaman | Isi |
| --- | --- |
| `index.html` | Beranda: ringkasan acara, kategori, timeline singkat, CTA pendaftaran |
| `about.html` | Deskripsi lengkap, tema acara, after movie |
| `event.html` | 10 bidang kategori dan timeline 9 tahap beserta ketentuannya (`#tahap-1` … `#tahap-9`) |
| `faqs.html` | FAQ (dirangkum dari `assets/pdf/GuideBook.pdf`) |
| `information.html` | Unduhan guidebook dan narahubung WhatsApp |
| `404.html` | Halaman tidak ditemukan (dipakai Firebase Hosting) |

`home.html`, `moreabout.html`, dan `timeline1.html` … `timeline9.html` hanya mengalihkan ke halaman baru agar tautan lama tetap berfungsi.

Aset: `assets/css/styles.css` (semua gaya, termasuk tema gelap), `assets/js/main.js` (menu mobile, tema, membuka tahap timeline dari URL), `assets/img/icons.svg` (ikon SVG).

## Mengubah konten

Header dan footer ditulis ulang di setiap halaman. Jika mengubah menu atau footer, ubah di semua halaman utama (`index`, `about`, `event`, `faqs`, `information`, `404`).

## Menjalankan lokal

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```
