import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="map-header">
      <svg
        id="logo"
        data-name="logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 452.01 80"
      >
        <defs></defs>
        <title>Untitled-1</title>
        <path
          className="orange"
          d="M40.34,31,60.61,10.76a40,40,0,0,0-36.67,3.86Z"
          transform="translate(-6 -8)"
        />
        <path
          className="green"
          d="M29,42.34,12.62,25.93A40.07,40.07,0,0,0,8.76,62.61Z"
          transform="translate(-6 -8)"
        />
        <path
          className="navy"
          d="M79.37,70.06a40,40,0,0,0-5.09-50.35L51.65,42.34Z"
          transform="translate(-6 -8)"
        />
        <path
          className="red"
          d="M40.34,53.65,17.71,76.28a40,40,0,0,0,50.35,5.09Z"
          transform="translate(-6 -8)"
        />
        <text className="navy atlas" transform="translate(117.73 62.13)">
          atlas
          <tspan className="viewer" x="149.8" y="0">
            viewer
          </tspan>
        </text>
      </svg>
    </header>
  );
};

export default Header;
