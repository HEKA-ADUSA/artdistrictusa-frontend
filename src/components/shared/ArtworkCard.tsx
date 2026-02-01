import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ArtworkCardProps {
    id: string | number;
    title: string;
    artistName: string;
    price: number;
    imageUrl: string;
    category: string;
    dimensions?: {
        width: number;
        height: number;
        depth: number;
    };
}

export function ArtworkCard({ id, title, artistName, price, imageUrl, category, dimensions }: ArtworkCardProps) {
    return (
        <Link href={`/artworks/${id}`}>
            <Card className="overflow-hidden group border-none bg-transparent hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-gray-300">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-primary font-semibold">
                            {category}
                        </Badge>
                    </div>
                </div>
                <CardContent className="pt-4 px-2 pb-0">
                    <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-sm text-muted-foreground">{artistName}</p>
                    {dimensions && (
                        <p className="text-xs text-muted-foreground mt-1">
                            {dimensions.width}" × {dimensions.height}" × {dimensions.depth}"
                        </p>
                    )}
                </CardContent>
                <CardFooter className="px-2 pb-4 pt-1">
                    <span className="font-bold text-lg">${price.toLocaleString()}</span>
                </CardFooter>
            </Card>
        </Link>
    );
}
