import { ArtistProfile } from '@/components/shared/ArtistProfile';

interface PageProps {
    params: Promise<{ id: string }>;
}

export const metadata = {
    title: "Artist Profile | ARTDistrictUSA",
    description: "Discover the vision and original works of our curated independent artists.",
};

export default async function ArtistPage({ params }: PageProps) {
    const { id } = await params;
    return <ArtistProfile artistId={id} />;
}
