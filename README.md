# Website-RNBC

Website untuk keperluan share informasi R’nB Startup Competition (R’nB Startup Hackathon 2022), UKM Research and Business Universitas Diponegoro.

Deployed: https://rnbc-2022.web.app/

## Struktur

Situs statis (HTML + CSS + sedikit JavaScript), tanpa build step.

Semua informasi ada di `index.html`, dibagi per bagian: alur 3 fase, `#kategori`, `#timeline` (tiap tahap punya anchor `#tahap-1` … `#tahap-9`), `#tentang`, `#faq` (dirangkum dari `assets/pdf/GuideBook.pdf`), dan `#kontak`. Panel ringkasan (peserta, tanggal, biaya, tombol daftar dan guidebook) menempel di sisi kanan pada layar lebar.

Halaman lama (`home`, `about`, `moreabout`, `event`, `faqs`, `information`, `timeline1`–`timeline9`) hanya mengalihkan ke bagian yang sesuai di `index.html`, agar tautan yang sudah dibagikan tetap berfungsi. `404.html` dipakai Firebase Hosting.

Aset: `assets/css/styles.css` (semua gaya, termasuk tema gelap), `assets/js/main.js` (tema, tab aktif, membuka tahap/FAQ dari URL), `assets/img/icons.svg` (ikon SVG).

## Menjalankan lokal

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```
