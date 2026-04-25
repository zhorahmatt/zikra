# Product Requirements Document (PRD)

## 1. Ringkasan Produk
Web app mobile-first untuk membaca dzikir pagi dan petang dengan pengalaman yang sederhana, fokus, dan nyaman. Produk ini menghilangkan distraksi dari konten tambahan dan memprioritaskan kemudahan membaca, navigasi ringan, serta pengingat harian.

## 2. Tujuan Produk
- Menyediakan pengalaman membaca dzikir yang fokus tanpa distraksi
- Mempermudah pengguna membaca dzikir pagi dan petang secara konsisten
- Memberikan UI yang sederhana, ringan, dan ramah semua usia

## 3. Target Pengguna
- Pengguna utama: diri sendiri (self-use)
- Karakteristik:
  - Mengakses via mobile
  - Menginginkan tampilan sederhana
  - Tidak ingin terganggu oleh informasi tambahan

## 4. Problem Statement
Saat ini pengguna membaca dzikir melalui website yang:
- UI terlalu umum dan tidak fokus
- Terlalu banyak informasi tambahan
- Mengganggu konsentrasi saat membaca dzikir

## 5. Solusi
Membuat web app dengan pendekatan:
- Minimalis dan fokus hanya pada konten dzikir
- Navigasi sederhana
- Mode baca yang nyaman
- Pengingat harian otomatis

## 6. Fitur Utama

### 6.1 Mode Baca Fokus
- Tampilan bersih (hanya teks dzikir)
- Opsi:
  - Perbesar/Perkecil font
  - Spasi antar ayat
  - Highlight ayat aktif

### 6.2 Navigasi Sederhana
- Tab utama:
  - Dzikir Pagi
  - Dzikir Petang
- Scroll vertikal linear
- Tombol "lanjut" / "sebelumnya"

### 6.3 Auto Scroll
- Auto scroll dengan kecepatan yang bisa diatur
- Pause / Resume

### 6.4 Dark Mode & Light Mode
- Default mengikuti sistem
- Toggle manual

### 6.5 Pengingat Harian
- Notifikasi:
  - Dzikir pagi
  - Dzikir petang
- Pengaturan waktu fleksibel

### 6.6 Bookmark / Progress Tracking
- Tandai dzikir terakhir dibaca
- Resume dari posisi terakhir

### 6.7 Offline Mode
- Bisa diakses tanpa internet
- Cache konten dzikir

## 7. Non-Functional Requirements
- Mobile-first design
- Load cepat (<2 detik)
- Responsif di berbagai ukuran layar
- Aksesibilitas tinggi (font jelas, kontras baik)

## 8. User Flow
1. User membuka web app
2. User memilih:
   - Dzikir pagi / petang
3. User masuk ke mode baca
4. User:
   - Scroll manual atau auto-scroll
   - Menyelesaikan bacaan
5. Progress tersimpan otomatis
6. User menerima pengingat di waktu berikutnya

## 9. UI/UX Principles
- Minimalist
- No clutter
- One task focus (membaca dzikir)
- Large readable typography
- Calm color palette

## 10. Teknologi yang Disarankan
- Frontend: React / Next.js
- Styling: Tailwind CSS
- PWA (Progressive Web App) untuk offline & notifikasi
- Local storage untuk progress tracking

## 11. Metrics Keberhasilan
- Frekuensi penggunaan harian
- Completion rate dzikir
- Retensi pengguna (diri sendiri)

## 12. Future Enhancements
- Audio dzikir
- Multi bahasa
- Statistik ibadah
- Sinkronisasi antar device

## 13. Risiko
- Over-engineering (karena untuk personal use)
- Notifikasi browser tidak konsisten di semua device

## 14. Timeline (Estimasi)
- Week 1: Design & wireframe
- Week 2: Development core features
- Week 3: Testing & refinement

## 15. Kesimpulan
Produk ini fokus pada kesederhanaan dan pengalaman membaca yang nyaman. Keberhasilan bukan dari banyaknya fitur, tetapi dari konsistensi penggunaan dan minimnya distraksi.

