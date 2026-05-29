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
          color: "text-file-pdf-foreground", 
          bg: "bg-file-pdf", 
          label: ".PDF"
        };
      case 'epub':
        return { 
          icon: <Book className="size-5" />, 
          color: "text-file-epub-foreground", 
          bg: "bg-file-epub", 
          label: ".EPUB"
        };
      case 'cbz':
        return { 
          icon: <FileCode className="size-5" />, 
          color: "text-file-cbz-foreground", 
          bg: "bg-file-cbz", 
          label: ".CBZ"
        };
      case 'zip':
        return { 
          icon: <Archive className="size-5" />, 
          color: "text-file-zip-foreground", 
          bg: "bg-file-zip", 
          label: ".ZIP"
        };
      default:
        return { 
          icon: <FileIcon className="size-5" />, 
          color: "text-muted-foreground", 
          bg: "bg-muted", 
          label: "FILE"
        };
    }
  };

  const specs = getTypeSpecs(item.type);

  return (
    <div className="group relative flex items-center gap-4 p-3.5 rounded-2xl bg-card border border-border hover:border-brand/40 hover:bg-brand/5 hover:shadow-xl hover:shadow-brand/5 transition-all duration-500">
      <div className={cn("shrink-0 p-3 rounded-xl border border-transparent transition-all duration-500 group-hover:scale-110", specs.bg, specs.color)}>
        {specs.icon}
      </div>
      
      <div className="flex-1 min-w-0 pr-10">
        <h3 className="font-bold text-sm truncate leading-none mb-2.5 text-foreground group-hover:text-brand transition-colors duration-300" title={item.name}>
          {item.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border border-transparent font-mono", specs.bg, specs.color)}>
            {specs.label}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono font-medium uppercase tracking-wider">
            {formatSize(item.size)}
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="absolute top-2 right-2 size-8 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/10 hover:text-destructive cursor-pointer"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
