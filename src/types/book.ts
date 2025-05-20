export interface BookVolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    thumbnail?: string;
  };
  averageRating?: number;
  ratingsCount?: number;
  categories?: string[];
}

export interface BookItem {
  id: string;
  volumeInfo: BookVolumeInfo;
}

export interface BooksApiResponse {
  items: BookItem[];
}
