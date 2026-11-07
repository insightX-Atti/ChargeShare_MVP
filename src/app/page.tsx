'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, CheckCircle2, ChevronRight, CircleDollarSign, Clock3, Leaf, MapPin, PlugZap, Search, ShieldCheck, Sparkles, Star, Zap } from 'lucide-react';

type Charger = {
  id: string;
  name: string;
  public_area: string;
  connector_type: string;
  charging_power: number;
  pricing_type: 'PER_KWH' | 'PER_HOUR';
  price: number;
  images: string[];
  reviews?: { rating: number }[];
};

const demoChargers: Charger[] = [
  { id: '10000000-0000-4000-8000-000000000001', name: 'Adyar Home Charger', public_area: 'Adyar, Chennai', connector_type: 'Type 2', charging_power: 7.4, pricing_type: 'PER_KWH', price: 18, images: ['https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80'], reviews: [{ rating: 4.9 }] },
  { id: '10000000-0000-4000-8000-000000000002', name: 'Anna Nagar EV Point', public_area: 'Anna Nagar, Chennai', connector_type: 'Type 2', charging_power: 11, pricing_type: 'PER_HOUR', price: 120, images: ['https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80'], reviews: [{ rating: 4.8 }] },
  { id: '10000000-0000-4000-8000-000000000003', name: 'Velachery Private Charge', public_area: 'Velachery, Chennai', connector_type: 'CCS2', charging_power: 30, pricing_type: 'PER_KWH', price: 24, images: ['https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80'], reviews: [{ rating: 5 }] },
  { id: '10000000-0000-4000-8000-000000000004', name: 'T Nagar Home Station', public_area: 'T Nagar, Chennai', connector_type: 'Type 2', charging_power: 7.4, pricing_type: 'PER_KWH', price: 16, images: ['https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80'], reviews: [{ rating: 4.7 }] },
];

const averageRating = (charger: Charger) => {
  const ratings = charger.reviews?.map((review) => review.rating) ?? [];
  return ratings.length ? (ratings.reduce((total, rating) => total + rating, 0) / ratings.length).toFixed(1) : 'New';
};

export default function Home() {
  const [chargers, setChargers] = useState<Charger[]>(demoChargers);
  const [area, setArea] = useState('Chennai');
  const [query, setQuery] = useState('');
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetch('/api/chargers')
      .then(async (response) => (response.ok ? response.json() : Promise.reject(new Error('Supabase is not ready'))))
      .then((data: Charger[]) => {
        if (Array.isArray(data) && data.length) {
          setChargers(data);
          setIsLive(true);
        }
      })
      .catch(() => setIsLive(false));
  }, []);

  const visibleChargers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return chargers;
    return chargers.filter((charger) => `${charger.name} ${charger.public_area}`.toLowerCase().includes(needle));
  }, [chargers, query]);

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery(area);
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main>
      <nav className="site-nav">
        <div className="shell nav-inner">
          <a href="/" className="brand" aria-label="ChargeShare home"><span><Zap size={20} fill="currentColor" /></span>ChargeShare</a>
          <div className="nav-links"><a href="#explore">Find a charger</a><a href="#how-it-works">How it works</a><a href="#host">Host your charger</a></div>
          <a href="/login" className="nav-login">Log in <ChevronRight size={16} /></a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow"><Leaf size={15} /> The neighbour-powered EV network</p>
            <h1>Recharge your day,<br /><em>your way.</em></h1>
            <p className="hero-lede">Book welcoming, dependable EV chargers in the places you already live, work and explore.</p>
            <form className="search-panel" onSubmit={search}>
              <label><MapPin size={17} /><span>Where</span><input value={area} onChange={(event) => setArea(event.target.value)} aria-label="Search by location" placeholder="Search a city or area" /></label>
              <label className="search-date"><CalendarDays size={17} /><span>When</span><input type="date" aria-label="Choose a date" /></label>
              <button className="search-button" aria-label="Find chargers"><Search size={20} /></button>
            </form>
            <div className="trust-row"><span><CheckCircle2 size={16} /> Instant reservations</span><span><CheckCircle2 size={16} /> Neighbour-approved locations</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-glow" />
            <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1300&q=88" alt="An electric car charging" />
            <div className="rating-chip"><span><Star size={16} fill="currentColor" /></span><div><strong>4.9 / 5</strong><small>from our charging community</small></div></div>
            <div className="availability-chip"><span className="live-dot" /> Available spots near you</div>
          </div>
        </div>
      </section>

      <section className="benefit-bar"><div className="shell benefit-grid">
        <p><PlugZap /> <span><strong>Charge nearby</strong>Friendly local spaces</span></p>
        <p><CircleDollarSign /> <span><strong>Pay fairly</strong>Clear, host-set prices</span></p>
        <p><ShieldCheck /> <span><strong>Feel confident</strong>Thoughtful, verified listings</span></p>
      </div></section>

      <section className="shell explore-section" id="explore">
        <div className="section-heading">
          <div><p className="eyebrow"><Sparkles size={15} /> Charge close to home</p><h2>Spaces that make every drive feel easier.</h2></div>
          <div className="data-state"><span className={isLive ? 'live-dot' : 'demo-dot'} />{isLive ? 'Live Supabase listings' : 'Demo listings — connect Supabase to go live'}</div>
        </div>
        <div className="charger-grid">
          {visibleChargers.map((charger) => <article className="charger-card" key={charger.id}>
            <div className="charger-image"><img src={charger.images?.[0] || demoChargers[0].images[0]} alt={charger.name} /><span>{charger.charging_power} kW</span></div>
            <div className="charger-content">
              <div className="charger-title"><div><h3>{charger.name}</h3><p><MapPin size={14} /> {charger.public_area}</p></div><b><Star size={14} fill="currentColor" /> {averageRating(charger)}</b></div>
              <div className="charger-meta"><span>{charger.connector_type}</span><span>{charger.pricing_type === 'PER_HOUR' ? 'Per hour' : 'Per kWh'}</span></div>
              <div className="charger-footer"><p><strong>₹{Number(charger.price).toLocaleString('en-IN')}</strong><small> / {charger.pricing_type === 'PER_HOUR' ? 'hour' : 'kWh'}</small></p><a href="/login">View spot <ArrowRight size={15} /></a></div>
            </div>
          </article>)}
        </div>
        {!visibleChargers.length && <div className="empty-state"><MapPin size={22} /><p>No chargers match that search yet. Try another nearby area.</p></div>}
        <div className="center-action"><a className="outline-button" href="/explore">Browse every charger <ArrowRight size={16} /></a></div>
      </section>

      <section id="how-it-works" className="how-section"><div className="shell">
        <div className="centered-heading"><p className="eyebrow"><Sparkles size={15} /> A smoother way to charge</p><h2>Plug in without the detour.</h2><p>Three small steps, one very relaxed journey.</p></div>
        <div className="step-grid">
          {[[Search, 'Find a nearby spot', 'Search trusted private chargers around the places your life takes you.'], [Clock3, 'Pick your time', 'Reserve the hours that suit your schedule and your battery.'], [Zap, 'Arrive and recharge', 'Pull in, plug in, and get back to what matters.']].map(([Icon, title, text], index) => {
            const StepIcon = Icon as typeof Search;
            return <article className="step-card" key={title as string}><span>0{index + 1}</span><div><StepIcon size={24} /><h3>{title as string}</h3><p>{text as string}</p></div></article>;
          })}
        </div>
      </div></section>

      <section id="host" className="shell host-section"><div className="host-card"><div><p className="eyebrow"><Leaf size={15} /> Share the energy</p><h2>Let your unused charger do something useful.</h2><p>Welcome other EV drivers, choose your availability and earn from the charging space you already have.</p><a href="/become-a-host" className="host-button">Become a host <ArrowRight size={17} /></a></div><div className="host-stat"><span>₹</span><strong>Earn on<br />your terms.</strong><small>You set the schedule and the rate.</small></div></div></section>

      <footer><div className="shell footer-inner"><a href="/" className="brand"><span><Zap size={18} fill="currentColor" /></span>ChargeShare</a><p>Good energy, shared.</p><small>© 2026 ChargeShare</small></div></footer>
    </main>
  );
}
