import React from 'react';
import { useTranslation } from 'react-i18next';
import './CertificationCard.css';

const CertificationCard = ({ certification }) => {
  const { t } = useTranslation();

  const { titleKey, issuer, issueDate, descriptionKey, badge, credentialLink, skills } = certification;

  return (
    <div className="certification-card">
      {badge ? (
        <div className="certification-badge-image">
          <img src={badge} alt={`Badge da certificação ${t(titleKey)}`} />
        </div>
      ) : (
        <div className="certification-badge">
          <span className="certification-badge-symbol">&#10003;</span>
        </div>
      )}

      <div className="certification-content">
        <h3 className="certification-title">{t(titleKey)}</h3>
        <p className="certification-issuer">
          {issuer}
          {issueDate && <span className="certification-date"> | {t(issueDate)}</span>}
        </p>

        <p className="certification-description">{t(descriptionKey)}</p>

        <div className="certification-skills">
          {skills.map((skill, index) => (
            <span key={index} className="certification-tag">{t(skill)}</span>
          ))}
        </div>

        {credentialLink && credentialLink !== '#' && (
          <a href={credentialLink} className="certification-link" target="_blank" rel="noopener noreferrer">
            {t('certificacoes.credencial')}
          </a>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;
