import { useState } from "react";
import { toast } from "sonner";
import { Files, HardDrive, Wifi } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import ParticleNetwork from "@/components/ParticleNetwork";
import Header from "@/components/Header";
import FileUploadCard from "@/components/FileUploadCard";
import UploadedFilesCard from "@/components/UploadedFilesCard";
import StatsCard from "@/components/StatsCard";

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
      fileName: 'smart-contract.sol',
      fileSize: 2456789,
      uploadedAt: new Date(Date.now() - 3600000),
      hash: generateHash(),
    },
    {
      id: '2',
      userName: 'Alice Smith',
      fileName: 'nft-artwork.png',
      fileSize: 1234567,
      uploadedAt: new Date(Date.now() - 7200000),
      hash: generateHash(),
    },
    {
      id: '3',
      userName: 'Bob Wilson',
      fileName: 'whitepaper.pdf',
      fileSize: 3456789,
      uploadedAt: new Date(Date.now() - 10800000),
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

  const totalSize = files.reduce((acc, f) => acc + f.fileSize, 0) / (1024 * 1024);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <ParticleNetwork />
      <Header />
      
      <main className="relative z-10 container mx-auto px-6 py-10">
        {/* Page Title */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Web3 Powered Storage
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
             StorX Decentralized File Storage
            </span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Upload your files securely to the blockchain. 
            <span className="text-primary"> Immutable</span>, 
            <span className="text-secondary"> transparent</span>, and 
            <span className="text-accent"> accessible forever</span>.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
          <FileUploadCard onFileUpload={handleFileUpload} />
          <UploadedFilesCard files={files} onDelete={handleDelete} />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <StatsCard
            label="Total Files"
            value={files.length}
            icon={<Files className="w-5 h-5" />}
            color="primary"
            delay={0.4}
          />
          <StatsCard
            label="Total Size"
            value={totalSize}
            suffix=" MB"
            decimals={1}
            icon={<HardDrive className="w-5 h-5" />}
            color="secondary"
            delay={0.5}
          />
          <StatsCard
            label="Network Status"
            value={99.9}
            suffix="%"
            decimals={1}
            icon={<Wifi className="w-5 h-5" />}
            color="accent"
            delay={0.6}
          />
        </div>

        {/* Network Activity Indicator */}
        <div className="flex justify-center mt-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted/30 border border-border/50 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Network Active
            </span>
            <span className="w-px h-3 bg-border" />
            <span>12 nodes connected</span>
            <span className="w-px h-3 bg-border" />
            <span className="font-mono">Block #847,293</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
