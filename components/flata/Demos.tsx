"use client";

import { useState, type FormEvent } from 'react';


export type IndustryKey = 'cleaning' | 'trades' | 'movers' | 'detailing' | 'catering';
export const demoIndustries: { slug: IndustryKey; sector: string; brand: string; tag: string; description: string; image: string }[] = [
  { slug: 'cleaning', sector: 'Cleaning', brand: 'Still & Shine', tag: 'A calmer kind of clean.', description: 'A bright cleaning concept with service comparison and a space-and-cadence planner.', image: '/assets/cleaning.webp' },
  { slug: 'trades', sector: 'Home services', brand: 'Copperline Home', tag: 'Good hands. Solid work.', description: 'A clear home-services concept with a service guide and a sample request builder.', image: '/assets/trades.webp' },
  { slug: 'movers', sector: 'Moving', brand: 'Next Chapter', tag: 'Room for what comes next.', description: 'A moving concept with an inventory, access and packing planner.', image: '/assets/movers.webp' },
  { slug: 'detailing', sector: 'Auto detailing', brand: 'Obsidian Auto Studio', tag: 'The detail is everything.', description: 'Cinematic automotive care, four detailed treatment journeys, and a personal consultation configurator on its own standalone website.', image: '/assets/detailing-standalone.webp' },
  { slug: 'catering', sector: 'Events & catering', brand: 'Gather & Grain', tag: 'A table worth gathering around.', description: 'Seasonal menus, editorial photography, and a complete event-planning journey on its own standalone website.', image: '/assets/catering-standalone.webp' },
];
export function isIndustry(value: string): value is IndustryKey {
  return demoIndustries.some((industry) => industry.slug === value);
}

type Service = { name: string; title: string; description: string };
type Concept = {
  title: [string, string]; intro: string; serviceLabel: string; plannerLabel: string;
  serviceTitle: string; serviceIntro: string; closing: string;
  process: [string, string, string]; services: Service[]; faqs: [string, string][];
};
const concepts: Record<IndustryKey, Concept> = {
  cleaning: {
    title: ['A calmer', 'kind of clean.'], intro: 'A fresh start for your home. A clear plan for the spaces you use every day.',
    serviceLabel: 'Our services', plannerLabel: 'Cleaning planner', serviceTitle: 'A little more room to breathe.',
    serviceIntro: 'Find the kind of clean that fits the space. A real service would begin with an agreed scope.',
    closing: 'Your space. Your rhythm.', process: ['Choose your space', 'Find your rhythm', 'Review the details'],
    services: [
      { name: 'Everyday clean', title: 'The regular reset.', description: 'Living areas, kitchen surfaces, bathrooms and floors. Explore a recurring rhythm for the everyday details.' },
      { name: 'Deep clean', title: 'A closer look.', description: 'A detailed fresh start for corners, surfaces and spaces that need a separate, more considered scope.' },
      { name: 'Workspace clean', title: 'Space to do good work.', description: 'Explore a recurring scope for shared spaces, desks and common areas, arranged around your working day.' },
    ],
    faqs: [
      ['What changes between cleans?', 'A recurring reset focuses on routine areas. A deep clean needs a separate scope based on the space and its condition. The sample planner helps explain the distinction.'],
      ['Is this a real cleaning booking?', 'No. Still & Shine is a fictional concept. The planner uses sample choices, collects no personal information and sends nothing.'],
      ['How would a production enquiry work?', 'A real business would confirm the areas, access, supplies, frequency, availability and price before agreeing a service.'],
    ],
  },
  trades: {
    title: ['Your home.', 'In working order.'], intro: 'Clear explanations and a useful next step for the fixes that keep life moving.',
    serviceLabel: 'Service guide', plannerLabel: 'Request simulator', serviceTitle: 'Start with the right conversation.',
    serviceIntro: 'A service guide helps describe the need. An appropriately qualified professional must assess the actual work.',
    closing: 'Get the details in order.', process: ['Describe the issue', 'Understand the service', 'Discuss an assessment'],
    services: [
      { name: 'Plumbing', title: 'Water where it belongs.', description: 'A clear service journey for leaks, fixtures and drainage enquiries. A professional would assess the cause and scope.' },
      { name: 'Electrical', title: 'The everyday essentials.', description: 'Present lighting, fixture and service enquiries clearly. An appropriately qualified professional assesses equipment and safety.' },
      { name: 'Planned maintenance', title: 'Make a plan for the details.', description: 'Explain what a recurring check might cover and the information needed to discuss a planned visit.' },
    ],
    faqs: [
      ['Can this diagnose a problem?', 'No. The guide helps describe an issue. It does not diagnose equipment, give repair instructions or verify any technician qualification.'],
      ['What about an urgent issue?', 'This demonstration cannot dispatch anyone or provide emergency advice. A production service needs verified coverage, contacts and an appropriate urgent-help process.'],
      ['Does a sample request reach a technician?', 'No. The request simulator only changes the page in your browser. Nothing is submitted, stored or booked.'],
    ],
  },
  movers: {
    title: ['Big change.', 'Softer landing.'], intro: 'From the first box to the first night in. Begin with the details that make a move feel manageable.',
    serviceLabel: 'Moving services', plannerLabel: 'Move planner', serviceTitle: 'Room for what comes next.',
    serviceIntro: 'A move is a sequence of decisions. Explore the services, then build a sample inventory and access brief.',
    closing: 'The next chapter starts with a plan.', process: ['Plan the details', 'Pack with a purpose', 'Look ahead'],
    services: [
      { name: 'Local moves', title: 'Across town. Into something new.', description: 'A sample journey for homes and apartments, starting with an inventory, access details and a route discussion.' },
      { name: 'Packing help', title: 'Think inside the box.', description: 'Explain supplies, fragile-item planning and the packing support that could be separately agreed.' },
      { name: 'Office moves', title: 'A new home for good work.', description: 'Map equipment, access and workday needs before a properly scoped business move.' },
    ],
    faqs: [
      ['Is the planner a moving estimate?', 'No. It produces a sample inventory summary, not a binding or nonbinding quote. A real mover must assess the route, access, inventory and applicable rules.'],
      ['What would a real move need?', 'Actual dates and addresses, route, access, inventory, carrier identity and written service terms. Do not enter personal details in this concept.'],
      ['Does this reserve a moving date?', 'No. No carrier service, reservation, payment or enquiry is created. Next Chapter is a fictional brand.'],
    ],
  },
  detailing: {
    title: ['Consider', 'every detail.'], intro: 'The surface. The cabin. The finish. Explore car care with a clear scope before any treatment.',
    serviceLabel: 'The treatments', plannerLabel: 'Detail configurator', serviceTitle: 'Choose the attention it needs.',
    serviceIntro: 'Different surfaces need different care. Compare the treatment focus, then assemble a sample discussion brief.',
    closing: 'The details deserve a closer look.', process: ['Choose the vehicle', 'Compare treatments', 'Review the scope'],
    services: [
      { name: 'Exterior', title: 'The surface story.', description: 'A service presentation for washing, surface preparation and finishing work. Treatment depends on an actual inspection.' },
      { name: 'Interior', title: 'A fresh perspective.', description: 'Explore cabin surfaces, upholstery care and the questions that help define an interior treatment.' },
      { name: 'Full detail', title: 'Inside. Outside. Considered.', description: 'Bring the interior and exterior journey together with a clearly agreed scope and treatment limits.' },
    ],
    faqs: [
      ['Can I book a slot here?', 'No. The configurator produces a sample plan. It does not check a live calendar, accept money or confirm a vehicle appointment.'],
      ['Is a finish or protection guaranteed?', 'No. An actual studio must inspect the vehicle, agree the treatment and explain product limits before making a claim.'],
      ['Are these priced packages?', 'No. These are demonstration treatment categories. A real studio would assess condition and confirm scope, suitability and pricing.'],
    ],
  },
  catering: {
    title: ['Good food.', 'Good company.'], intro: 'Thoughtful menus for the moments that bring people together. Start with the occasion and make room at the table.',
    serviceLabel: 'The menu', plannerLabel: 'Gathering planner', serviceTitle: 'Food for the occasion.',
    serviceIntro: 'Browse three illustrative menu directions, then shape a sample gathering around your occasion and guest count.',
    closing: 'A table worth gathering around.', process: ['Set the occasion', 'Explore the menu', 'Gather the details'],
    services: [
      { name: 'Social gatherings', title: 'A reason to come together.', description: 'A considered menu structure for birthdays, celebrations and dinners with the people you love.' },
      { name: 'Workplace tables', title: 'A better lunch meeting.', description: 'Explore meeting menus, service formats and the details an organiser needs to plan ahead.' },
      { name: 'Celebration feasts', title: 'Make a day of it.', description: 'Explore a shared-table menu brief. Actual ingredients, availability and pricing need direct confirmation.' },
    ],
    faqs: [
      ['Are these real menu offers?', 'No. These are illustrative concepts. A real caterer would confirm ingredients, availability, allergen information, dietary handling and pricing.'],
      ['Does a menu plan reserve a date?', 'No. The planner creates an on-screen sample brief. No booking, deposit, order or event commitment is made.'],
      ['Can you assure a dietary requirement?', 'This fictional concept makes no dietary, ingredient or allergen assurances. A real provider would need to confirm your requirements and handling arrangements.'],
    ],
  },
};
const menus = [
  { name: 'Garden table', dishes: ['Roasted seasonal vegetables', 'Lemon-herb grain salad', 'Citrus & greens'] },
  { name: 'Comfort & company', dishes: ['Herb-roasted chicken concept', 'Crushed potatoes', 'Apple & leaf salad'] },
  { name: 'Small bites, big occasion', dishes: ['Tomato & herb tartlets', 'Mini savoury pastries', 'Seasonal fruit bites'] },
];
type SampleValues = Record<string, string | number | boolean>;
const defaults: Record<IndustryKey, SampleValues> = {
  cleaning: { space: 'Small apartment', service: 'Everyday clean', frequency: 'Weekly' },
  trades: { service: 'Plumbing', issue: 'Something is not working normally', timing: 'Discuss a planned visit' },
  movers: { home: 'Studio', access: 'Ground floor', boxes: 15, packing: false, fragile: false },
  detailing: { vehicle: 'Coupe / sedan', service: 'Exterior', upholstery: false, finish: false },
  catering: { occasion: 'Social celebration', guests: 25, menu: 'Garden table', format: 'Shared table' },
};
const plannerTitles: Record<IndustryKey, string> = {
  cleaning: 'Find your cleaning rhythm.', trades: 'Describe. Understand. Plan.', movers: 'A little planning. A better move.', detailing: 'Make it your detail.', catering: 'Begin with a gathering.',
};
function path(slug: IndustryKey, section = '') { return `/demos/${slug}${section ? `/${section}` : ''}`; }
function DemoHeader({ slug, section }: { slug: IndustryKey; section: string }) {
  const industry = demoIndustries.find((item) => item.slug === slug)!;
  const config = concepts[slug];
  const links = [['', 'Home'], ['services', config.serviceLabel], ['planner', config.plannerLabel]];
  return <>
    <div className="concept-collection-bar"><a href="/portfolio"><img src="/assets/flata-mark.svg" alt="Flata" width="20" height="20" />Back to Flata</a><span>Fictional concept. Simulated interactions.</span></div>
    <a className="concept-skip" href="#concept-content">Skip to content</a>
    <header className="concept-header">
      <a className="concept-wordmark" href={path(slug)}>{industry.brand}<span>{industry.sector}</span></a>
      <nav className="concept-desktop-nav" aria-label={`${industry.brand} navigation`}>{links.map(([route, title]) => <a key={route} href={path(slug, route)} aria-current={section === (route || 'home') ? 'page' : undefined}>{title}</a>)}</nav>
      <details className="concept-mobile-nav"><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Concept mobile navigation">{links.map(([route, title]) => <a key={route} href={path(slug, route)} aria-current={section === (route || 'home') ? 'page' : undefined}>{title}</a>)}</nav></details>
    </header>
  </>;
}
function DemoFooter({ slug }: { slug: IndustryKey }) {
  const industry = demoIndustries.find((item) => item.slug === slug)!;
  return <footer className="concept-footer">
    <div className="concept-footer-top"><div><a href={path(slug)} className="concept-footer-brand">{industry.brand}</a><p>{industry.tag}</p></div><nav aria-label="Concept footer"><a href={path(slug, 'services')}>{concepts[slug].serviceLabel} ↗</a><a href={path(slug, 'planner')}>{concepts[slug].plannerLabel} ↗</a><a href="/portfolio">Back to Flata ↗</a></nav></div>
    <p className="concept-disclosure">An independently created fictional concept by Flata Software. Not a real operating business or commissioned client project. Images are illustrative. All requests are simulated: nothing is sent, stored, booked or paid. No personal information is collected.</p>
  </footer>;
}
function ServiceRows({ slug, detail = false }: { slug: IndustryKey; detail?: boolean }) {
  return <div className={`concept-service-list ${detail ? 'concept-service-list-full' : ''}`}>{concepts[slug].services.map((service) => <article key={service.name} className="concept-service-row"><p className="concept-service-name">{service.name}</p><div><h3>{service.title}</h3><p>{service.description}</p></div><a href={path(slug, 'planner')} aria-label={`Try the ${service.name.toLowerCase()} sample planner`}>Try the planner <span aria-hidden="true">↗</span></a></article>)}</div>;
}
function Faqs({ slug }: { slug: IndustryKey }) {
  return <section className="concept-faq"><h2>Before the next step.</h2><div>{concepts[slug].faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>;
}
function Menus() {
  return <section className="concept-menu-section"><h2>A taste of the possibilities.</h2><p className="concept-menu-intro">Illustrative menus for this fictional concept. Ingredients, dietary handling and availability require real confirmation.</p><div className="concept-menu-grid">{menus.map((menu, index) => <article key={menu.name}><span className="concept-menu-mark" aria-hidden="true">{['◌', '◒', '✳'][index]}</span><h3>{menu.name}</h3><ul>{menu.dishes.map((dish) => <li key={dish}>{dish}</li>)}</ul><a href={path('catering', 'planner')}>Try the planner ↗</a></article>)}</div></section>;
}
function ConceptHome({ slug }: { slug: IndustryKey }) {
  const industry = demoIndustries.find((item) => item.slug === slug)!;
  const config = concepts[slug];
  return <>
    <section className="concept-hero">
      <div className="concept-hero-copy"><h1><span>{config.title[0]}</span><span>{config.title[1]}</span></h1><p>{config.intro}</p><a className="concept-hero-cta" href={path(slug, 'planner')}>Try the planner <span aria-hidden="true">↗</span></a></div>
      <figure className="concept-hero-image"><img src={industry.image} alt={`Illustrative ${industry.sector.toLowerCase()} scene for the fictional ${industry.brand} concept`} fetchPriority="high" /></figure>
    </section>
    <div className="concept-process" aria-label="Sample customer journey">{config.process.map((step) => <span key={step}>{step}<b aria-hidden="true">↗</b></span>)}</div>
    <section className="concept-home-services"><div className="concept-services-intro"><h2>{config.serviceTitle}</h2><p>{config.serviceIntro}</p><a href={path(slug, 'services')}>Explore services ↗</a></div><ServiceRows slug={slug} /></section>
    {slug === 'catering' && <Menus />}
    {slug === 'detailing' && <section className="concept-inspection"><p>Condition comes first.</p><h2>A finish begins with an inspection.</h2><p>No treatment guarantee. No one-size-fits-all package. A real studio would agree the work after seeing the vehicle.</p></section>}
    <Faqs slug={slug} />
    <section className="concept-closing"><h2>{config.closing}</h2><div><a href={path(slug, 'planner')}>Try the planner <span aria-hidden="true">↗</span></a><p>Sample choices only. No booking is created.</p></div></section>
  </>;
}
function ConceptServices({ slug }: { slug: IndustryKey }) {
  const industry = demoIndustries.find((item) => item.slug === slug)!;
  const config = concepts[slug];
  return <>
    <section className="concept-inner-hero"><p>{config.serviceLabel}</p><h1>{config.serviceTitle}</h1><div className="concept-inner-intro">{config.serviceIntro}</div></section>
    <section className="concept-services-page"><figure><img src={industry.image} alt={`Illustrative ${industry.sector.toLowerCase()} concept photography`} loading="lazy" /></figure><ServiceRows slug={slug} detail /></section>
    {slug === 'detailing' && <section className="concept-comparison"><h2>Find your treatment focus.</h2><div className="concept-table-scroll"><table><caption>Illustrative service comparison. Final treatment depends on inspection.</caption><thead><tr><th scope="col">Focus</th><th scope="col">Exterior</th><th scope="col">Interior</th><th scope="col">Full detail</th></tr></thead><tbody><tr><th scope="row">Exterior surfaces</th><td>Discuss</td><td>Separate scope</td><td>Discuss</td></tr><tr><th scope="row">Cabin surfaces</th><td>Separate scope</td><td>Discuss</td><td>Discuss</td></tr><tr><th scope="row">Upholstery care</th><td>On assessment</td><td>On assessment</td><td>On assessment</td></tr><tr><th scope="row">Finish suitability</th><td>Inspect first</td><td>Inspect first</td><td>Inspect first</td></tr></tbody></table></div><a href={path(slug, 'planner')}>Try the planner ↗</a></section>}
    {slug === 'catering' && <Menus />}
    <Faqs slug={slug} />
    <section className="concept-closing"><h2>{config.closing}</h2><div><a href={path(slug, 'planner')}>Try the planner <span aria-hidden="true">↗</span></a><p>An on-screen sample, with no real submission.</p></div></section>
  </>;
}

type ControlProps = { id: string; label: string; value: string; options: string[]; onChange: (value: string) => void };
function Choice({ id, label, value, options, onChange }: ControlProps) {
  return <div className="concept-field"><label htmlFor={`sample-${id}`}>{label}</label><select id={`sample-${id}`} value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>;
}
function Toggle({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="concept-toggle" htmlFor={`sample-${id}`}><input id={`sample-${id}`} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span>{label}</span></label>;
}
function Slider({ id, label, value, min, max, onChange }: { id: string; label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return <div className="concept-field concept-range"><label htmlFor={`sample-${id}`}>{label}<output htmlFor={`sample-${id}`}>{value}</output></label><input id={`sample-${id}`} type="range" min={min} max={max} step={5} value={value} onChange={(event) => onChange(Number(event.target.value))} /><div aria-hidden="true"><span>{min}</span><span>{max}</span></div></div>;
}
function sampleSummary(slug: IndustryKey, values: SampleValues): { title: string; rows: [string, string][]; next: string } {
  const text = (key: string) => String(values[key]);
  switch (slug) {
    case 'cleaning': return { title: text('service'), rows: [['Sample space', text('space')], ['Rhythm', text('frequency')]], next: 'Agree the areas, access and cleaning scope.' };
    case 'trades': return { title: text('service'), rows: [['Sample issue', text('issue')], ['Request preference', text('timing')]], next: 'Describe the issue to an appropriately qualified service professional.' };
    case 'movers': return { title: 'Your sample move', rows: [['Home', text('home')], ['Access', text('access')], ['Sample boxes', text('boxes')], ['Packing', values.packing ? 'Discuss packing support' : 'Standard inventory discussion'], ['Fragile items', values.fragile ? 'Add item-specific planning' : 'No extra sample selection']], next: 'A real mover would assess route, access and inventory before pricing.' };
    case 'detailing': return { title: text('service'), rows: [['Vehicle', text('vehicle')], ['Upholstery', values.upholstery ? 'Add a care discussion' : 'No extra sample selection'], ['Finish', values.finish ? 'Add a finish assessment' : 'Standard inspection']], next: 'An actual studio would inspect condition and confirm treatment suitability.' };
    case 'catering': return { title: text('menu'), rows: [['Occasion', text('occasion')], ['Sample guests', text('guests')], ['Format', text('format')], ['Illustrative menu', menus.find((menu) => menu.name === text('menu'))!.dishes.join(' · ')]], next: 'Discuss real ingredients, dietary requirements, availability and pricing.' };
  }
}
function Planner({ slug }: { slug: IndustryKey }) {
  const [values, setValues] = useState<SampleValues>(() => ({ ...defaults[slug] }));
  const [state, setState] = useState<'editing' | 'complete' | 'reset'>('editing');
  const summary = sampleSummary(slug, values);
  const change = (key: string, value: string | number | boolean) => { setValues((previous) => ({ ...previous, [key]: value })); setState('editing'); };
  const select = (id: string, label: string, options: string[]) => <Choice id={id} label={label} value={String(values[id])} options={options} onChange={(value) => change(id, value)} />;
  const toggle = (id: string, label: string) => <Toggle id={id} label={label} checked={Boolean(values[id])} onChange={(checked) => change(id, checked)} />;
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setState('complete'); };
  const reset = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setValues({ ...defaults[slug] }); setState('reset'); };
  return <>
    <section className="concept-planner-title"><p>{concepts[slug].plannerLabel}</p><h1>{plannerTitles[slug]}</h1><div>Choose sample options and watch the plan change. No personal information is requested.</div></section>
    <section className="concept-planner-layout">
      <form className="concept-planner-form" onSubmit={submit} onReset={reset}>
        {slug === 'cleaning' && <><fieldset><legend>Your sample space</legend>{select('space', 'Space', ['Small apartment', 'Family home', 'Small workspace'])}</fieldset><fieldset><legend>The kind of clean</legend>{select('service', 'Cleaning type', ['Everyday clean', 'Deep clean', 'Workspace clean'])}{select('frequency', 'Rhythm', ['Weekly', 'Every two weeks', 'One-time reset'])}</fieldset></>}
        {slug === 'trades' && <><fieldset><legend>The service conversation</legend>{select('service', 'Service area', ['Plumbing', 'Electrical', 'Planned maintenance'])}{select('issue', 'What would you describe?', ['Something is not working normally', 'A fixture needs attention', 'Planning a maintenance check'])}</fieldset><fieldset><legend>A suitable next step</legend>{select('timing', 'Request preference', ['Discuss a planned visit', 'Ask what information is needed'])}<p className="concept-field-note">No emergency advice or equipment diagnosis. This demo cannot dispatch a technician.</p></fieldset></>}
        {slug === 'movers' && <><fieldset><legend>Your sample move</legend>{select('home', 'Home size', ['Studio', '1 bedroom', '2 bedrooms', '3 bedrooms'])}{select('access', 'Access', ['Ground floor', 'Elevator available', 'Stairs involved'])}</fieldset><fieldset><legend>The sample inventory</legend><Slider id="boxes" label="Sample boxes" min={0} max={80} value={Number(values.boxes)} onChange={(value) => change('boxes', value)} />{toggle('packing', 'Include a packing-support discussion')}{toggle('fragile', 'Include fragile-item planning')}</fieldset></>}
        {slug === 'detailing' && <><fieldset><legend>The vehicle</legend>{select('vehicle', 'Vehicle class', ['Coupe / sedan', 'SUV / crossover', 'Truck / large vehicle'])}</fieldset><fieldset><legend>The attention</legend>{select('service', 'Treatment focus', ['Exterior', 'Interior', 'Full detail'])}{toggle('upholstery', 'Add an upholstery-care discussion')}{toggle('finish', 'Add a finish-assessment discussion')}<p className="concept-field-note">Final treatment and pricing require an actual inspection. No appointment is created.</p></fieldset></>}
        {slug === 'catering' && <><fieldset><legend>The gathering</legend>{select('occasion', 'Occasion', ['Social celebration', 'Workplace lunch', 'Shared-table dinner'])}<Slider id="guests" label="Sample guests" min={10} max={150} value={Number(values.guests)} onChange={(value) => change('guests', value)} /></fieldset><fieldset><legend>The menu direction</legend>{select('menu', 'Menu style', menus.map((menu) => menu.name))}{select('format', 'Service format', ['Shared table', 'Buffet concept', 'Individual lunch concept'])}<p className="concept-field-note">Illustrative menus only. No ingredient, allergen, dietary or availability assurance.</p></fieldset></>}
        <div className="concept-form-actions"><button className="concept-preview-submit" type="submit">Preview sample <span aria-hidden="true">↗</span></button><button className="concept-reset" type="reset">Reset sample</button></div>
      </form>
      <aside className="concept-sample-preview" aria-label="Your sample plan"><div className="concept-preview-heading"><span>Your sample plan</span><span aria-hidden="true">↗</span></div><h2>{summary.title}</h2><dl>{summary.rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><div className="concept-next-step"><h3>A real next step</h3><p>{summary.next}</p></div><p className={`concept-plan-status ${state === 'complete' ? 'concept-plan-complete' : ''}`} role="status" aria-live="polite">{state === 'complete' ? 'Simulation complete. Your sample request is shown above. Nothing has been sent, stored or booked.' : state === 'reset' ? 'Sample reset to the starting choices. Nothing has been sent or stored.' : 'Sample plan updated. Choose Preview sample to complete the simulated journey.'}</p><p className="concept-preview-disclosure">This is a simulation. No appointment, enquiry, payment or event order is created.</p><a className="concept-builder-link" href="/contact">Want a site like this? Talk to Flata ↗</a></aside>
    </section>
    <Faqs slug={slug} />
  </>;
}
export function DemoPage({ slug, section = 'home' }: { slug: IndustryKey; section?: string }) {
  const current = section === 'services' || section === 'planner' ? section : 'home';
  return <div className={`concept concept-${slug}`}><DemoHeader slug={slug} section={current} /><main id="concept-content">{current === 'planner' ? <Planner key={slug} slug={slug} /> : current === 'services' ? <ConceptServices slug={slug} /> : <ConceptHome slug={slug} />}</main><DemoFooter slug={slug} /></div>;
}
