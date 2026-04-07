'use client';
import { LangProvider } from '@/lib/LanguageContext';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import MissileDiagram from '@/components/MissileDiagram';
import Platforms from '@/components/Platforms';
import Paradigm from '@/components/Paradigm';
import ChemDanger from '@/components/ChemDanger';
import Chain from '@/components/Chain';
import NetworkGraph from '@/components/NetworkGraph';
import Strikes from '@/components/Strikes';
import HazMat from '@/components/HazMat';
import EmergencyCard from '@/components/EmergencyCard';
import Gallery from '@/components/Gallery';
import Glossary from '@/components/Glossary';
import Sources from '@/components/Sources';
import Insights from '@/components/Insights';
import Footer from '@/components/Footer';
import { BackToTop } from '@/components/ReadingProgress';

const Divider = () => <div className="border-t border-gray-100 my-2" />;

export default function Home() {
  return (
    <LangProvider>
      <Navbar />
      <BackToTop />
      <main>
        <Hero />
        <Divider />
        <Timeline />
        <Divider />
        <MissileDiagram />
        <Divider />
        <Platforms />
        <Divider />
        <Paradigm />
        <Divider />
        <ChemDanger />
        <Divider />
        <Chain />
        <Divider />
        <NetworkGraph />
        <Divider />
        <Strikes />
        <Divider />
        <HazMat />
        <Divider />
        <EmergencyCard />
        <Divider />
        <Gallery />
        <Divider />
        <Glossary />
        <Divider />
        <Sources />
        <Divider />
        <Insights />
        <Footer />
      </main>
    </LangProvider>
  );
}
