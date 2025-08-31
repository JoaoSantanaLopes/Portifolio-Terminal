// src/components/Contato.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import './Contato.css';

const Contato = ({ onStartEmailPrompt }) => {
  const { t } = useTranslation();
  
  const LinkedIn = "https://linkedin.com/in/joao-vitor-santana-lopes";
  const GitHub = "https://github.com/JoaoSantanaLopes";
  const email = "joaovslopes20@gmail.com";

  return (
    <div className="contato-container" style={{ padding: '0 1.5rem' }}>
      <h3 className="contato-titulo">{t('contato.titulo')}</h3>
      <p className="contato-subtitulo">{t('contato.subtitulo')}</p>

      <div className="contato-links">
        <a href={LinkedIn} target="_blank" rel="noopener noreferrer" className="contato-item">
          <FaLinkedin className="contato-icone" />
          <span>{t('contato.linkedin')}</span>
        </a>

        <a href={GitHub} target="_blank" rel="noopener noreferrer" className="contato-item">
          <FaGithub className="contato-icone" />
          <span>{t('contato.github')}</span>
        </a>

        <a href={`mailto:${email}`} className="contato-item">
          <FaEnvelope className="contato-icone" />
          <span>{t('contato.email')}</span>
        </a>
      </div>

      <div className="interactive-email">
        <hr className="form-divider" />
        <p>{t('contato.form.titulo')}</p>
        <button className="repo-link-style-button" onClick={onStartEmailPrompt}>
          {t('contato.iniciar_envio')}
        </button>
      </div>
    </div>
  );
};

export default Contato;