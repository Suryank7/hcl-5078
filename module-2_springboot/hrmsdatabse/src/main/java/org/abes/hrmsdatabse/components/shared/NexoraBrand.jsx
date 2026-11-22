import React from 'react';

/** Shared Nexora wordmark used by the employee portal pages. */
export default function NexoraBrand({ className = '', subtitle = false }) {
  return (
    <div className={`nexora-brand ${className}`.trim()} aria-label="Nexora Employee and Workforce Management">
      <span className="nexora-brand__mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" role="img" focusable="false">
          <path
            d="M7.5 24.8 16.1 8.7c1.7-3.2 6.2-3.2 8 .1l4 7.1"
            fill="none"
            stroke="#F4CC43"
            strokeWidth="7.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m32.5 15.2-8.6 16.1c-1.7 3.2-6.2 3.2-8-.1l-4-7.1"
            fill="none"
            stroke="#242424"
            strokeWidth="7.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="nexora-brand__copy">
        <strong>Nexora</strong>
        {subtitle && <small>Employee &amp; Workforce Management</small>}
      </span>
    </div>
  );
}
