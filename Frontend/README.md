# 🍽️ FoodHub - Modern Restaurant Website

A modern, fully responsive restaurant website frontend built with React, Vite, Tailwind CSS, and React Router DOM.

## ✨ Features

### 🎨 **Modern UI/UX**
- Light theme with beautiful gradient accents
- Smooth animations and transitions
- Responsive design (mobile, tablet, desktop)
- Hover effects and shadow animations
- Professional card-based layouts

### 🛍️ **Core Features**
- 🏠 **Home Page** - Browse menu with search and category filters
- 🔐 **Authentication** - Login, Signup, Forgot Password pages
- 🛒 **Shopping Cart** - Add/remove items, update quantities
- 📦 **Order Management** - Order form with delivery details
- 👨‍💼 **Admin Panel** - Add, update, delete, and manage food items
- 📄 **About & Contact Pages** - Company info and contact forms
- 🔄 **Backend-Ready** - All components marked for easy API integration

### 💡 **Technical Highlights**
- ✅ Form validation on all inputs
- ✅ Controlled components throughout
- ✅ Global state management for cart
- ✅ Fast HMR (Hot Module Replacement) in development
- ✅ Optimized production build
- ✅ Clean, reusable component structure

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with mobile menu
│   ├── Footer.jsx          # Footer with links and info
│   ├── FoodCard.jsx        # Reusable food item card
│   └── SearchBar.jsx       # Search functionality
├── pages/
│   ├── Home.jsx            # Home with search and filters
│   ├── About.jsx           # About company
│   └── Contact.jsx         # Contact form
├── auth/
│   ├── Login.jsx           # Login page
│   ├── Signup.jsx          # Registration page
│   └── ForgotPassword.jsx  # Password reset (3-step process)
├── admin/
│   └── FoodForm.jsx        # Admin panel (CRUD operations)
├── cart/
│   └── Cart.jsx            # Cart and order form
├── data/
│   └── foodData.js         # Dummy food data & categories
├── App.jsx                 # Main routing setup
├── main.jsx                # React entry point
├── index.css               # Tailwind + custom styles
└── App.css                 # App-specific styles
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. **Navigate to project directory:**
```bash
cd restaurant-website
```

2. **Install dependencies:**
```bash
npm install
```

### Development

**Start the development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Production Build

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

---

## 🎯 Key Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home.jsx | Browse menu with filters |
| `/about` | About.jsx | Company information |
| `/contact` | Contact.jsx | Contact form & info |
| `/login` | Login.jsx | User login |
| `/signup` | Signup.jsx | User registration |
| `/forgot-password` | ForgotPassword.jsx | 3-step password reset |
| `/cart` | Cart.jsx | Shopping cart & checkout |
| `/admin/foods` | FoodForm.jsx | Admin panel (CRUD) |

---

## 🎨 Tailwind Configuration

Custom colors defined in `tailwind.config.js`:
```javascript
colors: {
  primary: "#FF6B35",      // Orange
  secondary: "#004E89",    // Blue
  light: "#F7F7F7",        // Light gray
  dark: "#1A1A1A"          // Dark
}
```

Custom utilities available:
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.btn-outline` - Outline button
- `.card` - Card with shadow
- `.input-field` - Form input styling
- `.container-custom` - Max-width container

---

## 📋 Components Overview

### **Navbar**
- Sticky header with logo
- Responsive mobile menu
- Cart item counter
- Navigation links

### **FoodCard**
- Food image with hover zoom
- Category and rating badges
- Add to cart button with feedback
- Order now button

### **SearchBar**
- Real-time search with clear button
- Search icon and animations

### **Home Page**
- Hero section
- Search bar
- Category filter buttons
- Food grid (auto-responsive)
- Features section
- Special offers section

### **Admin Panel (FoodForm)**
- Add new foods
- Edit existing foods
- Delete foods
- Search functionality
- Real-time data updates
- Form validation

### **Cart**
- View all cart items
- Adjust quantities
- Remove items
- Apply coupon code
- Order summary with totals
- Delivery form with validation
- Order confirmation screen

---

## 🔌 Backend Integration Guide

All API endpoints are clearly commented in the code. Here's where to add backend calls:

### **Food Operations** (`src/admin/FoodForm.jsx`)
```javascript
// ADD FOOD
const response = await fetch("/api/foods", {
  method: "POST",
  body: JSON.stringify(formData)
});

// UPDATE FOOD
const response = await fetch(`/api/foods/${id}`, {
  method: "PUT",
  body: JSON.stringify(formData)
});

// DELETE FOOD
const response = await fetch(`/api/foods/${id}`, {
  method: "DELETE"
});
```

### **Authentication** (`src/auth/`)
```javascript
// LOGIN
const response = await fetch("/api/auth/login", {
  method: "POST",
  body: JSON.stringify({ email, password })
});

// SIGNUP
const response = await fetch("/api/auth/signup", {
  method: "POST",
  body: JSON.stringify(formData)
});

// FORGOT PASSWORD
const response = await fetch("/api/auth/forgot-password", {
  method: "POST",
  body: JSON.stringify({ email })
});
```

### **Orders** (`src/cart/Cart.jsx`)
```javascript
// PLACE ORDER
const response = await fetch("/api/orders", {
  method: "POST",
  body: JSON.stringify(orderData)
});
```

### **Contact** (`src/pages/Contact.jsx`)
```javascript
// SEND CONTACT
const response = await fetch("/api/contact", {
  method: "POST",
  body: JSON.stringify(formData)
});
```

---

## 📦 Dependencies

### Production
- **react**: ^19.2.0 - UI library
- **react-dom**: ^19.2.0 - React DOM rendering
- **react-router-dom**: ^6.28.0 - Client-side routing

### Development
- **vite**: ^7.2.4 - Fast build tool
- **tailwindcss**: ^3.4.14 - Utility-first CSS
- **postcss**: ^8.4.47 - CSS processor
- **autoprefixer**: ^10.4.20 - CSS vendor prefixes
- **@vitejs/plugin-react**: ^5.1.1 - React plugin for Vite
- **eslint**: ^9.39.1 - Code linting

---

## 🎯 Tailwind CSS Features Used

✅ **Responsive Design**
- Mobile-first approach
- `md:`, `lg:` breakpoints
- Flexible grid layouts

✅ **Styling**
- Custom color palette
- Shadow effects
- Border styling
- Gradient backgrounds

✅ **Components**
- Buttons with hover states
- Form inputs with focus states
- Card layouts
- Navigation components

✅ **Animations**
- Smooth transitions
- Hover effects
- Slide-down animations
- Fade-in effects

---

## 💻 Development Tips

### **Hot Module Replacement (HMR)**
Changes are automatically reflected in the browser during development.

### **Form Validation**
All forms include client-side validation with error messages.

### **Local State Management**
- Cart state managed globally in `App.jsx`
- Admin foods state in `FoodForm.jsx`
- Local form state in individual components

### **Responsive Testing**
Use browser DevTools to test different screen sizes:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px+

---

## 🔒 Environment Variables

Currently, no environment variables are required. When integrating with backend:

Create `.env` file:
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=FoodHub
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📱 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Mobile

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)

---

## 📝 Notes

- ✅ All pages are fully functional
- ✅ No actual API calls are made (using dummy data)
- ✅ All form submissions simulate API delays
- ✅ Local storage used for auth tokens (demo)
- ✅ Cart data persists during session
- ✅ Admin operations use local state

---

## 🤝 Contributing

To add features:
1. Create new components in appropriate folders
2. Update routing in `App.jsx`
3. Follow existing component patterns
4. Maintain Tailwind utility naming

---

## 📄 License

Open source - Free to use and modify

---

## ✅ Checklist

- ✅ Frontend ONLY (no backend)
- ✅ Responsive design (mobile-first)
- ✅ Smooth animations & hover effects
- ✅ Form validation on all pages
- ✅ Controlled components throughout
- ✅ Backend-ready with marked API calls
- ✅ Clean, reusable components
- ✅ Light theme UI
- ✅ Professional styling
- ✅ Easy to deploy

---

## 🚀 Ready to Launch!

The application is production-ready and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

---

**Built with ❤️ using React, Vite, Tailwind CSS**
