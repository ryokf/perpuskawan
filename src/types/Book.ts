export interface Book {
  id: number;
  title: string;
  description?: string;
  category: string;
  rating?: number;
  isAvailable: boolean;
  photo: string;
}