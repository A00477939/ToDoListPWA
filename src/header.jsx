import React from 'react';
import './index.css'; 
import logo from "./Image/512 × 512.png";

const ImageGradient = () => {
  return (
    <>
    <div className='title'>
    <p>TO DO LIST</p>
    </div>
    <div className="image-container">
      <img src={logo} alt="logo" className="image" />
    </div>
    </>
  );
};

export default ImageGradient;
