
import { stripe } from '@/lib/stripe';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature')!;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        return new NextResponse(`Webhook Error: ${err}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const email = session.customer_email;

        await prisma.user.update({
            where: { email },
            data: { isPro: true },
        });
    }

    return new NextResponse(null, { status: 200 });
}
