import { Blocks, Pickaxe } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="relative z-10 border-b border-border/50 backdrop-blur-xl bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
                <Blocks className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight glow-text-primary">
                Blockchain
              </h1>
              <p className="text-xs text-muted-foreground -mt-0.5">
                Decentralized Storage
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              My Files
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Transactions
            </a>
          </nav>

          {/* CTA */}
          <Button variant="glow" size="sm" className="gap-2">
            <Pickaxe className="w-4 h-4" />
            Request to Mine
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
