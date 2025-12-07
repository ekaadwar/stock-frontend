# Stock App Frontend

Frontend aplikasi **Stock Management** yang dibangun menggunakan:

- [Next.js](https://nextjs.org/) (React + TypeScript)
- Tailwind CSS (atau styling lain sesuai project)
- JWT Authentication (menggunakan API backend NestJS)

Frontend ini berfungsi sebagai antarmuka untuk:

- Login Admin
- Manajemen Admin
- Manajemen Kategori Produk
- Manajemen Produk
- Transaksi Stok (IN / OUT) dan riwayatnya

> **Catatan:** Frontend ini membutuhkan backend berjalan di `http://localhost:4000` (NestJS + Prisma). Pastikan backend sudah dikonfigurasi dan dijalankan sebelum menggunakan frontend.

---

## 1. Prerequisites

Pastikan sudah ter-install di mesin lokal:

- **Node.js** LTS (disarankan v20.x)
- **npm** (terinstall otomatis bersama Node)

Cek versi:

```bash
node -v
npm -v
```

> Rekomendasi: gunakan `nvm` untuk mengelola versi Node.js.

---

## 2. Clone Repository

Clone repo kemudian masuk ke folder frontend:

```bash
git clone <URL_REPOSITORY_ANDA>.git

cd <NAMA_REPOSITORY>/frontend
```

Ganti `<URL_REPOSITORY_ANDA>` dan `<NAMA_REPOSITORY>` sesuai repo GitHub kamu.

---

## 3. Install Dependencies

Di dalam folder `frontend`:

```bash
npm install
```

Ini akan meng-install semua dependency Next.js, React, dan library pendukung lainnya.

---

## 4. Konfigurasi Environment (`.env.local`)

Frontend membutuhkan URL API backend untuk memanggil endpoint (login, categories, products, transactions, dll).

Di folder `frontend`, buat file `.env.local`:

```bash
touch .env.local
```

Isi dengan:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

Penjelasan:

- `NEXT_PUBLIC_API_URL` → base URL API backend NestJS.
- Nilai `http://localhost:4000` harus sesuai dengan alamat backend yang kamu jalankan secara lokal.

> Jika kamu mengubah port backend (misalnya 5000), jangan lupa update value ini.

---

## 5. Menjalankan Frontend di Mode Development

Masih di folder `frontend`, jalankan:

```bash
npm run dev
```

Secara default, Next.js akan berjalan di:

```txt
http://localhost:3000
```

Jika berhasil, terminal akan menampilkan log seperti:

```txt
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

---

## 6. Alur Penggunaan Aplikasi di Local

### 6.1. Pastikan backend sudah jalan

Sebelum membuka frontend, pastikan:

- Backend NestJS sudah dijalankan dengan:

  ```bash
  cd ../backend
  npm run start:dev
  ```

- Backend merespon di `http://localhost:4000` dan endpoint `/auth/login` bisa diakses.

### 6.2. Buka aplikasi di browser

Buka:

```txt
http://localhost:3000
```

Biasanya akan diarahkan ke halaman login (misalnya `/login`).

### 6.3. Login sebagai Admin

Gunakan akun default yang sudah di-seed dari backend:

- **Email**: `admin@example.com`
- **Password**: `password123`

Jika login berhasil:

- Frontend akan memanggil API `POST /auth/login` ke backend.
- JWT `accessToken` akan disimpan (misalnya di `localStorage`).
- Pengguna akan diarahkan ke halaman dashboard (contoh: `/dashboard`).

### 6.4. Fitur Utama

Setelah login, admin dapat mengakses beberapa menu utama (tergantung implementasi project):

1. **Dashboard**
   - Ringkasan stok dan transaksi.

2. **Admins**
   - Melihat daftar admin.
   - Menambah / mengubah / menghapus admin (jika disediakan).

3. **Categories**
   - Melihat daftar kategori produk.
   - Menambah kategori baru.
   - Mengubah / menghapus kategori.

4. **Products**
   - Melihat daftar produk dan stok saat ini.
   - Menambah produk baru (nama, kategori, stok awal, dll).
   - Mengubah / menghapus produk.

5. **Transactions**
   - Membuat transaksi stok:
     - **IN** → stok masuk (penambahan stok).
     - **OUT** → stok keluar (pengurangan stok).
   - Melihat riwayat transaksi per produk.
   - Validasi stok saat transaksi OUT (tidak boleh minus).

> Struktur dan nama halaman bisa sedikit berbeda tergantung implementasi final, namun alurnya tetap: login → dashboard → kelola kategori/produk → transaksi.

### 6.5. Logout

Biasanya tersedia tombol Logout di header/sidebar:

- Menghapus token dari `localStorage` / state.
- Mengarahkan kembali ke halaman login.

---

## 7. Build untuk Production (Opsional)

Jika ingin melakukan build production:

```bash
npm run build
```

Setelah build berhasil, jalankan:

```bash
npm run start
```

Secara default, aplikasi tetap berjalan di `http://localhost:3000`, namun sekarang dalam mode production.

> Untuk deploy ke hosting (Vercel, Netlify, dll.), kamu bisa menggunakan proses build standar Next.js dan menyesuaikan `NEXT_PUBLIC_API_URL` sesuai environment (staging/production).

---

## 8. Script npm yang Tersedia

Di folder `frontend`:

- `npm run dev` → menjalankan Next.js di mode development
- `npm run build` → build aplikasi untuk production
- `npm run start` → menjalankan Next.js di mode production (setelah build)
- `npm run lint` → menjalankan linter (jika dikonfigurasi)

---

## 9. Troubleshooting Umum

1. **Frontend error: gagal fetch / 500 / 404 ke API**
   - Pastikan backend berjalan dan bisa diakses di `http://localhost:4000`.
   - Cek kembali isi `.env.local` → `NEXT_PUBLIC_API_URL`.

2. **Login selalu gagal (401)**
   - Pastikan seeding admin di backend sudah dijalankan:
     ```bash
     cd ../backend
     npx ts-node prisma/seed.ts
     ```
   - Pastikan pakai credential yang benar:
     - `admin@example.com`
     - `password123`

3. **Perubahan environment tidak terbaca**
   - Setelah mengubah `.env.local`, hentikan `npm run dev` dan jalankan ulang.

---

Jika kamu ingin menyesuaikan UI, menambah fitur baru, atau mengubah endpoint backend, kamu bisa langsung modifikasi komponen-komponen Next.js di folder `src/` sesuai kebutuhan. 🚀
