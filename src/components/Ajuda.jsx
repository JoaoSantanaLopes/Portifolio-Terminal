// src/components/Ajuda.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { commandList } from '../commands';
import './Ajuda.css';

const Ajuda = () => {
  const { t } = useTranslation();

  return (
    <div className="ajuda-container">
      <p className="ajuda-titulo">{t('ajuda.titulo')}</p>

      {Object.values(commandList).filter(cmd => !cmd.hidden).map((cmd, index) => {
        const allAliases = [cmd.name, ...cmd.aliases].join(' | ');
        return (
          <p key={`help-${index}`} className="ajuda-item">
            <span className="ajuda-aliases-symbol">&gt;</span>
            <span className="ajuda-aliases">{allAliases}</span>
            <span className="ajuda-separador"> - </span>
            <span className="ajuda-description">{t(cmd.description)}</span>
          </p>
        );
      })}
    </div>
  );
};

export default Ajuda;
