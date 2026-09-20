import React from 'react';
import CertificationCard from './CertificationCard';
import { certificationsData } from '../certificationsData';
import { useTranslation } from 'react-i18next';

const Certificacoes = () => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '0 1.5rem' }}>
      <h3 style={{ color: '#4fc3f7', marginBottom: '2rem', fontSize: '1.8rem' }}>
        {t('certificacoes.tituloSecao')}
      </h3>

      <div>
        {certificationsData.map(cert => (
          <CertificationCard key={cert.id} certification={cert} />
        ))}
      </div>
    </div>
  );
};

export default Certificacoes;
