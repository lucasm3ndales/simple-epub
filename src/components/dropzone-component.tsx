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
      const filePath = (file as File & { path?: string }).path || file.name;
      addItem({
        name: file.name,
        path: filePath,
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
        "group relative h-72 w-full border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all duration-500 cursor-pointer overflow-hidden",
        isDragActive 
          ? "border-brand bg-brand/5 scale-[1.01] shadow-2xl shadow-brand/10" 
          : "border-border bg-secondary/20 hover:bg-brand/5 hover:border-brand/40",
        isConverting && "opacity-50 cursor-not-allowed"
      )}
    >
      <input {...getInputProps()} />
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className={cn(
          "p-6 rounded-3xl bg-background border border-border shadow-lg transition-all duration-500 group-hover:shadow-brand/20",
          isDragActive ? "scale-110 rotate-6 text-brand border-brand/50" : "group-hover:-translate-y-2 group-hover:border-brand/30"
        )}>
          {isDragActive ? (
            <FileUp className="size-10" />
          ) : (
            <Upload className="size-10 text-muted-foreground transition-colors group-hover:text-brand" />
          )}
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold tracking-tight text-foreground group-hover:text-brand transition-colors duration-300">
            {isDragActive ? t('queue.dropzone.title') : t('queue.dropzone.title')}
          </p>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] text-brand font-bold font-mono uppercase tracking-[0.3em] bg-brand/5 px-4 py-1 rounded-full border border-brand/10">
              {t('queue.dropzone.supported')}
            </p>
            <p className="text-xs text-muted-foreground/60 italic font-medium pt-3 group-hover:text-muted-foreground transition-colors">
              {t('queue.dropzone.browse')}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-transparent to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
