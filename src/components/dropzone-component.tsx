import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { Upload, FileUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueueStore } from "@/store/queue-store";

export function DropzoneComponent() {
  const { t } = useTranslation();
  const addItem = useQueueStore((state) => state.addItem);
  const isConverting = useQueueStore((state) => state.isConverting);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      addItem({
        name: file.name,
        path: (file as any).path || file.name,
        size: file.size,
      });
    });
  }, [addItem]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isConverting,
    accept: {
      'application/pdf': ['.pdf'],
      'application/x-pdf': ['.pdf'],
      'application/vnd.pdf': ['.pdf'],
      'application/x-cbz': ['.cbz'],
      'application/x-zip-compressed': ['.zip', '.cbz'],
      'application/zip': ['.zip', '.cbz'],
      'application/epub+zip': ['.epub'],
      'application/octet-stream': ['.cbz', '.zip', '.pdf', '.epub']
    }
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group relative h-64 w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden",
        isDragActive 
          ? "border-brand bg-brand/5 scale-[1.01]" 
          : "border-border bg-muted/30 hover:bg-muted/50 hover:border-muted-foreground/50",
        isConverting && "opacity-50 cursor-not-allowed"
      )}
    >
      <input {...getInputProps()} />
      
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className={cn(
          "p-4 rounded-full bg-background border border-border shadow-sm transition-transform duration-500",
          isDragActive ? "scale-110 rotate-12 text-brand" : "group-hover:-translate-y-1"
        )}>
          {isDragActive ? (
            <FileUp className="size-8" />
          ) : (
            <Upload className="size-8 text-muted-foreground" />
          )}
        </div>
        
        <div className="text-center space-y-1">
          <p className="text-xl font-semibold tracking-tight">
            {isDragActive ? t('queue.dropzone.title') : t('queue.dropzone.title')}
          </p>
          <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
            {t('queue.dropzone.supported')}
          </p>
          <p className="text-xs text-muted-foreground/60 italic pt-2">
            {t('queue.dropzone.browse')}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-transparent to-muted/10 pointer-events-none" />
    </div>
  );
}
