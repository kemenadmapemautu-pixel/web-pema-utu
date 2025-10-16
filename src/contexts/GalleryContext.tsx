import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GalleryItem {
  id: string;
  title: string;
  type: "image" | "video";
  date: string;
  category: string;
  description: string;
  views: number;
  thumbnail: string;
  url?: string;
  uploadedBy: string;
  createdAt: string;
}

interface GalleryContextType {
  galleryItems: GalleryItem[];
  addItem: (item: GalleryItem) => void;
  updateItem: (id: string, item: GalleryItem) => void;
  deleteItem: (id: string) => void;
  clearAll: () => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);
const STORAGE_KEY = 'galleryItems';

export function GalleryProvider({ children }: { children: ReactNode }) {
  // Load dari localStorage saat init
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading gallery from localStorage:', error);
      return [];
    }
  });

  // Auto-save ke localStorage setiap kali galleryItems berubah
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(galleryItems));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      // Jika QuotaExceededError, coba hapus data lama
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded, clearing old data...');
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [galleryItems]);

  const addItem = (item: GalleryItem) => {
    setGalleryItems(prev => [...prev, item]);
  };

  const updateItem = (id: string, item: GalleryItem) => {
    setGalleryItems(prev => prev.map(i => i.id === id ? item : i));
  };

  const deleteItem = (id: string) => {
    setGalleryItems(prev => {
      const item = prev.find(i => i.id === id);
      // Cleanup Object URLs
      if (item) {
        if (item.url && item.url.startsWith('blob:')) {
          URL.revokeObjectURL(item.url);
        }
        if (item.thumbnail && item.thumbnail.startsWith('blob:')) {
          URL.revokeObjectURL(item.thumbnail);
        }
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const clearAll = () => {
    // Cleanup all Object URLs
    galleryItems.forEach(item => {
      if (item.url && item.url.startsWith('blob:')) {
        URL.revokeObjectURL(item.url);
      }
      if (item.thumbnail && item.thumbnail.startsWith('blob:')) {
        URL.revokeObjectURL(item.thumbnail);
      }
    });
    setGalleryItems([]);
  };

  return (
    <GalleryContext.Provider value={{ galleryItems, addItem, updateItem, deleteItem, clearAll }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
}
