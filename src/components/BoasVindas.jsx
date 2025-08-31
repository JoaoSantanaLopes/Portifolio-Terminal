// src/components/BoasVindas.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import { IoFlash, IoLocationSharp, IoSchool } from 'react-icons/io5';
import './BoasVindas.css';

const BoasVindas = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="welcome-container">
      <TypeAnimation
        key={i18n.language} 
        sequence={[
          t('boasVindas.tituloAnimado1'),
          1000,
          t('boasVindas.tituloAnimado2'),
          2000,
        ]}
        wrapper="h1"
        cursor={true}
        repeat={0}
        className="name-animation"
      />
      
      <div className="static-welcome">
        <p className="welcome-title">{t('boasVindas.titulo')}</p>
        <hr className="divider" />
        <p>{t('boasVindas.subtitulo')}</p>
        
        <ul className="info-list">
          <li>
            <IoFlash className="icon" style={{ color: '#f3d956' }} />
            {t('boasVindas.info1')}
          </li>
          <li>
            <IoLocationSharp className="icon" style={{ color: '#ff6b6b' }} />
            {t('boasVindas.info2')}
          </li>
          <li>
            <IoSchool className="icon" />
            {t('boasVindas.info3')}
          </li>
        </ul>
        
        <p className="navegue-text">
          {t('boasVindas.navegue')}
        </p>
      </div>
    </div>
  );
};

export default BoasVindas;