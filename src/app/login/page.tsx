'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <button
                onClick={() => signIn('google')}
                className="bg-blue-600 text-white px-4 py-2 rounded shadow"
            >
                Entrar com Google
            </button>
        </div>
    );
}
