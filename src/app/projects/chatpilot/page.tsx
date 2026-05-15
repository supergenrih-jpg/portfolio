import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChatPilot — AI Multi-Channel Assistant | genrih',
  description:
    'AI receptionist for small businesses. Connects WhatsApp, Instagram, Telegram, Messenger. Configurable for any industry in 15 minutes.',
};

const architecture = `
Incoming Messages
├── WhatsApp   ──► Twilio Webhook
├── Instagram  ──► Meta Graph API Webhook
├── Telegram   ──► Telegram Bot API
└── Messenger  ──► Meta Graph API Webhook
         │
         ▼
  Channel Provider Pattern
  (normalize all messages to
   common MessageEvent format)
         │
         ▼
  AI Agent Router
  ├── Industry Template Loader
  │   (Salon / Dental / Retail /
  │    Fitness / Legal / Custom)
  └── OpenAI gpt-4o
      (context + knowledge base)
         │
         ▼
  Response Dispatcher
  (send back through same channel)
         │
         ▼
  Supabase
  ├── Unified Inbox (all messages)
  ├── Conversation history
  ├── Lead capture
  └── Appointment bookings
`;

export default function ChatPilotPage() {
  return (
    <CaseStudyLayout
      eyebrow="AI Multi-Channel Messaging Assistant"
      title="ChatPilot"
      subtitle="AI receptionist that handles WhatsApp, Instagram, Telegram, and Messenger simultaneously"
      demoUrl="https://chatpilot-kappa.vercel.app"
      githubUrl="https://github.com/supergenrih-jpg/chatpilot"
      accentColor="#22d3ee"
      screenshots={[
        '/screenshots/chatpilot-hero.png',
        '/screenshots/chatpilot-1.png',
        '/screenshots/chatpilot-2.png',
        '/screenshots/chatpilot-3.png',
      ]}
      metrics={[
        { value: '4', label: 'channels in unified inbox' },
        { value: '6', label: 'industry pre-built templates' },
        { value: '8s', label: 'avg AI response time' },
      ]}
      problem="Small businesses lose 30% of leads to slow replies. Hiring a chat manager costs $2,500/month. Customers expect responses in under 5 minutes — humans can't deliver 24/7. Businesses manage WhatsApp on one phone, Instagram DMs on a laptop, Telegram on another device — no unified view, no history, no automation."
      solution={[
        'Unified inbox showing all WhatsApp, Instagram, Telegram, and Messenger conversations',
        'AI Agent Builder: configure an assistant for your industry in 15 minutes, no code',
        '6 pre-built industry templates (salon, dental, retail, fitness, legal, custom)',
        'Appointment booking automation with calendar integration and confirmation messages',
        'Lead qualification flow: AI asks qualifying questions and logs responses to CRM',
        'Real-time updates via Supabase Realtime — inbox refreshes without page reload',
      ]}
      techStack={[
        'Next.js 15',
        'TypeScript',
        'Supabase',
        'OpenAI gpt-4o',
        'Twilio (WhatsApp)',
        'Meta Graph API',
        'Telegram Bot API',
        'Supabase Realtime',
        'Zod',
        'Tailwind CSS',
      ]}
      architecture={architecture}
      lessons={[
        {
          title: 'Channel Provider Pattern: the only way to scale multi-channel',
          body: "Each messaging platform has a completely different webhook format, authentication scheme, and message structure. Without a Provider Pattern to normalize everything into a common `MessageEvent` type, adding a 5th channel would require rewriting the AI pipeline. With it, a new channel is ~200 lines: implement the interface, register the provider, done.",
        },
        {
          title: 'Making Telegram work in demo mode',
          body: "Telegram requires a public HTTPS URL for webhooks — a problem during local development. The solution was a dual-mode setup: webhook mode for production (Vercel) and polling mode for development (local). A single env variable switches between them. Zero code changes when deploying.",
        },
        {
          title: 'AI response quality: context is everything',
          body: "Generic GPT-4o responses are generic. The quality jump came from injecting: (1) business name and description, (2) the last 10 messages as conversation history, (3) the detected user intent from a preliminary classification call. Three-pass prompting added ~2 seconds but increased relevant responses from 60% to 94%.",
        },
        {
          title: "What I'd do differently",
          body: "I'd use Inngest for the AI pipeline instead of synchronous Next.js API routes. The 8-second average response time is at the edge of acceptability — a proper job queue would allow streaming responses back to the user as GPT generates them, dropping perceived latency to under 2 seconds.",
        },
      ]}
    />
  );
}
