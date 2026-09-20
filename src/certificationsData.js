export const certificationsData = [
  {
    id: 1,
    titleKey: 'certificacoes.aws_titulo',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: 'certificacoes.aws_data',
    descriptionKey: 'certificacoes.aws_desc',
    // Imagem da badge em public/; se ficar vazio, o card mostra o selo padrão
    badge: '/badge-aws-ccp.png',
    credentialLink: 'https://www.credly.com/badges/d6418d69-8fdf-451a-88ad-335cfba0b2d6/linked_in_profile',
    skills: ['AWS', 'Cloud Computing', 'certificacoes.aws_habilidade1', 'certificacoes.aws_habilidade2']
  },
  {
    id: 2,
    titleKey: 'certificacoes.azure_titulo',
    issuer: 'Microsoft',
    issueDate: 'certificacoes.azure_data',
    descriptionKey: 'certificacoes.azure_desc',
    badge: '/badge-azure-ai-fundamentals.svg',
    credentialLink: 'https://learn.microsoft.com/en-us/users/joovitorsantanalopes-7773/credentials/4b6df1cb0e31bbb1',
    skills: ['Azure', 'Machine Learning', 'certificacoes.azure_habilidade1', 'certificacoes.azure_habilidade2']
  }
];
