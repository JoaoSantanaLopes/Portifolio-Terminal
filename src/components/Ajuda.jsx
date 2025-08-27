// src/components/Ajuda.jsx

import React from 'react';
// Importa a lista de comandos do nosso novo arquivo central
import { commandList } from '../commands';

const Ajuda = () => {
  return (
    <div style={{ padding: '0 1.5rem' }}>
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
};

export default Ajuda;