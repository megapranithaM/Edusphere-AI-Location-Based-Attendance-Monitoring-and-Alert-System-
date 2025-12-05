import { useRef, useState, ReactNode, CSSProperties } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'primary' | 'secondary' | 'accent';
  style?: CSSProperties;
}

const GlowCard = ({ children, className = '', glowColor = 'primary', style }: GlowCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColors = {
    primary: 'hsl(186, 100%, 50%)',
    secondary: 'hsl(330, 100%, 50%)',
    accent: 'hsl(280, 100%, 60%)',
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Mouse follow glow effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor]}15, transparent 40%)`,
        }}
      />
      
      {/* Border glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor]}30, transparent 40%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      
      {children}
    </div>
  );
};

export default GlowCard;
