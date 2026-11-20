import React from "react";

interface IIcon {
  className?: string;
}

export const LinkedInIcon: React.FC<IIcon> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
    <circle cx="7.2" cy="7.6" r="1.5" fill="#050816" />
    <rect x="5.9" y="10.2" width="2.6" height="7.8" fill="#050816" />
    <path
      d="M10.6 10.2h2.5v1.1c.5-.8 1.4-1.3 2.6-1.3 2.2 0 3 1.4 3 3.6V18h-2.6v-4c0-1-.3-1.7-1.3-1.7s-1.6.7-1.6 1.7v4h-2.6z"
      fill="#050816"
    />
  </svg>
);

export const InstagramIcon: React.FC<IIcon> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
);

export const AwardIcon: React.FC<IIcon> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="9" r="5.5" />
    <path d="m9.2 13.6-1.7 7 4.5-2.4 4.5 2.4-1.7-7" />
    <path d="m9.8 9 1.6 1.6 3-3.2" />
  </svg>
);
