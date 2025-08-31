import React from 'react';
import ProjectCard from './ProjectCard';
import { projectsData } from '../projectsData';
import { useTranslation } from 'react-i18next';

const Projetos = () => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '0 1.5rem' }}>
      <h3 style={{ color: '#00ff9d', marginBottom: '2rem', fontSize: '1.8rem' }}>
        {t('projetos.tituloSecao')}
      </h3>
      
      <div>
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projetos;