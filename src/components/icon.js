import React from 'react';

const Logo = () => {
  return (
    <svg id="icon" viewBox="0 0 400 400">
      <g>
        <path
          className="orange"
          d="M171.83,115.57l99.34-99.34c-58.6-22.96-126-16.67-179.74,18.94L171.83,115.57z"
        />
        <path
          className="green"
          d="M116.37,171.02l-80.4-80.4C0.36,144.36-5.93,211.76,17.03,270.36L116.37,171.02z"
        />
        <path
          className="navy"
          d="M363.14,306.88c50.43-76.13,42.12-179.7-24.95-246.77L227.28,171.02L363.14,306.88z"
        />
        <path
          className="red"
          d="M171.83,226.48L60.92,337.39c67.07,67.07,170.64,75.38,246.77,24.95L171.83,226.48z"
        />
      </g>
    </svg>
  );
};

export default Logo;
