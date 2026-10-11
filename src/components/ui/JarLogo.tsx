import React from "react";

interface JarLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export function JarLogo({
  className = "",
  size = 56,
  color = "#c4a96e",
}: JarLogoProps) {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
      style={{ color }}
      aria-label="Logo Haras JAR"
    >
      <svg
        width={size}
        height={Math.round(size * 0.95)}
        viewBox="0 0 100 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300"
      >
        {/* Silhueta minimalista elegante da cabeça do cavalo */}
        <path
          d="M26 62 C22 56, 16 48, 14 38 C12 28, 19 18, 28 14 C33 11, 38 12, 42 16 L48 8 C50 6, 54 8, 55 12 L56 18 C64 16, 73 20, 78 28 C84 37, 86 50, 85 62"
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Linha da orelha interna */}
        <path
          d="M49 13 L52 24"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Detalhe da crina / pescoço */}
        <path
          d="M72 26 C75 34, 79 46, 80 58"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 3"
        />
        {/* Narina e focinho estilizados */}
        <path
          d="M22 46 C21 44, 18 45, 17 48"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Olho sutil */}
        <circle cx="36" cy="30" r="2.2" fill={color} />

        {/* Monograma JAR com tipografia de prestígio */}
        <text
          x="50"
          y="88"
          textAnchor="middle"
          fill={color}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700,
            fontSize: "26px",
            letterSpacing: "0.22em",
          }}
        >
          JAR
        </text>
      </svg>
    </div>
  );
}

export default JarLogo;
