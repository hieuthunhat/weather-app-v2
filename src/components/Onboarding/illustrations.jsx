import React from 'react';

export const WelcomeIllustration = () => (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sun */}
        <circle cx="100" cy="60" r="30" fill="#FFB74D"/>
        <circle cx="100" cy="60" r="22" fill="#FFF176"/>
        {/* Sun rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
                key={angle}
                x1={100 + 36 * Math.cos((angle * Math.PI) / 180)}
                y1={60 + 36 * Math.sin((angle * Math.PI) / 180)}
                x2={100 + 46 * Math.cos((angle * Math.PI) / 180)}
                y2={60 + 46 * Math.sin((angle * Math.PI) / 180)}
                stroke="#FFB74D"
                strokeWidth="3"
                strokeLinecap="round"
            />
        ))}
        {/* Cloud */}
        <ellipse cx="140" cy="85" rx="28" ry="16" fill="#B3E5FC"/>
        <ellipse cx="125" cy="82" rx="20" ry="14" fill="#B3E5FC"/>
        <ellipse cx="155" cy="83" rx="16" ry="12" fill="#B3E5FC"/>
        {/* Ground */}
        <path d="M20 140 Q60 120 100 135 Q140 150 180 130" stroke="#81C784" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M10 150 Q50 135 100 145 Q150 155 190 140" stroke="#A5D6A7" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
);

export const SearchIllustration = () => (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Map background */}
        <rect x="30" y="20" rx="12" ry="12" width="140" height="100" fill="#E8F5E9" stroke="#81C784" strokeWidth="2"/>
        {/* Grid lines */}
        <line x1="30" y1="50" x2="170" y2="50" stroke="#C8E6C9" strokeWidth="1"/>
        <line x1="30" y1="80" x2="170" y2="80" stroke="#C8E6C9" strokeWidth="1"/>
        <line x1="75" y1="20" x2="75" y2="120" stroke="#C8E6C9" strokeWidth="1"/>
        <line x1="125" y1="20" x2="125" y2="120" stroke="#C8E6C9" strokeWidth="1"/>
        {/* Location pin */}
        <path d="M100 45 C100 45 80 62 80 75 C80 86 89 95 100 95 C111 95 120 86 120 75 C120 62 100 45 100 45Z" fill="#EF5350"/>
        <circle cx="100" cy="73" r="8" fill="white"/>
        {/* Magnifying glass */}
        <circle cx="152" cy="118" r="18" stroke="#00796B" strokeWidth="3" fill="white" fillOpacity="0.9"/>
        <line x1="165" y1="131" x2="178" y2="144" stroke="#00796B" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="152" cy="118" r="8" stroke="#4DB6AC" strokeWidth="1.5" fill="none"/>
    </svg>
);

export const ForecastIllustration = () => (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Chart background */}
        <rect x="25" y="15" rx="8" ry="8" width="150" height="110" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1.5"/>
        {/* Chart bars */}
        <rect x="42" y="70" width="14" height="45" rx="3" fill="#4DB6AC"/>
        <rect x="62" y="50" width="14" height="65" rx="3" fill="#00796B"/>
        <rect x="82" y="60" width="14" height="55" rx="3" fill="#4DB6AC"/>
        <rect x="102" y="35" width="14" height="80" rx="3" fill="#00796B"/>
        <rect x="122" y="55" width="14" height="60" rx="3" fill="#4DB6AC"/>
        <rect x="142" y="45" width="14" height="70" rx="3" fill="#00796B"/>
        {/* Trend line */}
        <polyline points="49,65 69,45 89,55 109,30 129,50 149,40" stroke="#FF7043" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Dots on line */}
        <circle cx="49" cy="65" r="3" fill="#FF7043"/>
        <circle cx="69" cy="45" r="3" fill="#FF7043"/>
        <circle cx="89" cy="55" r="3" fill="#FF7043"/>
        <circle cx="109" cy="30" r="3" fill="#FF7043"/>
        <circle cx="129" cy="50" r="3" fill="#FF7043"/>
        <circle cx="149" cy="40" r="3" fill="#FF7043"/>
        {/* Weather icons above */}
        <circle cx="49" cy="8" r="5" fill="#FFB74D"/>
        <circle cx="89" cy="8" r="6" fill="#90CAF9"/>
        <circle cx="129" cy="8" r="5" fill="#FFB74D"/>
        {/* Clock */}
        <circle cx="170" cy="140" r="14" stroke="#00796B" strokeWidth="2" fill="white"/>
        <line x1="170" y1="140" x2="170" y2="132" stroke="#00796B" strokeWidth="2" strokeLinecap="round"/>
        <line x1="170" y1="140" x2="177" y2="140" stroke="#00796B" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const CustomizeIllustration = () => (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Gear */}
        <path
            d="M100 40 L105 42 L108 38 L114 40 L113 46 L118 49 L122 45 L126 50 L121 54 L122 60 L128 61 L128 67 L122 68 L121 74 L126 78 L122 83 L118 79 L113 82 L114 88 L108 90 L105 86 L100 88 L95 86 L92 90 L86 88 L87 82 L82 79 L78 83 L74 78 L79 74 L78 68 L72 67 L72 61 L78 60 L79 54 L74 50 L78 45 L82 49 L87 46 L86 40 L92 38 L95 42 Z"
            fill="#B2DFDB"
            stroke="#00796B"
            strokeWidth="2"
        />
        <circle cx="100" cy="64" r="14" fill="#E0F2F1" stroke="#00796B" strokeWidth="2"/>
        {/* Toggle - dark/light */}
        <rect x="60" y="110" rx="12" width="50" height="24" fill="#4DB6AC"/>
        <circle cx="86" cy="122" r="10" fill="white"/>
        {/* Sun icon on toggle */}
        <circle cx="72" cy="122" r="4" fill="white" fillOpacity="0.5"/>
        {/* Sliders */}
        <rect x="125" y="105" width="50" height="4" rx="2" fill="#B2DFDB"/>
        <circle cx="155" cy="107" r="6" fill="#00796B"/>
        <rect x="125" y="122" width="50" height="4" rx="2" fill="#B2DFDB"/>
        <circle cx="140" cy="124" r="6" fill="#00796B"/>
        <rect x="125" y="139" width="50" height="4" rx="2" fill="#B2DFDB"/>
        <circle cx="160" cy="141" r="6" fill="#00796B"/>
    </svg>
);