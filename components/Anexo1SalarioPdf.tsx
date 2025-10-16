import React from 'react';
import MockPdfLayout from './MockPdfLayout';

interface MockPdfProps {
  onClose: () => void;
}

const Anexo1SalarioPdf: React.FC<MockPdfProps> = ({ onClose }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(amount);
    };

    const salaryData = [
        { nivel: 'CCESP 2.17', remuneracao: 23728.00 },
        { nivel: 'CCESP 2.14', remuneracao: 16313.00 },
        { nivel: 'CCESP 2.12', remuneracao: 11864.00 },
        { nivel: 'CCESP 1.12', remuneracao: 11864.00 },
        { nivel: 'CCESP 1.10', remuneracao: 9639.50 },
        { nivel: 'CCESP 2.09', remuneracao: 8898.00 },
        { nivel: 'CCESP 1.09', remuneracao: 8898.00 },
        { nivel: 'CCESP 2.08', remuneracao: 8156.50 },
        { nivel: 'CCESP 2.07', remuneracao: 7415.00 },
        { nivel: 'CCESP 1.06', remuneracao: 6673.50 },
        { nivel: 'CCESP 2.06', remuneracao: 6673.50 },
        { nivel: 'CCESP 2.05', remuneracao: 5932.00 },
        { nivel: 'CCESP 1.05', remuneracao: 5932.00 },
        { nivel: 'FCESP 2.05', remuneracao: 3559.20 },
        { nivel: 'FCESP 1.03', remuneracao: 2669.40 },
    ];

  return (
    <MockPdfLayout title="Salário (Anexo I)" onClose={onClose}>
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Anexo I - Tabela de Remuneração</h1>
        <h2 className="text-xl text-center mb-8 text-gray-600">Cargos em Comissão e Funções de Confiança</h2>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 font-bold uppercase text-gray-600 border border-gray-300 w-1/2">Nível</th>
                        <th className="p-3 font-bold uppercase text-gray-600 border border-gray-300 w-1/2 text-right">Remuneração</th>
                    </tr>
                </thead>
                <tbody>
                    {salaryData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="p-3 text-gray-800 border border-gray-300">{item.nivel}</td>
                            <td className="p-3 font-mono text-right text-gray-800 border border-gray-300">{formatCurrency(item.remuneracao)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="text-center mt-12 text-sm text-gray-500">
            <p>Valores vigentes na data de publicação deste edital. Sujeito a alterações.</p>
            <p>Este é um documento de simulação para fins de demonstração.</p>
        </div>
    </MockPdfLayout>
  );
};

export default Anexo1SalarioPdf;