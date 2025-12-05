import { useState } from "react";
import { toast } from "sonner";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import FileUploadCard from "@/components/FileUploadCard";
import UploadedFilesCard from "@/components/UploadedFilesCard";

interface UploadedFile {
  id: string;
  userName: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  hash: string;
}

const generateHash = () => {
  return '0x' + Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

const Index = () => {
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      userName: 'John Doe',
      fileName: 'document.pdf',
      fileSize: 2456789,
      uploadedAt: new Date(Date.now() - 3600000),
      hash: generateHash(),
    },
    {
      id: '2',
      userName: 'Alice Smith',
      fileName: 'image.png',
      fileSize: 1234567,
      uploadedAt: new Date(Date.now() - 7200000),
      hash: generateHash(),
    },
  ]);

  const handleFileUpload = (userName: string, file: File) => {
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      userName,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date(),
      hash: generateHash(),
    };
    
    setFiles(prev => [newFile, ...prev]);
    toast.success("File uploaded successfully!", {
      description: `${file.name} has been stored on the blockchain.`,
    });
  };

  const handleDelete = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    toast.success("File removed", {
      description: "The file has been removed from the list.",
    });
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Header />
      
      <main className="relative z-10 container mx-auto px-6 py-10">
        {/* Page Title */}
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient">
              Decentralized File Storage
            </span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Upload your files securely to the blockchain. Immutable, transparent, and accessible forever.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <FileUploadCard onFileUpload={handleFileUpload} />
          <UploadedFilesCard files={files} onDelete={handleDelete} />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-10">
          {[
            { label: 'Total Files', value: files.length.toString(), color: 'primary' },
            { label: 'Total Size', value: `${(files.reduce((acc, f) => acc + f.fileSize, 0) / (1024 * 1024)).toFixed(1)} MB`, color: 'secondary' },
            { label: 'Network Status', value: 'Active', color: 'accent' },
          ].map((stat, i) => (
            <div 
              key={stat.label} 
              className="glass-card p-4 text-center animate-slide-up"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <p className={`text-2xl font-bold ${stat.color === 'primary' ? 'text-primary' : stat.color === 'secondary' ? 'text-secondary' : 'text-accent'}`}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
