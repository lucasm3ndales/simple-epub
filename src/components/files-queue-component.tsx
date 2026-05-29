import { useTranslation } from "react-i18next";
import { useQueueStore } from "@/store/queue-store";
import { File as FileIcon } from "lucide-react";
import { FileCardComponent } from "./file-card-component";

export function FilesQueueComponent() {
  const { t } = useTranslation();
  const { items, removeItem } = useQueueStore();

  if (items.length === 0) {
    return (
      <div className="flex-1 border-2 border-dashed border-border/50 rounded-3xl p-16 bg-secondary/10 min-h-[350px] flex flex-col items-center justify-center text-center group transition-all duration-500 hover:border-brand/40 hover:bg-brand/5 hover:shadow-2xl hover:shadow-brand/5">
        <div className="p-8 rounded-[2rem] bg-background border border-border shadow-lg mb-8 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-brand/20 group-hover:border-brand/20 transition-all duration-500">
          <FileIcon className="size-12 text-muted-foreground/30 group-hover:text-brand/40 transition-colors" />
        </div>
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-[0.3em] mb-4 group-hover:text-brand transition-colors duration-300">
          {t('queue.title')}
        </h2>
        <p className="text-muted-foreground/60 italic text-sm max-w-[250px] leading-relaxed group-hover:text-muted-foreground/80 transition-colors">
          {t('queue.empty')}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.3em] flex items-center gap-3">
          <div className="size-2 rounded-full bg-brand animate-pulse" />
          {t('queue.title')}
          <span className="bg-brand text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono shadow-lg shadow-brand/20">
            {items.length}
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 pb-32">
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
