# GramMitra - Village Governance Platform

GramMitra is a Next.js based web application designed to facilitate communication between villagers and local government officials. It provides features for submitting complaints, accessing government schemes, and finding local workers.

## Features

- User authentication with Google Sign-In
- Complaint submission and tracking
- Government schemes information
- Local workers directory
- Responsive dashboard

## Technology Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Firebase Authentication
- Firestore Database
- Shadcn UI Components

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project
   - Add your Firebase config to `.env.local`
   - Set up Firestore security rules

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

Key directories:
- `app/` - Main application pages
- `src/components/` - Reusable components
- `src/lib/` - Firebase configuration and utilities
- `public/` - Static assets

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com). Be sure to set up the Firebase environment variables in your deployment settings.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
