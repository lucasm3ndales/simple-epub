import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { X, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueueStore } from "@/store/queue-store";

export function ActionBarComponent() {
  const { t } = useTranslation();
  const { items, isConverting } = useQueueStore();
  
  const filesCount = items.length;
  
  const totalSizeBytes = items.reduce((acc, item) => acc + item.size, 0);
  
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  const totalSize = formatSize(totalSizeBytes);

  if (filesCount === 0 && !isConverting) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-background/80 backdrop-blur-md border-t border-border flex items-center px-4">
      <div className="max-w-4xl mx-auto w-full flex justify-between items-center gap-4">
        <div className="flex flex-col">
          <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-0.5">
            {t('queue.title')}
          </div>
          <div className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <span className="text-brand">{filesCount}</span>
            <span className="text-muted-foreground font-normal">files</span>
            <span className="text-border mx-1">|</span>
            <span className="text-brand">{totalSize}</span>
          </div>
        </div>
        
        <Button 
          variant={isConverting ? "destructive" : "brand"}
          disabled={filesCount === 0 && !isConverting}
          size="lg"
          className={cn(
            "gap-2 font-bold px-8 shadow-indigo-500/20 shadow-lg transition-all duration-300 min-w-44 rounded-full",
            isConverting && "animate-pulse"
          )}
        >
          {isConverting ? (
            <>
              <X className="size-5" />
              {t('actions.cancel')}
            </>
          ) : (
            <>
              <Play className="size-5 fill-current" />
              {t('actions.convert', { count: filesCount })}
            </>
          )}
        </Button>
      </div>
    </footer>
  );
}
