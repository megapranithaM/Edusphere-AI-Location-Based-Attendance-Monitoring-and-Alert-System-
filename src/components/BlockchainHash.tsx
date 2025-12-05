import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface BlockchainHashProps {
  hash: string;
}

const BlockchainHash = ({ hash }: BlockchainHashProps) => {
  const [displayHash, setDisplayHash] = useState(hash);
  const [isAnimating, setIsAnimating] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;

    let frame = 0;
    const maxFrames = 20;
    
    const animate = () => {
      if (frame >= maxFrames) {
        setDisplayHash(hash);
        setIsAnimating(false);
        return;
      }

      const progress = frame / maxFrames;
      const revealCount = Math.floor(hash.length * progress);
      
      const newHash = hash
        .split('')
        .map((char, i) => {
          if (i < revealCount) return char;
          return Math.random() > 0.5 
            ? Math.floor(Math.random() * 16).toString(16)
            : String.fromCharCode(97 + Math.floor(Math.random() * 6));
        })
        .join('');

      setDisplayHash(newHash);
      frame++;
      requestAnimationFrame(animate);
    };

    const timeout = setTimeout(animate, 100);
    return () => clearTimeout(timeout);
  }, [hash, isAnimating]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    toast.success('Hash copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group inline-flex items-center gap-1.5 font-mono text-xs text-primary/70 hover:text-primary transition-colors"
    >
      <span className="truncate max-w-[100px]">
        {displayHash.slice(0, 10)}...
      </span>
      {copied ? (
        <Check className="w-3 h-3 text-green-400" />
      ) : (
        <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
};

export default BlockchainHash;
