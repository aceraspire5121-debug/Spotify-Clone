# Spotify Clone Web App

A dynamic, responsive **Spotify-like music player** built with **HTML, CSS, and JavaScript**, showcasing modern frontend skills such as DOM manipulation, JSON data handling, and interactive audio controls.

Live Demo: [Spotify Clone](whimsical-crumble-4194d1.netlify.app)  

---

## Features

- **Dynamic Music Library**  
  - Fetches song data from `tracks.json` for each folder.  
  - Displays album cards with album artwork, title, and description.

- **Interactive Playlist**  
  - Clickable song items with play/pause functionality.  
  - Displays song name, duration, and a moving seek bar.

- **Audio Controls**  
  - Play, pause, next, and previous song buttons.  
  - Volume control with mute/unmute icon toggle.  
  - Responsive seek bar to jump to any part of the song.

- **Responsive Design**  
  - Works across desktop and mobile devices.  
  - Hamburger menu for smaller screens.  
  - Smooth animations for hover effects and playlist interactions.

- **Clean UI**  
  - Inspired by Spotify’s dark theme.  
  - Album cards, playlist, and controls styled for clarity and usability.

---

## Folder Structure

project-root/
│
├─ songs/ # Folder containing albums and tracks
│ ├─ <AlbumFolder>/ # Each album has a folder
│ │ ├─ cover.jpg # Album artwork
│ │ ├─ tracks.json # Song list JSON
│ │ └─ *.mp3 # Song files
│ └─ tracks.json # List of album folders
│
├─ img/ # Static images for UI (play button, icons)
├─ index.html # Main HTML file
├─ style.css # Styling
└─ script.js # All frontend JavaScript


---

## Technologies Used

- **HTML5** – Structure and markup  
- **CSS3** – Styling, Flexbox, Grid, Responsive design, animations  
- **JavaScript (ES6+)** – DOM manipulation, event listeners, async fetch requests  
- **JSON** – Track and album data storage  

---

## How to Use

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/spotify-clone.git

