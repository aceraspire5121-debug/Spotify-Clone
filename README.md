# 🎵 Spotify Clone

A fully responsive **Spotify-inspired Music Player** built using **HTML, CSS, and Vanilla JavaScript**. The application dynamically loads albums and songs from JSON files, provides real-time audio controls, and delivers a smooth music streaming experience without using any frontend framework.

🔗 **Live Demo:** https://whimsical-crumble-4194d1.netlify.app

---

# 📌 Overview

This project demonstrates modern JavaScript concepts including:

- Dynamic DOM Rendering
- Fetch API
- Async/Await
- Event Handling
- Audio API
- Responsive Design
- JSON Data Management

Instead of hardcoding songs, the application automatically detects albums, loads metadata from JSON files, and generates the complete UI dynamically.

---

# ✨ Features

## 🎧 Dynamic Music Library

- Automatically detects album folders
- Dynamically creates album cards
- Loads album information using `info.json`
- Displays album artwork, title and description

---

## 🎼 Dynamic Playlist Generation

- Songs are fetched dynamically
- Playlist updates instantly when another album is selected
- Displays

  - Song Name
  - Artist Name
  - Play Button

without requiring any HTML modification.

---

## ▶️ Music Controls

Supports complete audio playback controls:

- Play
- Pause
- Next Song
- Previous Song
- Auto load first song of selected album

---

## 🎚 Interactive Seek Bar

- Real-time song progress
- Click anywhere to jump to any position
- Smooth progress animation

---

## 🔊 Volume Controls

- Adjustable volume slider
- Mute / Unmute toggle
- Dynamic speaker icon updates

---

## 📱 Responsive Design

Designed for both desktop and mobile devices.

Includes

- Responsive Layout
- Mobile Sidebar
- Hamburger Navigation
- Adaptive Song Name Display

---

## ⚡ Dynamic Album Loading

Albums are created automatically by reading folders.

Adding a new album requires only:

```
songs/
    NewAlbum/
        cover.jpg
        info.json
        song1.mp3
        song2.mp3
```

No JavaScript modification is required.

---

# 📂 Project Structure

```
Spotify-Clone
│
├── img/
│
├── songs/
│   │
│   ├── AngerArena/
│   │     ├── cover.jpg
│   │     ├── info.json
│   │     ├── *.mp3
│   │
│   ├── ArijitHeart/
│   ├── HeartFire/
│   ├── HoneyGroove/
│   ├── JubinSoul/
│   ├── MoodSwing/
│   ├── MoosewalaVibes/
│   ├── SoulStorm/
│   ├── TonyRhythm/
│   └── VibeWave/
│
├── index.html
├── style.css
├── utility.css
├── script.js
└── favicon.ico
```

---

# 🛠 Technologies Used

### Frontend

- HTML5
- CSS3
- Flexbox
- Grid
- Media Queries

### JavaScript

- ES6+
- Async / Await
- Fetch API
- DOM Manipulation
- Event Listeners
- HTMLAudioElement API
- Dynamic Rendering

### Data Storage

- JSON

---

# ⚙️ How It Works

## Album Rendering

1. Reads all folders inside `songs/`
2. Fetches each album's `info.json`
3. Generates album cards dynamically

---

## Song Rendering

When an album is clicked

- Songs are fetched
- Playlist is regenerated
- First song loads automatically

---

## Music Playback

The application uses the **HTMLAudioElement API**.

It handles

- Playback
- Pause
- Duration
- Current Time
- Volume
- Seeking

through JavaScript.

---

# 🚀 Major JavaScript Concepts Used

- Async Programming
- Fetch API
- DOM Manipulation
- Event Delegation
- Dynamic Rendering
- Audio API
- Responsive UI
- JSON Parsing
- URL Manipulation
- State Management

---

# 📸 Screenshots

## Home Page

> *(Add screenshot here)*

---

## Album View

> *(Add screenshot here)*

---

## Mobile View

> *(Add screenshot here)*

---

# 📈 Challenges Faced

- Dynamically generating albums from folders.
- Synchronizing seek bar with audio playback.
- Managing currently playing song state.
- Responsive sidebar implementation.
- Updating playlist without reloading the page.
- Handling asynchronous fetch operations.

---

# 📚 What I Learned

This project helped me gain practical experience with

- JavaScript Async Programming
- Fetch API
- Dynamic DOM Manipulation
- Audio API
- Responsive Web Design
- JSON Data Handling
- Event Handling
- State Management

---

# 🔮 Future Improvements

- Search Songs
- Shuffle Mode
- Repeat Mode
- Favorite Songs
- Playlist Creation
- Recently Played
- Keyboard Shortcuts
- Local Storage Support
- Theme Switcher

---

# 💻 Installation

Clone the repository

```bash
git clone https://github.com/aceraspire5121-debug/Spotify-Clone.git
```

Move into the project directory

```bash
cd Spotify-Clone
```

Open

```
index.html
```

using Live Server.

---

# 👨‍💻 Author

**Sushant Yadav**

GitHub:
https://github.com/aceraspire5121-debug

LinkedIn:
*(Add your LinkedIn profile)*

---

# ⭐ If you like this project

Give this repository a ⭐ on GitHub.
