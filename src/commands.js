// Comandos com `hidden: true` funcionam normalmente (inclusive no Tab), mas nao
// aparecem no `ajuda` nem no `ls`. Por isso nao precisam de chave de descricao.
export const commandList = {
    sobre: {
      name: 'sobre',
      aliases: ['about'],
      description: 'ajuda.desc_sobre',
    },
    ajuda: {
      name: 'ajuda',
      aliases: ['help'],
      description: 'ajuda.desc_ajuda',
    },
    projetos: {
      name: 'projetos',
      aliases: ['projects'],
      description: 'ajuda.desc_projetos',
    },
    experiencias: {
      name: 'experiencias',
      aliases: ['experience', 'xp'],
      description: 'ajuda.desc_experiencias',
    },
    certificacoes: {
      name: 'certificacoes',
      aliases: ['certifications', 'certs'],
      description: 'ajuda.desc_certificacoes',
    },
    curriculo: {
      name: 'curriculo',
      aliases: ['cv', 'resume'],
      description: 'ajuda.desc_curriculo',
    },
    contato: {
      name: 'contato',
      aliases: ['contact'],
      description: 'ajuda.desc_contato',
    },
    limpar: {
      name: 'limpar',
      aliases: ['clear', 'cls'],
      description: 'ajuda.desc_limpar',
    },

    // --- comandos de terminal (escondidos do ajuda) ---
    ls: { name: 'ls', aliases: [], hidden: true },
    cd: { name: 'cd', aliases: [], hidden: true },
    history: { name: 'history', aliases: ['historico'], hidden: true },
    neofetch: { name: 'neofetch', aliases: [], hidden: true },
    whoami: { name: 'whoami', aliases: [], hidden: true },
    pwd: { name: 'pwd', aliases: [], hidden: true },
    date: { name: 'date', aliases: ['data'], hidden: true },
    echo: { name: 'echo', aliases: [], hidden: true },
    lang: { name: 'lang', aliases: ['idioma'], hidden: true },
    sudo: { name: 'sudo', aliases: [], hidden: true }
  };
