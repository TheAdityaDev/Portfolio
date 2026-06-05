const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'public', 'assets', 'images');
const destDir = path.join(__dirname, 'dist', 'assets', 'images');

// Remove existing images if it's a file
if (fs.existsSync(destDir)) {
  const stats = fs.statSync(destDir);
  if (stats.isFile()) {
    fs.unlinkSync(destDir);
  } else {
    // Remove directory recursively
    fs.rmSync(destDir, { recursive: true, force: true });
  }
}

// Create destination directory
fs.mkdirSync(destDir, { recursive: true });

// Copy images
const files = fs.readdirSync(sourceDir);
files.forEach(file => {
  const source = path.join(sourceDir, file);
  const dest = path.join(destDir, file);
  fs.copyFileSync(source, dest);
});

console.log(`✓ Copied ${files.length} images to dist/assets/images`);
