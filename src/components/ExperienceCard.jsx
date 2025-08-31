import React from 'react';
import { useTranslation } from 'react-i18next';
import './ExperienceCard.css';

const ExperienceCard = ({ experience }) => {
  const { t } = useTranslation();

  const { roleKey, company, companyDescriptionKey, startDate, endDate, descriptionKeys, skills } = experience;

  return (
    <div className="experience-card">
      <div className="timeline-marker"></div>
      <div className="experience-content">
        <h3 className="role-title">{t(roleKey)} <span className="company-name">@ {company}</span></h3>
        
        <p className="date-range">{t(startDate)} – {t(endDate)}</p>
        
        <ul className="description-list">
          {descriptionKeys.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
        
        <p className="company-info">{t(companyDescriptionKey)}</p>

        <div className="skills-container">
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;