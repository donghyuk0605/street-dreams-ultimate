# Street Dreams: European Journey

This project uses Next.js. To connect Firebase Hosting and Firestore, follow these steps.

## Firebase Setup

1. Install the Firebase CLI:
   ```
   npm install -g firebase-tools
   ```
2. Login to Firebase:
   ```
   firebase login
   ```
3. Initialize Firebase for Hosting and Firestore:
   ```
   firebase init
   ```
   Select **Hosting** and **Firestore** when prompted. Use `build` as the public directory for Hosting.
4. Copy `.env.example` to `.env.local` and fill in your Firebase project values.
5. Run the development server:
   ```
   pnpm dev
   ```
6. Deploy after building:
   ```
   pnpm build
   firebase deploy
   ```

## Environment Variables

`.env.example` lists the variables required to connect to your Firebase project:

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

## Firebase Client

The Firebase client is initialized in [`lib/firebase.ts`](lib/firebase.ts) and exports the Firestore instance and Analytics (when supported).

## Phaser Mini Game

The `arcade` tab showcases a lightweight Phaser demo built with Next.js. The new
component is loaded dynamically and allows simple keyboard controls for a square
avatar. Dependencies are managed via `pnpm` and include `phaser`.

## FIFA Style Theme

The app now ships with a darker FIFA-inspired palette and Google Fonts:

- **Orbitron** for futuristic headings
- **Russo One** for numeric displays
- **Bebas Neue** for impactful titles
- **Inter** as the default body font

Player cards can use the classes `fifa-card-gold`, `fifa-card-diamond`, or `fifa-card-legend` for special backgrounds. Use the `bg-fifa-gradient` utility for the default dark gradient background.
