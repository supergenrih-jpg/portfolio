import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json() as Record<string, unknown>;

  if (!process.env.WEB3FORMS_KEY) {
    console.log('Contact form submission (no key set):', body);
    return NextResponse.json({ success: true, dev: true });
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: `New inquiry from Portfolio: ${body.projectType || 'General'}`,
        from_name: body.name || 'Portfolio Contact',
        name: body.name,
        email: body.email,
        company: body.company,
        project_type: body.projectType,
        budget: body.budget,
        timeline: body.timeline,
        message: body.message,
      }),
    });

    const result = await response.json() as { success: boolean; message?: string };

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error('Web3Forms error:', result);
      return NextResponse.json(
        { success: false, error: result.message || 'Failed to send' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, error: 'Network error' }, { status: 500 });
  }
}
