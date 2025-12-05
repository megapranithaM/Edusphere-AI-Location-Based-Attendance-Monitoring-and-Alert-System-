import { useState } from "react";
import { FileText, User, Calendar, Download, Trash2, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import GlowCard from "./GlowCard";
import FileTypeIcon from "./FileTypeIcon";
import BlockchainHash from "./BlockchainHash";

interface UploadedFile {
  id: string;
  userName: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  hash: string;
}

interface UploadedFilesCardProps {
  files: UploadedFile[];
  onDelete: (id: string) => void;
}

const UploadedFilesCard = ({ files, onDelete }: UploadedFilesCardProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await new Promise(resolve => setTimeout(resolve, 300));
    onDelete(id);
    setDeletingId(null);
  };

  return (
    <GlowCard glowColor="secondary" className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
      <div className="glass-card-secondary p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 flex items-center justify-center">
                <FileText className="w-5 h-5 text-secondary" />
              </div>
              {files.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {files.length}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold glow-text-secondary">Uploaded Files</h2>
              <p className="text-xs text-muted-foreground">{files.length} files on chain</p>
            </div>
          </div>
          
          {files.length > 0 && (
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-secondary">
              <ExternalLink className="w-4 h-4 mr-1" />
              View All
            </Button>
          )}
        </div>

        {/* Files List */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mb-4 relative">
                <FileText className="w-10 h-10 text-muted-foreground/30" />
                <div className="absolute inset-0 border-2 border-dashed border-muted-foreground/20 rounded-2xl animate-pulse" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">No files uploaded yet</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Upload your first file to get started</p>
            </div>
          ) : (
            files.map((file, index) => (
              <div
                key={file.id}
                className={`group relative p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-secondary/50 hover:bg-muted/40 transition-all duration-300 animate-slide-up ${deletingId === file.id ? 'opacity-0 scale-95' : ''}`}
                style={{ 
                  animationDelay: `${index * 0.05}s`,
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-secondary/5 to-transparent" />
                
                <div className="relative flex items-start gap-4">
                  {/* File icon */}
                  <div className="w-12 h-12 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center flex-shrink-0 group-hover:border-secondary/30 transition-colors">
                    <FileTypeIcon fileName={file.fileName} className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {/* File name */}
                    <h3 className="font-medium text-foreground truncate mb-1 group-hover:text-secondary transition-colors">
                      {file.fileName}
                    </h3>
                    
                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {file.userName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(file.uploadedAt)}
                      </span>
                      <span className="text-muted-foreground/50">•</span>
                      <span>{formatSize(file.fileSize)}</span>
                    </div>

                    {/* Hash */}
                    <div className="mt-2">
                      <BlockchainHash hash={file.hash} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(file.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Bottom border gradient on hover */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))
          )}
        </div>
      </div>
    </GlowCard>
  );
};

export default UploadedFilesCard;
