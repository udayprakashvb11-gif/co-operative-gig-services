import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">

      <div className="container">

        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🤝</span>
          Co-Op Service
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          ☰
        </button>

        <div
          className="collapse navbar-collapse"
          id="mainNav"
        >

          <div className="navbar-nav ms-auto">

            <Link to="/" className="nav-link">
              Home
            </Link>

            <Link to="/services" className="nav-link">
              Services
            </Link>

            <Link to="/workers" className="nav-link">
              Workers
            </Link>

            <Link to="/bookings" className="nav-link">
              Bookings
            </Link>

            <Link to="/about" className="nav-link">
              About
            </Link>

            <Link to="/contact" className="nav-link">
              Contact
            </Link>

            <Link to="/join-worker" className="nav-worker">
              Join as Worker
            </Link>

            <Link to="/login" className="nav-login">
              Login
            </Link>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;