'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export function SignInButton() {
    const { data: session, status } = useSession();

    if (status === 'loading') return null;

    if (session) {
        return (
            <button onClick={() => signOut()} className="text-sm text-red-600">
                Sair ({session.user.name})
            </button>
        );
    }

    return (
        <button onClick={() => signIn()} className="text-sm text-blue-600">
            Entrar
        </button>
    );
}
