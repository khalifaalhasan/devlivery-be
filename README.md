# Devlivery - Backend API

## 🌟 Visi & Misi

**Visi:**
Menjadi platform manajemen _event_ dan penerbitan sertifikat yang terdepan, memberikan kemudahan bagi penyelenggara acara (_organizer_) untuk mengelola seluruh siklus event secara terpusat—mulai dari pendaftaran peserta, pencatatan kehadiran berbasis QR Code, hingga otomatisasi pengiriman sertifikat masal yang sangat fleksibel (customizable).

**Misi:**

- Menyediakan arsitektur _multi-tenant_ yang _scalable_ untuk berbagai organisasi dalam sistem _workspaces_ yang terisolasi dengan aman.
- Menghadirkan sistem form pendaftaran dinamis (_Dynamic Form Builder_) yang dapat dirancang secara bebas sesuai kebutuhan masing-masing acara (_campaign_).
- Mempermudah pencatatan presensi menggunakan pemindaian QR Code yang cepat, _real-time_, dan minim kesalahan.
- Memberikan kemudahan berkolaborasi antara penyelenggara dengan desainer maupun _copywriter_ (melalui akses _Share Link_) untuk merancang _template_ sertifikat dan _email_ secara mulus tanpa hambatan.
- Mengotomatisasi proses distribusi sertifikat masal secara efisien dengan adanya sistem antrean (_queue_), pemantauan _real-time_, dan rekam jejak aktivitas (_Audit Trail_) yang transparan.

---

## 🚀 Tech Stack & Library Utama

Aplikasi backend ini dirancang agar kuat (_robust_) dan mudah dipelihara menggunakan teknologi dan _library_ modern:

- **Framework Core**: [NestJS v11](https://nestjs.com/) (TypeScript)
- **Database**: PostgreSQL (Driver menggunakan `pg`)
- **ORM**: [TypeORM](https://typeorm.io/) (`@nestjs/typeorm`)
- **Authentication & Multi-tenancy**: [Better Auth](https://better-auth.com/) (menggunakan konfigurasi _core_ dan _organization plugin_). Menangani _session_, verifikasi email, serta pengelolaan anggota tim.
- **API Documentation**: Swagger / OpenAPI (`@nestjs/swagger`)
- **Data Validation & Transformation**: `class-validator`, `class-transformer`, `joi`
- **Testing**: `jest`, `supertest` (Testing E2E & Unit Test)
- **Linter & Formatter**: ESLint (`eslint`, `typescript-eslint`), Prettier

---

## 🛠️ How to Run (Cara Menjalankan)

### Prasyarat

- Node.js (v18 atau terbaru sangat disarankan)
- PostgreSQL terinstall dan layanannya telah berjalan
- npm / yarn / pnpm

### Langkah-langkah

1. **Clone Repository dan Masuk ke Direktori**

   ```bash
   git clone <repository-url>
   cd devlivery.tech/be
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables**
   Buat file `.env` di root direktori proyek, sesuaikan parameternya:

   ```env
   PORT=3000
   DATABASE_URL=postgresql://user:password@localhost:5432/devlivery_db
   # Tambahkan variabel lain sesuai kebutuhan Better Auth, JWT secret, dan layanan eksternal
   ```

4. **Jalankan Migrasi Database (Jika Diperlukan)**

   ```bash
   # Generate migration berdasarkan entitas yang ada
   npm run migration:generate
   # Jalankan migration untuk sinkronisasi skema ke database PostgreSQL
   npm run migration:run
   ```

5. **Jalankan Aplikasi**
   Pilih salah satu perintah berikut tergantung pada tahap pengembangan:
   - **Mode Development Biasa**: `npm run start`
   - **Mode Development (Watch Mode - Hot Reload)**: `npm run dev`
   - **Mode Production (Build & Run)**:
     ```bash
     npm run build
     npm run start:prod
     ```

6. **Akses Aplikasi & Dokumentasi API**
   - Server berjalan di: `http://localhost:<PORT>` (Default: 3000)
   - Dokumentasi **Swagger API**: `http://localhost:<PORT>/api/docs`

---

## 🛣️ Daftar Routes (API Endpoints)

Semua endpoint didahului dengan prefix `/api`.
Dokumentasi struktur request/response secara lebih detail dapat dilihat secara interaktif di **[Swagger UI](/api/docs)**.

### 1. Authentication (`/api/auth`)

- `POST /api/auth/register` - Mendaftarkan (_register_) pengguna baru ke platform.
- `POST /api/auth/login` - Melakukan proses _login_.
  _(Catatan: Beberapa operasi autentikasi lanjutan seperti manajemen session dan OAuth dikelola otomatis oleh engine Better Auth di belakang layar)._

### 2. User (`/api/user`)

- `GET /api/user` - Mengambil daftar seluruh pengguna terdaftar.
- `GET /api/user/me` - Mengambil profil akun milik pengguna yang sedang _login_.
- `GET /api/user/:id` - Mengambil profil detail pengguna spesifik berdasarkan ID.
- `PATCH /api/user/:id` - Mengubah/update profil pengguna.
- `DELETE /api/user/:id` - Menghapus akun pengguna.

### 3. Organization / Workspace (`/api/organizations`)

- `POST /api/organizations` - Membuat organisasi/workspace baru.
- `GET /api/organizations/my-workspaces` - Mendapatkan daftar seluruh ruang kerja di mana _user_ tersebut menjadi _member_.
- `POST /api/organizations/switch/:id` - Beralih ke ruang kerja (sesi tenant) organisasi tertentu.

### 4. Campaign / Event Management (`/api/campaigns`)

- `GET /api/campaigns` - Mendapatkan daftar seluruh _campaign_.
- `POST /api/campaigns` - Mempublikasikan / membuat _campaign_ baru.
- `GET /api/campaigns/:id` - Mendapatkan detail informasi suatu _campaign_.
- `PATCH /api/campaigns/:id` - Mengubah atribut/metadata _campaign_.
- `DELETE /api/campaigns/:id` - Menghapus _campaign_.
- `GET /api/campaigns/:id/form` - Mengambil struktur _Dynamic Form_ milik _campaign_ tertentu.
- `PUT /api/campaigns/:id/form` - Mengupdate dan menyusun kolom formulir _Dynamic Form_ untuk _campaign_ tersebut.

### 5. Attendance (`/api/attendance`)

- `GET /api/attendance` - Mendapatkan rekam data presensi/kehadiran peserta.
- `POST /api/attendance` - Melakukan _submit_ kehadiran (bisa melalui mekanisme _scan_ QR Code).
- `GET /api/attendance/:id` - Mengambil detail satu record kehadiran.
- `PATCH /api/attendance/:id` - Mengupdate data kehadiran.
- `DELETE /api/attendance/:id` - Menghapus record kehadiran.

### 6. Certificate Delivery (`/api/delivery`)

- `GET /api/delivery` - Mendapatkan log atau _job history_ pengiriman sertifikat masal.
- `POST /api/delivery` - Memulai eksekusi _job_ otomatisasi pengiriman email berisikan sertifikat ke peserta terdaftar.
- `GET /api/delivery/:id` - Melihat log detail sukses/gagalnya suatu antrean pengiriman.
- `PATCH /api/delivery/:id` - Memperbarui status / mengintervensi _delivery job_.
- `DELETE /api/delivery/:id` - Membatalkan _job_ distribusi.

### 7. Template Design (`/api/template`)

- `GET /api/template` - Mendapatkan daftar template desain (Sertifikat / Email).
- `POST /api/template` - Membuat struktur template baru.
- `GET /api/template/:id` - Mengambil properti / detail spesifik sebuah desain template.
- `PATCH /api/template/:id` - Menyimpan modifikasi posisi elemen _drag-and-drop_ pada template.
- `DELETE /api/template/:id` - Menghapus template.

### 8. Collaboration (`/api/collab`)

- `GET /api/collab` - Melihat daftar _Share Links_ aktif (Token kolaborasi).
- `POST /api/collab` - Meng-generate _Share Link_ untuk _copywriter_ atau desain grafis agar dapat mengakses builder tanpa login akun utama.
- `GET /api/collab/:id` - Detail info hak akses dari tautan kolaborasi.
- `PATCH /api/collab/:id` - Mengubah limitasi atau memperbarui izin sesi tautan kolaborasi.
- `DELETE /api/collab/:id` - Melakukan _revoke_ atau pencabutan akses tautan kolaborasi.

### 9. Audit Trail (`/api/audit`)

- `GET /api/audit` - Menampilkan log aktivitas (_Audit Trail_) dalam ruang lingkup satu _tenant_ atau sistem.
- `POST /api/audit` - (Sistem / Internal) Membuat _record_ audit atas aksi kritis.
- `GET /api/audit/:id` - Detail metadata aktivitas pada log tertentu.
- `PATCH /api/audit/:id` - Pembaruan anotasi log.
- `DELETE /api/audit/:id` - Mengarsipkan / menghapus log secara permanen.

### 10. Admin Dashboard (`/api/admin`)

- `GET /api/admin/metrics` - Menarik metrik keseluruhan sistem (statistik global platform).
- `GET /api/admin/users` - Mengambil daftar keseluruhan _users_ lintas tenant untuk keperluan pantauan _Superadmin_.
- `GET /api/admin/organizations` - Melihat daftar seluruh tenant terdaftar.
- `DELETE /api/admin/organizations/:id` - Menangguhkan / menghapus operasional organisasi secara paksa.
