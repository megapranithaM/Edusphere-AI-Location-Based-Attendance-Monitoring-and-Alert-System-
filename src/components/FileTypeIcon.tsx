import { 
  FileText, 
  Image, 
  Video, 
  Music, 
  FileCode, 
  FileSpreadsheet,
  FileArchive,
  File,
  FileJson
} from 'lucide-react';

interface FileTypeIconProps {
  fileName: string;
  className?: string;
}

const FileTypeIcon = ({ fileName, className = "w-5 h-5" }: FileTypeIconProps) => {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';

  const iconMap: Record<string, { icon: typeof File; color: string }> = {
    // Documents
    pdf: { icon: FileText, color: 'text-red-400' },
    doc: { icon: FileText, color: 'text-blue-400' },
    docx: { icon: FileText, color: 'text-blue-400' },
    txt: { icon: FileText, color: 'text-gray-400' },
    md: { icon: FileText, color: 'text-gray-400' },
    
    // Images
    jpg: { icon: Image, color: 'text-green-400' },
    jpeg: { icon: Image, color: 'text-green-400' },
    png: { icon: Image, color: 'text-green-400' },
    gif: { icon: Image, color: 'text-purple-400' },
    svg: { icon: Image, color: 'text-orange-400' },
    webp: { icon: Image, color: 'text-green-400' },
    
    // Video
    mp4: { icon: Video, color: 'text-pink-400' },
    mov: { icon: Video, color: 'text-pink-400' },
    avi: { icon: Video, color: 'text-pink-400' },
    mkv: { icon: Video, color: 'text-pink-400' },
    
    // Audio
    mp3: { icon: Music, color: 'text-violet-400' },
    wav: { icon: Music, color: 'text-violet-400' },
    flac: { icon: Music, color: 'text-violet-400' },
    
    // Code
    js: { icon: FileCode, color: 'text-yellow-400' },
    ts: { icon: FileCode, color: 'text-blue-400' },
    jsx: { icon: FileCode, color: 'text-cyan-400' },
    tsx: { icon: FileCode, color: 'text-cyan-400' },
    html: { icon: FileCode, color: 'text-orange-400' },
    css: { icon: FileCode, color: 'text-blue-400' },
    py: { icon: FileCode, color: 'text-green-400' },
    
    // Data
    json: { icon: FileJson, color: 'text-yellow-400' },
    xml: { icon: FileCode, color: 'text-orange-400' },
    csv: { icon: FileSpreadsheet, color: 'text-green-400' },
    xlsx: { icon: FileSpreadsheet, color: 'text-green-500' },
    xls: { icon: FileSpreadsheet, color: 'text-green-500' },
    
    // Archives
    zip: { icon: FileArchive, color: 'text-amber-400' },
    rar: { icon: FileArchive, color: 'text-amber-400' },
    '7z': { icon: FileArchive, color: 'text-amber-400' },
    tar: { icon: FileArchive, color: 'text-amber-400' },
  };

  const { icon: Icon, color } = iconMap[ext] || { icon: File, color: 'text-muted-foreground' };

  return <Icon className={`${className} ${color}`} />;
};

export default FileTypeIcon;
