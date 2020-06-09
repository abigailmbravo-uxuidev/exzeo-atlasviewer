import React from 'react';

const Spinner = () => {
  return (
    <div className="modal fade-in spinner">
      <div className="card">
        <div className="body">
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 195 195">
           <path 
           d="M86.2,58.62l49.41-49.4a97.63,97.63,0,0,0-89.39,9.42Z" 
           transform="translate(-2.5 -2.5)" 
           style={{fill: '#ffffff'}}>
          <animate attributeName="fill" values="#ffffff;#f28f20;#ffffff;#84be41;#ffffff;#d85757;#ffffff;#223241;" dur="8s"  repeatCount="indefinite" />
            </path>
    <path d="M181.35,153.77A97.54,97.54,0,0,0,168.94,31L113.78,86.2Z" transform="translate(-2.5 -2.5)" style={{fill: '#ffffff'}}>
        <animate attributeName="fill" values="#ffffff;#f28f20;#ffffff;#84be41;#ffffff;#d85757;#ffffff;#223241;" dur="8s" begin=".5s" repeatCount="indefinite"/>
    </path>
    <path d="M86.2,113.78,31,168.94a97.54,97.54,0,0,0,122.73,12.41Z" transform="translate(-2.5 -2.5)"  style={{fill: '#ffffff'}}>
        <animate attributeName="fill" values="#ffffff;#f28f20;#ffffff;#84be41;#ffffff;#d85757;#ffffff;#223241;" dur="8s" begin="1s" repeatCount="indefinite" />
    </path>
    <path d="M58.62,86.2l-40-40a97.63,97.63,0,0,0-9.42,89.39Z" transform="translate(-2.5 -2.5)"  style={{fill: '#ffffff'}}>
        <animate attributeName="fill" values="#ffffff;#f28f20;#ffffff;#84be41;#ffffff;#d85757;#ffffff;#223241;" dur="8s" begin="1.5s" repeatCount="indefinite"/>
    </path>
</svg>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
