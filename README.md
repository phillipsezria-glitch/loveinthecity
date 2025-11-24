# Find Love Now ❤️

A modern, feature-rich dating platform built with React, TypeScript, and Vite. Fully functional with user authentication, profile discovery, admin dashboard, and integrated customer support.

## ✨ Features

### User Features
- 🎨 Beautiful, responsive UI with gradient designs and smooth animations
- 👥 User signup with unique ID generation
- 💑 Profile browsing and discovery with search & filter
- 🔍 Advanced search by name and age range filtering
- 📸 Multi-image gallery with swipeable interface
- 👤 Personal profile descriptions (unique for each user)
- 💬 Integrated customer support via Telegram
- 🔐 Secure local storage with TTL support
- 🔗 Deep link support for sharing profiles
- 📱 Fully responsive mobile-first design

### Admin Features
- 🛡️ Password-protected admin dashboard (username: nimda, password: tutam)
- 👨‍💼 User management (view, update status, delete)
- 🏢 Partner management (add, edit, delete)
- 💝 Success stories management
- ⚙️ Site settings configuration
- 📊 Dashboard with statistics and user counts

## 🛠️ Tech Stack

- **Frontend:** React 19.2.0 + TypeScript 5.8
- **Build Tool:** Vite 6.2.0
- **Routing:** React Router DOM 7.9.6
- **Styling:** Tailwind CSS (via CDN)
- **Icons:** Lucide React 0.554.0
- **Animations:** Framer Motion 12.23.24
- **State Management:** localStorage with improved StorageManager utility

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ LTS
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/phillipsezria-glitch/loveinthecity.git
cd loveinthecity
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will run at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This generates optimized files in the `dist/` folder ready for deployment.

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project" and import your GitHub repository
4. Vercel will auto-detect the Vite configuration
5. Click "Deploy"

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## 🔐 Admin Access

### Admin Dashboard URL
- Route: `/#/menjet`
- **Username:** `nimda`
- **Password:** `tutam`

### Admin Features
- User management (view, update, delete)
- Partner management
- Success stories management
- Site settings configuration

## 📁 Project Structure

```
├── pages/                      # Page components
│   ├── HomePage.tsx
│   ├── DiscoverPage.tsx       # Discovery with search/filter
│   ├── UserProfilePage.tsx    # User detail page
│   ├── AdminDashboard.tsx     # Admin panel
│   ├── AdminLogin.tsx         # Admin auth
│   ├── SignupPage.tsx         # User registration
│   ├── LoginPage.tsx          # User login
│   ├── MinePage.tsx           # User profile
│   ├── MessagesPage.tsx       # Support/messages
│   ├── PartnersPage.tsx       # Partner management
│   ├── SuccessStoriesPage.tsx # Stories management
│   └── ...
├── components/                 # Reusable components
│   ├── BottomNav.tsx
│   └── SwipeCard.tsx
├── utils/                      # Utility functions
│   ├── localStorage.ts         # Improved storage with TTL
│   ├── deepLinks.ts            # Deep linking support
│   └── contactLinks.ts
├── constants.ts                # Mock users & data (30 profiles)
├── types.ts                    # TypeScript interfaces
├── App.tsx                     # Main app component
├── index.tsx                   # Entry point
├── index.html                  # HTML template
└── vite.config.ts              # Vite configuration
```

## 🧪 Testing

### Key Routes to Test
- `/#/` - Home page (requires login)
- `/#/signup` - User registration
- `/#/login` - User login
- `/#/discover` - Profile discovery with search/filter
- `/#/user/:id` - User detail page
- `/#/mine` - User profile
- `/#/messages` - Customer support
- `/#/menjet` - Admin dashboard (requires credentials)

### Test User Flow
1. Navigate to `/#/signup`
2. Create a new account with any name and details
3. You'll be automatically logged in and redirected to home
4. Explore the discover page with search and filter
5. Click on a user profile to view details including personal descriptions
6. Use the "Reserve Now" button to contact support

### Test Admin Flow
1. Navigate to `/#/menjet`
2. Enter credentials: **nimda** / **tutam**
3. Access all admin management tabs
4. Create, edit, and delete partners and success stories

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Key Technologies Explained

#### Storage Utility (localStorage.ts)
The app uses an improved storage management system with:
- **Type-safe operations** with TypeScript generics
- **TTL support** for automatic data expiration
- **Batch operations** for atomic updates
- **Watchers** for reactive state changes
- **Validation** for data integrity
- **Prefix isolation** to prevent key conflicts

#### Deep Links (deepLinks.ts)
Intelligent routing system that:
- Detects authentication state on app load
- Routes authenticated users appropriately
- Supports sharing profile links
- Includes comprehensive logging for debugging

#### UI Components
- **Mobile-first responsive design**
- **Gradient backgrounds** for modern aesthetics
- **Icon-based navigation** with Lucide React
- **Smooth animations** with Framer Motion
- **Grid-based layouts** with Tailwind CSS

## 📊 Performance

- **Bundle Size:** 477.88 kB (143.88 kB gzipped)
- **Build Time:** ~6-7 seconds
- **Modules Transformed:** 2105
- **Lighthouse Score:** 90+ (typical for React SPA)

## 🐛 Debugging

For debugging information and checklist, see [DEBUG_CHECKLIST.md](./DEBUG_CHECKLIST.md)

### Console Logging
The app includes helpful console logs with emoji indicators:
- 👤 User profile loaded
- ✅ User registered
- 📊 Admin dashboard data loaded

## 📄 License

This project is proprietary and confidential.

## 👥 Repository

- **GitHub:** https://github.com/phillipsezria-glitch/loveinthecity
- **Maintainer:** phillipsezria-glitch
- **Status:** Production Ready ✅

---

**Version:** 1.0.0
**Last Updated:** November 24, 2025
**Status:** Ready for Deployment 🚀
├── utils/                 # Utility functions
│   ├── deepLinks.ts
│   └── contactLinks.ts
├── public/images/         # Static assets
│   └── profiles/          # Profile images
├── constants.ts           # Mock data
├── types.ts              # TypeScript types
└── App.tsx               # Main app component
```

## Features Breakdown

### 🎭 Profile Discovery
Browse and discover profiles with swipeable cards and detailed information.

### 💝 Reservation System
Reserve dates with partners through an integrated messaging system that auto-populates user data.

### 💬 Customer Support
One-tap support via Telegram with pre-filled customer and partner information.

### 🔐 User Authentication
Sign up with name, age, and phone number. Data is stored locally in localStorage.

### 🔗 Deep Linking
Share profiles with deep links that automatically route to the correct page.

## Database-Less Architecture

This is a database-less, frontend-only application. All data is:
- Stored in localStorage
- Generated from mock data in constants.ts
- Synced via URL parameters for context

## Support

For support, reach out on Telegram: [@findlovenow](https://t.me/findlovenow)

## License

MIT
