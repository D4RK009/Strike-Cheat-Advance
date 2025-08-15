import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const SnowflakeAnimation = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Reduced number of snowflakes for better performance
    const createSnowflakes = () => {
      const flakes: Snowflake[] = [];
      for (let i = 0; i < 30; i++) { // Reduced from potentially 50+
        flakes.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 1 + 0.5,
          opacity: Math.random() * 0.4 + 0.1, // Reduced opacity for subtlety
        });
      }
      setSnowflakes(flakes);
    };

    createSnowflakes();

    const animateSnowflakes = () => {
      setSnowflakes(prev => 
        prev.map(flake => ({
          ...flake,
          y: flake.y > window.innerHeight ? -10 : flake.y + flake.speed,
          x: flake.x + Math.sin(flake.y * 0.01) * 0.5,
        }))
      );
    };

    const interval = setInterval(animateSnowflakes, 50); // Optimized interval
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${flake.x}px`,
            top: `${flake.y}px`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
};

export default SnowflakeAnimation;