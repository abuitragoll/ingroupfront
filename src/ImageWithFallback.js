import React, { useState } from 'react';

function ImageWithFallback({ src, alt, fallbackSrc }) {
  const [imageSrc, setImageSrc] = useState(src);

  const onError = () => {
    setImageSrc(fallbackSrc);
  };

  return <img src={imageSrc} alt={alt} onError={onError} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />;
}

export default ImageWithFallback;