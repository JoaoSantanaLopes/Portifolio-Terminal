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
import Neofetch from './components/Neofetch';
import LanguageSwitcher from './components/LanguageSwitcher';

const allCommandNames = Object.values(commandList).flatMap(cmd => [cmd.name, ...cmd.aliases]);

// Sugere o comando que mais compartilha letras iniciais com o que foi digitado
function findSuggestion(typed) {
  let melhor = null;
  let maiorPrefixo = 1;
  allCommandNames.forEach(name => {
    let i = 0;
    while (i < typed.length && i < name.length && typed[i] === name[i]) i++;
    if (i > maiorPrefixo) {
      maiorPrefixo = i;
      melhor = name;
    }
  });
  return melhor;
}

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
  if (value === '') {
    document.execCommand('delete');
  } else {
    document.execCommand('insertText', false, value);
  }
  setTimeout(() => {
    input.setSelectionRange(value.length, value.length);
    // o react-terminal-ui desenha o proprio cursor e so o reposiciona nas setas,
    // entao avisamos ele na linguagem que ele entende
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
  }, 0);
}

function App() {
  const { t, i18n } = useTranslation();

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
  const ultimoTabRef = useRef(null);
  const historyIndexRef = useRef(historyIndex);
  const rascunhoRef = useRef('');        // o que estava sendo digitado antes de mexer no historico
  const promptStringRef = useRef('');
  const primeiraRenderRef = useRef(true);
  const tamanhoAnteriorRef = useRef(0);

  commandHistoryRef.current = commandHistory;
  promptActiveRef.current = promptState.active;
  historyIndexRef.current = historyIndex;

  // Depois de cada escrita, alinha o topo da saida nova com o topo do terminal:
  // quem pediu `projetos` ve o primeiro projeto, nao o ultimo. Em saida curta o
  // navegador limita a rolagem e o resultado acaba sendo o fim, como antes.
  useEffect(() => {
    const anterior = tamanhoAnteriorRef.current;
    tamanhoAnteriorRef.current = terminalLineData.length;

    if (primeiraRenderRef.current) {
      primeiraRenderRef.current = false;
      return;
    }

    const terminal = containerRef.current?.querySelector('.react-terminal');
    if (!terminal) return;

    // a lib tambem rola para o fim 500ms depois do Enter, o que desfaria o alinhamento
    const sentinela = terminal.lastElementChild;
    if (sentinela) sentinela.scrollIntoView = () => {};

    // os filhos do terminal seguem a ordem das linhas, entao este e o primeiro item novo
    const primeiroNovo = terminal.children[anterior];
    if (!primeiroNovo) {
      terminal.scrollTop = terminal.scrollHeight;
      return;
    }
    terminal.scrollTop += primeiroNovo.getBoundingClientRect().top - terminal.getBoundingClientRect().top;
  }, [terminalLineData]);

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
      // Ctrl+C: cancela a linha atual e sai do formulario de email
      if (e.ctrlKey && e.key === 'c') {
        if (window.getSelection().toString()) return; // nao atrapalha a copia de texto selecionado
        e.preventDefault();
        e.stopImmediatePropagation();
        setNativeInputValue(input, '');
        setTerminalLineData(prev => [...prev, <TerminalOutput key={`ctrlc-${prev.length}`}>^C</TerminalOutput>]);
        setPromptState({ active: false, step: 0, data: {} });
        return;
      }

      // Ctrl+L: limpa a tela
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setTerminalLineData([]);
        return;
      }

      // Ctrl+U apaga a linha toda, Ctrl+W apaga a ultima palavra
      if (e.ctrlKey && (e.key === 'u' || e.key === 'w')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setNativeInputValue(input, e.key === 'u' ? '' : input.value.replace(/\S+\s*$/, ''));
        return;
      }

      if (promptActiveRef.current) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopImmediatePropagation();
        const history = commandHistoryRef.current;
        const indiceAtual = historyIndexRef.current;
        const proximoIndice = Math.min(indiceAtual + 1, history.length - 1);
        if (proximoIndice === indiceAtual) return;
        if (indiceAtual === -1) rascunhoRef.current = input.value;
        setNativeInputValue(input, history[proximoIndice] ?? '');
        setHistoryIndex(proximoIndice);
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        e.stopImmediatePropagation();
        // linha vazia casa com todos os nomes: dois Tabs listam tudo, como no bash
        const typed = input.value.toLowerCase().trim();
        const matches = allCommandNames.filter(name => name.startsWith(typed));
        if (matches.length === 1) {
          setNativeInputValue(input, matches[0]);
          ultimoTabRef.current = null;
        } else if (matches.length > 1) {
          if (ultimoTabRef.current === typed) {
            // segundo Tab seguido: congela a linha digitada e lista os candidatos embaixo dela
            const linhaDigitada = input.value;
            setTerminalLineData(prev => [
              ...prev,
              <TerminalInput key={`tab-linha-${prev.length}`}>{promptStringRef.current} {linhaDigitada}</TerminalInput>,
              <TerminalOutput key={`tab-lista-${prev.length}`}>
                <span className="lista-colunas">
                  {matches.map(nome => <span key={nome}>{nome}</span>)}
                </span>
              </TerminalOutput>
            ]);
            ultimoTabRef.current = null;
          } else {
            const prefixo = getCommonPrefix(matches);
            setNativeInputValue(input, prefixo);
            ultimoTabRef.current = prefixo;
          }
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopImmediatePropagation();
        const history = commandHistoryRef.current;
        const indiceAtual = historyIndexRef.current;
        const proximoIndice = Math.max(indiceAtual - 1, -1);
        if (proximoIndice === indiceAtual) return;
        setNativeInputValue(input, proximoIndice === -1 ? rascunhoRef.current : history[proximoIndice] ?? '');
        setHistoryIndex(proximoIndice);
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

  const getCommandResponse = (commandName, args) => {
    switch (commandName) {
      case 'sobre': return <SobreMim />;
      case 'ajuda': return <Ajuda />;
      case 'projetos': return <Projetos />;
      case 'experiencias': return <Experiencias />;
      case 'contato': return <Contato onStartEmailPrompt={startEmailPrompt} />;
      case 'certificacoes': return <Certificacoes />;
      case 'curriculo': return <Curriculo />;
      case 'neofetch': return <Neofetch />;

      case 'ls': {
        // em ingles mostra o primeiro alias (about, projects...), em portugues o nome canonico
        const emIngles = i18n.language.startsWith('en');
        const mostrarTudo = args.some(arg => /^-[a-z]*a/.test(arg));
        const nomes = Object.values(commandList)
          .filter(cmd => !cmd.hidden || mostrarTudo)
          // os escondidos ja tem nome de terminal e aparecem como dotfile
          .map(cmd => (cmd.hidden ? `.${cmd.name}` : emIngles ? cmd.aliases[0] || cmd.name : cmd.name));
        return (
          <TerminalOutput>
            <span className="lista-colunas">
              {nomes.map(nome => <span key={nome}>{nome}</span>)}
            </span>
          </TerminalOutput>
        );
      }

      case 'cd': {
        const destino = (args[0] || '').toLowerCase();
        if (!destino || destino === '~' || destino === '..') return <BoasVindas />;
        const alvo = Object.values(commandList).find(cmd => cmd.name === destino || cmd.aliases.includes(destino));
        if (!alvo || alvo.hidden) {
          return <TerminalOutput>cd: {destino}: {t('comando.cd_erro')}</TerminalOutput>;
        }
        return getCommandResponse(alvo.name, []);
      }

      case 'history':
        return (
          <TerminalOutput>
            {commandHistory.length === 0
              ? t('comando.historico_vazio')
              : [...commandHistory].reverse().map((cmd, i) => `${i + 1}  ${cmd}`).join('\n')}
          </TerminalOutput>
        );

      case 'lang': {
        const idioma = (args[0] || '').toLowerCase();
        if (idioma !== 'pt' && idioma !== 'en') return <TerminalOutput>{t('comando.lang_uso')}</TerminalOutput>;
        i18n.changeLanguage(idioma);
        return <TerminalOutput>{t('comando.lang_alterado', { lng: idioma })}</TerminalOutput>;
      }

      case 'echo': return <TerminalOutput>{args.join(' ')}</TerminalOutput>;
      case 'whoami': return <TerminalOutput>visitor</TerminalOutput>;
      case 'pwd': return <TerminalOutput>/home/visitor</TerminalOutput>;
      case 'date': return <TerminalOutput>{new Date().toLocaleString(i18n.language === 'en' ? 'en-US' : 'pt-BR')}</TerminalOutput>;
      case 'sudo': return <TerminalOutput>visitor is not in the sudoers file. This incident will be reported.</TerminalOutput>;
      default: return null;
    }
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

    // Enter numa linha vazia so repete o prompt, como num terminal de verdade
    if (!input.trim()) {
      setTerminalLineData(newLines);
      return;
    }

    const args = input.trim().split(/\s+/);
    // aceita tambem a forma com ponto (.neofetch), que e como o `ls -a` lista
    const userInput = args[0].toLowerCase().replace(/^\./, '');
    const command = Object.values(commandList).find(cmd => cmd.name === userInput || cmd.aliases.includes(userInput));
    let response;

    if (command) {
      if (command.name === 'limpar') {
        setTerminalLineData([]);
        return;
      }
      response = getCommandResponse(command.name, args.slice(1));
    } else {
      const sugestao = findSuggestion(userInput);
      response = (
        <TerminalOutput>
          {t("comando.nao_reconhecido")} "{userInput}"<br />
          {sugestao && <>{t("comando.sugestao")} "{sugestao}"?<br /></>}
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

  promptStringRef.current = myPrompt;

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
