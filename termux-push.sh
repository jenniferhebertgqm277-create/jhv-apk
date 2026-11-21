#!/data/data/com.termux/files/usr/bin/bash
# Pemakaian: bash termux-push.sh https://github.com/USERNAME/jhv-apk.git
set -e
pkg install -y git >/dev/null 2>&1 || true
[ -z "$1" ] && { echo "Isi URL repo GitHub: bash termux-push.sh <url>"; exit 1; }
printf 'node_modules/\nwww/\nandroid/\n' > .gitignore
[ -d .git ] || git init -b main
git add -A && git commit -m "JHV APK project" || true
git remote remove origin 2>/dev/null || true
git remote add origin "$1"
git push -u origin main
echo "Selesai! Buka GitHub > Actions > Build APK, lalu unduh artifact JHV-apk."
