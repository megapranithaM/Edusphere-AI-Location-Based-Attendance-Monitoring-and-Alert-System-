import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface UploadProgressProps {
  isUploading: boolean;
  fileName: string;
  onComplete: () => void;
}

const UploadProgress = ({ isUploading, fileName, onComplete }: UploadProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'uploading' | 'processing' | 'complete'>('uploading');

  useEffect(() => {
    if (!isUploading) {
      setProgress(0);
      setStatus('uploading');
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('complete');
          setTimeout(onComplete, 500);
          return 100;
        }
        
        if (prev >= 90) {
          setStatus('processing');
          return prev + 2;
        }
        
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isUploading, onComplete]);

  if (!isUploading && progress === 0) return null;

  return (
    <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 animate-fade-in z-10">
      {/* Animated rings */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full border-4 border-muted" />
        <svg className="absolute inset-0 w-24 h-24 -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="44"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={276.46}
            strokeDashoffset={276.46 * (1 - progress / 100)}
            className="transition-all duration-300"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(186, 100%, 50%)" />
              <stop offset="100%" stopColor="hsl(330, 100%, 50%)" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {status === 'complete' ? (
            <CheckCircle2 className="w-10 h-10 text-primary animate-scale-in" />
          ) : (
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          )}
        </div>
      </div>

      {/* Status text */}
      <div className="text-center">
        <p className="text-sm font-medium text-foreground mb-1 truncate max-w-[200px]">
          {fileName}
        </p>
        <p className="text-xs text-muted-foreground">
          {status === 'uploading' && 'Encrypting & uploading...'}
          {status === 'processing' && 'Writing to blockchain...'}
          {status === 'complete' && 'Successfully stored!'}
        </p>
      </div>

      {/* Progress percentage */}
      <div className="mt-4 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {Math.round(progress)}%
      </div>

      {/* Hash animation */}
      {status === 'processing' && (
        <div className="mt-4 font-mono text-xs text-primary/60 animate-pulse">
          0x{Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}...
        </div>
      )}
    </div>
  );
};

export default UploadProgress;
