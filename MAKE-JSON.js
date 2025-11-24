// MAKE-JSON.js
const fs = require("fs");
const path = require("path");

const base = "./songs";

// This will hold info for all folders
const allFolders = [];

fs.readdirSync(base).forEach(folder => {
    const folderPath = path.join(base, folder);

    if (fs.lstatSync(folderPath).isDirectory()) {
        // Get all mp3 files in the folder
        const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".mp3"));

        // Create tracks.json for the folder
        const folderJson = {
            songs: files
        };
        fs.writeFileSync(
            path.join(folderPath, "tracks.json"),
            JSON.stringify(folderJson, null, 4)
        );
        console.log("Generated:", folder + "/tracks.json");

        // Add this folder to the root-level folders array
        allFolders.push({
            name: folder, // folder foldername
            title: folder, // you can customize
            detail: "Songs collection", // you can customize
            cover: `songs/${folder}/cover.jpg`
        });
    }
});

// Create root-level tracks.json listing all folders
fs.writeFileSync(
    path.join(base, "tracks.json"),
    JSON.stringify({ folders: allFolders }, null, 4)
);
console.log("Generated root-level songs/tracks.json with all folder info");
