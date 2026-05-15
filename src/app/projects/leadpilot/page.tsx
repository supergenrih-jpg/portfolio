import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LeadPilot — AI Lead Generator | AI Studio Developer',
  description:
    'B2B prospect discovery + AI cold email writing. Connects Apollo.io, Google Maps, and OpenAI gpt-4o-mini to replace 3 separate tools with one workflow.',
};

const architecture = `
User Input (niche / location / count)
         │
         ▼
  Search Router
  ┌───────────────────────────┐
  │  Provider Pattern         │
  │  ┌────────┐ ┌──────────┐  │
  │  │ Apollo │ │ G.Maps   │  │
  │  │  .io   │ │  API     │  │
  │  └────────┘ └──────────┘  │
  │  ┌────────┐               │
  │  │  Mock  │ (demo mode)   │
  │  │  Data  │               │
  │  └────────┘               │
  └───────────────────────────┘
         │
         ▼
  Lead Enrichment
         │
         ▼
  OpenAI gpt-4o-mini
  (3 email variants per lead)
         │
         ▼
  Supabase DB ──► Campaign Manager
         │               │
         ▼               ▼
  CSV Export       Resend Sender
`;

export default function LeadPilotPage() {
  return (
    <CaseStudyLayout
      eyebrow="AI Lead Generation Platform"
      title="LeadPilot"
      subtitle="AI-powered B2B prospect discovery and cold outreach automation"
      demoUrl="https://leadpilot-genrih.vercel.app"
      githubUrl="https://github.com/supergenrih-jpg/leadpilot"
      accentColor="#06b6d4"
      screenshots={[
        '/screenshots/leadpilot-hero.png',
        '/screenshots/leadpilot-1.png',
        '/screenshots/leadpilot-2.png',
        '/screenshots/leadpilot-3.png',
      ]}
      metrics={[
        { value: '25', label: 'leads found in 4 seconds' },
        { value: '3', label: 'AI email variants per lead' },
        { value: '94%', label: 'AI quality score' },
      ]}
      problem="B2B sales reps waste 4+ hours per day finding leads across multiple databases and writing personalized cold emails. Different tools don't talk to each other, data lives in spreadsheets, and personalization gets sacrificed for speed. Teams pay $300+/month for Apollo, another tool for email writing, and another for campaign tracking — none of them are integrated."
      solution={[
        'Type a niche + location → 25 qualified leads found in under 4 seconds',
        'AI writes 3 personalized cold email variants per lead with customized subject lines',
        'Campaign dashboard with real-time open/reply tracking and stats',
        'One-click CSV export to import into any existing CRM or email tool',
        'Provider Pattern allows swapping Apollo.io for Google Maps or mock data',
        'Built-in rate limiting and cost controls to prevent runaway OpenAI spend',
      ]}
      techStack={[
        'Next.js 15',
        'TypeScript',
        'Supabase',
        'OpenAI gpt-4o-mini',
        'Apollo.io API',
        'Google Maps API',
        'Resend',
        'Zod',
        'Tailwind CSS',
      ]}
      architecture={architecture}
      lessons={[
        {
          title: 'Why Provider Pattern for lead sources',
          body: "Abstracting Apollo.io, Google Maps, and mock data behind a common interface was the single best architectural decision. When Apollo's free tier hit rate limits during demo, switching to Google Maps took 5 minutes. Without the pattern, it would have required rewriting the entire search pipeline.",
        },
        {
          title: 'How AI prompt structure ensures quality',
          body: "The key was giving GPT-4o-mini structured context: company name, industry, role, and a specific pain point discovered from their website. Generic prompts produce generic emails. The 94% quality score came from templated context injection with strict Zod output validation ensuring every field was populated before showing results.",
        },
        {
          title: 'Why mock data fallback was critical for demo',
          body: "Every live demo has API failures. Building a realistic mock data generator that mirrors real Apollo responses saved 3 demos from disaster. The mock mode also made development 10x faster — no rate limit anxiety, no API costs during iteration.",
        },
        {
          title: "What I'd do differently next time",
          body: "I'd add webhook-based lead enrichment instead of synchronous API calls — the 4-second wait is acceptable but could become a bottleneck at scale. I'd also implement proper job queuing (BullMQ or Inngest) from day one instead of treating it as a future optimization.",
        },
      ]}
    />
  );
}
