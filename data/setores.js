export const setores = [
  {
    id: '1',
    nome: 'Secretaria Acadêmica',
    icone: 'school-outline',
    espera: 12,
    fila: 8,
    rapido: 4,
    horario: '08:00 - 20:00',
    descricao: 'Atendimento acadêmico para alunos e candidatos.',
    servicos: [
      {
        titulo: 'Matrículas e Rematrículas',
        descricao: 'Realização de matrículas para novos e atuais alunos.',
      },
      {
        titulo: 'Emissão de Documentos',
        descricao: 'Solicitação de históricos, declarações e outros documentos.',
      },
      {
        titulo: 'Informações sobre Cursos',
        descricao: 'Detalhes sobre a grade curricular e disciplinas.',
      },
    ],
  },
  {
    id: '2',
    nome: 'Financeiro',
    icone: 'wallet-outline',
    espera: 25,
    fila: 15,
    rapido: 8,
    horario: '08:00 - 18:00',
    descricao: 'Consultas financeiras, boletos e negociações.',
    servicos: [
      {
        titulo: '2ª Via de Boleto',
        descricao: 'Emissão de boleto atualizado para pagamento.',
      },
      {
        titulo: 'Negociação',
        descricao: 'Acordos e parcelamentos de mensalidades.',
      },
      {
        titulo: 'Informações Financeiras',
        descricao: 'Esclarecimento de cobranças e vencimentos.',
      },
    ],
  },
  {
    id: '3',
    nome: 'Suporte ao Aluno',
    icone: 'heart-outline',
    espera: 8,
    fila: 4,
    rapido: 3,
    horario: '09:00 - 21:00',
    descricao: 'Suporte geral ao aluno e orientações internas.',
    servicos: [
      {
        titulo: 'Ajuda com Portal',
        descricao: 'Suporte para acesso a sistemas acadêmicos.',
      },
      {
        titulo: 'Orientações',
        descricao: 'Informações gerais sobre processos da instituição.',
      },
      {
        titulo: 'Suporte de Atendimento',
        descricao: 'Encaminhamento para o setor correto.',
      },
    ],
  },
  {
    id: '4',
    nome: 'Segurança e TI',
    icone: 'shield-outline',
    espera: 5,
    fila: 2,
    rapido: 2,
    horario: '07:00 - 22:00',
    descricao: 'Suporte técnico e demandas relacionadas à segurança.',
    servicos: [
      {
        titulo: 'Problemas de Acesso',
        descricao: 'Apoio com login, autenticação e acesso institucional.',
      },
      {
        titulo: 'Wi-Fi e Rede',
        descricao: 'Orientações para conexão e falhas na rede.',
      },
      {
        titulo: 'Chamados Técnicos',
        descricao: 'Registro de problemas técnicos em equipamentos.',
      },
    ],
  },
];