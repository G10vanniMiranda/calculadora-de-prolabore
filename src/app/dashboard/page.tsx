"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') return <p>Carregando...</p>;
    if (!session) {
        router.push('/login');
        return null;
    }

    return (
        <div>Bem-vindo, {session.user.name}!</div>
    );
}