import React from 'react';
import { useTranslation } from 'react-i18next';
import { browserLogos, LADO_LOGO } from '../browserLogos';
import './Neofetch.css';

const CHARS = '0123456789abcdef';

function detectarNavegador() {
  const ua = navigator.userAgent;
  const versao = (regex) => {
    const achado = ua.match(regex);
    return achado ? achado[1] : '';
  };

  if (navigator.brave) return { chave: 'brave', versao: versao(/Chrome\/(\d+)/) };
  if (/Edg\//.test(ua)) return { chave: 'edge', versao: versao(/Edg\/(\d+)/) };
  if (/OPR\//.test(ua)) return { chave: 'opera', versao: versao(/OPR\/(\d+)/) };
  if (/Firefox\//.test(ua)) return { chave: 'firefox', versao: versao(/Firefox\/(\d+)/) };
  if (/Chrome\//.test(ua)) return { chave: 'chrome', versao: versao(/Chrome\/(\d+)/) };
  if (/Safari\//.test(ua)) return { chave: 'safari', versao: versao(/Version\/(\d+)/) };
  return { chave: 'generico', versao: '' };
}

function detectarSistema() {
  const ua = navigator.userAgent;
  if (/Android/.test(ua)) return 'Android';
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
  if (/Windows/.test(ua)) return 'Windows';
  if (/Mac OS X/.test(ua)) return 'macOS';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Unknown';
}

// Cada caractere '▀' desenha dois pixels: o de cima na cor do texto e o de baixo no fundo.
// Por isso as 28 linhas do logo viram 14 linhas de texto.
function montarLinhas(logo) {
  const corEm = (x, y) => {
    const caractere = logo.pixels[y]?.[x];
    if (!caractere || caractere === '.') return 'transparent';
    return logo.paleta[CHARS.indexOf(caractere)];
  };

  const linhas = [];
  for (let y = 0; y < LADO_LOGO; y += 2) {
    const celulas = [];
    for (let x = 0; x < LADO_LOGO; x++) {
      celulas.push([corEm(x, y), corEm(x, y + 1)]);
    }
    linhas.push(celulas);
  }
  return linhas;
}

const Neofetch = () => {
  const { t } = useTranslation();

  const { chave, versao } = detectarNavegador();
  const logo = browserLogos[chave];
  const linhas = montarLinhas(logo);

  const infos = [
    ['OS', detectarSistema()],
    ['Browser', versao ? `${logo.nome} ${versao}` : logo.nome],
    ['Host', 'João Vitor Santana Lopes'],
    ['Role', t('sobre.cargo')],
    ['Uni', t('boasVindas.info3')],
    ['Location', t('boasVindas.info2')],
    ['Resolution', `${window.innerWidth}x${window.innerHeight}`],
    ['Shell', 'react-terminal-ui'],
    ['Stack', 'Java, Python, JavaScript, React'],
    ['Certs', 'AWS Cloud Practitioner, Azure AI Fundamentals'],
    ['Contact', t('contato.email')]
  ];

  const paleta = ['#1a202c', '#EA4335', '#34A853', '#FBBC04', '#4285F4', '#9059FF', '#7FDBFF', '#e2e8f0'];

  return (
    <div className="neofetch-container">
      <div className="neofetch-logo" aria-hidden="true">
        {linhas.map((celulas, i) => (
          <div key={i} className="neofetch-logo-linha">
            {celulas.map(([topo, baixo], j) => (
              <span key={j} style={{ color: topo, backgroundColor: baixo }}>▀</span>
            ))}
          </div>
        ))}
      </div>

      <div className="neofetch-infos">
        <p className="neofetch-linha">
          <span style={{ color: logo.destaque }}>visitor</span>@
          <span style={{ color: logo.destaque }}>portfolio</span>
        </p>
        <p className="neofetch-separador">-----------------------------</p>

        {infos.map(([label, valor]) => (
          <p key={label} className="neofetch-linha">
            <span className="neofetch-label" style={{ color: logo.destaque }}>{label}:</span>{' '}
            <span className="neofetch-valor">{valor}</span>
          </p>
        ))}

        <p className="neofetch-paleta" aria-hidden="true">
          {paleta.map((cor) => (
            <span key={cor} style={{ backgroundColor: cor }} />
          ))}
        </p>
      </div>
    </div>
  );
};

export default Neofetch;
