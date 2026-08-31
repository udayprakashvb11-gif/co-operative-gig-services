import {
    Link,
    useNavigate
} from "react-router-dom";


function Services() {

    const navigate = useNavigate();


    const services = [
        {
            icon: "🧹",
            name: "Home Cleaning",
            description:
                "Reliable cleaning services for homes and apartments.",
            category: "Cleaning"
        },
        {
            icon: "🔧",
            name: "Plumbing",
            description:
                "Get help with plumbing repairs and maintenance.",
            category: "Plumbing"
        },
        {
            icon: "⚡",
            name: "Electrical",
            description:
                "Professional assistance for electrical requirements.",
            category: "Electrical"
        },
        {
            icon: "🎨",
            name: "Painting",
            description:
                "Transform your home with skilled painting services.",
            category: "Painting"
        },
        {
            icon: "🌱",
            name: "Gardening",
            description:
                "Keep your garden clean, healthy and beautiful.",
            category: "Gardening"
        },
        {
            icon: "🔨",
            name: "Home Repair",
            description:
                "Find workers for everyday household repairs.",
            category: "Repair"
        },
        {
            icon: "❄️",
            name: "AC Service",
            description:
                "Maintenance and servicing for your air conditioner.",
            category: "AC Service"
        },
        {
            icon: "🚚",
            name: "Moving Help",
            description:
                "Get assistance with local moving and shifting.",
            category: "Moving"
        }
    ];


    /* =========================================================
       BOOK SERVICE
    ========================================================= */

    const handleBookService = (service) => {

        const currentCustomer =
            JSON.parse(
                localStorage.getItem(
                    "currentCustomer"
                )
            );


        /* CUSTOMER NOT LOGGED IN */

        if (!currentCustomer) {

            alert(
                "Please login as a customer before booking a service."
            );

            navigate("/customer-login");

            return;
        }


        /* CUSTOMER LOGGED IN */

        navigate(
            `/book-service/${encodeURIComponent(
                service.name
            )}`
        );
    };


    return (

        <div className="services-page">


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

                    <Link
                        to="/services"
                        className="active"
                    >
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

            <section className="services-hero">

                <div className="section-label">
                    OUR SERVICES
                </div>


                <h1>
                    Find the Right Service
                    <br />
                    for Your Needs
                </h1>


                <p>
                    Discover trusted local workers and book
                    the services you need with ease.
                </p>

            </section>


            {/* =================================================
               SERVICES
            ================================================= */}

            <section className="services-container">

                <div className="services-heading">

                    <div>

                        <span className="section-label">
                            EXPLORE
                        </span>

                        <h2>
                            Popular Services
                        </h2>

                    </div>


                    <p>
                        Choose a service and connect with
                        a suitable worker.
                    </p>

                </div>


                <div className="services-card-grid">

                    {services.map(
                        (service, index) => (

                            <div
                                className="service-card"
                                key={index}
                            >


                                {/* ICON */}

                                <div className="service-card-top">

                                    <div className="service-card-icon">
                                        {service.icon}
                                    </div>


                                    <span className="service-category">
                                        {service.category}
                                    </span>

                                </div>


                                {/* NAME */}

                                <h3>
                                    {service.name}
                                </h3>


                                {/* DESCRIPTION */}

                                <p>
                                    {service.description}
                                </p>


                                {/* BOOK */}

                                <button
                                    type="button"
                                    className="book-service-btn"
                                    onClick={() =>
                                        handleBookService(
                                            service
                                        )
                                    }
                                >

                                    <span>
                                        Book This Service
                                    </span>

                                    <span>
                                        →
                                    </span>

                                </button>

                            </div>

                        )
                    )}

                </div>

            </section>


            {/* =================================================
               CTA
            ================================================= */}

            <section className="services-cta">

                <div>

                    <span className="section-label">
                        ARE YOU A SKILLED WORKER?
                    </span>

                    <h2>
                        Want to offer your services?
                    </h2>

                    <p>
                        Join our community and connect with
                        customers looking for your skills.
                    </p>

                </div>


                <Link to="/worker-register">
                    Become a Worker →
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

export default Services;