# GlowKGL — Your Beauty, Elevated.

**GlowKGL** is a premium, high-end digital marketplace designed to bridge the gap between luxury beauty products and professional expertise. Built with a focus on **visual excellence** and **seamless user experience**, it provides a curated journey for anyone looking to elevate their beauty routine.

## Implemented Features

### 1. **Core navigation**

- **Responsive Navbar**: Seamlessly transitions between sophisticated desktop and mobile layouts
- **Dynamic badges**: Real-time notification bubbles for the shopping cart and upcoming appointments.
- **Context-Aware Links**: Navigation dynamically updates based on the user's authentication status (Log In/Join and logout).

### 2. **Authentication system**

- **Floating Glassmorphic Card**: A centered, high-focus UI element with `backdrop-blur` for login and register.
- **Dynamic contextual background**: Pulls the homepage hero image and applies a soft-focus blur for visual harmony.
- **Smooth mode toggles**: Instant animated transitions between Login and Register views without page reloads.
- **Form Validation**: Integrated handling for missing fields, password confirmation, and server-side response errors.

### 3. **The Marketplace (Products & Services)**

- **Product Discovery**: A grid-based marketplace with high-resolution imagery and clear pricing.
- **Advanced Filtering**: Filter by category, delivery type, and location.
- **Service Listings**: Detailed cards for home services including specialist information and social media handles to check their work.
- **Shopping Cart**: Persistent cart state allowing users to add/remove products and view total costs.

### 4. **Professional Network (Artists & Specialists)**

- **Curated professional profiles**: High-end cards featuring specialist categories (Hair, Makeup, Nails, Skincare).
- **Booking Integration**: Direct "Book Now" actions that sync with the user's appointment calendar.

### 5. **User experience and design system**

- **Brand palette**: A custom-designed palette focusing on `Night Bordeaux` (primary), `Blush Rose` (secondary), and `Berry Crush` (accent).
- **Glassmorphism**: Heavy use of `backdrop-blur` and translucent white overlays for a light, airy, and expensive feel.
- **Micro-Animations**: Hover effects, scale-up on active buttons, and layout shifts that make the UI feel alive and a friendly smooth experience.

## 🛠 Tech Stack

| Technology         | Purpose                                                                                                                            |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **React 19**       | Modern UI development with concurrent rendering.                                                                                   |
| **Tailwind CSS**   | Utility-first styling for high-performance, custom-themed UI. (Custom color tokens: `night-bordeaux`, `blush-rose`, `berry-crush`) |
| **Framer Motion**  | Premium physics-based animations and layout transitions.                                                                           |
| **React Router 7** | Sophisticated client-side routing and navigation.                                                                                  |
| **Context API**    | Global state management for Auth, products, cart, professionals and bookings.                                                      |
| **Vite**           | Lightning-fast build tool and development server.                                                                                  |

## Future innovations and implementations

Here are the features currently in my mind to make GlowKGL even more powerful and user-friendly:

- **User reviews for the system and professionals**: Individually a user will be able to review the system and professionals.
- **Salon initialization**: Be able to start a salon so as to register artists who work in a certain salon and ease it for user to navigate salon services, artists and products.
- **Subscriptions to certain services**: Subscription model for monthly users of the beauty services.
- **Expert Connect**: Real-time video consultation platform to speak directly with professionals before booking.
- **Beauty glow score**: A community-driven loyalty program where users earn "Glow Points" for reviews, engagement, referrals and purchases to earn discounts on services and products.
- **Service price tags**: Display prices for individual services and any other charges.
- **Integrated payment system**: Full Stripe/PayPal integration for seamless one-click checkouts and service deposits.
- **Notification system**: Professionals and clients will be notified of their bookings via the app, email and SMS.
- **AI chatbot**: A chatbot that can answer common questions and provide assistance to users.
- **Support system**: A support system that allows users to ask questions and get help from professionals or customer service of the GlowKGL digital platform via calls/whatsapp/email.

## Installation & Setup

To run GlowKGL locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/BonaneN/glowKGL.git
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## Credits

<p align="center">
  <b>Built by Bonane NIYIGENA</b>
</p>
