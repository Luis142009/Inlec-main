import { useNavigate } from 'react-router-dom';
import '../stylesheets/Fuentes.css';

const Header = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg p-0" style={{ backgroundColor: "#1a0a00" }}>
      <div className="container-fluid px-3 py-2">

        {/* Logo */}
        <img
          src="logo.png"
          alt="Inlec logo"
          height="80px"
          className="ms-2 ms-md-4"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />

        {/* Botón hamburguesa — visible solo en móvil */}
        <button
          className="navbar-toggler ms-auto me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#inlec-navbar"
          aria-controls="inlec-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "rgba(255,255,255,0.4)" }}
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }} />
        </button>

        {/* Menú colapsable */}
        <div className="collapse navbar-collapse justify-content-end" id="inlec-navbar">
          <ul className="navbar-nav align-items-center gap-lg-4 mb-0 pe-lg-5 py-3 py-lg-0">

            <li className="nav-item text-center py-1 py-lg-0">
              <span className="inlec-nav-btn" style={{ fontSize: "19px", cursor: 'pointer' }}
                onClick={() => scrollTo('inicio')}>
                Inicio
              </span>
            </li>

            <li className="nav-item text-center py-1 py-lg-0">
              <span className="inlec-nav-btn" style={{ fontSize: "19px", cursor: 'pointer' }}
                onClick={() => scrollTo('capitulos')}>
                Capítulos
              </span>
            </li>

            <li className="nav-item text-center py-1 py-lg-0">
              <span className="inlec-nav-btn" style={{ fontSize: "19px", cursor: 'pointer' }}
                onClick={() => scrollTo('personajes')}>
                Personajes
              </span>
            </li>

            <li className="nav-item text-center py-1 py-lg-0">
              <span className="inlec-nav-btn" style={{ fontSize: "19px", cursor: 'pointer' }}
                onClick={() => navigate('/galeria')}>
                Ver más
              </span>
            </li>

            <li className="nav-item text-center py-1 py-lg-0">
              <span className="inlec-nav-btn" style={{ fontSize: "19px", cursor: 'pointer' }}
                onClick={() => scrollTo('contacto')}>
                Contacto
              </span>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Header;