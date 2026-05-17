import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  projectType: z.string().min(1),
  budget: z.string().optional(),
  timeline: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown;
    const data = contactSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'hello.aistudiodeveloper@gmail.com',
        subject: `New inquiry: ${data.projectType} from ${data.name}`,
        text: `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || '—'}
Project Type: ${data.projectType}
Budget: ${data.budget || '—'}
Timeline: ${data.timeline}

Message:
${data.message}
        `.trim(),
      });
    } else {
      console.log('Contact form submission (RESEND_API_KEY not set):', data);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
