export interface Book {
  id: number;
  title: string;
  category: string;
  rating?: number;
  isAvailable: boolean;
  photo: string;
}
export interface DetailBook {
  id: number;
  title: string;
  description?: string;
  category: {
    id: number;
    category: string;
  };
  rating?: number;
  isAvailable: boolean;
  photo: string;
  queueCount?: number;
  writer?: {
    name: string;
  };
  language?: string;
  borrowedCount?: number;
}