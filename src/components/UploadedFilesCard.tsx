import { FileText, User, Calendar, Hash, Download, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

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

  return (
    <div className="glass-card-secondary p-6 animate-scale-in" style={{ animationDelay: '0.1s' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 flex items-center justify-center">
          <FileText className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold glow-text-secondary">Uploaded Files</h2>
          <p className="text-xs text-muted-foreground">{files.length} files on chain</p>
        </div>
      </div>

      {/* Files List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">No files uploaded yet</p>
            <p className="text-xs text-muted-foreground/70">Upload your first file to get started</p>
          </div>
        ) : (
          files.map((file, index) => (
            <div
              key={file.id}
              className="group relative p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-secondary/50 hover:bg-muted/50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                   style={{ boxShadow: '0 0 30px -10px hsl(var(--secondary) / 0.3)' }} />
              
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* File name */}
                  <h3 className="font-medium text-foreground truncate mb-2">
                    {file.fileName}
                  </h3>
                  
                  {/* Meta info */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {file.userName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(file.uploadedAt)}
                    </span>
                    <span className="flex items-center gap-1 text-primary/80">
                      <Hash className="w-3 h-3" />
                      {file.hash.slice(0, 8)}...
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => onDelete(file.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* File size badge */}
                <span className="absolute top-4 right-4 group-hover:opacity-0 transition-opacity text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                  {formatSize(file.fileSize)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UploadedFilesCard;
