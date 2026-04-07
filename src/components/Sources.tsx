'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const sources = [
  {n:'CSIS Missile Defense Project — Iran',u:'https://missilethreat.csis.org/country/iran/',c:'research'},
  {n:'Iran Watch — Table of Missile Arsenal',u:'https://www.iranwatch.org/our-publications/weapon-program-background-report/table-irans-missile-arsenal',c:'research'},
  {n:'USIP Iran Primer — Ballistic Missile Program',u:'https://iranprimer.usip.org/resource/irans-ballistic-missile-program',c:'gov'},
  {n:'JINSA — Iran Evolving Missile & Drone Threat (PDF)',u:'https://jinsa.org/jinsa_report/irans-evolving-missile-and-drone-threat/',c:'research'},
  {n:'AEI Critical Threats — Israeli Strikes on Iran',u:'https://www.criticalthreats.org/analysis/israeli-retaliatory-strikes-on-iran',c:'research'},
  {n:'FDD — Post-Strike Assessment (Supply Chain)',u:'https://www.fdd.org/analysis/post-strike-assessment/',c:'research'},
  {n:'NIOSH/CDC — UDMH Pocket Guide',u:'https://www.cdc.gov/niosh/npg/npgd0227.html',c:'gov'},
  {n:'NOAA CAMEO — Red Fuming Nitric Acid (4044)',u:'https://cameochemicals.noaa.gov/chemical/4044',c:'gov'},
  {n:'NOAA CAMEO — Nitrogen Tetroxide (4075)',u:'https://cameochemicals.noaa.gov/chemical/4075',c:'gov'},
  {n:'NASA — Hypergolic Propellant Safety',u:'https://ntrs.nasa.gov/',c:'gov'},
  {n:'NCBI — AEGL Values for Dimethylhydrazine',u:'https://www.ncbi.nlm.nih.gov/books/NBK222415/',c:'academic'},
  {n:'PubMed — Multi-Omics Analysis of UDMH Exposure',u:'https://pubmed.ncbi.nlm.nih.gov/41314818/',c:'academic'},
  {n:'PMC — Delayed Pulmonary Edema after Nitric Acid Inhalation',u:'https://pmc.ncbi.nlm.nih.gov/articles/PMC6350573/',c:'academic'},
  {n:'ERG 2024 — Emergency Response Guidebook (PDF)',u:'https://www.phmsa.dot.gov/hazmat/erg/emergency-response-guidebook-erg',c:'gov'},
  {n:'US Treasury — E.O. 13382 Iran Missile Designations',u:'https://ofac.treasury.gov/recent-actions',c:'gov'},
  {n:'EU Regulation 267/2012 — Iran Sanctions',u:'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02012R0267-20240913',c:'gov'},
  {n:'GulfLINK — IRFNA Health Hazards (Gulf War)',u:'https://gulflink.health.mil/',c:'gov'},
  {n:'ATSDR — HMX Toxicological Profile',u:'https://www.atsdr.cdc.gov/toxprofiles/tp98.pdf',c:'gov'},
  {n:'Wikipedia — Iran Ballistic Missile Program',u:'https://en.wikipedia.org/wiki/Iranian_missile_program',c:'reference'},
  {n:'Wikipedia — Red Fuming Nitric Acid',u:'https://en.wikipedia.org/wiki/Red_fuming_nitric_acid',c:'reference'},
  {n:'Wikipedia — UDMH',u:'https://en.wikipedia.org/wiki/Unsymmetrical_dimethylhydrazine',c:'reference'},
  {n:'CEOBS — Environmental Harm in Iran',u:'https://ceobs.org/',c:'academic'},
  {n:'Alma Center — Iran Ballistic Missiles Overview',u:'https://israel-alma.org/iran-types-of-ballistic-missiles-overview/',c:'research'},
  {n:'IISS — Iran Military Balance',u:'https://www.iiss.org/',c:'research'},
];

const catC: Record<string,string> = { gov:'text-green-600 border-green-700/40 bg-green-50', academic:'text-purple-400 border-purple-700/40 bg-purple-50', research:'text-blue-600 border-blue-700/40 bg-blue-50', reference:'text-slate-400 border-slate-300/40 bg-white' };
const catL: Record<string,Record<string,string>> = { gov:{he:'ממשלתי',en:'Gov'}, academic:{he:'אקדמי',en:'Academic'}, research:{he:'מחקרי',en:'Research'}, reference:{he:'עיון',en:'Reference'} };

export default function Sources() {
  const { t, lang } = useLang();
  return (
    <section id="sources" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{t('sources.title')}</h2>
      </motion.div>
      <div className="rounded-2xl bg-white overflow-hidden divide-y divide-slate-800/20">
        {sources.map((s, i) => (
          <motion.a key={i} href={s.u} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex items-center gap-3 p-3.5 hover:bg-blue-50 transition-all text-slate-400 hover:text-blue-600 group">
            <span className="text-blue-500/60 group-hover:text-blue-600 transition-colors flex-shrink-0">🔗</span>
            <span className="text-sm flex-1">{s.n}</span>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${catC[s.c]}`}>
              {catL[s.c]?.[lang] || s.c}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
