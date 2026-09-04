import HeroBanner from '@/components/home/HeroBanner';
import AvailableCarsSection from '@/components/home/AvailableCarsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import HowItWorks from '@/components/home/HowItWorks';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      <AvailableCarsSection />
      <WhyChooseUs />
      <HowItWorks />
    </div>
  );
}
