/**
 * Sound Design Utility
 * Provides subtle audio feedback for interactions
 * Sounds are disabled by default - user must opt-in
 */

// Audio context singleton
let audioContext = null

// Check if sounds are enabled (stored in localStorage)
export const isSoundEnabled = () => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('islander-sounds') === 'enabled'
}

export const setSoundEnabled = (enabled) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('islander-sounds', enabled ? 'enabled' : 'disabled')
}

// Initialize audio context on first user interaction
const getAudioContext = () => {
  if (!audioContext && typeof window !== 'undefined') {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

// Generate a soft "thud" sound for stamp drop
export const playStampThud = () => {
  if (!isSoundEnabled()) return

  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  // Low frequency thud
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(80, now)
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.1)

  gain.gain.setValueAtTime(0.15, now)
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.15)
}

// Generate a soft "pop" for copy success
export const playCopyPop = () => {
  if (!isSoundEnabled()) return

  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  // Higher frequency pop
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(600, now)
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.08)

  gain.gain.setValueAtTime(0.08, now)
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.1)
}

// Generate a very subtle click
export const playClick = () => {
  if (!isSoundEnabled()) return

  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  // Quick click
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'triangle'
  osc.frequency.setValueAtTime(1000, now)
  osc.frequency.exponentialRampToValueAtTime(500, now + 0.02)

  gain.gain.setValueAtTime(0.05, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.03)
}

// Generate a soft hover sound
export const playHover = () => {
  if (!isSoundEnabled()) return

  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(800, now)

  gain.gain.setValueAtTime(0.02, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.05)
}
