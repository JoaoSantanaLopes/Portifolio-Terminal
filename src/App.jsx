import React, { useState, useEffect, useRef } from 'react';
import Terminal, { ColorMode, TerminalInput, TerminalOutput } from 'react-terminal-ui';
import emailjs from '@emailjs/browser';
import './index.css';
import { useTranslation } from 'react-i18next';
import { commandList } from './commands';
import Projetos from './components/Projetos';
import Experiencias from './components/Experiencias';
import SobreMim from './components/SobreMim';
import Ajuda from './components/Ajuda';
import Contato from './components/Contato';
import BoasVindas from './components/BoasVindas';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const { t } = useTranslation();
  
  const getWelcomeMessage = () => <BoasVindas key="welcome" />;

  const [terminalLineData, setTerminalLineData] = useState([
    getWelcomeMessage()
  ]);

  const [promptState, setPromptState] = useState({
    active: false,
    step: 0,
    data: {}
  });

  const startEmailPrompt = () => {
    setTerminalLineData(prev => [...prev, <TerminalOutput key="prompt-nome">{t('contato.form.placeholder_nome')}:</TerminalOutput>]);
    setPromptState({ active: true, step: 1, data: {} }); 
  };
  
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePromptInput = (input) => {
  const currentStep = promptState.step;
  const currentData = { ...promptState.data };
  let nextStep = currentStep + 1;
  let nextPrompt = '';

  const newLines = [...terminalLineData, <TerminalInput key={`input-${terminalLineData.length}`}>{myPrompt} {input}</TerminalInput>];

  switch (currentStep) {
    case 1:
      currentData.from_name = input;
      nextPrompt = `${t('contato.form.placeholder_email')}:`;
      break;
    case 2:
      currentData.from_email = input;
      nextPrompt = `${t('contato.form.placeholder_mensagem')}:`;
      break;
    case 3:
      currentData.message = input;
      nextPrompt = t('contato.form.botao_enviando');
      
      emailjs.send('service_zrd3kkm', 'template_uwuv5vm', currentData, 'PsJLICXHGFyBeICPj')
        .then(() => {
          setTerminalLineData(prev => [...prev, <TerminalOutput>{t('contato.form.status_sucesso')}</TerminalOutput>]);
        }).catch(() => {
          setTerminalLineData(prev => [...prev, <TerminalOutput>{t('contato.form.status_erro')}</TerminalOutput>]);
        });
      
      nextStep = 0;
      break;
    default: break;
  }
  
  if (nextPrompt) {
    newLines.push(<TerminalOutput>{nextPrompt}</TerminalOutput>);
  }
  setTerminalLineData(newLines);
  setPromptState({ active: nextStep !== 0, step: nextStep, data: currentData });
};

const handleCommandInput = (input) => {
  let newLines = [...terminalLineData];
  newLines.push(<TerminalInput key={`input-${terminalLineData.length}`}>{myPrompt} {input}</TerminalInput>);

  const args = input.toLowerCase().trim().split(' ');
  const userInput = args[0];
  const command = Object.values(commandList).find(cmd => cmd.name === userInput || cmd.aliases.includes(userInput));
  let response;

  if (command) {
    switch (command.name) {
      case 'sobre': response = <SobreMim />; break;
      case 'ajuda': response = <Ajuda />; break;
      case 'projetos': response = <Projetos />; break;
      case 'experiencias': response = <Experiencias />; break;
      case 'contato': response = <Contato onStartEmailPrompt={startEmailPrompt} />; break;
      case 'limpar': setTerminalLineData([]); return;
      default: break;
    }
  } else {
    response = <TerminalOutput>Comando não reconhecido: "{userInput}". Digite "ajuda".</TerminalOutput>;
  }
  
  if (Array.isArray(response)) {
    newLines.push(...response);
  } else {
    newLines.push(response);
  }
  
  setTerminalLineData(newLines);
};

function handleInput(input) {
  if (promptState.active) {
    handlePromptInput(input);
  } else {
    handleCommandInput(input);
  }
}

  const myPrompt = promptState.active ? "> " : (screenWidth > 500 ? "visitor@portfolio:~$": '');
  const terminalTitle = screenWidth > 500 ? 'Portfolio terminal' : '';

  return (
    <div className="container">
      <LanguageSwitcher />

      <Terminal
        name={terminalTitle}
        colorMode={ColorMode.Dark}
        onInput={handleInput}
        prompt={myPrompt}
        height='83vh'
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
}

export default App;