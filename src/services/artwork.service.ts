import api from '@/lib/api';

export interface ArtworkUploadData {
    title: string;
    description: string;
    medium?: string;
    year?: number;
    priceUsd: number;
    categories?: string[];
    tags?: string[];
    width?: number;
    height?: number;
    depth?: number;
    weight?: number;
    isFramed?: boolean;
}

export interface Artwork {
    id: string;
    artistId: string;
    title: string;
    description: string;
    medium?: string;
    year?: number;
    priceUsd: number;
    categories: string[];
    tags: string[];
    dimensions?: {
        width?: number;
        height?: number;
        depth?: number;
    };
    weight?: number;
    images: Array<{
        id: string;
        url: string;
        isPrimary: boolean;
    }>;
    status: string;
    createdAt: string;
    updatedAt: string;
}

class ArtworkService {
    /**
     * Upload new artwork with images
     */
    async uploadArtwork(data: ArtworkUploadData, images: File[]): Promise<Artwork> {
        const formData = new FormData();

        // Append artwork data
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('priceUsd', data.priceUsd.toString());

        if (data.medium) formData.append('medium', data.medium);
        if (data.year) formData.append('year', data.year.toString());
        if (data.width) formData.append('width', data.width.toString());
        if (data.height) formData.append('height', data.height.toString());
        if (data.depth) formData.append('depth', data.depth.toString());
        if (data.weight) formData.append('weight', data.weight.toString());

        // Arrays need to be stringified
        if (data.categories) {
            formData.append('categories', JSON.stringify(data.categories));
        }
        if (data.tags) {
            formData.append('tags', JSON.stringify(data.tags));
        }

        // Append images
        images.forEach((image) => {
            formData.append('images', image);
        });

        const response = await api.post('/artist/artworks', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    }

    /**
     * Get all artworks for the current artist
     */
    async getMyArtworks(): Promise<Artwork[]> {
        const response = await api.get('/artist/artworks');
        return response.data;
    }

    /**
     * Update artwork metadata
     */
    async updateArtwork(id: string, data: Partial<ArtworkUploadData>): Promise<Artwork> {
        const response = await api.patch(`/artist/artworks/${id}`, data);
        return response.data;
    }

    /**
     * Delete artwork
     */
    async deleteArtwork(id: string): Promise<void> {
        await api.delete(`/artist/artworks/${id}`);
    }
}

export default new ArtworkService();
