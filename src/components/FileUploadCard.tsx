import { useState, useRef, DragEvent } from "react";
import { Upload, User, FileUp, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface FileUploadCardProps {
  onFileUpload: (userName: string, file: File) => void;
}

const FileUploadCard = ({ onFileUpload }: FileUploadCardProps) => {
  const [userName, setUserName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    onFileUpload(userName, selectedFile);
    setUserName("");
    setSelectedFile(null);
    setIsUploading(false);
  };

  return (
    <div className="glass-card p-6 animate-scale-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
          <Upload className="w-5 h-5 text-primary" />
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
        <div className="relative">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="w-full h-12 px-4 bg-input/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
          <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300" 
               style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.1)' }} />
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center animate-pulse-glow">
              <Upload className="w-7 h-7 text-primary" />
            </div>
            
            {selectedFile ? (
              <div className="text-center">
                <p className="text-sm font-medium text-primary">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  Drag & drop your file here
                </p>
                <p className="text-xs text-muted-foreground">
                  or click to browse
                </p>
              </div>
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
        className="w-full"
        onClick={handleUpload}
        disabled={!userName.trim() || !selectedFile || isUploading}
      >
        {isUploading ? (
          <>
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Uploading to Blockchain...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Upload to Blockchain
          </>
        )}
      </Button>
    </div>
  );
};

export default FileUploadCard;
