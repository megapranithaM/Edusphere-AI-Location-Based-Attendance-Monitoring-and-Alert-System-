import { useState, useRef, DragEvent, useCallback } from "react";
import { Upload, User, FileUp, Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";
import GlowCard from "./GlowCard";
import UploadProgress from "./UploadProgress";
import FileTypeIcon from "./FileTypeIcon";

interface FileUploadCardProps {
  onFileUpload: (userName: string, file: File) => void;
}

const FileUploadCard = ({ onFileUpload }: FileUploadCardProps) => {
  const [userName, setUserName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!userName.trim() || !selectedFile) return;
    setIsUploading(true);
  };

  const handleUploadComplete = useCallback(() => {
    if (userName.trim() && selectedFile) {
      onFileUpload(userName, selectedFile);
      setUserName("");
      setSelectedFile(null);
      setIsUploading(false);
    }
  }, [userName, selectedFile, onFileUpload]);

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <GlowCard glowColor="primary" className="animate-scale-in">
      <div className="relative glass-card p-6">
        {/* Upload Progress Overlay */}
        {isUploading && selectedFile && (
          <UploadProgress
            isUploading={isUploading}
            fileName={selectedFile.name}
            onComplete={handleUploadComplete}
          />
        )}

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
          </div>
          <div>
            <h2 className="text-lg font-semibold glow-text-primary">Upload a File</h2>
            <p className="text-xs text-muted-foreground">Store securely on blockchain</p>
          </div>
        </div>

        {/* User Name Input */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <User className="w-4 h-4" />
            User Name
          </label>
          <div className="relative group">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter your name"
              className="w-full h-12 px-4 bg-input/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
            {/* Animated underline */}
            <div 
              className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${isFocused ? 'w-full -translate-x-1/2' : 'w-0'}`}
              style={{ borderRadius: '0 0 12px 12px' }}
            />
          </div>
        </div>

        {/* Upload Zone */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <FileUp className="w-4 h-4" />
            Upload a File
          </label>
          <div
            className={`upload-zone p-8 cursor-pointer ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="flex flex-col items-center gap-3">
              {selectedFile ? (
                <>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
                      <FileTypeIcon fileName={selectedFile.name} className="w-8 h-8" />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFile();
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-primary truncate max-w-[200px]">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Ready to upload
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center animate-pulse-glow">
                    <Upload className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      Drag & drop your file here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      or click to browse
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
            </div>
          </div>
        </div>

        {/* Upload Button */}
        <Button
          variant="glow"
          size="lg"
          className="w-full relative overflow-hidden group"
          onClick={handleUpload}
          disabled={!userName.trim() || !selectedFile || isUploading}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
            Upload to Blockchain
          </span>
          {/* Button shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </Button>
      </div>
    </GlowCard>
  );
};

export default FileUploadCard;
