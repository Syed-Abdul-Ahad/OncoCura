// src/components/Spinner.js
import React from 'react';

export const Spinner = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ margin: 'auto', background: 'transparent', display: 'block' }}
        width="50px"
        height="50px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
    >
        <g transform="rotate(0 50 50)">
            <rect x="47" y="24" rx="2.52" ry="2.52" width="6" height="12" fill="#1dc071">
                <animate
                    attributeName="opacity"
                    values="1;0"
                    keyTimes="0;1"
                    dur="1s"
                    begin="-0.9166666666666666s"
                    repeatCount="indefinite"
                />
            </rect>
        </g>
        <g transform="rotate(30 50 50)">
            <rect x="47" y="24" rx="2.52" ry="2.52" width="6" height="12" fill="#1dc071">
                <animate
                    attributeName="opacity"
                    values="1;0"
                    keyTimes="0;1"
                    dur="1s"
                    begin="-0.8333333333333334s"
                    repeatCount="indefinite"
                />
            </rect>
        </g>
        {/* Add remaining groups as in your original SVG */}
    </svg>
);
