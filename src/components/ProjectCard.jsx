import React from 'react';
import { useTranslation } from 'react-i18next';
import './ProjectCard.css'; 

const ProjectCard = ({ project }) => {
  const { t } = useTranslation();

  const { titleKey, descriptionKey, gif, repoLink, technologies } = project;

  return (
    <div className="card-container">
      <div className="gif-container">
        <img src={gif} alt={`Animação do projeto ${t(titleKey)}`} className="project-gif" />
      </div>
      <div className="content-container">
        <h3 className="card-title">{t(titleKey)}</h3>
        <p className="card-description">{t(descriptionKey)}</p>
        
        <div className="technologies-container">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>

        {repoLink && repoLink !== '#' && (
          <a href={repoLink} className="repo-link" target="_blank" rel="noopener noreferrer">
            {t('projetos.repositorio')} 
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;