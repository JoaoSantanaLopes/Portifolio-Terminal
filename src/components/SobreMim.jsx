// src/components/SobreMim.jsx

import React from 'react';
import './SobreMim.css'; // Vamos criar este arquivo de CSS a seguir

const SobreMim = () => {
  const skills = ['React', 'TypeScript', 'Node.js', 'Next.js', 'Design Systems', 'Figma', 'UX/UI'];

  return (
    <div className="sobre-container" style={{ padding: '0 1.5rem' }}>
      <div className="avatar-container">
        <img 
          src="/avatar.jpg" // Coloque uma foto sua na pasta `public` com este nome
          alt="Avatar" 
          className="avatar-image" 
        />
      </div>
      <div className="info-container">
        <h2 className="nome-titulo">João Vitor Santana Lopes</h2>
        <h4 className="cargo-titulo">Desenvolvedor Frontend & Apaixonado por UI/UX</h4>
        
        <p className="biografia">
          Olá! Sou um desenvolvedor focado em criar experiências digitais fluidas e impactantes. Com uma base sólida em tecnologias modernas de frontend, busco sempre a união entre código limpo, performance e um design intuitivo. Acredito que a melhor interface é aquela que se torna invisível, permitindo que o usuário atinja seus objetivos de forma natural e agradável.
        </p>
        
        <h4 className="skills-titulo">Principais Habilidades:</h4>
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