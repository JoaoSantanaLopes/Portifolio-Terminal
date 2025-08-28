import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalInput, TerminalOutput } from 'react-terminal-ui';
import './index.css';

import { commandList } from './commands';

import Projetos from './components/Projetos';
import Experiencias from './components/Experiencias';
import SobreMim from './components/SobreMim';
import Ajuda from './components/Ajuda';
import Contato from './components/Contato';
import BoasVindas from './components/BoasVindas';

import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const getWelcomeMessage = () => <BoasVindas key="welcome" />;

  const [terminalLineData, setTerminalLineData] = useState([
    getWelcomeMessage()
  ]);

  function handleInput(input) {
    let newLines = [...terminalLineData];
    newLines.push(<TerminalInput key={`input-${newLines.length}`}>{myPrompt} {input}</TerminalInput>);

    const args = input.toLowerCase().trim().split(' ');
    const userInput = args[0];

    const command = Object.values(commandList).find(
      cmd => cmd.name === userInput || cmd.aliases.includes(userInput)
    );

    let response;

    if (command) {
      switch (command.name) {
        case 'sobre':
          response = <SobreMim />;
          break;
        
        case 'ajuda':
          response = <Ajuda />;
          break;
        
        case 'projetos':
          response = <Projetos />;
          break;
        
        case 'experiencias':
          response = <Experiencias />;
          break;
        
        case 'contato':
          response = <Contato />;
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

  const myPrompt = "visitante@portfolio:~$";

  return (
    <div className="container">
      <LanguageSwitcher />

      <Terminal
        name='Meu Terminal Portfólio '
        colorMode={ColorMode.Dark}
        onInput={handleInput}
        prompt={myPrompt}
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
}

export default App;