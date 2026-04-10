'use client';
import { LangProvider } from './LanguageContext';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Paradigm from './components/Paradigm';
import ChemDanger from './components/ChemDanger';
import Chain from './components/Chain';
import NetworkGraph from './components/NetworkGraph';
import Platforms from './components/Platforms';
import Simulation from './components/Simulation';
import Strikes from './components/Strikes';
import HazMat from './components/HazMat';
import EmergencyCard from './components/EmergencyCard';
import Glossary from './components/Glossary';
import Gallery from './components/Gallery';
import Sources from './components/Sources';
import Insights from './components/Insights';
import Footer from './components/Footer';
import { ProgressBar, BackToTop } from './components/ReadingProgress';

const Divider = () => (
  <div style={{width:96,height:1,background:'linear-gradient(90deg,transparent,rgba(59,130,246,0.4),transparent)',margin:'16px auto'}}/>
);

export default function IHUPage() {
  return (
    <LangProvider>
      <ParticleBackground />
      <Navbar />
      <ProgressBar />
      <BackToTop />
      <main className="relative z-10 pt-16">
        <Hero />
        <Divider />
        <Timeline />
        <Divider />
        <Paradigm />
        <Divider />
        <ChemDanger />
        <Divider />
        <Chain />
        <Divider />
        <NetworkGraph />
        <Divider />
        <Platforms />
        <Divider />
        <Simulation />
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
