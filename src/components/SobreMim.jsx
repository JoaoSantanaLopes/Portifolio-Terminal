import React from 'react';
import { useTranslation } from 'react-i18next';
import './SobreMim.css';

const SobreMim = () => {
  const { t } = useTranslation();

  const skills = ['Java', 'Python', 'SQL', 'Spring Boot', 'Django', 'RPA', 'POO'];

  return (
    <div className="sobre-container" style={{ padding: '0 1.5rem' }}>
      <div className="avatar-container">
        <img src="/avatar.jpg" alt="Avatar" className="avatar-image" />
      </div>
      <div className="info-container">
        <h2 className="nome-titulo">{t('sobre.nome')}</h2>
        <h4 className="cargo-titulo">{t('sobre.cargo')}</h4>
        
        <p className="biografia">
          {t('sobre.biografia')}
        </p>
        
        <h4 className="skills-titulo">{t('sobre.titulo_skills')}</h4>
        <div className="skills-tags-container">
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag-sobre">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SobreMim;