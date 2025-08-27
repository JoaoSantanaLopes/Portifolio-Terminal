// src/commands.js

export const commandList = {
    sobre: {
      name: 'sobre',
      aliases: ['sobremim', 'aboutme', 'about'],
      description: 'Mostra uma breve descrição sobre mim.',
    },
    ajuda: {
      name: 'ajuda',
      aliases: ['help'],
      description: 'Mostra esta lista de comandos disponíveis.',
    },
    projetos: {
      name: 'projetos',
      aliases: ['projects'],
      description: 'Exibe os principais projetos em que trabalhei.',
    },
    experiencias: {
      name: 'experiencias',
      aliases: ['experience', 'xp'],
      description: 'Mostra minha trajetória profissional e experiências.',
    },
    contato: {
      name: 'contato',
      aliases: ['contact'],
      description: 'Exibe minhas informações de contato.',
    },
    limpar: {
      name: 'limpar',
      aliases: ['clear', 'cls'],
      description: 'Limpa o histórico do terminal.',
    }
  };