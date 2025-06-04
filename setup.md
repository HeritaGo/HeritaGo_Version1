# HeritaGo Quick Setup Guide

1. **Clone the repo**

   ```bash
   git clone <link>
   cd heritago
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up PostgreSQL**

   - Install PostgreSQL (if not already).
   - Create a database and user:
     ```sql
     CREATE USER heritago WITH PASSWORD 'yourpassword';
     CREATE DATABASE heritago OWNER heritago;
     ```

4. **Configure environment**

   - Copy `.env.example` to `.env` (or create `.env`).
   - Fill in your DB credentials and secrets.

5. **Initialize the database**

   ```bash
   npm run db:push
   ```

6. **Start the app**

   ```bash
   npm run dev
   ```

7. **Open in browser**
   - Visit [http://localhost:5000](http://localhost:5000)

**Demo logins:**

- Tourist: `tourist@heritago.lk` / `tourist123`
- Guide: `guide@heritago.lk` / `guide123`
- Vendor: `vendor@heritago.lk` / `vendor123`
- Admin: `admin@heritago.lk` / `admin123`
