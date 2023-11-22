import React, { useState, useEffect } from 'react';
import './PictureCollage.css';
import Picture from '../Picture/Picture.js';


//Creates a picture collage of moving infintely looping staggered pictures.
//Currently only works for pictures with a height of 400px
//TODO make animation frames dynamic with picture size.
function PictureCollage(props) {
  const { backgroundColor, height, width, pictureHeight, pictureWidth, pictureMargin } = props;

  const collageStyle = {
    backgroundColor: backgroundColor || 'white',
    height: height || '75vh',
    width: width || '100vw',
    display: 'flex',
    gap: '25px',
    justifyContent: 'center',
    overflow: 'hidden'
  };

  const pictureStyle = {
    backgroundColor: 'white',
    height: pictureHeight || '400px',
    width: pictureWidth || '300px',
    margin: pictureMargin || '25px'
  };

  const [numColumns, setNumColumns] = useState(3); // Default value, adjust as needed

  useEffect(() => {
    const handleResize = () => {
      // Calculate and set the new number of columns and rows based on the window size
      const newNumColumns = calculateNumColumns();


      setNumColumns(newNumColumns);
    };

    // Attach the event listener to the window resize event
    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }); // The empty dependency array ensures that the effect runs only once during component mount

  const calculateNumColumns = () => {
    return Math.floor(( (window.innerWidth * parseFloat(collageStyle.width) / 100) - 2 * parseFloat(pictureStyle.margin)) / parseFloat(pictureStyle.width));
  };


  var seed = 23497;
  var modulus = 2 ** 32;
  var a = 1664525;
  var c = 1013904223;
  function getRandomNumberCustom(columnIndex, pictureIndex) {
    if (pictureIndex === 0) {
      resetRandomNumberCustom(columnIndex);
    }
    var returnVal = seed / modulus;
    seed = (a * seed + c) % modulus;
    return returnVal;
  }

  function resetRandomNumberCustom(columnIndex) {
    seed = 23497897 + columnIndex;
    modulus = 2 ** 32;
    a = 1664525;
    c = 1013904223;
  }

  function getRandomColor(columnIndex, pictureIndex) {

    const letters = '0123456789ABCDEF';
    let color = '#';
    let grayscalePair = '';
    for (let i = 0; i < 2; i++) {
      grayscalePair += letters[Math.floor(getRandomNumberCustom(columnIndex, pictureIndex) * 16)];
    }
    color = color + grayscalePair + grayscalePair + grayscalePair;
    return color;

  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * -450) - 3500;
  }

  const columnArray = Array.from({ length: numColumns + 2}, (_, index) => index);
  const pictureColumnArray = Array.from({ length: 12}, (_, index) => index);

  var currentAnimationDirectionBoolean = true;
  const getAnimationDirection = () => {
    currentAnimationDirectionBoolean = !currentAnimationDirectionBoolean;

    return currentAnimationDirectionBoolean ? '' : 'reverse';
  }

  return (
    <div className="PictureCollage" style={collageStyle}>
      {columnArray.map((columnIndex) => (
        <div key={columnIndex} className='collageColumn' style={{marginTop: `${getRandomNumber()}px`, animation: `animatePictureColumn 480s linear infinite ${getAnimationDirection()}`}}> 
          {pictureColumnArray.map((pictureIndex) => (
            <Picture key={pictureIndex}
              backgroundColor={getRandomColor(columnIndex, pictureIndex)}
              height={pictureStyle.height}
              width={pictureStyle.width}
              margin={pictureStyle.margin}
            />
          ))}
          {pictureColumnArray.map((pictureIndex) => (
            <Picture key={pictureIndex}
              backgroundColor={getRandomColor(columnIndex, pictureIndex)}
              height={pictureStyle.height}
              width={pictureStyle.width}
              margin={pictureStyle.margin}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default PictureCollage;