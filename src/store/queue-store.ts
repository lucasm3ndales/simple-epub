import { create } from 'zustand';

export type FileStatus = 'pending' | 'processing' | 'completed' | 'error';

export interface QueueItem {
  id: string;
  name: string;
  path: string;
  size: number;
  type: 'pdf' | 'cbz' | 'zip' | 'epub';
  status: FileStatus;
  progress: number;
}

interface QueueState {
  items: QueueItem[];
  isConverting: boolean;
  addItem: (file: { name: string; path: string; size: number }) => void;
  removeItem: (id: string) => void;
  clearQueue: () => void;
  setConverting: (status: boolean) => void;
  updateItemStatus: (id: string, status: FileStatus, progress?: number) => void;
}

const getFileType = (name: string): QueueItem['type'] => {
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') return 'pdf';
  if (ext === 'cbz') return 'cbz';
  if (ext === 'zip') return 'zip';
  if (ext === 'epub') return 'epub';
  return 'zip';
};

export const useQueueStore = create<QueueState>((set) => ({
  items: [],
  isConverting: false,
  addItem: (file) => set((state) => {
    if (state.items.some(i => i.path === file.path)) return state;
    
    const newItem: QueueItem = {
      id: crypto.randomUUID(),
      name: file.name || `file_${Math.floor(Math.random() * 1000)}`,
      path: file.path,
      size: file.size,
      type: getFileType(file.name),
      status: 'pending',
      progress: 0,
    };
    return { items: [...state.items, newItem] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id),
  })),
  clearQueue: () => set({ items: [] }),
  setConverting: (status) => set({ isConverting: status }),
  updateItemStatus: (id, status, progress = 0) => set((state) => ({
    items: state.items.map((i) => 
      i.id === id ? { ...i, status, progress } : i
    ),
  })),
}));
