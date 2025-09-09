import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Resources } from '@/components/sections/Resources';
import { CTA } from '@/components/sections/CTA';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Resources />
      <CTA />
      <Footer />
    </div>
  );
}