
"use client";

const Assinar = () => {
    const checkout = async () => {
        const res = await fetch('/api/stripe/checkout', { method: 'POST' });
        const { url } = await res.json();
        window.location.href = url;
    };

    return (
        <button onClick={checkout}>
            Assinar Plano PRO – R$19,90/mês
        </button>
    );
};

export default Assinar;
