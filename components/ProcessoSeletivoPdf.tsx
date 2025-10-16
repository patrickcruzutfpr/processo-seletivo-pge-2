import React from 'react';
import MockPdfLayout from './MockPdfLayout';

interface MockPdfProps {
  onClose: () => void;
}

const ProcessoSeletivoPdf: React.FC<MockPdfProps> = ({ onClose }) => {
  return (
    <MockPdfLayout title="Processo Seletivo" onClose={onClose}>
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Processo Seletivo Simplificado</h1>
        <h2 className="text-xl font-semibold text-center mb-8 text-gray-600">Cargos em Comissão e Funções de Confiança</h2>
        
        <section className="mb-6">
            <h3 className="text-lg font-bold mb-2 border-b pb-1">1. Disposições Preliminares</h3>
            <p className="text-justify leading-relaxed">
                A Procuradoria Geral do Estado de São Paulo (PGE-SP) torna pública a abertura do processo seletivo para o preenchimento de vagas em Cargos em Comissão e Funções de Confiança, de acordo com as normas estabelecidas neste documento. O processo visa selecionar profissionais qualificados para atuar em diversas áreas estratégicas da instituição, contribuindo para a eficiência e modernização dos serviços públicos.
            </p>
        </section>

        <section className="mb-6">
            <h3 className="text-lg font-bold mb-2 border-b pb-1">2. Das Vagas</h3>
            <p className="text-justify leading-relaxed">
                As vagas disponíveis, bem como seus respectivos requisitos, atribuições e remuneração, estão detalhadas no quadro de vagas deste portal. O preenchimento das vagas ocorrerá de acordo com a necessidade da administração e a disponibilidade orçamentária. A aprovação neste processo não gera direito à nomeação, mas sim a expectativa de direito.
            </p>
        </section>

        <section className="mb-6">
            <h3 className="text-lg font-bold mb-2 border-b pb-1">3. Dos Requisitos para Inscrição</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>Ser brasileiro nato ou naturalizado, ou cidadão português com igualdade de direitos.</li>
                <li>Estar em pleno gozo dos direitos políticos.</li>
                <li>Estar quite com as obrigações militares (para candidatos do sexo masculino).</li>
                <li>Estar quite com as obrigações eleitorais.</li>
                <li>Possuir a formação e a experiência profissional exigidas para o cargo/função pretendido.</li>
            </ul>
        </section>
        
        <div className="text-center mt-12 text-sm text-gray-500">
            <p>Este é um documento de simulação para fins de demonstração.</p>
        </div>
    </MockPdfLayout>
  );
};

export default ProcessoSeletivoPdf;