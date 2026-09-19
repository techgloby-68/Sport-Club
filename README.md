# 🏆 Cisco GSC Vietnam Kinetic Sports Hub

[![Next.js 14](https://img.shields.io/badge/Next.js-14_App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Strava API](https://img.shields.io/badge/Strava_API-v3_OAuth2-FC4C02?style=for-the-badge&logo=strava&logoColor=white)](https://developers.strava.com/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

> **"Bứt Phá Giới Hạn - Kết Nối Sức Mạnh & Sức Khỏe Đồng Đội GSC Vietnam"**  
> Nền tảng kết nối Strava tự động, tính điểm thể thao, xếp hạng cá nhân & đội nhóm, tổ chức thách đấu và bốc thăm chia đội online dành riêng cho đại gia đình **Cisco GSC Vietnam** (~100-200 thành viên).

---

## 🚀 Tính Năng Nổi Bật (Key Features)

- ⚡ **Zero-Registration via Strava OAuth 2.0 (5s Flow)**: Thành viên không cần tạo tài khoản thủ công. Chỉ cần bấm **"Kết Nối Strava"**, ứng dụng tự động đồng bộ Họ tên, Avatar, Email và Athlete ID.
- 🚴 **Tự Động Tính Điểm Thể Thao Multi-Sport Engine**:
  - 🏃 **Chạy bộ (Run)**: 1 km = 10 điểm (Hệ số 1.0)
  - 🚴 **Đạp xe (Ride)**: 1 km = 3.3 điểm (Hệ số 0.33)
  - 🚶 **Đi bộ (Walk)**: 1 km = 5 điểm (Hệ số 0.5)
  - 🏊 **Bơi lội (Swim)**: 1 km = 40 điểm (Hệ số 4.0)
- 📊 **Pro Sports Analytics Widget**: Bảng phân tích chỉ số thể thao tích hợp biểu đồ SVG Sparklines & Bar Charts động.
- 🏆 **Bảng Xếp Hạng Đa Chiều (Dynamic Leaderboards)**:
  - Lọc theo thời gian: Tuần này, Tháng này, Quý này, Năm nay.
  - Lọc theo môn thể thao: Tất cả, Chạy bộ, Đạp xe, Đi bộ, Bơi lội.
  - Xếp hạng Cá nhân & Xếp hạng Đồng đội Cisco GSC.
- 🎲 **Bốc Thăm Chia Đội Online (Interactive Random Draft Engine)**: Công cụ bốc thăm tự động chia thành viên vào các đội nhóm cân bằng chỉ số.
- 🌐 **Hỗ Trợ Đa Ngôn Ngữ (100% Multi-language i18n)**:
  - 🇻🇳 **Tiếng Việt** (Mặc định)
  - 🇺🇸 **English**
  - 🇨🇳 **中文 (Chinese)**
- 🛡️ **Admin Control Center**: Tùy chỉnh hệ số điểm cho từng mùa giải, quản lý thành viên, thay đổi đội nhóm và duyệt thách đấu.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

| Thành Phần | Công Nghệ |
| :--- | :--- |
| **Framework** | Next.js 14 App Router (React 18, Server & Client Components) |
| **Language** | TypeScript (Strict type checking) |
| **Styling** | Tailwind CSS + Glassmorphism Dark Theme (`#0B0F17`, Cisco `#00BCEB`, Strava `#FC4C02`, Neon Lime `#CCFF00`) |
| **Icons** | Lucide React Icons |
| **Database** | Supabase PostgreSQL + Row Level Security (RLS) |
| **Integration** | Strava OAuth 2.0 & Real-time Webhooks API |
| **Hosting** | Vercel Platform |

---

## 📂 Cấu Trúc Thư Mục (Directory Structure)

```text
├── src/
│   ├── app/
│   │   ├── page.tsx               # Bảng Xếp Hạng & Analytics Center
│   │   ├── teams/page.tsx         # Quản Lý Đội Nhóm Cisco GSC
│   │   ├── challenges/page.tsx    # Giải Đấu & Thách Đấu
│   │   ├── activities/page.tsx    # Nhật Ký Hoạt Động & Manual Workout
│   │   ├── profile/page.tsx       # Hồ Sơ Cá Nhân & Đổi Mật Khẩu
│   │   ├── admin/page.tsx         # Admin Control & 🎲 Bốc Thăm Chia Đội
│   │   ├── api/strava/            # Strava OAuth Callback & Webhooks
│   │   ├── layout.tsx             # Root Layout, Metadata & Favicon
│   │   └── icon.svg               # Dynamic Kinetic Sports Favicon
│   ├── components/
│   │   ├── Navbar.tsx             # Header Menu + Cisco Logo + i18n
│   │   ├── Footer.tsx             # Footer 4 Cột + Powered by Tommy
│   │   ├── CiscoLogo.tsx          # Official Wikimedia Cisco 2016 SVG Logo
│   │   ├── OnboardingModal.tsx    # Popup Hoàn Thiện Hồ Sơ 30s
│   │   └── BottomNav.tsx          # Navigation Bar trên Mobile
│   ├── context/
│   │   └── AppContext.tsx         # React Context State Management
│   ├── lib/
│   │   ├── strava.ts              # Strava API Token Exchange & Points Engine
│   │   ├── translations.ts        # Từ điển 3 Ngôn ngữ (VI, EN, ZH)
│   │   └── supabase/client.ts     # Supabase Client Credentials
│   └── types/
│       └── index.ts               # TypeScript Interfaces (Profile, Team, Activity)
├── supabase_schema.sql            # Script khởi tạo CSDL PostgreSQL
├── .env.example                   # Biến môi trường mẫu
└── README.md                      # Hướng dẫn chi tiết dự án
```

---

## ⚡ Hướng Dẫn Cài Đặt Chạy Chế Độ Local (Development Setup)

### 1. Yêu cầu hệ thống:
- Node.js >= 18.0.0
- npm >= 9.0.0

### 2. Các bước khởi chạy:

```bash
# Clone repository về máy
git clone https://github.com/techgloby-68/Sport-Club.git
cd Sport-Club

# Cài đặt gói phụ thuộc (Dependencies)
npm install

# Khởi chạy dev server
npm run dev
```

Truy cập ứng dụng tại: `http://localhost:3000`

---

## 🌍 Hướng Dẫn Deploy Sản Phẩm (Production Deployment)

### 1. Khởi Tạo CSDL Supabase
1. Đăng nhập [Supabase](https://supabase.com) -> Tạo dự án mới.
2. Vào **SQL Editor** -> Mở file [`supabase_schema.sql`](file:///Users/tamtran/Documents/WorkSpace/Company/Sport Club /supabase_schema.sql) -> Copy & Paste -> Bấm **Run**.
3. Copy **Project URL** và **anon key** tại `Settings -> API`.

### 2. Tạo App Strava API
1. Đăng nhập [Strava API Settings](https://www.strava.com/settings/api).
2. Tạo App mới với Callback Domain: `your-app.vercel.app`.
3. Copy **Client ID** & **Client Secret**.

### 3. Deploy trên Vercel
1. Đăng nhập [Vercel](https://vercel.com/new) -> Import repo `techgloby-68/Sport-Club`.
2. Cấu hình **Environment Variables**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
NEXT_PUBLIC_STRAVA_CLIENT_ID=123456
STRAVA_CLIENT_SECRET=abc123xyz...
```

3. Nhấn **Deploy**!

---

## ✍️ Tác Giả & Bản Quyền

**Cisco GSC Vietnam Kinetic Sports Hub**  
*Powered for Cisco GSC Vietnam by Tommy ❤️*
