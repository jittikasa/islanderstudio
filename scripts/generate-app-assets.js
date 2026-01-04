/**
 * Generate app visual assets using Nano Banana
 * Run with: node scripts/generate-app-assets.js
 */

import { google } from '@ai-sdk/google'
import { generateText } from 'ai'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OUTPUT_DIR = path.join(__dirname, '../public/generated-assets')

// Islander Studio brand colors
const BRAND = {
  coconutShell: '#A78A6A',
  seaSalt: '#F7F0E6',
  midnightSky: '#333333',
  summerSky: '#AFCAE8',
  mistyMorning: '#7592AA'
}

async function generateImage(prompt, filename, aspectRatio = '1:1', modelName = 'gemini-2.5-flash-image') {
  console.log(`\n🎨 Generating ${filename}...`)
  console.log(`📝 Prompt: ${prompt}`)

  try {
    const result = await generateText({
      model: google(modelName),
      prompt,
      providerOptions: {
        google: {
          responseModalities: ['IMAGE'],
          imageConfig: { aspectRatio }
        }
      }
    })

    if (!result.files || result.files.length === 0) {
      throw new Error('No image generated')
    }

    const imageFile = result.files[0]
    const buffer = Buffer.from(imageFile.uint8Array)

    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true })

    const outputPath = path.join(OUTPUT_DIR, filename)
    await fs.writeFile(outputPath, buffer)

    console.log(`✅ Saved to ${outputPath}`)
    return outputPath
  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error.message)
    throw error
  }
}

async function generateAllAssets() {
  console.log('🚀 Islander Studio Asset Generation')
  console.log('=====================================\n')

  try {
    // Shellist App Icon - Premium, minimal iOS app icon
    await generateImage(
      `iOS app icon design for "Shellist" - a habit tracking app. Design features: elegant pearl on soft blue-teal background (#4A90A4), minimalist style, single beautiful white pearl with subtle iridescence, clean geometric composition, rounded square app icon format, premium iOS design aesthetic, soft shadows, Islander Studio brand - boutique app design, warm and inviting, no text`,
      'shellist-icon.png',
      '1:1',
      'gemini-3-pro-image-preview'
    )

    // PolaMoment App Icon - Vintage camera aesthetic
    await generateImage(
      `iOS app icon design for "PolaMoment" - a vintage polaroid camera app. Design features: stylized retro instant camera on warm coral-red background (#D93025), minimalist geometric shapes, classic polaroid camera silhouette, rounded square app icon format, premium iOS design, nostalgic 90s aesthetic, clean lines, Islander Studio brand - boutique app design, warm vintage feel, no text`,
      'polamoment-icon.png',
      '1:1',
      'gemini-3-pro-image-preview'
    )

    // Shellist App Screenshot - Habit tracking interface
    await generateImage(
      `iPhone app screenshot mockup for "Shellist" habit tracker. Show elegant mobile UI with: pearl chain visualization growing vertically showing habit streaks, soft teal color scheme (#4A90A4), iOS-style interface, clean minimalist design, habit items with checkboxes, beautiful pearl graphics representing completed days, modern typography (DM Sans), premium boutique app aesthetic, Islander Studio brand quality, mobile screen aspect ratio 9:16, UI looks polished and inviting`,
      'shellist-screenshot.png',
      '9:16',
      'gemini-3-pro-image-preview'
    )

    // PolaMoment App Screenshot - Polaroid camera interface
    await generateImage(
      `iPhone app screenshot mockup for "PolaMoment" vintage polaroid camera app. Show retro camera interface with: instant camera viewfinder UI, polaroid frame preview at bottom, vintage aesthetic with warm cream tones (#FAFAF5), red accent buttons (#D93025), nostalgic 1990s instant camera design, iOS-style mobile interface, film counter, shutter button, classic polaroid styling, premium boutique app quality, Islander Studio brand, mobile screen aspect ratio 9:16`,
      'polamoment-screenshot.png',
      '9:16',
      'gemini-3-pro-image-preview'
    )

    console.log('\n\n🎉 All assets generated successfully!')
    console.log(`📁 Saved to: ${OUTPUT_DIR}`)

  } catch (error) {
    console.error('\n❌ Asset generation failed:', error)
    process.exit(1)
  }
}

// Run generation
generateAllAssets()
