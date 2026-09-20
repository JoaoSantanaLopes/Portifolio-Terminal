import React, { useState, useEffect, useRef } from 'react';
import Terminal, { ColorMode, TerminalInput, TerminalOutput } from 'react-terminal-ui';
import emailjs from '@emailjs/browser';
import './index.css';
import { useTranslation } from 'react-i18next';
import { commandList } from './commands';
import Projetos from './components/Projetos';
import Experiencias from './components/Experiencias';
import Certificacoes from './components/Certificacoes';
import SobreMim from './components/SobreMim';
import Ajuda from './components/Ajuda';
import Contato from './components/Contato';
import BoasVindas from './components/BoasVindas';
import Curriculo from './components/Curriculo';
import LanguageSwitcher from './components/LanguageSwitcher';

const allCommandNames = Object.values(commandList).flatMap(cmd => [cmd.name, ...cmd.aliases]);

function getCommonPrefix(strings) {
  if (strings.length === 0) return '';
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (strings[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
}

function setNativeInputValue(input, value) {
  input.focus();
  input.select();
  document.execCommand('insertText', false, value);
  setTimeout(() => {
    input.setSelectionRange(value.length, value.length);
  }, 0);
}

function App() {
  const { t } = useTranslation();

  const [terminalLineData, setTerminalLineData] = useState(() => [
    <BoasVindas key="welcome" />
  ]);

  const [promptState, setPromptState] = useState({
    active: false,
    step: 0,
    data: {}
  });

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 500);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const containerRef = useRef(null);
  const commandHistoryRef = useRef(commandHistory);
  const promptActiveRef = useRef(promptState.active);

  commandHistoryRef.current = commandHistory;
  promptActiveRef.current = promptState.active;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const input = container.querySelector('input');
    if (!input) return;

    const handleKeyDown = (e) => {
      if (promptActiveRef.current) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setHistoryIndex(prev => {
          const history = commandHistoryRef.current;
          const nextIndex = Math.min(prev + 1, history.length - 1);
          if (nextIndex === prev) return prev;
          const cmd = history[nextIndex] ?? '';
          setNativeInputValue(input, cmd);
          return nextIndex;
        });
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        e.stopImmediatePropagation();
        const typed = input.value.toLowerCase().trim();
        if (!typed) return;
        const matches = allCommandNames.filter(name => name.startsWith(typed));
        if (matches.length === 1) {
          setNativeInputValue(input, matches[0]);
        } else if (matches.length > 1) {
          setNativeInputValue(input, getCommonPrefix(matches));
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setHistoryIndex(prev => {
          const history = commandHistoryRef.current;
          const nextIndex = Math.max(prev - 1, -1);
          if (nextIndex === prev) return prev;
          const cmd = nextIndex === -1 ? '' : history[nextIndex] ?? '';
          setNativeInputValue(input, cmd);
          return nextIndex;
        });
      }
    };

    input.addEventListener('keydown', handleKeyDown, true);
    return () => input.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  const startEmailPrompt = () => {
    setTerminalLineData(prev => [...prev, <TerminalOutput key="prompt-nome">{t('contato.form.placeholder_nome')}:</TerminalOutput>]);
    setPromptState({ active: true, step: 1, data: {} });
  };

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

        emailjs.send('service_tp07iem', 'template_jkaoh5r', currentData, 'HGPP8LXWtII63OcaO')
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
    if (input.trim()) {
      setCommandHistory(prev => {
        if (prev[0] === input.trim()) return prev;
        return [input.trim(), ...prev];
      });
      setHistoryIndex(-1);
    }

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
        case 'certificacoes': response = <Certificacoes />; break;
        case 'curriculo': response = <Curriculo />; break;
        case 'limpar': setTerminalLineData([]); return;
        default: break;
      }
    } else {
      response = (
        <TerminalOutput>
          {t("comando.nao_reconhecido")} "{userInput}"<br />
          {t("comando.ver_ajuda")}
        </TerminalOutput>
      );
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

  const myPrompt = promptState.active ? "> " : (isMobile ? '' : "visitor@portfolio:~$");
  const terminalTitle = isMobile ? '' : 'Portfolio terminal';

  return (
    <div className="container" ref={containerRef}>
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
