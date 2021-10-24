export interface Place {
    id?: number;
    name: string;
    shortDescription: string;
    coverImage: string;
    category: string[];
    location: string;
    isFavourite: boolean;
    rating: number;
    tags: string[];
}
