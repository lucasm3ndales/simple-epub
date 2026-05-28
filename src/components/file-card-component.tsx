import type { QueueItem } from "@/store/queue-store";
import { 
  FileText, 
  Book, 
  Archive, 
  FileCode, 
  File as FileIcon, 
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileCardProps {
  item: QueueItem;
  onRemove: () => void;
}

export function FileCardComponent({ item, onRemove }: FileCardProps) {
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  const getTypeSpecs = (type: QueueItem['type']) => {
    switch (type) {
      case 'pdf':
        return { 
          icon: <FileText className="size-5" />, 
          color: "text-red-500", 
          bg: "bg-red-500/10", 
          border: "border-red-500/20",
          label: ".PDF"
        };
      case 'epub':
        return { 
          icon: <Book className="size-5" />, 
          color: "text-emerald-500", 
          bg: "bg-emerald-500/10", 
          border: "border-emerald-500/20",
          label: ".EPUB"
        };
      case 'cbz':
        return { 
          icon: <FileCode className="size-5" />, 
          color: "text-blue-500", 
          bg: "bg-blue-500/10", 
          border: "border-blue-500/20",
          label: ".CBZ"
        };
      case 'zip':
        return { 
          icon: <Archive className="size-5" />, 
          color: "text-amber-500", 
          bg: "bg-amber-500/10", 
          border: "border-amber-500/20",
          label: ".ZIP"
        };
      default:
        return { 
          icon: <FileIcon className="size-5" />, 
          color: "text-zinc-500", 
          bg: "bg-zinc-500/10", 
          border: "border-zinc-500/20",
          label: "FILE"
        };
    }
  };

  const specs = getTypeSpecs(item.type);

  return (
    <div className="group relative flex items-center gap-4 p-3 rounded-xl bg-card border border-border hover:border-muted-foreground/30 transition-all duration-200 shadow-sm">
      <div className={cn("shrink-0 p-3 rounded-lg border", specs.bg, specs.color, specs.border)}>
        {specs.icon}
      </div>
      
      <div className="flex-1 min-w-0 pr-10">
        <h3 className="font-medium text-sm truncate leading-none mb-1.5" title={item.name}>
          {item.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-md border font-mono", specs.bg, specs.color, specs.border)}>
            {specs.label}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-tighter">
            {formatSize(item.size)}
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="absolute top-2 right-2 size-8 rounded-full transition-colors hover:bg-destructive/10 hover:text-destructive cursor-pointer"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
