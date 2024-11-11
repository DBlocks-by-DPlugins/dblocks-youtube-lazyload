const path = require('path');
const fs = require('fs');
const ignore = require('ignore'); // npm package to handle ignore rules

// Paths
const folderPath = path.join(__dirname, './'); // Path to the folder to be copied
const folderName = path.basename(__dirname); // Get the current folder name
const outputFolderPath = path.join(__dirname, `../../delivery/${folderName}`); // Destination folder

// Remove the output folder if it already exists
if (fs.existsSync(outputFolderPath)) {
    fs.rmSync(outputFolderPath, { recursive: true, force: true });
    console.log('Existing folder removed:', outputFolderPath);
}

// Create the output folder
fs.mkdirSync(outputFolderPath, { recursive: true });

// Initialize ignore rules from .npmignore file
const ig = ignore().add(fs.readFileSync('.npmignore').toString());

// Function to copy files and directories recursively
function copyFilesFromDirectory(source, destination) {
    const files = fs.readdirSync(source, { withFileTypes: true });

    files.forEach(file => {
        const fullPath = path.join(source, file.name);
        const relativePath = path.relative(folderPath, fullPath); // Get relative path
        const destinationPath = path.join(destination, file.name); // Destination file path

        // Skip ignored files or the output folder itself
        if (ig.ignores(relativePath) || fullPath === outputFolderPath) return;

        if (file.isDirectory()) {
            // Create the directory at the destination
            if (!fs.existsSync(destinationPath)) {
                fs.mkdirSync(destinationPath);
            }
            // Recurse into directories
            copyFilesFromDirectory(fullPath, destinationPath);
        } else {
            // Copy file to the destination
            fs.copyFileSync(fullPath, destinationPath);
        }
    });
}

// Start copying files
copyFilesFromDirectory(folderPath, outputFolderPath);

console.log('Folder structure copied successfully to', outputFolderPath);