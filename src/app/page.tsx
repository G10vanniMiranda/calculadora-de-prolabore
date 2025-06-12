'use client';

import { SetStateAction, useState } from 'react';
import { Input } from '@/components/ui/input'; // npm install @radix-ui/react-input
import { Button } from '@/components/ui/button'; // npm install @radix-ui/react-button
import { Card, CardContent } from '@/components/ui/card'; // npm install @radix-ui/react-card

export default function ProLaboreCalculator() {
  const [valorBruto, setValorBruto] = useState('');

  type ResultadoCalculo = {
    inss: number;
    ir: number;
    liquido: number;
  };

  const [resultados, setResultados] = useState<ResultadoCalculo | null>(null);


  const calcular = () => {
    const bruto = parseFloat(valorBruto);
    if (isNaN(bruto)) return;

    const inss = calcularINSS(bruto);
    const ir = calcularIR(bruto - inss);
    const liquido = bruto - inss - ir;

    setResultados({ inss, ir, liquido });
  };

  const calcularINSS = (valor: number) => {
    // Tabela 2025 simplificada para cálculo de INSS
    if (valor <= 1412) return valor * 0.075;
    if (valor <= 2666.68) return valor * 0.09;
    if (valor <= 4000.03) return valor * 0.12;
    return valor * 0.14; // Teto aproximado
  };

  const calcularIR = (base: number) => {
    if (base <= 2259.20) return 0;
    if (base <= 2826.65) return base * 0.075 - 169.44;
    if (base <= 3751.05) return base * 0.15 - 381.44;
    if (base <= 4664.68) return base * 0.225 - 662.77;
    return base * 0.275 - 896;
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Cálculo de Pró-Labore</h2>
          <Input
            placeholder="Digite o valor bruto"
            value={valorBruto}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setValorBruto(e.target.value)}
            type="number"
          />
          <Button onClick={calcular}>Calcular</Button>

          {resultados && (
            <div className="space-y-2 text-base">
              <p><strong>INSS:</strong> R$ {resultados.inss.toFixed(2)}</p>
              <p><strong>IR:</strong> R$ {resultados.ir.toFixed(2)}</p>
              <p><strong>Líquido:</strong> R$ {resultados.liquido.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
