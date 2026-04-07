'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const sources = [
  {n:'CSIS Missile Defense Project',u:'https://missilethreat.csis.org/country/iran/',c:'research'},
  {n:'Iran Watch — Missile Arsenal Table',u:'https://www.iranwatch.org/our-publications/weapon-program-background-report/table-irans-missile-arsenal',c:'research'},
  {n:'USIP Iran Primer — Ballistic Missile Program',u:'https://iranprimer.usip.org/resource/irans-ballistic-missile-program',c:'gov'},
  {n:'JINSA — Iran Evolving Missile Threat',u:'https://jinsa.org/wp-content/uploads/2026/02/Irans-Evolving-Missile-and-Drone-Threat.pdf',c:'research'},
  {n:'AEI/Critical Threats — Israeli Strikes on Iran',u:'https://www.criticalthreats.org/analysis/israeli-retaliatory-strikes-on-iran',c:'research'},
  {n:'FDD — Post-Strike Assessment',u:'https://www.fdd.org/analysis/2025/12/17/post-strike-assessment-u-s-and-israeli-strikes-caused-major-bottlenecks-in-irans-nuclear-weapons-supply-chain/',c:'research'},
  {n:'NIOSH/CDC — UDMH Pocket Guide',u:'https://www.cdc.gov/niosh/npg/npgd0227.html',c:'gov'},
  {n:'NOAA CAMEO — Red Fuming Nitric Acid',u:'https://cameochemicals.noaa.gov/chemical/4044',c:'gov'},
  {n:'NOAA CAMEO — Nitrogen Tetroxide',u:'https://cameochemicals.noaa.gov/chemical/4075',c:'gov'},
  {n:'NASA — Hypergolic Propellant Spills',u:'https://ntrs.nasa.gov/api/citations/20100038321/downloads/20100038321.pdf',c:'gov'},
  {n:'NCBI — AEGL Dimethylhydrazine',u:'https://www.ncbi.nlm.nih.gov/books/NBK222415/',c:'academic'},
  {n:'PubMed — Multi-Omics UDMH',u:'https://pubmed.ncbi.nlm.nih.gov/41314818/',c:'academic'},
  {n:'PMC — Delayed Pulmonary Edema HNO₃',u:'https://pmc.ncbi.nlm.nih.gov/articles/PMC6350573/',c:'academic'},
  {n:'ERG 2024 — Emergency Response Guidebook',u:'https://www.phmsa.dot.gov/sites/phmsa.dot.gov/files/2024-04/ERG2024-Eng-Web-a.pdf',c:'gov'},
  {n:'US Treasury — E.O. 13382 Designations',u:'https://home.treasury.gov/news/press-releases/hp1071',c:'gov'},
  {n:'GulfLINK — IRFNA Health Hazards',u:'https://gulflink.health.mil/kuwaiti_final/kuwaiti_final_tabd.htm',c:'gov'},
  {n:'ATSDR — HMX Production',u:'https://www.atsdr.cdc.gov/toxprofiles/tp98-c4.pdf',c:'gov'},
  {n:'JPost — IDF Strikes Shiraz',u:'https://www.jpost.com/middle-east/iran-news/article-892297',c:'intel'},
  {n:'JPost — Iran Orders from China',u:'https://www.jpost.com/breaking-news/article-856777',c:'intel'},
  {n:'CEOBS — Environmental Harm in Iran',u:'https://ceobs.org/operation-epic-fury-emerging-environmental-harm-and-risks-in-iran-and-the-region/',c:'academic'},
  {n:'Alma Center — Iran Missiles Overview',u:'https://israel-alma.org/iran-types-of-ballistic-missiles-overview/',c:'research'},
];

const catColors: Record<string,string> = { gov:'text-green-400', academic:'text-purple-400', research:'text-blue-400', intel:'text-red-400' };
const catLabels: Record<string,Record<string,string>> = { gov:{he:'ממשלתי',en:'Government'}, academic:{he:'אקדמי',en:'Academic'}, research:{he:'מחקרי',en:'Research'}, intel:{he:'מודיעיני',en:'Intelligence'} };

export default function Sources() {
  const { t, lang } = useLang();
  const h = lang === 'he';
  return (
    <section id="sources" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{t('sources.title')}</h2>
      </motion.div>
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/70 backdrop-blur-sm overflow-hidden divide-y divide-slate-700/30">
        {sources.map((s, i) => (
          <a key={i} href={s.u} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 hover:bg-slate-700/20 transition-colors text-slate-400 hover:text-blue-300">
            <span className="text-blue-500 flex-shrink-0">🔗</span>
            <span className="text-sm flex-1">{s.n}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-600/50 ${catColors[s.c]}`}>
              {catLabels[s.c]?.[lang] || s.c}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
