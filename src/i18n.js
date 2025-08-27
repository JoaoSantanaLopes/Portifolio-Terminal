// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Objeto que conterá todas as nossas traduções
const resources = {
  // Objeto para o idioma Inglês
  en: {
    translation: {
      "sobre": {
        "nome": "My Name",
        "cargo": "Frontend Developer & UI/UX Enthusiast",
        "biografia": "Hello! I'm a developer focused on creating fluid and impactful digital experiences. With a solid foundation in modern frontend technologies, I always seek the union of clean code, performance, and intuitive design. I believe the best interface is one that becomes invisible, allowing the user to achieve their goals naturally and pleasantly.",
        "titulo_skills": "Main Skills:"
      }
    }
  },
  // Objeto para o idioma Português
  pt: {
    translation: {
      "sobre": {
        "nome": "Meu Nome",
        "cargo": "Desenvolvedor Frontend & Apaixonado por UI/UX",
        "biografia": "Olá! Sou um desenvolvedor focado em criar experiências digitais fluidas e impactantes. Com uma base sólida em tecnologias modernas de frontend, busco sempre a união entre código limpo, performance e um design intuitivo. Acredito que a melhor interface é aquela que se torna invisível, permitindo que o usuário atinja seus objetivos de forma natural e agradável.",
        "titulo_skills": "Principais Habilidades:"
      }
    }
  }
};

i18n
  .use(initReactI18next) // Passa a instância do i18n para o react-i18next
  .init({
    resources,
    lng: 'pt', // Define o idioma inicial
    fallbackLng: 'en', // Idioma para usar caso a tradução não seja encontrada
    interpolation: {
      escapeValue: false // React já protege contra XSS
    }
  });

export default i18n;