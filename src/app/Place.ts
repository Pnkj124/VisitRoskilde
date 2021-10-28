export interface Place {
  id?: number;
  name: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  images: [
    {
      caption: string;
      url: string;
    }
  ]
  category: string[];
  location: string;
  isFavourite: boolean;
  rating: number;
  tags: string[];
  geometry: {
    type: string,
    coordinates: number []
  }
}
