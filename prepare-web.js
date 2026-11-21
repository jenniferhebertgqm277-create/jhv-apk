// Jadikan game 100% offline: bundel Three.js + Tailwind CSS lokal, hapus CDN.
const fs = require('fs'), cp = require('child_process');
fs.rmSync('www', { recursive: true, force: true }); fs.mkdirSync('www');
cp.execSync('npx tailwindcss -i tw-in.css -o www/tw.css --content ./index.html --minify', { stdio: 'inherit' });
fs.copyFileSync('node_modules/three/build/three.min.js', 'www/three.min.js');
let h = fs.readFileSync('index.html', 'utf8');
const a = '<script src="https://cdn.tailwindcss.com"></script>';
const b = '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>';
if (!h.includes(a) || !h.includes(b)) throw new Error('Tag CDN tidak ditemukan di index.html');
h = h.replace(a, '<link rel="stylesheet" href="tw.css">').replace(b, '<script src="three.min.js"></script>');
fs.writeFileSync('www/index.html', h);
console.log('www/ siap (offline).');
