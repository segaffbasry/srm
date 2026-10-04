#!/bin/sh
# Rebuilds public/media from srm.com: downloads the homepage's own photos at full size, the hero film and the
# YouTube brand film, then encodes web versions. Needs curl, ffmpeg, cwebp and yt-dlp.
set -e
cd "$(dirname "$0")/.."
RAW=_scrape/raw; OUT=public/media; mkdir -p "$RAW" "$OUT"
B=https://www.srm.com/media
UA="Mozilla/5.0 (Macintosh) Chrome/130"
get() { [ -f "$RAW/$2" ] || curl -sL -A "$UA" "$B/$1" -o "$RAW/$2"; }

# name            live path (the homepage serves these at ?width=1265; the originals are fetched)
get dwonsuey/port-talbot-september-2026-piling-website-header.mp4 hero.mp4
get vd3nqdoy/sill_154.jpg netzero.jpg
get hgsku52d/technical-excellence.jpeg technical.jpg
get rhyhp45m/modern-slavery-2023.jpg slavery.jpg
get k4hdwj0x/our-heritage-870x533.jpg heritage.jpg
get l0mklnt3/see-hub.png see-hub.png
get cmmfq0os/broadgate-earth-day.jpg insight-circularity.jpg
get a5gci4fh/dalux-21-moorfields.jpg insight-digital.jpg
get uisn1ksy/stem-bridge-2.jpg insight-equity.jpg
get vwsjezea/nrc-south-view-6_cgi.jpg project-nrc.jpg
get uuvnjxav/news-university-of-bristol-s-temple-quarter-enterprise-campus-nears-opening.jpg project-tqec.jpg
get mdrfswob/72-ng-ext-ng-edmund-sumner.jpg project-gallery.jpg
get gzmheqmy/pinewood-phase-two_1200x635.jpg service-design.jpg
get vlgbwirl/construction-management-battersea-power-station.jpg service-cm.jpg
get sbendt55/geospatial-engineering.jpg service-geo.jpg
get ra5gseiv/news-digital-construction-team-win-building-innovation-award.jpg news-1.jpg
get 24rltdmr/news-srm-achieves-clear-assured-bronze.jpg news-2.jpg
get ku4plfl0/news-celebrating-10-years-of-the-broadgate-framework-at-lref.jpg news-3.jpg
get 5j1dlsiq/port-talbot-piling-august-2026.jpg news-4.jpg
get k3vmvbnm/2-finsbury-avenue-facade-september-2026.jpg news-5.jpg
get v1wnt30b/tq_exterior.jpg news-6.jpg
[ -f "$RAW/film.mp4" ] || yt-dlp -q -f "bv*[height<=1080][ext=mp4]+ba[ext=m4a]/b[ext=mp4]" -o "$RAW/film.mp4" "https://www.youtube.com/watch?v=caE2UjmlpCQ"

# Brand film loop: text-free cuts of caE2UjmlpCQ (every other second of the film carries a title card).
if [ ! -f "$OUT/film.mp4" ]; then
  T=$(mktemp -d); i=0; : > "$T/list.txt"
  for seg in "0.2 2.6" "3.1 2.8" "15.1 2.8" "24.1 2.8" "26.1 1.8" "38.1 1.8" "41.1 1.9" "54.1 1.8" "60.2 1.8" "72.1 1.9" "76.1 1.0" "78.2 1.6" "80.2 1.8"; do
    set -- $seg
    ffmpeg -v error -y -ss "$1" -t "$2" -i "$RAW/film.mp4" -an -vf "scale=1600:-2,fps=25" -c:v libx264 -crf 18 -preset fast "$T/c$i.mp4"
    echo "file '$T/c$i.mp4'" >> "$T/list.txt"; i=$((i+1))
  done
  ffmpeg -v error -y -f concat -safe 0 -i "$T/list.txt" -an -vf "scale=1280:-2" -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT/film.mp4"
  ffmpeg -v error -y -ss 4.2 -i "$RAW/film.mp4" -frames:v 1 -vf "scale=1600:-2" -q:v 3 "$OUT/film-poster.jpg"
  rm -rf "$T"
fi

# Hero: the live homepage header film (Port Talbot piling, 18.5s), silent.
[ -f "$OUT/hero.mp4" ] || ffmpeg -v error -y -i "$RAW/hero.mp4" -an -vf "scale=1600:-2" -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT/hero.mp4"
[ -f "$OUT/hero-poster.jpg" ] || ffmpeg -v error -y -ss 0.5 -i "$RAW/hero.mp4" -frames:v 1 -vf "scale=1600:-2" -q:v 3 "$OUT/hero-poster.jpg"

# Photos: one webp each, 1600px wide for full-bleed scenes, 960px for cards.
for f in netzero technical slavery heritage insight-circularity insight-digital insight-equity project-nrc project-tqec project-gallery service-design service-cm service-geo; do
  [ -f "$OUT/$f.webp" ] || cwebp -quiet -q 76 -resize 1600 0 "$RAW/$f.jpg" -o "$OUT/$f.webp"
done
for f in news-1 news-2 news-3 news-4 news-5 news-6; do
  [ -f "$OUT/$f.webp" ] || cwebp -quiet -q 76 -resize 960 0 "$RAW/$f.jpg" -o "$OUT/$f.webp"
done
[ -f "$OUT/see-hub.webp" ] || cwebp -quiet -q 80 -resize 1050 0 "$RAW/see-hub.png" -o "$OUT/see-hub.webp"
