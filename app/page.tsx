import { LandingHero } from '@/components/landing/hero';
import { LandingFeatures } from '@/components/landing/features';
import { LandingPricing } from '@/components/landing/pricing';
import { LandingFooter } from '@/components/landing/footer';
import { LandingHeader } from '@/components/landing/header';

export default function Home() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      <LandingPricing />
      <LandingFooter />
    </div>
  );
}