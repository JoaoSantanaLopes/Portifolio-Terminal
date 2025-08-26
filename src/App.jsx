// src/App.jsx

import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalInput, TerminalOutput } from 'react-terminal-ui';
import './index.css';
import Projetos from './components/Projetos';
import Experiencias from './components/Experiencias';
import SobreMim from './components/SobreMim';

const commandList = {
  ajuda: {
    name: 'ajuda',
    aliases: ['help'],
    description: 'Mostra esta lista de comandos disponíveis.',
  },
  sobre: {
    name: 'sobre',
    aliases: ['sobremim', 'aboutme', 'about'],
    description: 'Mostra uma breve descrição sobre mim.',
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


function App() {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key="welcome-line">Bem-vindo! Digite `ajuda` (ou `help`) para começar.</TerminalOutput>
  ]);

  function handleInput(input) {
    let newLines = [...terminalLineData];
    newLines.push(<TerminalInput key={`input-${newLines.length}`}>{input}</TerminalInput>);

    const args = input.toLowerCase().trim().split(' ');
    const userInput = args[0];

    const command = Object.values(commandList).find(
      cmd => cmd.name === userInput || cmd.aliases.includes(userInput)
    );

    let response;

    if (command) {
      switch (command.name) {
        // 3. ADICIONE O NOVO CASE AQUI
        case 'sobre':
          response = <SobreMim />;
          break;
        
        case 'ajuda':
          response = (
            <div>
              <p>Comandos disponíveis:</p>
              {Object.values(commandList).map((cmd, index) => {
                const allAliases = [cmd.name, ...cmd.aliases].join(' | ');
                return (
                  <div key={`help-${index}`} style={{ marginBottom: '1.2rem' }}>
                    <div style={{ color: '#00ff9d' }}>
                      <span style={{ marginRight: '1ch' }}>&gt;</span>
                      <span>{allAliases}</span>
                    </div>
                    <p style={{ margin: '0.25em 0 0 2.5ch', color: '#a0aec0' }}>
                      {cmd.description}
                    </p>
                  </div>
                );
              })}
            </div>
          );
          break;
        
        case 'projetos':
          response = <Projetos />;
          break;
        
        case 'experiencias':
          response = <Experiencias />;
          break;
        
        case 'contato':
          const contactInfo = 'Você pode me encontrar em:\n- LinkedIn: linkedin.com/in/seu-usuario\n- GitHub: github.com/seu-usuario\n- Email: seu-email@exemplo.com';
          response = contactInfo.split('\n').map((line, index) => (
            <TerminalOutput key={`contact-${index}`}>{line}</TerminalOutput>
          ));
          break;
        
        case 'limpar':
          setTerminalLineData([]);
          return;
          
        default:
          break;
      }
    } else {
      response = <TerminalOutput>Comando não reconhecido: "{userInput}". Digite "ajuda" para ver as opções.</TerminalOutput>;
    }
    
    if (Array.isArray(response)) {
      newLines.push(...response);
    } else {
      newLines.push(response);
    }
    
    setTerminalLineData(newLines);
  }

  return (
    <div className="container">
      <Terminal
        name='Meu Portfólio Profissional'
        colorMode={ColorMode.Dark}
        onInput={handleInput}
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
}

export default App;