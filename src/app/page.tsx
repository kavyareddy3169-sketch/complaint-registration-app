import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import HomepageSections from '@/components/home/HomepageSections';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorks from '@/components/home/HowItWorks';
import TrustBanner from '@/components/home/TrustBanner';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import AwarenessCTA from '@/components/home/AwarenessCTA';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';

export const metadata = {
  title: `${APP_NAME} — Student & Youth Complaint Portal`,
  description: APP_TAGLINE,
};

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <StatsSection />
      <HomepageSections />
      <FeaturesSection />
      <HowItWorks />
      <TrustBanner />
      <TestimonialsSection />
      <AwarenessCTA />
    </div>
  );
}
