import { useNavigate } from 'react-router-dom';
import '../stylesheets/Fuentes.css';

const Header = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/');

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg p-0 inlec-header"
    >
      <div className="container-fluid px-3 py-2">

        {/* LOGO */}
        <img
          src="/logo.png"
          alt="Inlec logo"
          className="inlec-logo"
          onClick={() => navigate('/')}
        />

        {/* BOTÓN HAMBURGUESA */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#inlec-navbar"
          aria-controls="inlec-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENÚ */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="inlec-navbar"
        >

          {/* CONTENEDOR TIPO PÍLDORA */}
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

        </div>

      </div>
    </nav>
  );
};

export default Header;