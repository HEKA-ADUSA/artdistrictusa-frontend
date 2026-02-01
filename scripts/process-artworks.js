#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Artist mapping
const artistMap = {
    'LCY': { name: 'Liu Cheng Yong', bio: 'Contemporary abstract artist' },
    'RL': { name: 'Randy Liu', bio: 'Modern expressionist painter' },
    'RD': { name: 'Randy Liu', bio: 'Modern expressionist painter' },
    'FB': { name: 'Frank Bergmann', bio: 'Bold colorist and texture master' },
    'LV': { name: 'Larry Vargas', bio: 'Vibrant contemporary artist' },
    'TINA': { name: 'Tina Moeller', bio: 'Abstract impressionist' },
    'MS': { name: 'Marco Stiletto', bio: 'Dynamic modern artist' },
};

// Pricing structure based on size
function calculatePrice(width, height, depth) {
    const w = parseInt(width);
    const h = parseInt(height);
    const d = parseFloat(depth);

    // Match against size categories
    if (w === 32 && h === 32) return d <= 1.5 ? 498 : 598;
    if (w === 40 && h === 40) return d <= 1.5 ? 698 : 798;
    if ((w === 22 && h === 72) || (w === 72 && h === 22)) return d <= 1.5 ? 898 : 998;
    if (w === 48 && h === 48) return d <= 1.5 ? 998 : 1098;
    if ((w === 40 && h === 60) || (w === 60 && h === 40)) return d <= 1.5 ? 998 : 1098;
    if ((w === 48 && h === 72) || (w === 72 && h === 48)) return d <= 1.5 ? 1598 : 1798;

    // Default pricing for other sizes
    const area = w * h;
    if (area < 1000) return 498;
    if (area < 1600) return 698;
    if (area < 2300) return 998;
    return 1598;
}

// Parse filename to extract metadata
function parseFilename(filename) {
    // Format: AB-####-ARTIST-WxHxD.jpg
    const match = filename.match(/AB-(\d+[A-Z]*)-([A-Z]+)-(\d+)[xX](\d+)[xX]([\d.]+)/i);
    if (!match) return null;

    const [, articleNum, artistCode, width, height, depth] = match;
    const artist = artistMap[artistCode.toUpperCase()] || { name: 'Unknown Artist', bio: '' };
    const price = calculatePrice(width, height, depth);

    return {
        articleNumber: `AB-${articleNum}`,
        artistCode: artistCode.toUpperCase(),
        artistName: artist.name,
        artistBio: artist.bio,
        dimensions: {
            width: parseInt(width),
            height: parseInt(height),
            depth: parseFloat(depth),
        },
        price,
        filename,
    };
}

// Generate AI-style title and description
function generateMetadata(artwork) {
    const { artistCode, dimensions } = artwork;

    const titleOptions = [
        'Abstract Harmony', 'Vibrant Dreams', 'Color Symphony', 'Modern Essence',
        'Urban Energy', 'Artistic Flow', 'Bold Expression', 'Contemporary Vision',
        'Dynamic Rhythm', 'Pure Emotion', 'Creative Spirit', 'Timeless Beauty',
        'Radiant Composition', 'Textured Landscape', 'Chromatic Dance',
        'Expressive Strokes', 'Vivid Imagination', 'Artistic Journey',
        'Colorful Meditation', 'Abstract Resonance', 'Modern Movements',
        'Spontaneous Creation', 'Emotional Palette', 'Visual Poetry',
    ];

    const descOptions = [
        'A stunning abstract piece that captures the essence of modern art.',
        'Bold colors and dynamic composition create an unforgettable visual experience.',
        'This contemporary masterpiece brings energy and life to any space.',
        'Expertly crafted with rich textures and vibrant hues.',
        'A perfect blend of traditional technique and modern expression.',
        'This original artwork showcases the artist\'s unique creative vision.',
        'Gallery-quality piece that adds sophistication to any collection.',
        'Meticulously painted with premium materials on stretched canvas.',
    ];

    const title = titleOptions[Math.floor(Math.random() * titleOptions.length)];
    const desc = descOptions[Math.floor(Math.random() * descOptions.length)];

    return { title, description: desc };
}

// Main processing
const sourceDir = '/Users/heka01/Desktop/ARTWORK 4 ANTIGRAVITY';
const targetDir = path.join(__dirname, '..', 'public', 'artworks');

// Get all artwork files
const files = fs.readdirSync(sourceDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort();

console.log(`Found ${files.length} artwork files`);

const artworks = [];
let copiedCount = 0;

// Process first 30 artworks for initial population
files.slice(0, 30).forEach((file, index) => {
    const metadata = parseFilename(file);
    if (!metadata) {
        console.log(`Skipping ${file} - couldn't parse`);
        return;
    }

    const { title, description } = generateMetadata(metadata);

    const artwork = {
        id: copiedCount + 1,
        articleNumber: metadata.articleNumber,
        title,
        description,
        artistName: metadata.artistName,
        artistBio: metadata.artistBio,
        price: metadata.price,
        dimensions: metadata.dimensions,
        imageUrl: `/artworks/${file}`,
        category: 'Painting',
        featured: index < 8,
        bestseller: index % 3 === 0,
        newArrival: index >= 20,
    };

    artworks.push(artwork);

    // Copy file to public/artworks
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    fs.copyFileSync(sourcePath, targetPath);
    copiedCount++;

    if (copiedCount % 10 === 0) {
        console.log(`Processed ${copiedCount} artworks...`);
    }
});

// Save artwork data as JSON
const outputPath = path.join(__dirname, '..', 'src', 'data', 'artworks.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(artworks, null, 2));

console.log(`\n✅ Successfully processed ${copiedCount} artworks`);
console.log(`📁 Images copied to: ${targetDir}`);
console.log(`📄 Data saved to: ${outputPath}`);
console.log(`\nBreakdown:`);
console.log(`- Bestsellers: ${artworks.filter(a => a.bestseller).length}`);
console.log(`- Featured: ${artworks.filter(a => a.featured).length}`);
console.log(`- New Arrivals: ${artworks.filter(a => a.newArrival).length}`);
