# 🏥 HealthFinder - AI-Powered Doctor Discovery Platform

<div align="center">

![HealthFinder](https://img.shields.io/badge/HealthFinder-Doctor%20Search-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.1-646cff?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

**Find the Right Doctor for Your Health - Instantly**

[Live Demo](https://lovable.dev/projects/0c1e3c1f-2a77-47b5-b390-090040c95783) • [Features](#features) • [Getting Started](#getting-started) • [Tech Stack](#tech-stack)

</div>

---

## 🌟 Overview

**HealthFinder** is an intelligent healthcare platform that helps users find nearby doctors based on symptoms, conditions, or specialist requirements. With AI-powered chatbot assistance, location-based search, and comprehensive filters, finding the right healthcare provider has never been easier.

### ✨ Key Highlights

- 🤖 **AI Health Assistant** - Interactive chatbot guides you to the right specialist
- 📍 **Smart Location Detection** - Automatic GPS or manual location input
- 🔍 **Symptom-Based Search** - Search by symptoms, not just doctor names
- 🗺️ **Map View** - Visual representation of nearby doctors
- 💰 **Price Comparison** - Compare online and in-person consultation fees
- ⭐ **Verified Doctors** - Ratings, reviews, and qualifications
- 📱 **Responsive Design** - Works seamlessly on all devices

---

## 🚀 Features

### Smart Search & Discovery
- **Symptom-to-Specialty Mapping**: Enter symptoms like "skin rash" or "chest pain" and get matched with the right specialists
- **Popular Symptom Shortcuts**: Quick access to common health concerns
- **Real-time Search**: Instant results as you type

### Advanced Filtering
- 🏥 **Consultation Mode**: Online, Offline, or Both
- ⭐ **Minimum Rating**: Filter by doctor ratings (0-5 stars)
- 💵 **Maximum Fees**: Set your budget (₹200-₹2000)
- 📏 **Distance Range**: Find doctors within 5-50 km
- 📅 **Availability**: Available today, tomorrow, or this week

### Location Intelligence
- Automatic GPS-based location detection
- Manual location entry (city, area, or pincode)
- Geocoding using OpenStreetMap Nominatim API
- Distance calculation and sorting by proximity
- Reverse geocoding for human-readable addresses

### Doctor Information
Each doctor profile includes:
- Name, specialty, and sub-specialty
- Qualifications and experience
- Ratings and review counts
- Online and offline consultation fees
- Clinic location and address
- Next available slot
- Languages spoken
- Verification status
- Contact details

### AI Chatbot Assistant
- Conversational symptom assessment
- Intelligent specialist recommendations
- Contextual follow-up questions
- Quick suggestion buttons
- Seamless handoff to search

### User Interface
- Clean, modern design with Tailwind CSS
- shadcn/ui components for consistency
- Smooth animations and transitions
- Card-based layout for easy scanning
- Mobile-first responsive design

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1** - UI library with hooks
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.1** - Lightning-fast build tool

### Styling & UI
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components built on Radix UI
- **Lucide React** - Beautiful icon library
- **class-variance-authority** - Component variant styling

### State & Data Management
- **@tanstack/react-query 5.56.2** - Server state management
- **React Router DOM 6.26.2** - Client-side routing
- **React Hook Form 7.53.0** - Form handling
- **Zod 3.23.8** - Schema validation

### UI Components Library
- **Radix UI** - Accessible component primitives
  - Dialog, Dropdown, Popover, Tooltip, etc.
- **Sonner** - Toast notifications
- **Recharts** - Data visualization (ready for analytics)
- **Embla Carousel** - Touch-friendly carousels

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **Lovable Tagger** - Component tagging

---

## 📦 Getting Started

### Prerequisites
- **Node.js** 16+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **npm** or **bun** package manager

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd indimed-nearby-docs

# Install dependencies
npm install
# or using bun
bun install

# Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Development build (with debugging)
npm run build:dev
```

### Linting

```bash
npm run lint
```

---

## 📁 Project Structure

```
indimed-nearby-docs/
├── public/
│   └── robots.txt
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── ChatBot.tsx     # AI health assistant
│   │   ├── DoctorCard.tsx  # Doctor display card
│   │   ├── DoctorFilters.tsx # Filter controls
│   │   ├── LocationDetector.tsx # Location handling
│   │   └── MapView.tsx     # Map interface
│   ├── hooks/              # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                # Utilities
│   │   └── utils.ts
│   ├── pages/              # Route pages
│   │   ├── Index.tsx       # Main search page
│   │   └── NotFound.tsx    # 404 page
│   ├── services/           # Business logic
│   │   └── doctorService.ts # Doctor search & data
│   ├── types/              # TypeScript types
│   │   └── doctor.ts
│   ├── App.tsx             # App root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🔧 Configuration

### Environment Variables
Currently, the app uses public APIs (OpenStreetMap Nominatim). For production, consider:

```env
# Future: Add your own API keys
VITE_MAPS_API_KEY=your_maps_api_key
VITE_GEOCODING_API_KEY=your_geocoding_api_key
```

### Customization

**Update Branding** - Modify in [src/pages/Index.tsx](src/pages/Index.tsx):
```tsx
<h1 className="text-2xl font-bold">Your Brand Name</h1>
```

**Add More Specialties** - Edit [src/services/doctorService.ts](src/services/doctorService.ts):
```typescript
const symptomSpecialtyMap = {
  'your-symptom': ['Specialist Name'],
  // Add more mappings
}
```

**Customize Theme** - Update [tailwind.config.ts](tailwind.config.ts) and [src/index.css](src/index.css)

---

## 🎯 Usage Examples

### Search by Symptom
```
User types: "skin rash"
→ System matches to Dermatologist
→ Shows nearby dermatologists
```

### Search by Location
```
User clicks "Detect Location"
→ System gets GPS coordinates
→ Or user enters "Mumbai, Andheri"
→ Shows doctors within selected radius
```

### Filter Results
```
User applies filters:
- Consultation: Online only
- Min Rating: 4.5 stars
- Max Fees: ₹500
- Distance: 10 km
→ Results update instantly
```

### AI Assistant Flow
```
Bot: "What's bothering you?"
User: "Stomach pain"
Bot: "Can you be more specific?"
User clicks: "Acidity"
Bot: "I recommend a Gastroenterologist"
→ User clicks "Find Gastroenterologist"
→ Redirects to search results
```

---

## 🗺️ API Integration

### Geocoding (Nominatim)
```typescript
// Forward geocoding: Address → Coordinates
const result = await fetch(
  `https://nominatim.openstreetmap.org/search?q=${query}`
);

// Reverse geocoding: Coordinates → Address
const result = await fetch(
  `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}`
);
```

**Rate Limits**: Nominatim has usage policies. For production, consider:
- Self-hosting Nominatim
- Using Google Maps Geocoding API
- MapBox Geocoding API

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Geocoding by [OpenStreetMap Nominatim](https://nominatim.org)

---

## 📞 Support

For support and questions:
- Create an [Issue](../../issues)
- Visit [Lovable Docs](https://docs.lovable.dev)

---

## 🚀 Deployment

### Deploy to Lovable
1. Open [Lovable Project](https://lovable.dev/projects/0c1e3c1f-2a77-47b5-b390-090040c95783)
2. Click Share → Publish
3. Your app is live!

### Deploy to Other Platforms

**Vercel**:
```bash
npm install -g vercel
vercel
```

**Netlify**:
```bash
npm run build
# Drag and drop dist/ folder to Netlify
```

**Custom Domain**: 
- Navigate to Project > Settings > Domains in Lovable
- Follow the [custom domain guide](https://docs.lovable.dev/tips-tricks/custom-domain)

---

<div align="center">

**Made with ❤️ for better healthcare access**

⭐ Star this repo if you find it helpful!

</div>
