import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { Artwork } from '@/types';
import { ArtworkDetail } from '@/components/shared/ArtworkDetail';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    try {
        const response = await api.get<Artwork>(`/artworks/${id}`);
        const artwork = response.data;
        return {
            title: `${artwork.title} | ARTDistrictUSA`,
            description: artwork.description || `Original ${artwork.category} by ${artwork.artist.name}`,
        };
    } catch {
        return {
            title: "Artwork Not Found | ARTDistrictUSA",
        };
    }
}

export default async function ArtworkPage({ params }: PageProps) {
    const { id } = await params;
    try {
        const response = await api.get<Artwork>(`/artworks/${id}`);
        const artwork = response.data;

        if (!artwork) {
            return notFound();
        }

        return <ArtworkDetail artwork={artwork} />;
    } catch (error) {
        console.error("Error fetching artwork:", error);
        return notFound();
    }
}
