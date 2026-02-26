export const CalendarIcon = ({ size = 32 }: { size?: number }) => (
    <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
    >
        <rect x="4" y="6" width="24" height="22" rx="4" fill="#0284c7" fillOpacity="0.1" />
        <path d="M4 10C4 7.79086 5.79086 6 8 6H24C26.2091 6 28 7.79086 28 10V12H4V10Z" fill="#0284c7" />
        <path d="M11 16H21M11 21H18" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
        <path d="M8 6V4M24 6V4" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);
