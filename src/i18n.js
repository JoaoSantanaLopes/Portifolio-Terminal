import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  // Objeto para o idioma Inglês
  en: {
    translation: {
      "boasVindas": {
        "tituloAnimado1": "João Vitor Santana Lopes",
        "tituloAnimado2": "João Vitor Santana Lopes - Software Engineer",
        "titulo": "$ Welcome to my Portfolio",
        "subtitulo": "A developer in training, passionate about creating technological solutions.",
        "info1": "Software Engineering | Full Stack Development",
        "info2": "Belo Horizonte, Minas Gerais, Brazil",
        "info3": "Software Engineering - PUC Minas",
        "navegue": "Type `help` to learn more about the commands."
      },
      "sobre": {
        "nome": "João Vitor Santana Lopes",
        "cargo": "Software Engineering Student | Full Stack Developer",
        "biografia": "Currently in my fourth semester of Software Engineering, I am a developer passionate about technology and focused on turning ideas into practical solutions. My academic journey has provided me with a solid foundation, including hands-on experience with technologies like Java, Spring Boot, and Django. Professionally, I develop and maintain automation bots (RPA) with Python, optimizing processes and applying programming logic to solve real-world problems. Adaptable and always eager to learn, I am constantly seeking new challenges that allow me to grow and contribute to innovative projects.",
        "titulo_skills": "Main Skills:"
      },
      "comando": {
        "nao_reconhecido": "Command not recognized:",
        "ver_ajuda": "Type 'help' to see the options.",
      },
      "ajuda": {
        "titulo": "Available Commands:",
        "desc_sobre": "Shows a brief description about me.",
        "desc_ajuda": "Shows this list of available commands.",
        "desc_projetos": "Displays the main projects I've worked on.",
        "desc_experiencias": "Shows my professional journey and experiences.",
        "desc_contato": "Displays my contact information.",
        "desc_limpar": "Clears the terminal history."
      },
      "contato": {
        "titulo": "Get in Touch",
        "subtitulo": "Feel free to connect or send me a message.",
        "linkedin": "LinkedIn",
        "github": "GitHub",
        "email": "joaovslopes20@gmail.com",
        "iniciar_envio": "Send an email through the terminal →",
        "form": {
        "titulo": "Or send me a message directly from here:",
        "placeholder_nome": "Your name",
        "placeholder_email": "Your email",
        "placeholder_mensagem": "Your message",
        "botao_enviando": "Sending...",
        "status_sucesso": "Thank you! Your message has been sent.",
        "status_erro": "An error occurred. Please try again."
      }
      },
      "projetos": {
        "tituloSecao": "My Main Projects:",
        "repositorio": "View Repository →",
        "javaParking_titulo": "Java Parking System",
        "javaParking_desc": "A platform to manage parking spaces and vehicle control, with entry and exit logging, providing occupation reports and statistics.",
        "reclameAqui_titulo": "ReclameAqui Scraper",
        "reclameAqui_desc": "An automation bot to capture and organize complaints and company information from ReclameAqui, allowing for analysis and storage of data on the best and worst-rated companies.",
        "crmVortex_titulo": "Vortex Auto Parts CRM",
        "crmVortex_desc": "A custom ERP system for Vortex, an auto parts company, that integrates sales, inventory, finance, and customer registration. The system automates reports, optimizes stock management, and improves inter-departmental communication, ensuring operational efficiency and supporting company growth.",
        "santoRestauro_titulo": "Santo Restauro (Under Construction)",
        "santoRestauro_desc": "A presentation website for a furniture and art restoration company, featuring a portfolio of works, service information, and customer contact details."
      },
      "experiencias": {
        "tituloSecao": "My Professional Journey:",
        "blueTape_cargo": "Software Development Intern",
        "blueTape_desc": "Tech company focused on process automation for the legal sector (LawTech).",
        "blueTape_startDate": "August 2025",
        "blueTape_endDate": "Present",
        "blueTape_ponto1": "Development and maintenance of automation bots (RPA) using Python to optimize processes in the legal field.",
        "puc_cargo": "Modular Programming Monitor",
        "puc_desc": "One of the largest and most prestigious private universities in Brazil.",
        "puc_startDate": "March 2025",
        "puc_endDate": "July 2025",
        "puc_ponto1": "Assisted student groups in understanding and applying the principles of Object-Oriented Programming (OOP).",
        "puc_ponto2": "Focused on concepts such as encapsulation, inheritance, and polymorphism using the Java language."
      }
    }
  },
  // Objeto para o idioma Português
  pt: {
    translation: {
      "boasVindas": {
        "tituloAnimado1": "João Vitor Santana Lopes",
        "tituloAnimado2": "João Vitor Santana Lopes - Engenheiro de Software",
        "titulo": "$ Bem-vindo ao meu Portfólio",
        "subtitulo": "Um desenvolvedor em formação, apaixonado por criar soluções tecnológicas.",
        "info1": "Engenharia de Software | Desenvolvimento Full Stack",
        "info2": "Belo Horizonte, Minas Gerais, Brasil",
        "info3": "Engenharia de Software - PUC Minas",
        "navegue": "Digite `ajuda` para conhecer mais sobre os comandos."
      },
      "sobre": {
        "nome": "João Vitor Santana Lopes",
        "cargo": "Estudante de Engenharia de Software | Desenvolvedor Full Stack",
        "biografia": "Cursando o quarto período de Engenharia de Software, sou um desenvolvedor apaixonado por tecnologia e focado em transformar ideias em soluções práticas. Minha jornada acadêmica tem me proporcionado uma base sólida, com experiência prática em tecnologias como Java, Spring Boot e Django. Profissionalmente, atuo no desenvolvimento e manutenção de robôs de automação (RPA) com Python, otimizando processos e aplicando a lógica de programação para resolver problemas reais. Adaptável e sempre buscando aprender, estou constantemente à procura de novos desafios que me permitam crescer e contribuir para projetos inovadores.",
        "titulo_skills": "Principais Habilidades:"
      },
      "comando": {
        "nao_reconhecido": "Comando não reconhecido:",
        "ver_ajuda": "Digite 'ajuda' para ver a lista de comandos disponíveis."
      },
       "ajuda": {
        "titulo": "Comandos disponíveis:",
        "desc_sobre": "Mostra uma breve descrição sobre mim.",
        "desc_ajuda": "Mostra esta lista de comandos disponíveis.",
        "desc_projetos": "Exibe os principais projetos em que trabalhei.",
        "desc_experiencias": "Mostra minha trajetória profissional e experiências.",
        "desc_contato": "Exibe minhas informações de contato.",
        "desc_limpar": "Limpa o histórico do terminal."
      },
      "contato": {
        "titulo": "Entre em Contato",
        "subtitulo": "Sinta-se à vontade para se conectar ou me enviar uma mensagem.",
        "linkedin": "LinkedIn",
        "github": "GitHub",
        "email": "joaovslopes20@gmail.com",
        "iniciar_envio": "Envie um email pelo terminal →",
        "form": {
        "titulo": "Ou me envie uma mensagem diretamente daqui:",
        "placeholder_nome": "Seu nome",
        "placeholder_email": "Seu e-mail",
        "placeholder_mensagem": "Sua mensagem",
        "botao_enviar": "Enviar Mensagem",
        "botao_enviando": "Enviando...",
        "status_sucesso": "Obrigado! Sua mensagem foi enviada.",
        "status_erro": "Ocorreu um erro. Tente novamente."
      }
      },
      "projetos": {
        "tituloSecao": "Meus Principais Projetos:",
        "repositorio": "Ver Repositório →",
        "javaParking_titulo": "Java Parking",
        "javaParking_desc": "Uma plataforma para gerenciar vagas de estacionamento e controle de veículos, com registro de entradas e saídas, disponibilizando relatórios de ocupação e estatísticas.",
        "reclameAqui_titulo": "ReclameAqui Scrapper",
        "reclameAqui_desc": "Um robô de automação para capturar e organizar reclamações e informações de empresas do ReclameAqui, permitindo análise e armazenamento de informações das melhores e piores empresas.",
        "crmVortex_titulo": "CRM Peças Vortex",
        "crmVortex_desc": "Sistema de ERP personalizado para a Vortex, uma empresa de autopeças, que integra vendas, estoque, finanças e cadastro de clientes. O sistema automatiza relatórios, otimiza o gerenciamento de estoque e melhora a comunicação entre setores, garantindo eficiência operacional e suporte ao crescimento da empresa.",
        "santoRestauro_titulo": "Santo Restauro (Em Construção)",
        "santoRestauro_desc": "Site de apresentação para empresa de restauração de móveis e obras de arte, com portfólio de trabalhos, informações de serviços e contato para clientes."
      },
      "experiencias": {
        "tituloSecao": "Minha Trajetória Profissional:",
        "blueTape_cargo": "Estagiário em Desenvolvimento de Software",
        "blueTape_desc": "Empresa de tecnologia focada em automação de processos para o setor jurídico (LawTech).",
        "blueTape_startDate": "Agosto 2025",
        "blueTape_endDate": "Presente",
        "blueTape_ponto1": "Desenvolvimento e manutenção de robôs de automação (RPA) utilizando Python para otimizar processos na área jurídica.",
        "puc_cargo": "Monitor de Programação Modular",
        "puc_desc": "Uma das maiores e mais prestigiadas universidades privadas do Brasil.",
        "puc_startDate": "Março 2025",
        "puc_endDate": "Julho 2025",
        "puc_ponto1": "Auxiliei turmas de alunos na compreensão e aplicação dos princípios da Programação Orientada a Objetos (OOP).",
        "puc_ponto2": "Foquei em conceitos como encapsulamento, herança e polimorfismo utilizando a linguagem Java."
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