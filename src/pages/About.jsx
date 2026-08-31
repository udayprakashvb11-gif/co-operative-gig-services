import { Link } from "react-router-dom";


function About() {

    return (
        <div className="about-page">

            {/* NAVBAR */}

            <nav className="navbar">

                <h2>
                    🤝 Co-Op Services
                </h2>

                <div className="nav-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/services">
                        Services
                    </Link>

                    <Link to="/about">
                        About
                    </Link>

                    <Link to="/contact">
                        Contact
                    </Link>

                    <Link
                        to="/customer-login"
                        className="nav-login"
                    >
                        Customer Login
                    </Link>

                </div>

            </nav>


            {/* HERO */}

            <section className="about-hero">

                <p className="section-label">
                    ABOUT CO-OP SERVICES
                </p>

                <h1>
                    Connecting Communities
                    <br />
                    With Trusted Services
                </h1>

                <p>
                    We connect customers with reliable local
                    workers for everyday household and
                    community services.
                </p>

            </section>


            {/* INTRO */}

            <section className="about-intro">

                <div className="about-intro-container">

                    <div>

                        <p className="section-label">
                            WHO WE ARE
                        </p>

                        <h2>
                            Making local services
                            simple and accessible.
                        </h2>

                        <p>
                            Co-Op Services is a platform designed
                            to bring customers and skilled workers
                            together in one place.
                        </p>

                        <p>
                            Customers can discover services,
                            request bookings and manage their
                            bookings easily.
                        </p>

                    </div>


                    <div className="about-visual">

                        <div className="about-main-icon">
                            🤝
                        </div>

                        <div className="about-float-card about-float-one">
                            🛠️ Skilled Workers
                            <span>
                                Local service providers
                            </span>
                        </div>

                        <div className="about-float-card about-float-two">
                            📅 Easy Booking
                            <span>
                                Simple service requests
                            </span>
                        </div>

                        <div className="about-float-card about-float-three">
                            ⭐ Community
                            <span>
                                Built around trust
                            </span>
                        </div>

                    </div>

                </div>

            </section>


            {/* VALUES */}

            <section className="about-values">

                <p className="section-label">
                    OUR VALUES
                </p>

                <h2>
                    Built for the Community
                </h2>


                <div className="about-value-grid">


                    <div className="about-value-card">

                        <div className="about-value-icon">
                            👤
                        </div>

                        <h3>
                            Customer First
                        </h3>

                        <p>
                            We make it simple for customers
                            to discover and request services.
                        </p>

                    </div>


                    <div className="about-value-card">

                        <div className="about-value-icon">
                            🛠️
                        </div>

                        <h3>
                            Empower Workers
                        </h3>

                        <p>
                            Workers can showcase their skills
                            and connect with customers.
                        </p>

                    </div>


                    <div className="about-value-card">

                        <div className="about-value-icon">
                            🤝
                        </div>

                        <h3>
                            Build Trust
                        </h3>

                        <p>
                            Our platform encourages reliable
                            connections within the community.
                        </p>

                    </div>


                </div>

            </section>


            {/* STATS */}

            <section className="about-stats">

                <div className="about-stat-grid">

                    <div className="about-stat">

                        <strong>
                            Easy
                        </strong>

                        <span>
                            Simple service discovery
                        </span>

                    </div>


                    <div className="about-stat">

                        <strong>
                            Trusted
                        </strong>

                        <span>
                            Community focused
                        </span>

                    </div>


                    <div className="about-stat">

                        <strong>
                            Connected
                        </strong>

                        <span>
                            Customers and workers
                        </span>

                    </div>

                </div>

            </section>


            {/* FOOTER */}

            <footer className="footer">

                <div className="footer-grid">

                    <div className="footer-brand">

                        <h2>
                            🤝 Co-Op Services
                        </h2>

                        <p>
                            Connecting communities with
                            trusted local service providers.
                        </p>

                    </div>


                    <div className="footer-column">

                        <h4>
                            Platform
                        </h4>

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/services">
                            Services
                        </Link>

                        <Link to="/about">
                            About
                        </Link>

                        <Link to="/contact">
                            Contact
                        </Link>

                    </div>


                    <div className="footer-column">

                        <h4>
                            Customers
                        </h4>

                        <Link to="/customer-login">
                            Login
                        </Link>

                        <Link to="/customer-register">
                            Register
                        </Link>

                    </div>


                    <div className="footer-column">

                        <h4>
                            Workers
                        </h4>

                        <Link to="/worker-login">
                            Login
                        </Link>

                        <Link to="/worker-register">
                            Become a Worker
                        </Link>

                    </div>

                </div>


                <div className="footer-bottom">
                    © 2026 Co-Op Services. All rights reserved.
                </div>

            </footer>

        </div>
    );
}


export default About;