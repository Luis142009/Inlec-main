
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Fuentes.css';

const Header = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/');

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="inlec-header">

      <div className="inlec-navbar-pill">

     

        <button
          className="inlec-navbar-btn"
          onClick={() => scrollTo('inicio')}
        >
          Inicio
        </button>

        <button
          className="inlec-navbar-btn"
          onClick={() => scrollTo('capitulos')}
        >
          Capítulos
        </button>

        <button
          className="inlec-navbar-btn"
          onClick={() => scrollTo('personajes')}
        >
          Personajes
        </button>


        {/* LOGO CENTRAL */}

        <img
          src="/LogoIcon.png"
          alt="INLEC"
          className="inlec-logo"
          onClick={() => navigate('/')}
        />


        {/* BOTONES DERECHA */}

        <button
          className="inlec-navbar-btn"
          onClick={() => scrollTo('autor')}
        >
          Autor
        </button>

        <button
          className="inlec-navbar-btn"
          onClick={() => navigate('/galeria')}
        >
          Ver más
        </button>

        <button
          className="inlec-navbar-btn"
          onClick={() => scrollTo('contacto')}
        >
          Contacto
        </button>

      </div>

    </nav>
  );
};

export default Header;

