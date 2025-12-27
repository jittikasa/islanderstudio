/**
 * App Screenshot Mockups - SVG-based app interface previews
 */

export function ShellistScreenshot() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 180 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: '20px' }}
    >
      {/* Background */}
      <rect width="180" height="320" fill="#E6F2F5" />

      {/* Header */}
      <text x="90" y="40" textAnchor="middle" fill="#4A90A4" fontFamily="system-ui" fontSize="18" fontWeight="700">
        Today's Habits
      </text>

      {/* Pearl chain visualization */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(90, ${80 + i * 45})`}>
          {/* Connecting thread */}
          {i < 4 && (
            <line
              x1="0"
              y1="16"
              x2="0"
              y2="45"
              stroke="#4A90A4"
              strokeWidth="2"
              opacity="0.3"
            />
          )}

          {/* Pearl */}
          <circle cx="0" cy="0" r="16" fill="white" />
          <circle cx="0" cy="0" r="14" fill="url(#pearlShine)" />

          {/* Checkmark for completed */}
          {i < 3 && (
            <>
              <path
                d="M-4 0 L-1 4 L6 -4"
                stroke="#4A90A4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </>
          )}

          {/* Habit label */}
          <text
            x="30"
            y="5"
            fill="#333"
            fontFamily="system-ui"
            fontSize="12"
            fontWeight="500"
          >
            {['Morning run', 'Meditation', 'Read 20min', 'Drink water', 'Journal'][i]}
          </text>
        </g>
      ))}

      {/* Stats footer */}
      <g transform="translate(0, 270)">
        <rect x="20" y="0" width="140" height="35" rx="8" fill="white" opacity="0.8" />
        <text x="40" y="16" fill="#4A90A4" fontFamily="system-ui" fontSize="10" fontWeight="600">
          STREAK
        </text>
        <text x="40" y="28" fill="#333" fontFamily="system-ui" fontSize="14" fontWeight="700">
          12 days
        </text>
        <text x="110" y="16" fill="#4A90A4" fontFamily="system-ui" fontSize="10" fontWeight="600">
          THIS WEEK
        </text>
        <text x="110" y="28" fill="#333" fontFamily="system-ui" fontSize="14" fontWeight="700">
          85%
        </text>
      </g>

      <defs>
        <radialGradient id="pearlShine" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F0F0F0" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export function PolaMomentScreenshot() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 180 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: '20px' }}
    >
      {/* Background */}
      <rect width="180" height="320" fill="#FAFAF5" />

      {/* Viewfinder area */}
      <rect x="15" y="40" width="150" height="150" rx="8" fill="#1a1a1a" />

      {/* Viewfinder grid */}
      <line x1="15" y1="90" x2="165" y2="90" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <line x1="15" y1="140" x2="165" y2="140" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <line x1="65" y1="40" x2="65" y2="190" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <line x1="115" y1="40" x2="115" y2="190" stroke="white" strokeWidth="0.5" opacity="0.3" />

      {/* Camera preview indicator */}
      <text x="90" y="120" textAnchor="middle" fill="white" fontFamily="system-ui" fontSize="12" opacity="0.5">
        📸
      </text>

      {/* Polaroid preview at bottom */}
      <g transform="translate(50, 210)">
        <rect width="80" height="90" rx="4" fill="white" filter="url(#shadow)" />
        <rect x="5" y="5" width="70" height="70" fill="#E0E0E0" />
        <text x="40" y="85" textAnchor="middle" fill="#666" fontFamily="cursive" fontSize="8">
          Just now
        </text>
      </g>

      {/* Control buttons */}
      <g transform="translate(0, 250)">
        {/* Film counter */}
        <text x="30" y="20" fill="#D93025" fontFamily="monospace" fontSize="11" fontWeight="700">
          8/10
        </text>

        {/* Shutter button */}
        <circle cx="90" cy="15" r="18" fill="#D93025" />
        <circle cx="90" cy="15" r="14" fill="white" opacity="0.9" />
        <circle cx="90" cy="15" r="12" fill="#D93025" />

        {/* Gallery button */}
        <rect x="135" y="5" width="20" height="20" rx="4" fill="#666" opacity="0.6" />
        <rect x="138" y="8" width="14" height="10" rx="1" fill="white" />
      </g>

      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}

export function AppScreenshotDisplay({ appId }) {
  switch (appId) {
    case 'shellist':
      return <ShellistScreenshot />
    case 'polamoment':
      return <PolaMomentScreenshot />
    default:
      return null
  }
}
