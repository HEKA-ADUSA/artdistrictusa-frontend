import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArtworkCard } from '@/components/shared/ArtworkCard';
import { CompactHero } from '@/components/shared/CompactHero';
import artworksData from '@/data/artworks.json';

// Filter artworks by type
const bestsellers = artworksData.filter(art => art.bestseller).slice(0, 4);
const featured = artworksData.filter(art => art.featured).slice(0, 4);
const newArrivals = artworksData.filter(art => art.newArrival).slice(0, 4);

export default function Page() {
  return (
    <div className="flex flex-col gap-6 pb-24 bg-background">
      {/* Compact Hero with Carousel + Category Selector */}
      <section className="container px-4 md:px-8 pt-8">
        <CompactHero />
      </section>

      {/* Bestsellers Section */}
      <section className="container px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Top Rated</h2>
            <p className="text-3xl font-bold tracking-tight text-foreground">Browse Our Bestsellers</p>
          </div>
          <Link href="/artworks?filter=bestseller" className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300 group">
            View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((art) => (
            <ArtworkCard key={art.id} {...art} />
          ))}
        </div>
      </section>

      {/* Featured Paintings Section */}
      <section className="container px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Curated Selection</h2>
            <p className="text-3xl font-bold tracking-tight text-foreground">Featured Paintings</p>
          </div>
          <Link href="/artworks?filter=featured" className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300 group">
            Explore More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((art) => (
            <ArtworkCard key={art.id} {...art} />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="container px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Just Added</h2>
            <p className="text-3xl font-bold tracking-tight text-foreground">New Arrivals</p>
          </div>
          <Link href="/artworks?filter=new" className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300 group">
            See All New <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((art) => (
            <ArtworkCard key={art.id} {...art} />
          ))}
        </div>
      </section>
    </div>
  );
}
