export interface Image {
    id: string;
    originalUrl: string;
    thumbUrl: string;
    isPrimary: boolean;
}

export interface Artist {
    id: string;
    name: string;
    bio?: string;
    avatarUrl?: string;
    slug?: string;
}

export interface Artwork {
    id: string;
    title: string;
    description?: string;
    priceUsd: number;
    category: string;
    images: Image[];
    artist: Artist;
    createdAt: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
