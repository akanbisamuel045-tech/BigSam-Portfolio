import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const rawAssetsDir = path.join(rootDir, "raw-assets");
const publicAssetsDir = path.join(rootDir, "public", "assets");

if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

const rawGadexPath = path.join(rawAssetsDir, "gadex-raw.png");
const rawSamuelPath = path.join(rawAssetsDir, "samuel-raw.png");

const outGadexLogo = path.join(publicAssetsDir, "gadex-logo.png");
const outGadexLogoWhite = path.join(publicAssetsDir, "gadex-logo-white.png");
const outHeroPortrait = path.join(publicAssetsDir, "hero-portrait.png");
const outSamuelAvatar = path.join(publicAssetsDir, "samuel-avatar.png");
const outSamuelImpact = path.join(publicAssetsDir, "samuel-impact.png");

// Smart flood fill background removal supporting both White & Black backgrounds
function smartFloodFillCutout(data, width, height, mode = "auto") {
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Detect background mode from top-left pixel if auto
  const tlR = data[0];
  const tlG = data[1];
  const tlB = data[2];
  const isBlackBg = mode === "black" || (mode === "auto" && (tlR + tlG + tlB) < 60);

  function isBg(idx) {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    if (isBlackBg) {
      // Pure or near pure black background
      return r <= 10 && g <= 10 && b <= 10;
    } else {
      // Near white studio background
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      return r >= 225 && g >= 225 && b >= 225 && (max - min) <= 30;
    }
  }

  // Seed with top row, left and right edges
  for (let x = 0; x < width; x++) {
    const topIdx = x * 4;
    if (isBg(topIdx) && !visited[x]) {
      queue.push(x, 0);
      visited[x] = 1;
    }
  }

  for (let y = 0; y < height; y++) {
    const leftOffset = y * width;
    const leftIdx = leftOffset * 4;
    if (!visited[leftOffset] && isBg(leftIdx)) {
      queue.push(0, y);
      visited[leftOffset] = 1;
    }

    const rightOffset = y * width + (width - 1);
    const rightIdx = rightOffset * 4;
    if (!visited[rightOffset] && isBg(rightIdx)) {
      queue.push(width - 1, y);
      visited[rightOffset] = 1;
    }
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const cOffset = cy * width + cx;
    const cIdx = cOffset * 4;

    // Remove background by setting alpha to 0
    data[cIdx + 3] = 0;

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nOffset = ny * width + nx;
        if (!visited[nOffset]) {
          visited[nOffset] = 1;
          const nIdx = nOffset * 4;
          if (isBg(nIdx)) {
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // Soft anti-aliased edge smoothing
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      if (data[idx + 3] > 0) {
        const n1 = data[((y - 1) * width + x) * 4 + 3];
        const n2 = data[((y + 1) * width + x) * 4 + 3];
        const n3 = data[(y * width + (x - 1)) * 4 + 3];
        const n4 = data[(y * width + (x + 1)) * 4 + 3];
        if (n1 === 0 || n2 === 0 || n3 === 0 || n4 === 0) {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          if (isBlackBg && r < 20 && g < 20 && b < 20) {
            data[idx + 3] = Math.round(data[idx + 3] * 0.4);
          } else if (!isBlackBg && r > 210 && g > 210 && b > 210) {
            data[idx + 3] = Math.round(data[idx + 3] * 0.4);
          }
        }
      }
    }
  }
}

// 1. Process Gadex Logos
async function processGadexLogo() {
  if (fs.existsSync(rawGadexPath)) {
    console.log("[Asset Pipeline] Found raw-assets/gadex-raw.png. Performing smart cutout...");
    const { data, info } = await sharp(rawGadexPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const logoData = Buffer.from(data);
    smartFloodFillCutout(logoData, info.width, info.height, "white");

    // Save transparent gadex-logo.png
    await sharp(logoData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png({ quality: 100 })
      .toFile(outGadexLogo);
    console.log(`[Asset Pipeline] Saved ${path.relative(rootDir, outGadexLogo)}`);

    // Create white monochrome version
    const whiteData = Buffer.from(logoData);
    for (let i = 0; i < whiteData.length; i += 4) {
      const a = whiteData[i + 3];
      if (a > 20) {
        const r = whiteData[i];
        const g = whiteData[i + 1];
        const b = whiteData[i + 2];
        const isOrange = r > 180 && g < 130 && b < 60;
        if (!isOrange) {
          whiteData[i] = 255;
          whiteData[i + 1] = 255;
          whiteData[i + 2] = 255;
        }
      }
    }

    await sharp(whiteData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png({ quality: 100 })
      .toFile(outGadexLogoWhite);
    console.log(`[Asset Pipeline] Saved ${path.relative(rootDir, outGadexLogoWhite)}`);
  }
}

// 2. Process Samuel's Clean & Natural Portrait
async function processSamuelPortraits() {
  if (fs.existsSync(rawSamuelPath)) {
    console.log("[Asset Pipeline] Found clean portrait at raw-assets/samuel-raw.png. Cutting out...");

    const { data, info } = await sharp(rawSamuelPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const portraitData = Buffer.from(data);
    smartFloodFillCutout(portraitData, info.width, info.height, "black");

    const cutoutBuffer = await sharp(portraitData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .png({ quality: 100 })
      .toBuffer();

    // 1. Hero cutout (transparent background, calibrated height for hero composition)
    await sharp(cutoutBuffer)
      .resize({ height: 1200, fit: "inside" })
      .png({ quality: 100 })
      .toFile(outHeroPortrait);
    console.log(`[Asset Pipeline] Saved ${path.relative(rootDir, outHeroPortrait)}`);

    // 2. Samuel avatar (400x400 tight head/shoulder crop over #E84511)
    await sharp(cutoutBuffer)
      .resize(400, 400, {
        fit: "cover",
        position: "top",
      })
      .flatten({ background: "#E84511" })
      .png({ quality: 100 })
      .toFile(outSamuelAvatar);
    console.log(`[Asset Pipeline] Saved ${path.relative(rootDir, outSamuelAvatar)}`);

    // 3. Samuel impact portrait (800x1000 editorial portrait over #140B08)
    await sharp(cutoutBuffer)
      .resize(800, 1000, {
        fit: "cover",
        position: "top",
      })
      .flatten({ background: "#140B08" })
      .png({ quality: 100 })
      .toFile(outSamuelImpact);
    console.log(`[Asset Pipeline] Saved ${path.relative(rootDir, outSamuelImpact)}`);
  }
}

async function main() {
  console.log("=================================================");
  console.log("Processing Clean & Natural Samuel Portrait & Logo");
  console.log("=================================================");
  await processGadexLogo();
  await processSamuelPortraits();
  console.log("=================================================");
  console.log("All Clean Assets Successfully Exported to public/assets/");
  console.log("=================================================");
}

main().catch((err) => {
  console.error("Asset processing error:", err);
  process.exit(1);
});
