const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'package.json');
const destDir = path.join(__dirname, 'out');
const destPath = path.join(destDir, 'package.json');

let data;
try {
    data = fs.readFileSync(srcPath, 'utf8');
} catch (err) {
    console.error('Failed to read package.json:', err);
    process.exit(1);
}

let pkg;
try {
    pkg = JSON.parse(data);
} catch (e) {
    console.error('Invalid package.json:', e);
    process.exit(1);
}

// Remove dependencies fields
delete pkg.dependencies;
delete pkg.devDependencies;
delete pkg.scripts;

// Set main to extension.js
pkg.main = 'extension.js';

// Copy icon to out
pkg.icon = 'icon.png';
fs.copyFileSync(path.join(__dirname, 'image/icon.png'), path.join(destDir, 'icon.png'));

// Copy license to out
fs.copyFileSync(path.join(__dirname, 'LICENSE'), path.join(destDir, 'LICENSE'));

// Ensure out directory exists
try {
    fs.mkdirSync(destDir, { recursive: true });
} catch (err) {
    console.error('Failed to create out directory:', err);
    process.exit(1);
}

try {
    fs.writeFileSync(destPath, JSON.stringify(pkg, null, 2), 'utf8');
    console.log('package.json copied to out/ without dependencies fields.');
} catch (err) {
    console.error('Failed to write package.json to out:', err);
    process.exit(1);
}
