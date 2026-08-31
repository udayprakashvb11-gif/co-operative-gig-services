import { Link } from "react-router-dom";

function Home() {

    const services = [
        {
            icon: "🧹",
            name: "Home Cleaning",
            description:
                "Reliable cleaning services for homes and apartments."
        },
        {
            icon: "🔧",
            name: "Plumbing",
            description:
                "Get help with plumbing repairs and maintenance."
        },
        {
            icon: "⚡",
            name: "Electrical",
            description:
                "Professional assistance for electrical requirements."
        },
        {
            icon: "🎨",
            name: "Painting",
            description:
                "Transform your home with skilled painting services."
        },
        {
            icon: "🌱",
            name: "Gardening",
            description:
                "Keep your garden clean, healthy and beautiful."
        },
        {
            icon: "🔨",
            name: "Home Repair",
            description:
                "Find workers for everyday household repairs."
        }
    ];


    return (

        <div>


            {/* =================================================
               NAVBAR
            ================================================= */}

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

                    <Link to="/worker-login">
                        Worker Login
                    </Link>

                    <Link to="/admin-login">
                        Admin
                    </Link>

                    <Link
                        to="/customer-login"
                        className="nav-login"
                    >
                        Customer Login
                    </Link>

                </div>

            </nav>


            {/* =================================================
               HERO
            ================================================= */}

            <section className="hero">

                <span className="section-label">
                    CO-OP SERVICES
                </span>


                <h1>
                    Trusted Services
                    <br />
                    For Your Community
                </h1>


                <p>
                    Connect with trusted local workers for
                    household and community services.
                </p>


                <div className="hero-buttons">

                    <Link to="/services">
                        Explore Services →
                    </Link>

                    <Link to="/customer-login">
                        Customer Login
                    </Link>

                </div>

            </section>


            {/* =================================================
               SERVICES
            ================================================= */}

            <section className="services-section">

                <span className="section-label">
                    WHAT WE OFFER
                </span>


                <h2>
                    Popular Services
                </h2>


                <p>
                    Explore the services available through
                    our community platform.
                </p>


                <div className="service-grid">

                    {services.map(
                        (service, index) => (

                            <div
                                className="service-box"
                                key={index}
                            >

                                <div className="service-icon">
                                    {service.icon}
                                </div>


                                <h3>
                                    {service.name}
                                </h3>


                                <p>
                                    {service.description}
                                </p>


                                {/* NO BOOKING HERE */}

                                <Link
                                    to="/services"
                                    className="home-service-btn"
                                >
                                    Explore Service →
                                </Link>

                            </div>

                        )
                    )}

                </div>


                {/* =================================================
                   SERVICE PAGE BUTTON
                ================================================= */}

                <div
                    style={{
                        marginTop: "35px",
                        textAlign: "center"
                    }}
                >

                    <Link
                        to="/services"
                        className="primary-btn"
                    >
                        View All Services →
                    </Link>

                </div>

            </section>


            {/* =================================================
               CUSTOMER CTA
            ================================================= */}

            <section className="contact-cta">

                <h2>
                    Need a service?
                </h2>

                <p>
                    Login as a customer to book a service
                    from our available workers.
                </p>

                <Link
                    to="/customer-login"
                    className="primary-btn"
                >
                    Login as Customer →
                </Link>

            </section>


            {/* =================================================
               FOOTER
            ================================================= */}

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
                            Customer Login
                        </Link>

                        <Link to="/customer-register">
                            Register
                        </Link>

                        <Link to="/my-bookings">
                            My Bookings
                        </Link>

                        <Link to="/customer-feedback">
                            Feedback
                        </Link>

                    </div>


                    <div className="footer-column">

                        <h4>
                            Workers
                        </h4>

                        <Link to="/worker-login">
                            Worker Login
                        </Link>

                        <Link to="/worker-register">
                            Become a Worker
                        </Link>

                        <Link to="/admin-login">
                            Admin Login
                        </Link>

                    </div>

                </div>


                <div className="footer-bottom">
                    © 2026 Co-Op Services.
                    All rights reserved.
                </div>

            </footer>

        </div>
    );
}

export default Home;