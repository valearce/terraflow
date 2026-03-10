export function BackgroundBirds() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Top Left Bird */}
      <svg
        className="absolute top-12 left-8 opacity-40 animate-bounce"
        style={{
          animationDuration: "3s",
          width: "60px",
          height: "60px",
        }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <ellipse cx="50" cy="40" rx="25" ry="20" fill="#7A9856" />
        <circle cx="65" cy="35" r="10" fill="#7A9856" />
        <path
          d="M 70 32 Q 80 28 90 30"
          stroke="#7A9856"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="75" cy="38" r="3" fill="#D97E3A" />
      </svg>

      {/* Top Right Bird */}
      <svg
        className="absolute top-24 right-12 opacity-35 animate-pulse"
        style={{
          animationDuration: "4s",
          width: "70px",
          height: "70px",
        }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <ellipse cx="50" cy="40" rx="28" ry="22" fill="#A8C766" />
        <circle cx="70" cy="34" r="12" fill="#A8C766" />
        <path
          d="M 75 30 Q 88 24 100 28"
          stroke="#A8C766"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="78" cy="38" r="4" fill="#D97E3A" />
      </svg>

      {/* Middle Left Bird */}
      <svg
        className="absolute top-1/3 left-6 opacity-25 animate-bounce"
        style={{
          animationDuration: "4s",
          animationDelay: "1s",
          width: "50px",
          height: "50px",
        }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <ellipse cx="50" cy="40" rx="24" ry="18" fill="#8B6F47" />
        <circle cx="68" cy="36" r="9" fill="#8B6F47" />
        <path
          d="M 72 33 Q 82 28 92 32"
          stroke="#8B6F47"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="74" cy="40" r="2.5" fill="#E8DCC8" />
      </svg>

      {/* Bottom Right Bird */}
      <svg
        className="absolute bottom-20 right-24 opacity-30 animate-pulse"
        style={{
          animationDuration: "3.5s",
          animationDelay: "0.5s",
          width: "65px",
          height: "65px",
        }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <ellipse cx="50" cy="40" rx="26" ry="21" fill="#7A9856" />
        <circle cx="69" cy="35" r="11" fill="#7A9856" />
        <path
          d="M 74 31 Q 86 25 98 29"
          stroke="#7A9856"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="76" cy="38" r="3.5" fill="#D97E3A" />
      </svg>

      {/* Far Background Bird - Very Faint */}
      <svg
        className="absolute bottom-1/3 left-1/4 opacity-15"
        style={{
          width: "40px",
          height: "40px",
        }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <ellipse cx="50" cy="40" rx="22" ry="16" fill="#C9B89B" />
        <circle cx="66" cy="36" r="8" fill="#C9B89B" />
        <path
          d="M 70 33 Q 80 28 90 31"
          stroke="#C9B89B"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
