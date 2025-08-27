// src/components/BoasVindas.jsx
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { IoFlash, IoLocationSharp, IoSchool } from 'react-icons/io5';
import './BoasVindas.css';

const BoasVindas = () => {
  return (
    <div className="welcome-container">
      <TypeAnimation
        sequence={[
          'João Vítor Santana Lopes',
          1000,
          'João Vítor Santana Lopes - Engenheiro de Software',
          2000,
        ]}
        wrapper="h1"
        cursor={true}
        repeat={0}
        className="name-animation"
      />
      
      <div className="static-welcome">
        <p className="welcome-title">$ Bem-vindo ao meu Portfólio</p>
        <hr className="divider" />
        <p>Um desenvolvedor em formação, apaixonado por criar soluções tecnológicas.</p>
        
        <ul className="info-list">
          <li>
            <IoFlash className="icon" style={{ color: '#f3d956' }} />
            Engenharia de Software | Desenvolvimento Full Stack
          </li>
          <li>
            <IoLocationSharp className="icon" style={{ color: '#ff6b6b' }} />
            Belo Horizonte, Minas Gerais, Brasil
          </li>
          <li>
            <IoSchool className="icon" />
            Engenharia de Software - PUC Minas
          </li>
        </ul>
        
        <p className="navegue-text">
          Digite `ajuda` para conhecer mais sobre os comandos.
        </p>
      </div>
    </div>
  );
};

export default BoasVindas;