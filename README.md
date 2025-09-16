# TikTok MVP Clone

A minimal viable product (MVP) clone of TikTok built with React and Tailwind CSS.

## Features

- Infinite scrolling video feed
- Black video placeholders
- Interactive UI elements (like, comment, share buttons)
- Snap-to-video scrolling
- Responsive design
- Mock user data generation

## Setup Instructions

1. Extract all files to a folder named `tiktok-mvp`
2. Navigate to the project directory:
   ```bash
   cd tiktok-mvp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## Project Structure

```
tiktok-mvp/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- React 18
- Tailwind CSS
- Lucide React (for icons)
- Create React App

## Next Steps

- Add video upload functionality
- Implement user authentication
- Add real video playback
- Connect to a backend API
- Add comments system
- Implement user profiles