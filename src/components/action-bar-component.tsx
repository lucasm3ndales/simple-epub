import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { X, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActionBarComponent() {
  const { t } = useTranslation();
  
  // Mock data for now, will be connected to store later
  const filesCount = 12;
  const totalSize = "1.4 GB";
  const isConverting = false;

  if (filesCount === 0 && !isConverting) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-md border-t border-border flex items-center px-4">
      <div className="max-w-4xl mx-auto w-full flex justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground font-sans">
          {t('actions.queue_summary', { count: filesCount, size: totalSize }).split('•').map((part, i) => (
            <span key={Math.random()} className={cn(i === 0 || i === 1 ? "font-mono" : "")}>
              {part}{i === 0 ? " • " : ""}
            </span>
          ))}
        </div>
        
        <Button 
          variant={isConverting ? "outline" : "default"}
          disabled={filesCount === 0 && !isConverting}
          className={cn(
            "gap-2 font-semibold shadow-sm transition-all duration-300 min-w-40",
            isConverting 
              ? "border-destructive/50 text-destructive hover:bg-destructive/10 animate-pulse" 
              : "bg-brand hover:bg-brand/90 text-white"
          )}
        >
          {isConverting ? (
            <>
              <X className="h-4 w-4" />
              {t('actions.cancel')}
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" />
              {t('actions.convert', { count: filesCount })}
            </>
          )}
        </Button>
      </div>
    </footer>
  );
}
