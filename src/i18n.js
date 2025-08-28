import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "sobre": {
        "nome": "João Vitor Santana Lopes",
        "cargo": "Software Engineering Student | Full Stack Developer",
        "biografia": "Currently in my fourth semester of Software Engineering, I am a developer passionate about technology and focused on turning ideas into practical solutions. My academic journey has provided me with a solid foundation, including hands-on experience with technologies like Java, Spring Boot, and Django. Professionally, I develop and maintain automation bots (RPA) with Python, optimizing processes and applying programming logic to solve real-world problems. Adaptable and always eager to learn, I am constantly seeking new challenges that allow me to grow and contribute to innovative projects.",
        "titulo_skills": "Main Skills:"
      }
    }
  },
  pt: {
    translation: {
      "sobre": {
        "nome": "João Vitor Santana Lopes",
        "cargo": "Estudante de Engenharia de Software | Desenvolvedor Full Stack",
        "biografia": "Cursando o quarto período de Engenharia de Software, sou um desenvolvedor apaixonado por tecnologia e focado em transformar ideias em soluções práticas. Minha jornada acadêmica tem me proporcionado uma base sólida, com experiência prática em tecnologias como Java, Spring Boot e Django. Profissionalmente, atuo no desenvolvimento e manutenção de robôs de automação (RPA) com Python, otimizando processos e aplicando a lógica de programação para resolver problemas reais. Adaptável e sempre buscando aprender, estou constantemente à procura de novos desafios que me permitam crescer e contribuir para projetos inovadores.",
        "titulo_skills": "Principais Habilidades:"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;