# ☕ Get Me A Chai

A full-stack social media and creator support platform built with Next.js 15. The platform allows creators to share posts, build a following, and receive direct financial support from their fans. Think of it as Twitter meets Buy Me a Coffee.

**Live Demo:** [get-me-a-chai-buzz.vercel.app](https://get-me-a-chai-buzz.vercel.app)  
**Built by:** Nitin Dogra  

---

## 🚀 Features

- **Social Feed:** Full social feed where users can sign up, post, like, comment, and reply.
- **Creator Profiles:** Public profiles where fans can send payments directly to creators (1 chai = ₹100).
- **Payment Integration:** Secure payment processing with Razorpay, including webhook verification.
- **PRO Badges:** Gamified badge system that unlocks after 10 posts.
- **Real-time Notifications:** Alerts for likes, comments, replies, follows, and successful payments.
- **Feed Filtering:** Toggle between Trending, Following, and Recent feeds with infinite scroll.
- **Nested Comments:** Reply threading with pagination and lazy loading for better performance.
- **Authentication:** Secure login using NextAuth.js (Google OAuth).
- **Media Management:** Image and video uploads handled seamlessly via Cloudinary.
- **Responsive Design:** Fully mobile responsive with a custom bottom navigation bar and sidebar drawer.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** MongoDB + Mongoose
- **Authentication:** NextAuth.js
- **Payments:** Razorpay
- **Media Storage:** Cloudinary
- **State Management:** React Context API
- **Deployment:** Vercel

## 📁 Architecture Overview

```text
app/
  home/           → Social feed page
  [username]/     → Public creator profile & payment page
  dashboard/      → Creator earnings dashboard
  post/[pid]/     → Single post view
  login/          → Authentication flows

actions/
  postaction.js   → Posts, comments, likes, notifications
  useractions.js  → Follow, search, profile management
  notifyaction.js → Notification CRUD

lib/
  models/         → Mongoose schemas (User, Post, Comment, Payment, etc.)
  contexts/       → React Context providers
  db/             → MongoDB connection logic
```

## 🏃 Running Locally

To run this project locally on your machine, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/nitindogra7/getMeChai.git
   cd getMeChai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_ID=your_google_oauth_id
   GOOGLE_SECRET=your_google_oauth_secret
   NEXT_PUBLIC_URL=http://localhost:3000
   KEY_ID=your_razorpay_key_id
   KEY_SECRET=your_razorpay_key_secret
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.
