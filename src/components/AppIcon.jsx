/**
 * App Icon Components - SVG-based app icons with Islander Studio aesthetic
 */

export function ShellistIcon({ size = 64 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: '16px', overflow: 'hidden' }}
    >
      {/* Background */}
      <rect width="64" height="64" fill="#4A90A4" />

      {/* Pearl glow */}
      <circle cx="32" cy="32" r="20" fill="url(#pearlGlow)" opacity="0.3" />

      {/* Main pearl */}
      <circle cx="32" cy="32" r="14" fill="url(#pearlGradient)" />

      {/* Pearl highlight */}
      <ellipse cx="28" cy="28" rx="6" ry="8" fill="white" opacity="0.4" />
      <ellipse cx="27" cy="26" rx="3" ry="4" fill="white" opacity="0.6" />

      {/* Subtle shell pattern */}
      <path
        d="M32 18 C38 22, 38 26, 32 30 C26 26, 26 22, 32 18Z"
        fill="white"
        opacity="0.1"
      />

      <defs>
        <radialGradient id="pearlGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#E6F2F5" />
          <stop offset="100%" stopColor="#4A90A4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pearlGradient" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F5F5F5" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export function PolaMomentIcon({ size = 64 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: '16px', overflow: 'hidden' }}
    >
      {/* Background */}
      <rect width="64" height="64" fill="#D93025" />

      {/* Camera body */}
      <rect x="16" y="24" width="32" height="24" rx="2" fill="#FAFAF5" />

      {/* Lens */}
      <circle cx="32" cy="34" r="8" fill="#333333" />
      <circle cx="32" cy="34" r="6" fill="#1a1a1a" />
      <circle cx="32" cy="34" r="4" fill="url(#lensGradient)" />

      {/* Lens reflection */}
      <ellipse cx="30" cy="32" rx="2" ry="3" fill="white" opacity="0.4" />

      {/* Flash */}
      <rect x="42" y="26" width="4" height="3" rx="1" fill="#FFE57F" />

      {/* Viewfinder */}
      <rect x="20" y="27" width="6" height="4" rx="1" fill="#333333" opacity="0.8" />

      {/* Shutter button */}
      <circle cx="44" cy="44" r="2.5" fill="#D93025" />

      {/* Film slot */}
      <rect x="20" y="44" width="20" height="2" rx="1" fill="#333333" opacity="0.3" />

      <defs>
        <radialGradient id="lensGradient" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#4A4A4A" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export function AppIconDisplay({ appId, size = 64 }) {
  switch (appId) {
    case 'shellist':
      return <ShellistIcon size={size} />
    case 'polamoment':
      return <PolaMomentIcon size={size} />
    default:
      return null
  }
}
