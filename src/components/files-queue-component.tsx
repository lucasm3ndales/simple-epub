import { useTranslation } from "react-i18next";
import { useQueueStore } from "@/store/queue-store";
import { File as FileIcon } from "lucide-react";
import { FileCardComponent } from "./file-card-component";

export function FilesQueueComponent() {
  const { t } = useTranslation();
  const { items, removeItem } = useQueueStore();

  if (items.length === 0) {
    return (
      <div className="flex-1 border border-dashed rounded-2xl p-8 bg-card/50 min-h-75 flex flex-col items-center justify-center text-center">
        <div className="p-4 rounded-full bg-muted/30 mb-4">
          <FileIcon className="size-8 text-muted-foreground/40" />
        </div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
          {t('queue.title')}
        </h2>
        <p className="text-muted-foreground italic text-sm">
          {t('queue.empty')}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <FileIcon className="size-4" />
          {t('queue.title')}
          <span className="bg-muted px-2 py-0.5 rounded text-[10px] font-mono">
            {items.length}
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-8">
        {items.map((item) => (
          <FileCardComponent 
            key={item.id} 
            item={item} 
            onRemove={() => removeItem(item.id)} 
          />
        ))}
      </div>
    </div>
  );
}
