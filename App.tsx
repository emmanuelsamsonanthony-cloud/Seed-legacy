import { useEffect, useState } from 'react';

const pages = ['Home', 'About', 'Our Work', 'Impact', 'Climate Toolkit', 'Get Involved', 'Contact'];
const pageIds = ['home', 'story', 'approach', 'pilot', 'toolkit', 'join', 'contact'];

function App() {
  const [page, setPage] = useState(() => window.location.hash.replace('#', '') || 'home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [soil, setSoil] = useState('Loamy');
  const [rain, setRain] = useState('Unpredictable');
  const [priority, setPriority] = useState('Drought tolerance');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const syncPage = () => setPage(window.location.hash.replace('#', '') || 'home');
    window.addEventListener('hashchange', syncPage);
    return () => window.removeEventListener('hashchange', syncPage);
  }, []);

  function navigate(id: string) {
    setPage(id);
    setMenuOpen(false);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const demoResults = [
    { name: 'Local drought-tolerant maize (demo variety A)', fit: soil === 'Sandy' ? 78 : 86, strengths: 'Potential drought resilience', note: 'Example record; confirm with local farmers.' },
    { name: 'Traditional sorghum (demo variety B)', fit: rain === 'Low' || rain === 'Unpredictable' ? 91 : 80, strengths: 'Potential fit for variable rainfall', note: 'Example record; performance is not verified.' },
    { name: 'Indigenous cowpea (demo variety C)', fit: soil === 'Sandy' ? 84 : 79, strengths: 'Potential short-season option', note: 'Example record; confirm soil and pest response.' }
  ].map(item => ({ ...item, fit: Math.max(55, Math.min(96, item.fit + (priority === 'Short growing season' && item.name.includes('cowpea') ? 5 : priority === 'Soil health' && item.name.includes('sorghum') ? 2 : 0))) }))
    .sort((a, b) => b.fit - a.fit);

  const nav = (
    <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label='Main navigation'>
      {pages.map((label, index) => (
        <a key={pageIds[index]} href={'#' + pageIds[index]} className={page === pageIds[index] ? 'active-link' : ''} onClick={(event) => { event.preventDefault(); navigate(pageIds[index]); }}>{label}</a>
      ))}
    </nav>
  );

  return (
    <div className='site-shell'>
      <header className='site-header'>
        <a href='#home' className='brand' onClick={(e) => { e.preventDefault(); navigate('home'); }} aria-label='Seed Legacy home'>
          <span className='brand-symbol'>S<span>✳</span></span>
          <span className='brand-name'>SEED <b>LEGACY</b><small>ROOTED IN OUR FUTURE</small></span>
        </a>
        <button className='menu-toggle' onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label='Toggle navigation'>{menuOpen ? 'Close −' : 'Menu +'}</button>
        {nav}
      </header>

      <main key={page} className='page-content'>
        {page === 'home' && <>
          <section className='hero home-hero'>
            <div className='hero-copy'>
              <div className='eyebrow'><span className='eyebrow-line' /> A COMMUNITY-ROOTED INITIATIVE <span className='eyebrow-place'>PLATEAU STATE, NIGERIA</span></div>
              <h1>Our future<br />is <em>in the seeds</em><br />we protect.</h1>
              <p className='hero-intro'>Seed Legacy is working to preserve indigenous seeds and the farming knowledge carried by the people who know them best.</p>
              <div className='hero-buttons'><a className='button button-dark' href='#story' onClick={(e) => { e.preventDefault(); navigate('story'); }}>Discover our story <span>↗</span></a><a className='text-button' href='#toolkit' onClick={(e) => { e.preventDefault(); navigate('toolkit'); }}>Try the climate toolkit <span>↗</span></a></div>
              <div className='hero-note'><span className='note-star'>✳</span><span>Protecting our seeds today<br /><b>means protecting our future.</b></span></div>
            </div>
            <div className='photo-frame'><img src='/resources/seed-legacy-photo-1-founder.jpg' alt='Seed Legacy founder' /><div className='photo-caption'><span>SEED LEGACY · IN THE FIELD</span><span>SEEDS ARE OUR LIVING LEGACY</span></div></div>
            <div className='hero-bottomline'><span>LOCAL KNOWLEDGE. LIVING LEGACY.</span><span>01 — PRESERVE WHAT MATTERS</span></div>
          </section>
          <section className='home-intro section-pad'><div className='section-kicker'><span>01</span><span>THE IDEA IN BRIEF</span></div><div className='home-intro-grid'><h2>Protect the seed.<br /><em>Preserve the story.</em></h2><div><p>Traditional seeds hold more than the promise of a harvest. They carry local knowledge, memory and ways of adapting to changing conditions. As weather patterns shift and farming costs rise, Seed Legacy wants to help communities protect this living heritage and pass it forward.</p><a className='underlined-link' href='#story' onClick={(e) => { e.preventDefault(); navigate('story'); }}>Read the Seed Legacy story <span>↗</span></a></div></div><div className='home-principles'><article><span>01 / PRESERVE</span><h3>Keep seed diversity alive</h3><p>Help communities document and safeguard indigenous varieties for the next generation.</p></article><article><span>02 / LEARN</span><h3>Value local knowledge</h3><p>Listen to the farmers and elders who know the land, the seasons and the seeds.</p></article><article><span>03 / ADAPT</span><h3>Build resilience together</h3><p>Explore how careful records and community trials could support climate adaptation.</p></article></div></section>
          <section className='field-gallery section-pad'><div className='section-kicker'><span>FIELD NOTES</span><span>REAL PEOPLE. REAL KNOWLEDGE.</span></div><div className='field-gallery-grid'><figure><img src='/resources/seed-legacy-photo-2-founder-fieldwork.jpg' alt='Founder working with seeds in the field' /><figcaption>Founder in the field</figcaption></figure><figure><img src='/resources/seed-legacy-photo-3-greenhouse.jpg' alt='Seed Legacy team speaking with a grower in a greenhouse' /><figcaption>Learning in the greenhouse</figcaption></figure><figure><img src='/resources/seed-legacy-photo-4-farmer-interview.jpg' alt='Founder documenting a farmer’s knowledge' /><figcaption>Listening to farmers</figcaption></figure><figure><img src='/resources/seed-legacy-photo-5-community-field.jpg' alt='Seed Legacy team learning hands-on greenhouse growing practices' /><figcaption>Learning Through Hands-On Greenhouse Practice</figcaption></figure></div></section><section className='home-links section-pad'><button onClick={() => navigate('story')}><span>01 / OUR STORY</span><b>Why this work matters ↗</b></button><button onClick={() => navigate('approach')}><span>02 / OUR APPROACH</span><b>How we plan to act ↗</b></button><button onClick={() => navigate('toolkit')}><span>03 / CLIMATE TOOLKIT</span><b>Explore the demo ↗</b></button></section>
        </>}

        {page === 'story' && <section className='inner-page section-pad'>
          <div className='section-kicker'><span>01</span><span>OUR STORY</span></div><h1 className='inner-title'>When a seed disappears,<br /><em>more than a crop is lost.</em></h1>
          <div className='inner-story-grid'><img src='/resources/seed-legacy-photo-3-farmer-seeds.jpg' alt='Seed Legacy founder learning from a local farmer while handling seeds in the field' /><div className='story-body'><p>Seed Legacy began with a question: what happens when the seeds that have fed a community for generations are no longer being saved, shared or planted?</p><p>In Plateau State, farming is not only an economic activity. It is part of family life, local identity and community relationships. Traditional seed varieties carry practical knowledge about soil, rainfall, storage, taste and the timing of a harvest. Much of that knowledge is held by farmers and elders whose experience deserves to be recorded with care and respect.</p><p>At the same time, farmers face uncertain rainfall, changing growing seasons, rising input costs and pressure on land and water. No single project can solve these challenges, but protecting seed diversity and strengthening local knowledge can be a practical part of a wider response.</p><p>Seed Legacy is founded by Emmanuel Anthony, a university student in Plateau State. The idea brings young people and experienced farmers together: elders contribute knowledge, while youth help document seed stories and observations in formats future generations can learn from.</p><p>Our starting point is humility. We want to listen before proposing solutions, document what communities already know, and work with agricultural partners to check what the evidence shows.</p></div></div><div className='story-principles'><article><span>OUR MISSION</span><p>Preserve indigenous seeds and traditional farming knowledge through community-led documentation, seed stewardship and learning.</p></article><article><span>OUR VISION</span><p>A future where communities can protect their seed heritage and share a practical, adaptable model with other farming communities across Nigeria.</p></article><article><span>OUR VALUES</span><p>Respect for local knowledge, transparency about evidence, community participation, youth leadership and long-term care for the land.</p></article></div>
          <div className='quote-strip'><span className='quote-mark'>“</span><p>We cannot build a resilient future if we lose the seeds, knowledge and relationships that help communities thrive.</p><span className='quote-credit'>THE SEED LEGACY BELIEF</span></div>
          <button className='button button-dark page-next' onClick={() => navigate('approach')}>Explore our approach <span>↗</span></button>
        </section>}

        {page === 'approach' && <section className='inner-page section-pad'><div className='section-kicker'><span>02</span><span>OUR APPROACH</span></div><h1 className='inner-title'>Keep the seeds.<br /><em>Carry the knowledge.</em></h1><p className='inner-lead'>Seed Legacy brings preservation, collaboration and community empowerment together—starting with the people and knowledge already rooted in our communities.</p>
          <div className='pillar-grid'><article className='pillar-card'><span className='pillar-number'>01</span><div className='pillar-icon'>❋</div><h3>Preserve</h3><p>Protect indigenous seed varieties and the knowledge that has helped communities grow food across generations.</p><span className='pillar-rule' /></article><article className='pillar-card'><span className='pillar-number'>02</span><div className='pillar-icon'>⌘</div><h3>Connect</h3><p>Bring Guardian Farmers and young people together so traditional wisdom can meet digital documentation.</p><span className='pillar-rule' /></article><article className='pillar-card'><span className='pillar-number'>03</span><div className='pillar-icon'>↗</div><h3>Empower</h3><p>Support seed sharing, climate-resilient farming and community-led learning for stronger local food systems.</p><span className='pillar-rule' /></article></div>
          <div className='approach-detail'><div className='detail-badge'>FROM MEMORY<br />TO A LIVING RECORD</div><div><h3>Traditional wisdom meets youth-led documentation.</h3><p>Guardian Farmers can help identify local varieties. Young people can document seed names, stories, growing conditions and observations over time, creating a record for future generations and helping inform a future Seed Resilience Index.</p></div></div><div className='work-steps'><article><span>STEP 01</span><h3>Find the Guardian Farmers</h3><p>Work with communities to identify experienced farmers and elders who know local seed varieties, how they are stored and how they have performed across seasons.</p><ul><li>Record local names and stories with permission.</li><li>Document storage and planting traditions.</li><li>Credit knowledge holders and respect community ownership.</li></ul></article><article><span>STEP 02</span><h3>Protect seeds in community seed banks</h3><p>Develop a safe, organised place for selected seeds to be labelled, stored, checked and shared according to community-agreed rules.</p><ul><li>Keep clear records of seed source and date received.</li><li>Track storage conditions and seed health.</li><li>Plan responsible renewal and sharing.</li></ul></article><article><span>STEP 03</span><h3>Learn through trial gardens</h3><p>With farmer participation and appropriate agricultural guidance, observe how selected varieties grow in local conditions instead of assuming performance in advance.</p><ul><li>Record planting dates and rainfall observations.</li><li>Note germination, growth, pests and harvest outcomes.</li><li>Compare results across seasons where possible.</li></ul></article><article><span>STEP 04</span><h3>Build a Digital Resilience Toolkit</h3><p>Organise the records into a simple, accessible tool that could help users compare seed histories and field observations.</p><ul><li>Search by crop, location or growing condition.</li><li>Show the source and confidence level of each record.</li><li>Separate verified observations from untested ideas.</li></ul></article></div><div className='work-note'><b>Our principle:</b> the toolkit should support farmer knowledge, not replace it. Any future planting guidance must be reviewed with farmers and qualified agricultural specialists.</div><button className='button button-dark page-next' onClick={() => navigate('toolkit')}>Try the climate toolkit <span>↗</span></button>
        </section>}

        {page === 'toolkit' && <section className='toolkit-page section-pad'>
          <div className='section-kicker'><span>03</span><span>SEED RESILIENCE TOOLKIT</span></div>
          <div className='toolkit-heading'><div><h1 className='inner-title'>Explore what a resilient seed <em>could look like.</em></h1><p className='inner-lead'>Choose example growing conditions and see how a future Seed Legacy toolkit might organize seed information for farmers and youth researchers.</p></div></div>
          <div className='demo-warning'><span>ⓘ</span><p><strong>Illustrative example only.</strong> All varieties, scores and recommendations on this page are fictional demo data. This tool does not use live weather, soil tests, field trials or verified agricultural research. Do not use its results to make real planting decisions.</p></div>
          <div className='toolkit-workspace'>
            <aside className='toolkit-controls'><div className='toolkit-card-top'><span>01 / SET YOUR EXAMPLE</span><span>✳</span></div><h2>Growing conditions</h2><label htmlFor='soil-select'>Soil type</label><select id='soil-select' value={soil} onChange={(e) => setSoil(e.target.value)}><option>Loamy</option><option>Sandy</option><option>Clay-rich</option></select><label htmlFor='rain-select'>Rainfall pattern</label><select id='rain-select' value={rain} onChange={(e) => setRain(e.target.value)}><option>Unpredictable</option><option>Low</option><option>Regular</option><option>Heavy</option></select><label htmlFor='priority-select'>Main resilience priority</label><select id='priority-select' value={priority} onChange={(e) => setPriority(e.target.value)}><option>Drought tolerance</option><option>Short growing season</option><option>Soil health</option><option>Variable rainfall</option></select><div className='selected-summary'><span>YOUR EXAMPLE PROFILE</span><b>{soil} soil · {rain.toLowerCase()} rainfall</b><small>Priority: {priority}</small></div><button className='button button-dark toolkit-reset' onClick={() => { setSoil('Loamy'); setRain('Unpredictable'); setPriority('Drought tolerance'); setShowAll(false); }}>Reset example <span>↻</span></button></aside>
            <div className='toolkit-results'><div className='results-header'><div><span className='toolkit-card-top'>02 / SAMPLE MATCHES</span><h2>Example seed profiles</h2></div><span className='sample-badge'>SAMPLE DATA</span></div><p className='results-intro'>These made-up scores demonstrate a possible interface—not actual suitability ratings.</p>
              {demoResults.slice(0, showAll ? 3 : 2).map((item, index) => <article className='seed-result' key={item.name}><div className='seed-result-icon'>{index === 0 ? '✳' : index === 1 ? '❋' : '◌'}</div><div className='seed-result-main'><div className='seed-result-title'><h3>{item.name}</h3><span>{item.fit}%</span></div><div className='fit-track'><span style={{ width: item.fit + '%' }} /></div><p>{item.strengths}</p><small>{item.note}</small></div></article>)}
              <button className='text-button show-results' onClick={() => setShowAll(!showAll)}>{showAll ? 'Show fewer examples ↑' : 'Compare all 3 demo profiles ↓'}</button>
            </div>
          </div>
          <div className='toolkit-next-steps'><div><span className='toolkit-overline'>HOW A REAL VERSION COULD GROW</span><h2>From example to evidence.</h2></div><div className='next-step-grid'><article><span>01</span><h3>Listen</h3><p>Record seed knowledge shared by Guardian Farmers, with their permission.</p></article><article><span>02</span><h3>Document</h3><p>Track seed origin, growing conditions and field observations over time.</p></article><article><span>03</span><h3>Validate</h3><p>Work with farmers and qualified agricultural partners before making real recommendations.</p></article></div></div>
          <button className='button button-dark page-next' onClick={() => navigate('pilot')}>View the planned pilot <span>↗</span></button>
        </section>}

        {page === 'pilot' && <section className='pilot-section pilot-page section-pad'><div className='section-kicker light-kicker'><span>04</span><span>THE FIRST STEP</span></div><p className='pilot-label'>PLANNED PILOT · TARGET BY DECEMBER 2026</p><h1 className='inner-title'>Start small.<br /><em>Grow something lasting.</em></h1><p className='inner-lead light-lead'>Seed Legacy is being developed as a focused, community-rooted pilot. These are initial targets, not completed results.</p><div className='pilot-stats'><div className='stat-card'><span className='stat-number'>08</span><span className='stat-label'>Guardian Farmers</span><span className='stat-detail'>Local knowledge keepers</span></div><div className='stat-card'><span className='stat-number'>15</span><span className='stat-label'>Seed varieties</span><span className='stat-detail'>Indigenous varieties to document</span></div><div className='stat-card'><span className='stat-number'>01</span><span className='stat-label'>Community seed bank</span><span className='stat-detail'>A home for seed preservation</span></div></div><div className='pilot-footnote'><span>THE GOAL IS LONG-TERM COMMUNITY RESILIENCE.</span><span>ONE SEED. ONE STORY. ONE FUTURE.</span></div><div className='pilot-roadmap'><h2>What progress could look like</h2><div className='roadmap-row'><span>01</span><div><b>Listen and map</b><p>Build relationships with farmers, learn community priorities and agree on how seed knowledge will be recorded.</p></div><small>FOUNDATION</small></div><div className='roadmap-row'><span>02</span><div><b>Document and protect</b><p>Catalogue the first seed varieties, document storage practices and shape a community seed-bank plan.</p></div><small>SEED STEWARDSHIP</small></div><div className='roadmap-row'><span>03</span><div><b>Observe and learn</b><p>Plan small, responsibly supported trial observations and record what farmers notice over time.</p></div><small>FIELD LEARNING</small></div><div className='roadmap-row'><span>04</span><div><b>Share what is learned</b><p>Develop clear records and a demonstration toolkit, then share lessons with partners and other communities.</p></div><small>REPLICATION</small></div><p className='roadmap-disclaimer'>This is a proposed roadmap. Activities and targets should be updated as partners, resources and community agreements are confirmed.</p></div><button className='button button-light page-next' onClick={() => navigate('join')}>Get involved <span>↗</span></button></section>}

        {page === 'contact' && <section className='inner-page section-pad contact-page'><div className='section-kicker'><span>06</span><span>CONTACT</span></div><h1 className='inner-title'>Let's grow this <em>together.</em></h1><p className='inner-lead'>Have a question, an idea, or a way to support seed preservation? We would love to hear from you.</p><div className='contact-grid'><div className='contact-details'><a href='mailto:resilienceseedlegacy@yahoo.com'><span>Email</span><b>resilienceseedlegacy@yahoo.com ↗</b></a><a href='https://www.instagram.com/seedlegacy_?rpxt=MWkybDQyeWpoMHFndw==' target='_blank' rel='noreferrer'><span>Instagram</span><b>@seedlegacy_ ↗</b></a><div><span>Location</span><b>Jos, Plateau State, Nigeria</b></div></div><form className='contact-form' action='mailto:resilienceseedlegacy@yahoo.com' method='post' encType='text/plain'><label htmlFor='contact-name'>Your name</label><input id='contact-name' name='Name' required placeholder='How should we call you?' /><label htmlFor='contact-email'>Your email</label><input id='contact-email' name='Email' type='email' required placeholder='you@example.com' /><label htmlFor='contact-message'>Message</label><textarea id='contact-message' name='Message' rows={5} required placeholder='Tell us what is on your mind...' /><button className='button button-dark' type='submit'>Send a message ↗</button><small>This opens your email app to send the message.</small></form></div></section>}

        {page === 'join' && <section className='inner-page section-pad join-page'><div className='section-kicker'><span>05</span><span>GET INVOLVED</span></div><h1 className='inner-title'>Some legacies<br />begin <em>with a seed.</em></h1><p className='inner-lead'>Seed Legacy is a solo-led idea growing from a simple belief: protecting local seeds and farming knowledge today can help future generations face tomorrow with more resilience.</p><div className='join-card'><span className='join-card-label'>HELP THE IDEA TAKE ROOT</span><h3>Knowledge is worth preserving.</h3><p>Seed Legacy can grow through practical collaboration. We welcome conversations with people who care about indigenous seeds, climate adaptation and stronger local food systems.</p><div className='join-pathways'><article><b>Farmers and elders</b><p>Share seed knowledge, community priorities and experience with local varieties.</p></article><article><b>Students and volunteers</b><p>Help with respectful documentation, photography, interviews, research and community outreach.</p></article><article><b>Agricultural and research partners</b><p>Advise on seed handling, trial design, evidence quality and responsible interpretation.</p></article><article><b>Funders and supporters</b><p>Help explore resources for community-led seed preservation, learning activities and accessible documentation.</p></article></div><a className='button button-dark' href='mailto:resilienceseedlegacy@yahoo.com?subject=Interest%20in%20Seed%20Legacy'>Express your interest <span>↗</span></a><p className='email-note'>We will be transparent about what is planned, what is underway and what has been verified.</p></div></section>}
      </main>
      <footer className='site-footer'>
        <div className='sf-inner'>
          <div className='sf-brand-col'>
            <a href='#home' className='sf-brand' aria-label='Seed Legacy home' onClick={(e) => { e.preventDefault(); navigate('home'); }}>
              <img src='/resources/seed-legacy-logo.png' alt='Seed Legacy logo' />
              <span><strong>SEED</strong><em>LEGACY</em></span>
            </a>
            <p className='sf-tagline'>Protecting indigenous seeds and farming knowledge for climate-resilient communities in Plateau State, Nigeria.</p>
            <div className='sf-social'>
              <a href='https://www.instagram.com/seedlegacy_?rpxt=MWkybDQyeWpoMHFndw==' target='_blank' rel='noreferrer' aria-label='Seed Legacy on Instagram'>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><rect x='2' y='2' width='20' height='20' rx='5' /><circle cx='12' cy='12' r='4' /><circle cx='17.5' cy='6.5' r='0.6' /></svg>
              </a>
              <a href='#' onClick={(e) => e.preventDefault()} aria-label='Seed Legacy on Facebook'>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' /></svg>
              </a>
              <a href='#' onClick={(e) => e.preventDefault()} aria-label='Seed Legacy on LinkedIn'>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z' /><rect x='2' y='9' width='4' height='12' /><circle cx='4' cy='4' r='2' /></svg>
              </a>
            </div>
          </div>
          <div className='sf-links'>
            <div>
              <h3>Explore</h3>
              <ul>
                {[['Home', 'home'], ['About', 'story'], ['Our Work', 'approach'], ['Impact', 'pilot']].map(([label, id]) => (
                  <li key={id}><a href={'#' + id} onClick={(e) => { e.preventDefault(); navigate(id); }}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Take action</h3>
              <ul>
                {[['Climate Toolkit', 'toolkit'], ['Get Involved', 'join'], ['Contact', 'contact']].map(([label, id]) => (
                  <li key={id}><a href={'#' + id} onClick={(e) => { e.preventDefault(); navigate(id); }}>{label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className='sf-contact'>
            <h3>Get in touch</h3>
            <p className='sf-row'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><path d='M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z' /><circle cx='12' cy='10' r='3' /></svg>
              <span>Jos, Plateau State, Nigeria</span>
            </p>
            <p className='sf-row'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><rect x='2' y='4' width='20' height='16' rx='2' /><path d='m22 7-10 6L2 7' /></svg>
              <a href='mailto:resilienceseedlegacy@yahoo.com'>resilienceseedlegacy@yahoo.com</a>
            </p>
          </div>
        </div>
        <div className='sf-bottom'>
          <p>© 2026 Seed Legacy. Preserving seeds, knowledge and community heritage.</p>
          <p className='sf-legal'>
            <a href='#' onClick={(e) => e.preventDefault()}>Privacy</a>
            <span aria-hidden='true'>·</span>
            <a href='#' onClick={(e) => e.preventDefault()}>Safeguarding</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
