import React from 'react';

function Logo({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 40" fill="currentColor">
      <text x="0" y="30" fontFamily="Arial" fontSize="30" fontWeight="bold">DS&H</text>
    </svg>
  );
}

export default Logo;