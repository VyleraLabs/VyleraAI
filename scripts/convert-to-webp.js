const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (file.match(/\.(png|jpe?g)$/i)) {
            const outputPath = path.join(dir, file.replace(/\.(png|jpe?g)$/i, '.webp'));
            try {
                await sharp(fullPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                console.log(`Converted: ${path.relative(publicDir, fullPath)} -> ${path.relative(publicDir, outputPath)}`);
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
}

processDirectory(publicDir).then(() => console.log('All images converted (hopefully!).'));
