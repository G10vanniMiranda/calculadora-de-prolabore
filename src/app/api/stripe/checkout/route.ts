
import { stripe } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.redirect('/login');

    const user = await prisma.user.findUnique({ where: { email: session.user.email! } });

    const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
            {
                price: process.env.STRIPE_PRICE_ID, // Crie o plano no Stripe dashboard e use o ID aqui
                quantity: 1,
            },
        ],
        customer_email: user?.email!,
        success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=1`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?canceled=1`,
    });

    return NextResponse.json({ url: stripeSession.url });
}
