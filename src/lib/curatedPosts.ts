import { BlogPost, JobPost } from "./types";

export const CURATED_POSTS: BlogPost[] = [
  {
    id: "curated-1",
    title: "The Shadow War Over Semiconductor Supply Chains Is Reshaping Global Alliances",
    description:
      "How the geopolitical tug-of-war between the US, China, and Taiwan over advanced chip fabrication is redrawing the map of international diplomacy and forcing nations to choose sides in the silicon cold war.",
    content: `
# The New Geography of Power Runs Through Foundries

The twenty-first century's most consequential conflict isn't being fought with missiles or trade tariffs alone — it's being waged in the sterile cleanrooms of semiconductor fabrication plants. Taiwan Semiconductor Manufacturing Company (TSMC), which produces over 90% of the world's most advanced processors, has become the fulcrum upon which global power balances.

### The Strategic Chokepoint

When the US imposed export controls on advanced chip-making equipment to China in October 2022, it wasn't merely a trade restriction — it was the most significant act of technological containment since the Cold War. The reverberations are still cascading:

- **Japan and the Netherlands** aligned with Washington to restrict lithography equipment exports, fundamentally altering their decades-long trade relationships with Beijing
- **India** accelerated its semiconductor incentive program to $10 billion, positioning itself as an alternative manufacturing hub
- **The European Chips Act** committed €43 billion to reduce dependency on Asian fabrication

> "Whoever controls the supply of advanced semiconductors controls the trajectory of artificial intelligence, autonomous systems, and national security infrastructure for the next half-century."

### The Taiwan Variable

The strategic ambiguity surrounding Taiwan's sovereignty has transformed from a diplomatic nuance into an existential economic question. A disruption to TSMC's operations — whether through conflict, blockade, or natural disaster — would trigger a global economic contraction estimated at $1.6 trillion in the first year alone.

### Implications for the Emerging Order

The semiconductor rivalry is compelling a fundamental restructuring of globalization itself. The era of frictionless supply chains is yielding to "friend-shoring" and "near-shoring" — relocating production to geopolitically aligned nations rather than the cheapest bidder. This shift will define the economic architecture of the 2030s.
    `,
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    category: "Geo Politics",
    tags: ["Semiconductors", "China", "Taiwan", "Trade War", "Geopolitics"],
    author: {
      name: "Alexander Novak",
      role: "Geopolitical Strategy Analyst",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "2 hours ago",
    readingTime: "8 min read",
    reactionsCount: 3420,
    commentsCount: 196,
    url: "#",
    source: "Content Hub Intelligence",
    apiSource: "Editorial Bureau",
    featured: true,
    metrics: { views: "48.2k", shares: "4.1k", impactScore: 99 },
  },
  {
    id: "curated-2",
    title: "Climate Negotiations Fracture as Developing Nations Demand $1.3 Trillion in Loss and Damage",
    description:
      "The widening rift between the Global North and South over climate finance is threatening to collapse the entire Paris Agreement framework, with island nations warning of civilizational extinction.",
    content: `
# The Moral Arithmetic of Climate Justice

At the latest UN Climate Summit, the veneer of diplomatic unity cracked wide open. Developing nations — many of which contributed least to historical carbon emissions but bear the heaviest consequences — presented a unified demand: $1.3 trillion annually in loss and damage funding from industrialized nations.

### The Case for Climate Reparations

The argument is straightforward in its moral clarity. The fifty most climate-vulnerable nations are responsible for less than 1% of cumulative global emissions, yet they face:
- Rising sea levels threatening the physical existence of island states like Tuvalu and the Marshall Islands
- Agricultural collapse across sub-Saharan Africa affecting 250 million people
- Intensifying cyclone corridors devastating South and Southeast Asian coastal communities

### The Resistance from Wealthy Nations

The United States, European Union, and Japan have countered with proposals totaling approximately $100 billion — a figure climate economists describe as "symbolic but structurally inadequate." The gap between demand and offer isn't merely financial; it represents fundamentally different understandings of historical responsibility.

> "We did not light the fire, but our homes are burning. To ask us to be patient while you debate the cost of a fire extinguisher is not diplomacy — it is cruelty."

### What Happens Next

If the funding gap remains unresolved, several developing nations have signaled they may withdraw from Paris Agreement commitments entirely, pursuing rapid industrialization without emissions constraints. The irony would be devastating: the failure to fund climate adaptation could accelerate the very emissions the agreement was designed to prevent.
    `,
    coverImage: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1200&auto=format&fit=crop",
    category: "Current Affairs",
    tags: ["Climate Change", "UN Summit", "Paris Agreement", "Global South"],
    author: {
      name: "Dr. Amara Osei",
      role: "Climate Policy Fellow",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "4 hours ago",
    readingTime: "7 min read",
    reactionsCount: 2890,
    commentsCount: 167,
    url: "#",
    source: "Content Hub Current Affairs",
    apiSource: "Editorial Bureau",
    featured: true,
    metrics: { views: "34.1k", shares: "3.4k", impactScore: 98 },
  },
  {
    id: "curated-3",
    title: "Bitcoin's Fourth Halving Ignites Institutional Scramble as ETF Inflows Shatter Records",
    description:
      "The confluence of Bitcoin's programmatic supply reduction, unprecedented institutional adoption through spot ETFs, and macroeconomic uncertainty is creating what analysts call a 'perfect monetary storm.'",
    content: `
# The Mathematics of Digital Scarcity

Bitcoin's fourth halving event — reducing the mining reward from 6.25 to 3.125 BTC per block — has triggered a seismic realignment in global capital allocation. For the first time in its fifteen-year history, this supply shock is occurring against a backdrop of fully regulated institutional access through spot ETFs.

### The ETF Effect

Since the SEC approved spot Bitcoin ETFs, cumulative inflows have exceeded $67 billion:
- **BlackRock's IBIT** alone holds more Bitcoin than the estimated reserves of El Salvador and MicroStrategy combined
- Daily trading volumes regularly exceed $3 billion, rivaling established equity ETFs
- The average holder demographic has shifted dramatically — 40% of new Bitcoin investors are over 45

### The Supply Crunch Thesis

Post-halving, Bitcoin's annual inflation rate has fallen below 1% — making it mathematically scarcer than gold for the first time. With approximately 19.7 million of the maximum 21 million coins already mined, the remaining supply will be distributed over the next 116 years.

> "We are witnessing the first programmatically verifiable scarce asset compete for allocation against assets with discretionary supply management. The implications for portfolio theory are profound."

### Risks and Counter-Arguments

Critics point to regulatory uncertainty, quantum computing threats, and the environmental footprint of proof-of-work mining. Yet the market's response has been unambiguous: capital is flowing toward digital scarcity at an accelerating rate, regardless of these objections.
    `,
    coverImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop",
    category: "Crypto & Web3",
    tags: ["Bitcoin", "ETF", "Halving", "Institutional", "DeFi"],
    author: {
      name: "Marcus Chen",
      role: "Digital Assets Strategist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "3 hours ago",
    readingTime: "6 min read",
    reactionsCount: 4100,
    commentsCount: 312,
    url: "#",
    source: "Content Hub Crypto Desk",
    apiSource: "Market Intelligence",
    featured: true,
    metrics: { views: "52.3k", shares: "5.8k", impactScore: 99 },
  },
  {
    id: "curated-4",
    title: "The Renaissance of Digital Typography: Beyond the Monospace Aesthetic",
    description:
      "How contemporary editorial web spaces are fusing Swiss modernist grid systems with high-contrast serif flourishes to evoke emotional weight in modern software interfaces.",
    content: `
# The Architecture of Modern Visual Resonance

In an era saturated by standardized component libraries and homogenous interfaces, a quiet insurrection is occurring across editorial design. Modern digital publications are abandoning sterile predictability in favor of deliberate tension: pairing razor-sharp technical typography with expressive, high-contrast serif typefaces.

### The Contrast of Form and Function

The human eye does not consume digital information in linear isolation. We interpret rhythmic cadence, spatial breathing room, and typographic contrast. By anchoring expansive editorial narratives with fonts like *Instrument Serif* alongside high-legibility geometric sans-serifs, readers experience both immediacy and contemplation.

> "A great interface is not merely invisible; it possesses an atmosphere, a texture that honors the reader's intellect."

### The Return of the Grid

Early web designers wrestled with rigid table layouts, followed by the fluid chaos of responsive floats. Today, modern CSS subgrid and CSS variables empower designers to craft layouts reminiscent of 1960s Italian architecture monographs:
- Asymmetrical card distribution with calibrated vertical offsets
- High-contrast chromatic accents against obsidian voids
- Ambient luminosity that directs focal attention without visual fatigue

As we construct software interfaces in 2026, the challenge is not computational capability; it is poetic intentionality.
    `,
    coverImage: "https://images.unsplash.com/photo-1507842229451-7f01be837a27?q=80&w=1200&auto=format&fit=crop",
    category: "Design & UI",
    tags: ["Typography", "Design Systems", "Aesthetics", "Editorial"],
    author: {
      name: "Valentin Moreau",
      role: "Design Director, Atelier Lumière",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "5 hours ago",
    readingTime: "6 min read",
    reactionsCount: 1420,
    commentsCount: 84,
    url: "#",
    source: "Content Hub Design",
    apiSource: "Editorial Bureau",
    metrics: { views: "18.4k", shares: "1.2k", impactScore: 96 },
  },
  {
    id: "curated-5",
    title: "Autonomous Agents and the Collapse of the Traditional Software Development Cycle",
    description:
      "Multi-modal AI agents capable of writing, testing, and deploying entire codebases are forcing a fundamental rethink of what it means to be a software engineer in 2026.",
    content: `
# The Post-Programmer Paradox

The traditional software development lifecycle — design, implement, test, deploy — assumed a human at every stage. That assumption is dissolving. Modern autonomous agents don't merely assist developers; they reason about architectural trade-offs, generate production-grade implementations, and self-correct through iterative feedback loops.

### What Changed

The breakthrough wasn't any single model improvement. It was the convergence of three capabilities:
- **Extended context windows** enabling agents to reason about entire codebases, not just snippets
- **Tool-use protocols** allowing agents to interact with databases, APIs, and deployment pipelines
- **Recursive self-improvement** where agents evaluate and refine their own outputs through automated testing

### The New Role of the Engineer

Software engineering is evolving from "writing code" to "directing intelligence." The most effective engineers in 2026 are those who:
1. Define precise specifications and constraints
2. Evaluate architectural decisions made by AI systems
3. Curate and validate outputs rather than producing them from scratch

> "The keyboard is no longer the bottleneck. Judgment is."

### The Economic Implications

Companies that adopt agent-augmented development are reporting 3-5x productivity gains. But the disruption is uneven — routine implementation work is being automated fastest, while systems architecture, product strategy, and user research remain deeply human endeavors.
    `,
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    category: "Tech & AI",
    tags: ["AI Agents", "Software Engineering", "Automation", "Future of Work"],
    author: {
      name: "Dr. Elena Rostova",
      role: "AI Systems Researcher & Fellow",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "6 hours ago",
    readingTime: "8 min read",
    reactionsCount: 5200,
    commentsCount: 384,
    url: "#",
    source: "Content Hub Tech",
    apiSource: "AI Research Index",
    featured: true,
    metrics: { views: "67.8k", shares: "7.2k", impactScore: 100 },
  },
  {
    id: "curated-6",
    title: "The Quiet Revolution in Longevity Science: Reprogramming Aging at the Cellular Level",
    description:
      "Yamanaka factors, senolytics, and epigenetic reprogramming are transitioning from laboratory curiosities to clinical realities, with the first human trials showing measurable age reversal.",
    content: `
# Beyond Extension: The Science of Reversal

For most of human history, aging was considered inevitable — a one-way thermodynamic process. That assumption is being dismantled. Researchers at Harvard, Stanford, and the Altos Labs are demonstrating that biological age is not a fixed trajectory but a modifiable state.

### Epigenetic Reprogramming

The breakthrough centers on Yamanaka factors — four transcription factors (Oct4, Sox2, Klf4, c-Myc) that can reprogram adult cells back to a pluripotent state. Partial reprogramming — applying these factors briefly rather than completely — appears to reverse cellular aging markers without causing cells to lose their identity.

### Clinical Results

The first Phase II human trials have reported:
- 2.5-year reduction in biological age (measured by epigenetic clocks) over 12 months
- Significant improvement in immune function metrics in participants over 65
- Reduced inflammatory markers associated with age-related disease

> "We are not trying to make people immortal. We are trying to make the last decades of life indistinguishable from the middle decades."

### The Ethical Landscape

If aging becomes treatable, the social implications are staggering: pension systems, healthcare economics, intergenerational wealth transfer, and even the philosophical meaning of a human lifespan would require fundamental reconsideration.
    `,
    coverImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1200&auto=format&fit=crop",
    category: "Science & Space",
    tags: ["Longevity", "Epigenetics", "Biotech", "Health"],
    author: {
      name: "Dr. Sarah Kimura",
      role: "Biomedical Science Editor",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "8 hours ago",
    readingTime: "7 min read",
    reactionsCount: 3800,
    commentsCount: 215,
    url: "#",
    source: "Content Hub Science",
    apiSource: "Research Feed",
    metrics: { views: "42.5k", shares: "4.6k", impactScore: 97 },
  },
  {
    id: "curated-7",
    title: "India's Election Results Signal a Tectonic Shift in South Asian Power Dynamics",
    description:
      "The world's largest democracy delivers a verdict that recalibrates relationships with China, Pakistan, and the broader Indo-Pacific, with profound implications for the global order.",
    content: `
# Democracy at Scale

When 970 million eligible voters participate in a democratic exercise, the signal is not merely political — it is civilizational. India's latest general election has produced a mandate that will reshape the country's foreign policy posture, economic priorities, and role in multilateral institutions.

### Key Outcomes

The electoral verdict reflects a population navigating between aspirational modernization and deep-rooted social identities:
- Economic growth averaging 7.2% has been the government's strongest argument for continuity
- Youth unemployment at 23% among graduates represents the most significant counter-narrative
- Rural-urban divides are widening, with metropolitan constituencies diverging sharply from agricultural heartlands

### The Indo-Pacific Recalibration

The election's foreign policy implications are immediate:
- Deepened engagement with the Quad alliance (US, Japan, Australia, India)
- Strategic recalibration of the relationship with Russia amid the Ukraine conflict
- Accelerated defense manufacturing partnerships with France, Israel, and the UK

> "India's democratic verdict doesn't just determine who governs New Delhi — it influences the balance of power across the entire Indo-Pacific."

### What the World Is Watching

For global markets, the continuity factor matters most. India has become the fifth-largest economy and is on track to become the third-largest by 2028. Political stability signals sustained reform momentum; disruption signals volatility.
    `,
    coverImage: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1200&auto=format&fit=crop",
    category: "Current Affairs",
    tags: ["India", "Elections", "Democracy", "Indo-Pacific"],
    author: {
      name: "Priya Sharma",
      role: "South Asia Bureau Chief",
      avatar: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "10 hours ago",
    readingTime: "9 min read",
    reactionsCount: 2650,
    commentsCount: 189,
    url: "#",
    source: "Content Hub Current Affairs",
    apiSource: "Editorial Bureau",
    metrics: { views: "38.7k", shares: "3.2k", impactScore: 96 },
  },
  {
    id: "curated-8",
    title: "Ethereum's Dencun Upgrade Slashes Layer-2 Costs by 98% — What It Means for Mass Adoption",
    description:
      "The introduction of proto-danksharding has transformed Ethereum's economics, making decentralized applications accessible at price points that rival traditional cloud services.",
    content: `
# The Infrastructure Upgrade That Changed Everything

For years, Ethereum's critics pointed to a single, devastating number: the average gas fee. At peak congestion, simple token transfers cost $50-100, effectively pricing out the majority of the world's population. The Dencun upgrade, implementing EIP-4844 (proto-danksharding), has fundamentally altered this equation.

### The Numbers

Post-Dencun, Layer-2 transaction costs have collapsed:
- **Arbitrum**: Average transaction cost dropped from $0.25 to $0.003
- **Optimism**: Sub-cent transactions became the norm
- **Base**: Coinbase's L2 now processes transactions for under $0.001

### Why This Matters Beyond Crypto

The cost reduction isn't merely a technical achievement — it's an accessibility revolution:
- Micropayments for content creators become economically viable
- Supply chain verification for small businesses is no longer prohibitively expensive
- Identity verification systems can serve populations in developing nations

> "When the cost of trust verification approaches zero, entirely new categories of economic activity become possible."

### The Road to Full Danksharding

Proto-danksharding is a stepping stone. Full danksharding, expected in 2025-2026, will further increase Ethereum's data availability by orders of magnitude, potentially enabling the network to process millions of transactions per second across its Layer-2 ecosystem.
    `,
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
    category: "Crypto & Web3",
    tags: ["Ethereum", "Dencun", "Layer-2", "DeFi", "Blockchain"],
    author: {
      name: "Jordan Blake",
      role: "DeFi Protocol Analyst",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "12 hours ago",
    readingTime: "6 min read",
    reactionsCount: 3100,
    commentsCount: 240,
    url: "#",
    source: "Content Hub Crypto Desk",
    apiSource: "DeFi Analytics",
    metrics: { views: "41.9k", shares: "4.7k", impactScore: 98 },
  },
  {
    id: "curated-9",
    title: "The Mental Health Pandemic Nobody Is Talking About: Screen Time and Adolescent Brain Development",
    description:
      "Longitudinal neuroimaging studies reveal structural brain changes in teenagers exposed to more than 4 hours of daily screen time, raising urgent questions about digital childhood.",
    content: `
# The Invisible Epidemic

While the world focused on infectious disease, another health crisis was metastasizing in plain sight. Adolescent mental health indicators have deteriorated dramatically since 2012 — precisely coinciding with smartphone saturation among teenagers.

### The Neuroimaging Evidence

A landmark longitudinal study tracking 11,000 adolescents over five years has revealed concerning patterns:
- Thinning of the prefrontal cortex (associated with impulse control and decision-making) in heavy screen users
- Reduced connectivity between the amygdala and frontal regions, correlating with increased anxiety
- Altered dopaminergic pathways resembling early-stage patterns seen in substance dependency

### The Social Media Amplifier

The screen time effect is not uniform — passive social media consumption shows the strongest negative correlations:
- Teenage girls exposed to appearance-comparison content show 3x higher rates of body dysmorphia
- Algorithmically curated feeds create engagement loops that displace sleep, physical activity, and in-person socialization
- The average teenager now spends more time on screens than in school

> "We would never allow a pharmaceutical company to conduct an uncontrolled experiment on a billion adolescent brains. Yet that is precisely what we have permitted technology companies to do."

### Policy Responses

Several nations are now implementing age-verification requirements and screen time restrictions for minors. Australia has proposed banning social media for users under 16 — a move that has ignited fierce debate about parental rights, corporate responsibility, and childhood autonomy.
    `,
    coverImage: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=1200&auto=format&fit=crop",
    category: "Health & Wellness",
    tags: ["Mental Health", "Screen Time", "Neuroscience", "Youth"],
    author: {
      name: "Dr. Maya Patel",
      role: "Adolescent Psychiatry Researcher",
      avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "14 hours ago",
    readingTime: "7 min read",
    reactionsCount: 4500,
    commentsCount: 342,
    url: "#",
    source: "Content Hub Health",
    apiSource: "Medical Journal Feed",
    metrics: { views: "56.3k", shares: "6.1k", impactScore: 99 },
  },
  {
    id: "curated-10",
    title: "The $50 Billion Venture Capital Reset: Why Silicon Valley's Funding Model Is Broken",
    description:
      "After two years of contraction, the venture capital industry is confronting an uncomfortable truth — the growth-at-all-costs playbook that minted unicorns is producing a generation of zombie companies.",
    content: `
# The Reckoning

Between 2020 and 2022, venture capital firms deployed over $600 billion globally, fueled by zero-interest-rate monetary policy and FOMO-driven allocation. The hangover is severe.

### The Zombie Unicorn Problem

Of the approximately 1,200 companies valued at $1 billion or more during the peak, analysis suggests:
- Fewer than 30% can justify their valuations based on current revenue multiples
- Approximately 200 "unicorns" have not raised new funding in over 24 months and are quietly reducing burn
- Secondary market transactions are occurring at 40-70% discounts to last primary round valuations

### What's Actually Working

The downturn has revealed which business models have substance:
- **AI infrastructure companies** with clear enterprise revenue are commanding premium valuations
- **Climate tech** with government contract pipelines is attracting patient capital
- **B2B software** with >120% net revenue retention continues to find willing investors

> "The era of funding narratives is over. The era of funding fundamentals has begun."

### The New Playbook

Emerging best practices among disciplined founders include:
1. Achieving profitability before Series B
2. Building for durability rather than blitzscaling
3. Accepting smaller rounds at fair valuations rather than inflated mega-rounds

The venture capital industry isn't dying — it's maturing. And maturation, while painful, produces stronger companies.
    `,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    category: "Startups & Business",
    tags: ["Venture Capital", "Startups", "Silicon Valley", "Funding"],
    author: {
      name: "David Park",
      role: "Venture Economics Editor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "1 day ago",
    readingTime: "6 min read",
    reactionsCount: 2100,
    commentsCount: 156,
    url: "#",
    source: "Content Hub Business",
    apiSource: "Market Intelligence",
    metrics: { views: "29.4k", shares: "2.8k", impactScore: 94 },
  },
  {
    id: "curated-11",
    title: "Federal Reserve Holds Rates Steady as Inflation Proves Stickier Than Markets Expected",
    description:
      "With core PCE inflation plateauing above the 2% target and labor markets remaining resilient, the Fed signals patience — sending bond yields higher and equity markets into recalibration mode.",
    content: `
# The Last Mile Problem

Monetary policy's "last mile" — reducing inflation from 3% to the 2% target — is proving far more difficult than the journey from 9% to 3%. The Federal Reserve's latest policy statement acknowledged this reality with unusual candor, signaling that rate cuts may be delayed further into 2026.

### Why Inflation Is Sticky

Several structural factors are maintaining upward price pressure:
- **Shelter costs** remain elevated due to chronic housing undersupply in major metropolitan areas
- **Services inflation** — driven by wage growth in healthcare, education, and hospitality — shows no signs of abating
- **Geopolitical supply disruptions** in energy and commodity markets continue to create cost-push inflation

### Market Implications

The "higher for longer" interest rate environment has significant consequences:
- Bond market repricing has pushed 10-year Treasury yields above 4.5%
- Growth stocks, which depend on discounted future cash flows, face continued valuation compression
- Private equity and real estate sectors are experiencing a liquidity squeeze

> "The market wanted a dovish pivot. Instead, it received a masterclass in patience."

### The Global Spillover

US monetary policy doesn't exist in isolation. Higher dollar interest rates strengthen the greenback, creating capital outflow pressure on emerging markets, increasing dollar-denominated debt burdens, and complicating monetary policy decisions from São Paulo to Jakarta.
    `,
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
    category: "Finance & Markets",
    tags: ["Federal Reserve", "Interest Rates", "Inflation", "Markets"],
    author: {
      name: "Catherine Wells",
      role: "Chief Economics Correspondent",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "1 day ago",
    readingTime: "8 min read",
    reactionsCount: 1800,
    commentsCount: 134,
    url: "#",
    source: "Content Hub Finance",
    apiSource: "Economic Data Feed",
    metrics: { views: "33.1k", shares: "2.4k", impactScore: 95 },
  },
  {
    id: "curated-12",
    title: "The Art of Slow Journalism in an Age of Instant Gratification",
    description:
      "Investigating the global resurgence of artisanal long-form publications, high-fidelity print editions, and deliberate digital quietude.",
    content: `
# The Noise Floor

The modern internet operates at a frequency designed to induce anxiety. Push notifications, ephemeral stories, and algorithmically engineered outrage create an artificial urgency that degrades deep reflection.

Slow journalism rejects the race to be first by ten seconds. Instead, it prioritizes:
- Comprehensive context over breaking soundbites
- Primary research over aggregate summarization
- Beautiful visual typography that calms the nervous system

When readers engage with thoughtful prose rendered in a deliberate editorial space, time slows down.

> "In a world optimized for clicks, choosing depth is a radical act."
    `,
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
    category: "Culture & Ideas",
    tags: ["Journalism", "Philosophy", "Digital Wellness", "Focus"],
    author: {
      name: "Sarah Jenkins",
      role: "Senior Editor & Essayist",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "1 day ago",
    readingTime: "5 min read",
    reactionsCount: 880,
    commentsCount: 39,
    url: "#",
    source: "Content Hub Culture",
    apiSource: "Editorial Archive",
    metrics: { views: "15.2k", shares: "910", impactScore: 92 },
  },
];

export const CURATED_JOBS: JobPost[] = [
  {
    id: "job-1",
    title: "Senior AI/ML Engineer — Foundation Models",
    company: "Anthropic",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    salary: "$320K – $450K",
    description: "Join our research team building the next generation of safe, beneficial AI systems. You'll work on training infrastructure, model architecture, and alignment techniques for large language models.",
    requirements: ["5+ years ML engineering", "PyTorch/JAX proficiency", "Large-scale distributed training experience", "Published research preferred"],
    tags: ["AI", "Machine Learning", "Python", "Research"],
    postedAt: "2 days ago",
    applyUrl: "#",
    featured: true,
  },
  {
    id: "job-2",
    title: "Staff Frontend Engineer — Design Systems",
    company: "Vercel",
    location: "Remote (Global)",
    type: "Remote",
    salary: "$200K – $280K",
    description: "Build and maintain the design system that powers Vercel's developer platform. Deep expertise in React, TypeScript, and CSS architecture is essential.",
    requirements: ["7+ years frontend development", "React & TypeScript mastery", "Design system experience", "Performance optimization"],
    tags: ["React", "TypeScript", "Design Systems", "CSS"],
    postedAt: "3 days ago",
    applyUrl: "#",
    featured: true,
  },
  {
    id: "job-3",
    title: "Blockchain Protocol Developer",
    company: "Ethereum Foundation",
    location: "Remote (Global)",
    type: "Remote",
    salary: "$180K – $300K",
    description: "Contribute to Ethereum core protocol development, including consensus layer improvements, EIP implementations, and client diversity initiatives.",
    requirements: ["Go/Rust proficiency", "Distributed systems knowledge", "Cryptography fundamentals", "Open-source contribution history"],
    tags: ["Blockchain", "Ethereum", "Go", "Rust"],
    postedAt: "5 days ago",
    applyUrl: "#",
  },
  {
    id: "job-4",
    title: "Geopolitical Risk Analyst",
    company: "Eurasia Group",
    location: "New York, NY / Washington, DC",
    type: "Full-time",
    salary: "$120K – $180K",
    description: "Analyze geopolitical developments and their implications for global markets. Produce client-facing research on political risk across emerging and frontier markets.",
    requirements: ["MA/PhD in Political Science or IR", "Regional expertise (Asia/MENA/LATAM)", "Financial markets familiarity", "Excellent analytical writing"],
    tags: ["Geopolitics", "Research", "Analysis", "Finance"],
    postedAt: "1 week ago",
    applyUrl: "#",
  },
  {
    id: "job-5",
    title: "Product Designer — Health Tech",
    company: "Calm",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    salary: "$150K – $200K",
    description: "Design intuitive, calming digital experiences that help millions of users manage stress and improve mental wellness. Strong portfolio in health/wellness apps required.",
    requirements: ["4+ years product design", "Figma mastery", "Health/wellness domain experience", "User research skills"],
    tags: ["Product Design", "Health Tech", "Figma", "UX"],
    postedAt: "4 days ago",
    applyUrl: "#",
  },
  {
    id: "job-6",
    title: "Climate Data Scientist",
    company: "Carbon Direct",
    location: "Remote (US)",
    type: "Remote",
    salary: "$140K – $200K",
    description: "Build models to quantify and verify carbon removal across diverse methodologies. Work with satellite imagery, sensor networks, and environmental datasets.",
    requirements: ["MS/PhD in Data Science or Environmental Science", "Python, R, geospatial tools", "Remote sensing experience", "Climate science background"],
    tags: ["Data Science", "Climate", "Python", "Remote Sensing"],
    postedAt: "1 week ago",
    applyUrl: "#",
  },
];

export function getPostById(id: string | number): BlogPost | undefined {
  const strId = String(id);
  return CURATED_POSTS.find((p) => String(p.id) === strId);
}

export function getAllPosts(): BlogPost[] {
  return CURATED_POSTS;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return CURATED_POSTS.filter((p) => p.category === category);
}

export function getAllJobs(): JobPost[] {
  return CURATED_JOBS;
}
