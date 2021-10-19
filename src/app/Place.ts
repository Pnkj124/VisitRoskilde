export interface Place {
    id?: number;
    name: string;
    shortDescription: string;
    coverImage: string;
    categoryId: number;
    location: string;
}

export interface Category{
    id?: number;
    name: string;
    coverImage: string;
}
