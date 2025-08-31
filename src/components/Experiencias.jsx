import React from 'react';
import { experiencesData } from '../experiencesData';
import ExperienceCard from './ExperienceCard';
import { useTranslation } from 'react-i18next';

const Experiencias = () => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '0 1.5rem' }}>
      <h3 style={{ color: '#ff851b', marginBottom: '2rem', fontSize: '1.8rem' }}>
        {t('experiencias.tituloSecao')}
      </h3>
      
      <div className="timeline-container">
        {experiencesData.map(exp => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </div>
  );
};

export default Experiencias;