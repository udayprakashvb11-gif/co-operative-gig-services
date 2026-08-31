import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-grid">

          <div className="footer-brand">

            <h3>🤝 Co-Op Service</h3>

            <p>
              Connecting communities with trusted local
              service providers for everyday household needs.
            </p>

          </div>

          <div className="footer-column">

            <h4>Platform</h4>

            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/workers">Workers</Link>
            <Link to="/bookings">Bookings</Link>

          </div>

          <div className="footer-column">

            <h4>Company</h4>

            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/join-worker">
              Join as Worker
            </Link>

          </div>

          <div className="footer-column">

            <h4>Account</h4>

            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>

          </div>

        </div>

        <div className="footer-bottom">

          © 2026 Co-Op Service. All rights reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;