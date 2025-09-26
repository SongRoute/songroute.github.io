// Fetch Naver Static Map at build time and save to public/static-map.png
// Requires env:
// - NAVER_MAP_CLIENT_ID
// - NAVER_MAP_CLIENT_SECRET
// It extracts lng/lat from src/const.ts (WEDDING_HALL_POSITION)

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const root = path.resolve(__dirname, '..')
const constTsPath = path.resolve(root, 'src', 'const.ts')
const outPath = path.resolve(root, 'public', 'static-map.png')

const clientId = process.env.NAVER_MAP_CLIENT_ID
const clientSecret = process.env.NAVER_MAP_CLIENT_SECRET

if (!clientId || !clientSecret) {
  console.error('[fetch-static-map] Missing NAVER_MAP_CLIENT_ID or NAVER_MAP_CLIENT_SECRET')
  process.exit(0) // Do not fail the build; just skip
}

const src = fs.readFileSync(constTsPath, 'utf-8')
const match = src.match(/export const WEDDING_HALL_POSITION\s*=\s*\[\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]/)

if (!match) {
  console.error('[fetch-static-map] Could not find WEDDING_HALL_POSITION in src/const.ts')
  process.exit(0)
}

const lng = match[1]
const lat = match[2]

const width = 800
const height = 300
const level = 15
// Basic marker at center
const url = `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster?w=${width}&h=${height}&center=${lng},${lat}&level=${level}&markers=${lng},${lat}&scale=2`

console.log('[fetch-static-map] Fetching:', url)

try {
  const res = await fetch(url, {
    headers: {
      'X-NCP-APIGW-API-KEY-ID': clientId,
      'X-NCP-APIGW-API-KEY': clientSecret,
    },
  })
  if (!res.ok) {
    console.error('[fetch-static-map] Request failed:', res.status, await res.text())
    process.exit(0)
  }
  const arrayBuffer = await res.arrayBuffer()
  fs.writeFileSync(outPath, Buffer.from(arrayBuffer))
  console.log('[fetch-static-map] Saved to', outPath)
} catch (e) {
  console.error('[fetch-static-map] Error:', e)
  process.exit(0)
}
