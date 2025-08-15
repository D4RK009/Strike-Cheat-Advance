
import React, { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

const SnowflakeAnimation: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const createSnowflake = (id: number): Snowflake => ({
      id,
      x: Math.random() * window.innerWidth,
      y: -20,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.3,
      rotation: 0,
      rotationSpeed: Math.random() * 2 - 1,
    });

    // Initialize snowflakes
    const initialSnowflakes = Array.from({ length: 20 }, (_, i) => ({
      ...createSnowflake(i),
      y: Math.random() * window.innerHeight,
    }));
    setSnowflakes(initialSnowflakes);

    let animationId: number;
    let snowflakeId = 20;

    let lastUpdate = 0;
    const animate = (timestamp: number) => {
      // Throttle updates to 30 FPS instead of 60 FPS
      if (timestamp - lastUpdate > 33) {
        setSnowflakes(prev => {
          const updated = prev.map(flake => ({
            ...flake,
            y: flake.y + flake.speed,
            x: flake.x + Math.sin(flake.y * 0.01) * 0.3,
            rotation: flake.rotation + flake.rotationSpeed,
          })).filter(flake => flake.y < window.innerHeight + 20);

          // Add new snowflakes occasionally
          if (Math.random() < 0.1 && updated.length < 20) {
            updated.push(createSnowflake(snowflakeId++));
          }

          return updated;
        });
        lastUpdate = timestamp;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setSnowflakes(prev => prev.map(flake => ({
        ...flake,
        x: Math.min(flake.x, window.innerWidth),
      })));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute text-white animate-sparkle"
          style={{
            left: `${flake.x}px`,
            top: `${flake.y}px`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            transform: `rotate(${flake.rotation}deg)`,
            filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.6))',
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  );
};

export default SnowflakeAnimation;
