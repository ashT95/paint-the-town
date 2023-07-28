import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import elvis from '../assets/stencil art-elvis.png';

export default function App() {
  const [start, setStart] = useState(false);
  const [done, setDone] = useState(false);

  const [stencil, setStencil] = useState(elvis);
  const [showStencil, setShowStencil] = useState(false);
  const [showFinalImage, setShowFinalImage] = useState(false);

  const [xVal, setXval] = useState(null);
  const [yVal, setYval] = useState(null);
  const [zVal, setZval] = useState(null);

  let coords = [];

  // run the fluid-sim static file
  if (!done) {
    const script = document.createElement('script');
    script.src = 'static://js/fluid-init.js';
    script.async = true;
    document.body.appendChild(script);
  }

  // no overflow or scroll bars for any element
  document.body.style.overflow = 'hidden';

  // when user is done painting
  window.addEventListener('keydown', function (e) {
    if (e.code === 'KeyP') {
      setDone(true);
      setShowStencil(true);
      setShowFinalImage(true);
    }
  });

  window.addEventListener('touchstart', function (e) {

  });

  // getting hand coordinates from backend
  // window.electron.ipcRenderer.on('main-to-render', (message) => {
  //   // eslint-disable-next-line no-console
  //   console.log(message);
  //   if (String(result).startsWith("HAND:")) {
  //     //get only the coords
  //     coords = String(message).match(/-?\d+/g).map(Number);
  //     // console.log(coords)

  //     //set coordinates
  //     setXval(coords[0]);
  //     setYval(coords[1]);
  //     setZval(coords[2]);
  //   }

  // });

  return (
    <div className="background">
      <div className="stencilArea">
        <img
          src=""
          id="finalImg"
          draggable="false"
          style={{ display: showFinalImage ? 'block' : 'none' }}
        />
        <img
          src={stencil}
          id="stencilTop"
          draggable="false"
          style={{ display: showFinalImage ? 'block' : 'none' }}
        />
        <img
          src=""
          id="stencil"
          draggable="false"
          style={{ display: showStencil ? 'block' : 'none' }}
        />
      </div>
      {!done && (
        <div>
          <img src={stencil} id="img" />
          <canvas className="fluid-canvas"></canvas>
        </div>
      )}
    </div>
  );
}
