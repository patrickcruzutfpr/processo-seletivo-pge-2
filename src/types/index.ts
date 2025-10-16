export interface Job {
  id: string;
  cargoFuncao: string;
  nivel: string;
  tipo: 'Cargo em Comissão' | 'Função de Confiança';
  remuneracao: number;
  denominacaoCompleta: string;
  publicoAlvo: string;
  unidadeAtuacao: string;
  setorAtuacao: string;
  localExercicio: string;
  requisitosLegais: string;
  principaisAtribuicoes: string[];
  escopo: string;
  formacaoExperiencia: string[];
  competencias: string[];
  requisitosDesejaveis: string[];
  observacoes?: string;
}