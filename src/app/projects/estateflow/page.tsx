import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EstateFlow — Real Estate CRM | genrih',
  description:
    'Purpose-built CRM for real estate agents. Properties with photos and AI descriptions, drag-drop deal pipeline, showings calendar, buyer-property matching.',
};

const architecture = `
React Frontend (Next.js 15)
├── Property Manager
│   ├── Grid View  ──► Supabase Storage (photos)
│   ├── List View
│   └── Map View   ──► Leaflet.js + OpenStreetMap
├── Deal Pipeline
│   ├── @dnd-kit drag-drop
│   └── 7 stages × deal cards
├── AI Generator
│   └── OpenAI → listing descriptions
├── Calendar
│   └── Showings scheduling
└── Buyer Matcher
    └── Embedding-based property matching

Backend (Supabase)
├── PostgreSQL (properties, deals, buyers)
├── Row Level Security (agent isolation)
├── Storage Bucket (property photos)
└── Realtime (live pipeline updates)
`;

export default function EstateFlowPage() {
  return (
    <CaseStudyLayout
      eyebrow="Real Estate CRM"
      title="EstateFlow"
      subtitle="Purpose-built CRM for real estate agents with AI-powered listing generation"
      demoUrl="https://estateflow-gamma.vercel.app"
      githubUrl="https://github.com/supergenrih-jpg/estateflow"
      accentColor="#a855f7"
      metrics={[
        { value: '3', label: 'views: Grid / List / Map' },
        { value: '7', label: 'deal pipeline stages' },
        { value: 'AI', label: 'buyer-property matching' },
      ]}
      problem="Generic CRMs (Salesforce, HubSpot) speak corporate sales language. Real estate agents need a tool that understands properties, showings, deals — not opportunities and contacts. Agents were managing properties in spreadsheets, deals in Trello, showings in Google Calendar, and photos in Drive — four separate systems that never sync."
      solution={[
        'Property database with multi-photo upload, Leaflet map view, grid, and list views',
        'AI listing generator: paste bullet points → get a full professional property description',
        'Drag-and-drop deal pipeline with 7 configurable stages and deal value tracking',
        'Showings calendar with conflict detection and buyer confirmation flow',
        'AI buyer-property matching: describe what a buyer needs → ranked property list',
        'Row Level Security in Supabase — each agent sees only their own properties',
      ]}
      techStack={[
        'Next.js 15',
        'TypeScript',
        'Supabase',
        'OpenAI',
        'Leaflet.js',
        '@dnd-kit',
        'Supabase Storage',
        'Tailwind CSS',
        'Framer Motion',
      ]}
      architecture={architecture}
      lessons={[
        {
          title: 'UX for non-tech users: simplicity over features',
          body: "Real estate agents are busy and not developers. Every feature had to pass a 3-tap test: can a user accomplish this in 3 taps or fewer? The drag-drop pipeline was refined 4 times before passing. Removing the 'advanced filters' modal and replacing it with a persistent sidebar filter doubled usability in informal testing.",
        },
        {
          title: 'Why dark mode matters in real estate',
          body: "Agents often show properties at night or in dim environments (showings at dusk, evening calls). Dark mode with proper contrast ratios isn't just aesthetics — it's the difference between comfortable use and eye strain on a phone during a 9pm showing walkthrough.",
        },
        {
          title: 'Leaflet + Next.js 15 SSR: the hydration trap',
          body: "Leaflet requires browser APIs that don't exist in Node.js. Dynamic imports with `ssr: false` solved this, but the map still flashed on initial load. The fix was a CSS skeleton that matched the map dimensions exactly — users see a placeholder that's the right size, then the map fades in seamlessly.",
        },
        {
          title: "What I'd do differently",
          body: "I'd implement optimistic UI updates for the drag-drop pipeline from day one. The current 300ms server round-trip before UI reflects the move creates a perceptible stutter on slower connections. React Query mutations with rollback would eliminate this entirely.",
        },
      ]}
    />
  );
}
