import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import './Contato.css';

const Contato = () => {
  const seuLinkedIn = "https://linkedin.com/in/joao-vitor-santana-lopes";
  const seuGitHub = "https://github.com/JoaoSantanaLopes";
  const seuEmail = "joaovslopes20@gmail.com";

  return (
    <div className="contato-container" style={{ padding: '0 1.5rem' }}>
      <h3 className="contato-titulo">Entre em Contato</h3>
      <p className="contato-subtitulo">
        Sinta-se à vontade para se conectar ou me enviar uma mensagem.
      </p>

      <div className="contato-links">
        <a href={seuLinkedIn} target="_blank" rel="noopener noreferrer" className="contato-item">
          <FaLinkedin className="contato-icone" />
          <span>LinkedIn</span>
        </a>

        <a href={seuGitHub} target="_blank" rel="noopener noreferrer" className="contato-item">
          <FaGithub className="contato-icone" />
          <span>GitHub</span>
        </a>

        <a href={`mailto:${seuEmail}`} className="contato-item">
          <FaEnvelope className="contato-icone" />
          <span>{seuEmail}</span>
        </a>
      </div>
    </div>
  );
};

export default Contato;