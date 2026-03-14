# Muca Technology

Professional business website built with React + Vite, Firebase Firestore & Authentication, deployed on GitHub Pages.

## Setup

### 1. Firebase Setup

1. Create a project in [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** with the Email/Password method
3. Create a **Firestore** database
4. Copy your Firebase credentials

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Fill in your Firebase credentials and WhatsApp number.

### 3. Firestore Rules

Apply the rules from `firestore.rules` in Firebase Console > Firestore > Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Create Admin User

In Firebase Console > Authentication, add a user with email and password.

## Development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

Make sure the `base` in `vite.config.js` matches your GitHub repository name.

## Project Structure

```
src/
├── components/
│   ├── admin/        # Dashboard, Login, ProductForm, ProtectedRoute
│   └── public/       # Navbar, Hero, Services, About, Contact, Footer
├── contexts/         # AuthContext
├── pages/            # Home
├── services/         # firebase.js, products.js
└── styles/           # index.css
```

## Tech Stack

- React 19 + Vite 8
- Firebase Firestore + Authentication
- React Router v7
- React Icons
- GitHub Pages (gh-pages)
