# Music Player Website

This project is a simple music player website built with React and Vite. It includes:
- a bottom horizontal music player
- play, pause, previous, and next controls
- progress bar and volume slider
- playlist selection
- glassmorphism-style UI

## Step-by-step process to create this website

### 1. Install Node.js
Before starting, make sure Node.js is installed on your computer.

Check it with:

```bash
node -v
npm -v
```

If not installed, download it from:
https://nodejs.org/

---

### 2. Create a React app using Vite
Open your terminal and run:

```bash
npm create vite@latest music-player -- --template react
```

Then go into the project folder:

```bash
cd music-player
```

---

### 3. Install dependencies
Run:

```bash
npm install
```

---

### 4. Create the project structure
Inside the project folder, create these files/folders if needed:

```bash
src/
  components/
    MusicPlayer.jsx
  styles/
    MusicPlayer.css
  App.jsx
  App.css
  index.css
  main.jsx
public/
  Audio/
```

Copy your audio files into the `public/Audio` folder.

Example:

```bash
public/Audio/Fine Shyt.mp3
public/Audio/SHKINI.mp3
public/Audio/Nain Bengali.mp3
```

---

### 5. Add the music player component
Create a file named `src/components/MusicPlayer.jsx` and write the React component for the player.

This component should include:
- `audio` element
- song list
- current song index
- play/pause button
- previous/next buttons
- time and duration display
- progress slider
- volume slider
- playlist toggle

---

### 6. Add CSS styling
Create a CSS file `src/styles/MusicPlayer.css` to style the player.

Add styles for:
- fixed bottom position
- horizontal layout
- glassmorphism style
- controls
- playlist
- responsive behavior

Example style idea:

```css
.music-player-container {
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  width: min(980px, calc(100% - 24px));
}
```

---

### 7. Use the component in App.jsx
Open `src/App.jsx` and import the component:

```jsx
import React from "react";
import "./App.css";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  return (
    <div className="app">
      <MusicPlayer />
    </div>
  );
};

export default App;
```

---

### 8. Set the app background and base styling
Update `src/App.css` and `src/index.css` to give the page a nice background and clean layout.

Example:

```css
.app {
  width: 100%;
  height: 100vh;
  background-image: url('/homepage.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```

---

### 9. Add songs to the player
Inside `MusicPlayer.jsx`, define your songs array like this:

```jsx
const [songs] = useState([
  { id: 1, name: "Fine Shyt", file: "/Audio/Fine Shyt.mp3" },
  { id: 2, name: "Shkini", file: "/Audio/SHKINI.mp3" },
  { id: 3, name: "Nain Bengali", file: "/Audio/Nain Bengali.mp3" },
]);
```

Add more songs by following the same pattern.

---

### 10. Start the development server
Run:

```bash
npm run dev
```

Then open the local link shown in the terminal, usually:

```bash
http://localhost:5173
```

---

## Project run commands

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

---

## Notes
- Make sure your MP3 files are in the `public/Audio` folder.
- File names with spaces must match exactly in the song object.
- If you want to add more songs, just append new objects to the `songs` array.

---

## Example final structure

```bash
music-player/
├── public/
│   └── Audio/
│       ├── Fine Shyt.mp3
│       ├── SHKINI.mp3
│       └── Nain Bengali.mp3
├── src/
│   ├── components/
│   │   └── MusicPlayer.jsx
│   ├── styles/
│   │   └── MusicPlayer.css
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

This README gives you the basic roadmap to build the same music player website step by step.
