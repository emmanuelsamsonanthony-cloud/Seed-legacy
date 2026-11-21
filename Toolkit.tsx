import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './toolkit.css';

type CropType = 'Cereal' | 'Legume' | 'Oilseed';
type Evidence = 'not-assessed' | 'farmer-reported' | 'documented';

interface Profile {
  id: string;
  name: string;
  altName?: string;
  type: CropType;
  investigate: string;
  soils: string[];
  rains: string[];
  focuses: string[];
  evidence: Evidence;
  updated: string;
  variety: string;
  source: string;
  origin: string;
  conditions: string[];
  traits: string[];
  farmer: string[];
  storage: string[];
}

const ALL = 'All';
const SOILS = ['Loamy', 'Sandy', 'Clay-rich'];
const RAINS = ['Low', 'Regular', 'Heavy', 'Unpredictable'];
const FOCUSES = ['Drought tolerance', 'Shorter growing seasons', 'Soil health', 'Variable rainfall'];
const TYPES: CropType[] = ['Cereal', 'Legume', 'Oilseed'];
const EVIDENCE: Record<Evidence, { label: string; text: string }> = {
  'not-assessed': { label: 'Not yet assessed', text: 'No records have been collected for this crop yet.' },
  'farmer-reported': { label: 'Farmer-reported', text: 'Knowledge shared by farmers and recorded with their permission. Not independently measured.' },
  documented: { label: 'Documented field observations', text: 'Observations recorded in the field with dates and methods, ready to be reviewed.' }
};

const UPDATED = '29 October 2026';
const NOT_DOCUMENTED = 'Not yet documented';

const base = { evidence: 'not-assessed' as Evidence, updated: UPDATED, variety: NOT_DOCUMENTED, source: NOT_DOCUMENTED, origin: NOT_DOCUMENTED };

const PROFILES: Profile[] = [
  {
    ...base, id: 'sorghum', name: 'Sorghum', type: 'Cereal',
    investigate: 'Rainfall variability, growing-season length, seed storage and farmer observations.',
    soils: ['Loamy', 'Sandy', 'Clay-rich'], rains: ['Low', 'Regular', 'Unpredictable'], focuses: ['Drought tolerance', 'Variable rainfall', 'Shorter growing seasons'],
    conditions: ['How seasonal rainfall variability affects emergence, growth and grain filling', 'How long the growing season lasts for the types farmers grow', 'Which soils and field positions farmers choose, and why'],
    traits: ['Response to dry spells and late or early rains (to be assessed)', 'Time from planting to harvest (information needed)', 'Consistency across different seasons (information needed)'],
    farmer: ['Which types farmers keep and what they call them', 'Signs farmers use to judge how a season is going', 'How farmers select heads to save for the next planting'],
    storage: ['How heads or grain are dried and kept before storage', 'Moisture, insects and losses during storage', 'How long saved seed stays good for planting']
  },
  {
    ...base, id: 'pearl-millet', name: 'Pearl millet', type: 'Cereal',
    investigate: 'Water availability, soil drainage, maturity period and local growing knowledge.',
    soils: ['Sandy', 'Loamy'], rains: ['Low', 'Unpredictable'], focuses: ['Drought tolerance', 'Shorter growing seasons'],
    conditions: ['How much water the crop receives and when', 'How well fields drain and how soil type affects growth', 'Planting dates and the maturity period farmers observe'],
    traits: ['Performance under limited water (to be assessed)', 'Time to maturity compared with other cereals (information needed)', 'Behaviour under different drainage conditions (information needed)'],
    farmer: ['Where and why farmers grow pearl millet', 'Local knowledge about planting time, spacing and thinning', 'What farmers observe about reliability from season to season'],
    storage: ['How heads are dried, stored and protected', 'Pest and moisture problems during storage', 'How seed is chosen and renewed']
  },
  {
    ...base, id: 'cowpea', name: 'Cowpea', type: 'Legume',
    investigate: 'Rainfall timing, soil fertility, pest observations and crop diversity.',
    soils: ['Loamy', 'Sandy'], rains: ['Regular', 'Unpredictable'], focuses: ['Soil health', 'Shorter growing seasons', 'Variable rainfall'],
    conditions: ['How the timing of rainfall affects flowering and pod set', 'Soil fertility in fields where cowpea is grown', 'Whether cowpea is grown alone or alongside other crops'],
    traits: ['Time from planting to first harvest (information needed)', 'Response to uneven rainfall (to be assessed)', 'Role in crop diversity and soil health (to be assessed)'],
    farmer: ['Which cowpea types farmers know and what they call them', 'Pest problems farmers observe and how they respond', 'How cowpea fits into farmers’ crop rotations and mixtures'],
    storage: ['How pods or grain are dried and stored', 'Storage pests and how farmers manage them', 'How seed is selected and kept for replanting']
  },
  {
    ...base, id: 'bambara-groundnut', name: 'Bambara groundnut', type: 'Legume',
    investigate: 'Traditional varieties, local adaptation knowledge, soil conditions and seed preservation.',
    soils: ['Sandy', 'Loamy'], rains: ['Low', 'Regular', 'Unpredictable'], focuses: ['Drought tolerance', 'Soil health'],
    conditions: ['Soil conditions in fields where it is grown', 'Rainfall patterns during planting and pod development', 'Traditional varieties and where each one is grown'],
    traits: ['Local adaptation of traditional varieties (to be assessed)', 'Performance across different soils (information needed)', 'Reliability across seasons (information needed)'],
    farmer: ['Traditional variety names and stories, shared with permission', 'Who holds the seed and knowledge in the community', 'What farmers have learned about growing it locally'],
    storage: ['How pods or seeds are dried and stored', 'Protection from pests and moisture', 'How traditional varieties are kept and passed on']
  },
  {
    ...base, id: 'acha', name: 'Acha', altName: 'Fonio', type: 'Cereal',
    investigate: 'Traditional growing practices, growing-season duration, processing knowledge and local seed diversity.',
    soils: ['Sandy', 'Loamy'], rains: ['Low', 'Regular'], focuses: ['Shorter growing seasons', 'Soil health'],
    conditions: ['Traditional growing practices and field preparation', 'Length of the growing season for local types', 'Soil conditions where acha is grown'],
    traits: ['Time from planting to harvest (information needed)', 'Performance on lighter or less fertile soils (to be assessed)', 'Diversity among local seed types (information needed)'],
    farmer: ['Traditional practices for sowing, weeding and harvesting', 'Knowledge about processing grain after harvest', 'Local names and types of acha known in the community'],
    storage: ['How grain and seed are dried and stored', 'Moisture and pest management during storage', 'How seed is chosen and shared between farmers']
  },
  {
    ...base, id: 'maize', name: 'Maize', type: 'Cereal',
    investigate: 'Planting dates, rainfall patterns, soil conditions and differences between varieties.',
    soils: ['Loamy', 'Clay-rich'], rains: ['Regular', 'Heavy', 'Unpredictable'], focuses: ['Variable rainfall', 'Shorter growing seasons'],
    conditions: ['Planting dates and how they relate to the start of the rains', 'Rainfall patterns during the growing season', 'Soil conditions across fields and how varieties differ'],
    traits: ['Response to dry spells or heavy rain (to be assessed)', 'Maturity period of different varieties (information needed)', 'Differences between local and other varieties (information needed)'],
    farmer: ['Which varieties farmers plant and why', 'How farmers decide when to plant', 'Observations on how varieties cope in difficult seasons'],
    storage: ['How cobs or grain are dried and stored', 'Insect and moisture problems during storage', 'How seed is selected for the next season']
  },
  {
    ...base, id: 'groundnut', name: 'Groundnut', type: 'Legume',
    investigate: 'Soil texture, moisture conditions, crop health observations and seed storage.',
    soils: ['Sandy', 'Loamy', 'Clay-rich'], rains: ['Low', 'Regular', 'Unpredictable'], focuses: ['Soil health', 'Drought tolerance'],
    conditions: ['Soil texture in fields where groundnut is grown', 'Moisture conditions from planting to pod filling', 'Crop health observations during the season'],
    traits: ['Response to dry periods (to be assessed)', 'Effect on soil health within rotations (to be assessed)', 'Variation between seasons (information needed)'],
    farmer: ['Which types farmers grow and what they call them', 'Signs of healthy or struggling plants that farmers watch for', 'Experience with different soils and moisture levels'],
    storage: ['How pods or seed are dried and stored', 'Moisture, mould and pest problems during storage', 'How seed is kept for planting']
  },
  {
    ...base, id: 'sesame', name: 'Sesame', type: 'Oilseed',
    investigate: 'Rainfall timing, drainage, harvesting practices and crop diversification.',
    soils: ['Sandy', 'Loamy'], rains: ['Low', 'Regular'], focuses: ['Drought tolerance', 'Soil health'],
    conditions: ['How the timing of rainfall affects planting and harvest', 'Drainage in fields where sesame is grown', 'Whether sesame is grown alongside or after other crops'],
    traits: ['Response to dry periods and heavy rain (to be assessed)', 'Role in diversifying crops and farm income (information needed)', 'Reliability across seasons (information needed)'],
    farmer: ['Harvesting practices and timing farmers use', 'How farmers handle seed after harvest', 'What farmers say about where sesame grows best'],
    storage: ['How seed is dried and cleaned for storage', 'Moisture and pest protection', 'How seed is saved for replanting']
  }
];

function Select({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <div className='tk-field'>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value={ALL}>All</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return <ul className='tk-list'>{items.map((i) => <li key={i}>{i}</li>)}</ul>;
}

export default function Toolkit({ navigate }: { navigate: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState(ALL);
  const [soil, setSoil] = useState(ALL);
  const [rain, setRain] = useState(ALL);
  const [focus, setFocus] = useState(ALL);
  const [evidence, setEvidence] = useState(ALL);
  const [openId, setOpenId] = useState<string | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const results = PROFILES.filter((p) =>
    (!q || (p.name + ' ' + (p.altName || '')).toLowerCase().includes(q)) &&
    (type === ALL || p.type === type) &&
    (soil === ALL || p.soils.includes(soil)) &&
    (rain === ALL || p.rains.includes(rain)) &&
    (focus === ALL || p.focuses.includes(focus)) &&
    (evidence === ALL || p.evidence === evidence)
  );
  const filtersActive = q !== '' || type !== ALL || soil !== ALL || rain !== ALL || focus !== ALL || evidence !== ALL;
  const selected = PROFILES.find((p) => p.id === openId) || null;

  function reset() {
    setQuery(''); setType(ALL); setSoil(ALL); setRain(ALL); setFocus(ALL); setEvidence(ALL);
  }

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpenId(null); return; }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const nodes = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [selected?.id]);

  return (
    <section className='toolkit-page section-pad tk'>
      <div className='section-kicker'><span>03</span><span>SEED RESILIENCE TOOLKIT</span></div>
      <div className='toolkit-heading'>
        <div>
          <h1 className='inner-title'>Explore climate resilience, <em>one seed at a time.</em></h1>
          <p className='inner-lead'>The Seed Profile Library organises what Seed Legacy plans to learn about each crop with farmers and agricultural partners, so knowledge can be recorded, compared and checked over time.</p>
        </div>
      </div>

      <div className='tk-notice' role='note'>
        <span aria-hidden='true'>ⓘ</span>
        <p><strong>Illustrative information only. Profiles are not verified planting recommendations.</strong> The filters organise the topics each profile is set up to investigate. They do not use live weather data or soil analysis, and no profile reports field-trial results, resilience scores or tested varieties.</p>
      </div>

      <div className='tk-panel'>
        <div className='tk-panel-head'>
          <div>
            <span className='toolkit-overline'>SEED PROFILE LIBRARY</span>
            <h2>Illustrative Seed Profiles</h2>
          </div>
          <button type='button' className='tk-reset' onClick={reset}>Reset filters <span aria-hidden='true'>↻</span></button>
        </div>
        <div className='tk-filters'>
          <div className='tk-field tk-search'>
            <label htmlFor='tk-search'>Crop name</label>
            <input id='tk-search' type='search' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search, e.g. sorghum or fonio' autoComplete='off' />
          </div>
          <Select id='tk-type' label='Crop type' value={type} options={TYPES.map((t) => ({ value: t, label: t }))} onChange={setType} />
          <Select id='tk-soil' label='Soil type' value={soil} options={SOILS.map((s) => ({ value: s, label: s }))} onChange={setSoil} />
          <Select id='tk-rain' label='Rainfall pattern' value={rain} options={RAINS.map((r) => ({ value: r, label: r }))} onChange={setRain} />
          <Select id='tk-focus' label='Resilience focus' value={focus} options={FOCUSES.map((f) => ({ value: f, label: f }))} onChange={setFocus} />
          <Select id='tk-evidence' label='Evidence status' value={evidence} options={(Object.keys(EVIDENCE) as Evidence[]).map((k) => ({ value: k, label: EVIDENCE[k].label }))} onChange={setEvidence} />
        </div>
        <p className='tk-count' role='status' aria-live='polite'>
          Showing <b>{results.length}</b> of {PROFILES.length} profiles{filtersActive ? ' that match your filters' : ''}
        </p>
      </div>

      {results.length > 0 ? (
        <div className='tk-grid'>
          {results.map((p) => (
            <article className='tk-card' key={p.id}>
              <div className='tk-card-top'>
                <span className='tk-badge tk-type'>{p.type}</span>
                <span className={'tk-badge tk-ev tk-ev-' + p.evidence}>{EVIDENCE[p.evidence].label}</span>
              </div>
              <h3>{p.name}{p.altName ? <small> · {p.altName}</small> : null}</h3>
              <p className='tk-investigate'>{p.investigate}</p>
              <dl className='tk-facts'>
                <div><dt>Soil topics</dt><dd>{p.soils.join(', ')}</dd></div>
                <div><dt>Rainfall topics</dt><dd>{p.rains.join(', ')}</dd></div>
                <div><dt>Resilience focus</dt><dd>{p.focuses.join(', ')}</dd></div>
              </dl>
              <div className='tk-card-foot'>
                <span>Updated {p.updated}</span>
                <button type='button' className='tk-open' aria-haspopup='dialog' aria-label={'View ' + p.name + ' profile'} onClick={(e) => { openerRef.current = e.currentTarget; setOpenId(p.id); }}>View profile <span aria-hidden='true'>→</span></button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className='tk-empty' role='status'>
          <h3>No profiles match these filters</h3>
          <p>{evidence !== ALL && evidence !== 'not-assessed' ? 'No profiles currently have this evidence status. Seed Legacy will update profiles as farmer knowledge and field observations are recorded.' : 'Try removing a filter, or reset to see all profiles.'}</p>
          <button type='button' className='tk-reset' onClick={reset}>Reset filters <span aria-hidden='true'>↻</span></button>
        </div>
      )}

      <div className='tk-evidence'>
        <span className='toolkit-overline'>EVIDENCE AND FIELD OBSERVATIONS</span>
        <h2>How we label what we know</h2>
        <div className='tk-evidence-grid'>
          <article><h3>Not yet assessed</h3><p>No records have been collected. The profile lists questions to explore.</p></article>
          <article><h3>Farmer-reported</h3><p>Knowledge shared by farmers and elders, recorded with permission and credited. It is valuable, but not independently measured.</p></article>
          <article><h3>Documented field observations</h3><p>Measured or observed in the field, with dates and methods recorded.</p></article>
          <article><h3>Independently verified research</h3><p>Reviewed by qualified agricultural or research partners. No profile has reached this level yet.</p></article>
        </div>
      </div>

      <div className='toolkit-next-steps'>
        <div><span className='toolkit-overline'>HOW THE LIBRARY COULD GROW</span><h2>From illustrative profile to evidence.</h2></div>
        <div className='next-step-grid'>
          <article><span>01</span><h3>Listen</h3><p>Record seed knowledge shared by Guardian Farmers, with their permission.</p></article>
          <article><span>02</span><h3>Document</h3><p>Track seed origin, growing conditions and field observations over time.</p></article>
          <article><span>03</span><h3>Validate</h3><p>Work with farmers and qualified agricultural partners before making real recommendations.</p></article>
        </div>
      </div>
      <button className='button button-dark page-next' onClick={() => navigate('pilot')}>View the planned pilot <span>↗</span></button>

      {selected && createPortal(
        <div className='tk-modal-backdrop' onMouseDown={(e) => { if (e.target === e.currentTarget) setOpenId(null); }}>
          <div className='tk-modal' role='dialog' aria-modal='true' aria-labelledby='tk-modal-title' ref={dialogRef}>
            <div className='tk-modal-head'>
              <div>
                <div className='tk-card-top'>
                  <span className='tk-badge tk-type'>{selected.type}</span>
                  <span className={'tk-badge tk-ev tk-ev-' + selected.evidence}>{EVIDENCE[selected.evidence].label}</span>
                </div>
                <h2 id='tk-modal-title'>{selected.name}{selected.altName ? <small> · {selected.altName}</small> : null}</h2>
              </div>
              <button type='button' className='tk-close' ref={closeRef} onClick={() => setOpenId(null)} aria-label='Close profile'>Close ✕</button>
            </div>
            <div className='tk-modal-body'>
              <p className='tk-modal-note'>Illustrative information only. Profiles are not verified planting recommendations.</p>

              <dl className='tk-detail-grid'>
                <div><dt>Local or traditional variety name</dt><dd>{selected.variety}</dd></div>
                <div><dt>Seed source</dt><dd>{selected.source}</dd></div>
                <div><dt>Community of origin</dt><dd>{selected.origin}</dd></div>
                <div><dt>Evidence status</dt><dd>{EVIDENCE[selected.evidence].label}</dd></div>
                <div><dt>Last updated</dt><dd>{selected.updated}</dd></div>
                <div><dt>Crop category</dt><dd>{selected.type}</dd></div>
              </dl>

              <h3>Growing conditions to investigate</h3>
              <List items={selected.conditions} />

              <h3>Climate-resilience characteristics to assess</h3>
              <List items={selected.traits} />

              <h3>Farmer knowledge and observations</h3>
              <p className='tk-muted'>Farmer-reported knowledge: none recorded yet. Questions to explore with farmers, with their permission:</p>
              <List items={selected.farmer} />

              <h3>Seed preservation and storage notes</h3>
              <p className='tk-muted'>Nothing documented yet. To record:</p>
              <List items={selected.storage} />

              <h3>Evidence and field observations</h3>
              <div className='tk-record-grid'>
                <div><b>Field observations</b><p>No field observations have been recorded for this crop yet. Space reserved for dated, measured notes.</p></div>
                <div><b>Verified findings</b><p>No independently verified findings yet. Space reserved for reviewed results and their sources.</p></div>
              </div>
              <p className='tk-muted'>{EVIDENCE[selected.evidence].text}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
