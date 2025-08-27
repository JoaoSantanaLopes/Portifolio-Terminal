// src/components/LanguageSwitcher.jsx - VERSÃO PLANO B

import React from 'react';
import { useTranslation } from 'react-i18next';
// Usando um ícone de globo do pacote Font Awesome (fa)
import { FaGlobeAmericas } from 'react-icons/fa';

const styles = {
  switcherContainer: {
    position: 'absolute',
    top: '12px',
    right: '20px',
    zIndex: 10,
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    color: '#a0aec0', // Cor cinza para o texto
  },
  icon: {
    cursor: 'pointer',
    fontSize: '24px',
    transition: 'color 0.3s ease, transform 0.3s ease',
    color: '#a0aec0', // Cor base do ícone
  },
  langText: {
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  active: {
    color: '#7fdbff', // Um azul claro para o idioma ativo
    transform: 'scale(1.1)',
  }
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const isPtActive = i18n.language.startsWith('pt');
  const isEnActive = i18n.language.startsWith('en');

  return (
    <div style={styles.switcherContainer}>
      <FaGlobeAmericas style={{...styles.icon, ...(isEnActive ? { color: '#7fdbff' } : {})}} />
      <span 
        style={{...styles.langText, ...(isPtActive ? styles.active : {})}} 
        onClick={() => changeLanguage('pt')}
      >
        PT
      </span>
      <span>|</span>
      <span 
        style={{...styles.langText, ...(isEnActive ? styles.active : {})}} 
        onClick={() => changeLanguage('en')}
      >
        EN
      </span>
    </div>
  );
};

export default LanguageSwitcher;