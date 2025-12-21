import { useState, useEffect, useRef } from "react";

const SpriteAnimation = ({
  frameCount = 10,
  framePath = "/mage_landing_sprite/frame",
  frameExtension = ".png",
  fps = 4,
  width = "250px",
  height = "250px",
  className = "drop-shadow-2xl",
  alt = "Wizard reading a magical scroll",
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const frameTimeRef = useRef(0);
  const requestRef = useRef();

  // Preload all frames
  useEffect(() => {
    const images = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `${framePath}_${i}${frameExtension}`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    return () => {
      images.forEach(img => {
        img.onload = null;
      });
    };
  }, [frameCount, framePath, frameExtension]);

  // Use requestAnimationFrame for smoother animation
  useEffect(() => {
    if (!imagesLoaded) return;

    const frameDuration = 1000 / fps;
    let lastTime = 0;

    const animate = (time) => {
      if (time - lastTime >= frameDuration) {
        setCurrentFrame((prev) => (prev + 1) % frameCount);
        lastTime = time;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [frameCount, fps, imagesLoaded]);

  if (!imagesLoaded) {
    return (
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const frameUrl = `${framePath}_${currentFrame}${frameExtension}`;

  return (
    <img
      src={frameUrl}
      alt={alt}
      className={`${className} transition-opacity duration-100`}
      style={{
        width,
        height,
        imageRendering: "pixelated",
        objectFit: "contain",
      }}
    />
  );
};

export default SpriteAnimation;
