import { useState } from "react";
import { Link } from "react-router-dom";


function Contact() {

    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();

        setSent(true);

    };


    return (
        <div className="contact-page">

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

            <section className="contact-hero">

                <p className="section-label">
                    GET IN TOUCH
                </p>

                <h1>
                    Contact Us
                </h1>

                <p>
                    Have a question or need help?
                    Send us a message and we'll be happy
                    to hear from you.
                </p>

            </section>


            {/* CONTACT CONTENT */}

            <section className="contact-section">


                {/* INFORMATION */}

                <div className="contact-info">

                    <p className="section-label">
                        CONTACT INFORMATION
                    </p>

                    <h2>
                        We'd love to hear from you.
                    </h2>

                    <p className="contact-description">
                        Whether you are a customer looking for
                        a service or a worker wanting to join our
                        platform, feel free to contact us.
                    </p>


                    <div className="contact-details">


                        <div className="contact-item">

                            <div className="contact-item-icon">
                                📧
                            </div>

                            <div>

                                <h4>
                                    Email
                                </h4>

                                <p>
                                    support@coopservices.com
                                </p>

                            </div>

                        </div>


                        <div className="contact-item">

                            <div className="contact-item-icon">
                                📞
                            </div>

                            <div>

                                <h4>
                                    Phone
                                </h4>

                                <p>
                                    +91 93428 74387
                                </p>

                            </div>

                        </div>


                        <div className="contact-item">

                            <div className="contact-item-icon">
                                📍
                            </div>

                            <div>

                                <h4>
                                    Location
                                </h4>

                                <p>
                                    Coimbatore, Tamil Nadu, India
                                </p>

                            </div>

                        </div>


                    </div>

                </div>


                {/* FORM */}

                <div className="contact-form-card">

                    <h2>
                        Send us a message
                    </h2>

                    <p>
                        Fill in the form below and we'll
                        receive your message.
                    </p>


                    <form onSubmit={handleSubmit}>


                        <div className="form-group">

                            <label>
                                Your Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Subject
                            </label>

                            <input
                                type="text"
                                placeholder="Enter subject"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Message
                            </label>

                            <textarea
                                placeholder="Write your message..."
                                required
                            ></textarea>

                        </div>


                        <button type="submit">
                            Send Message
                        </button>


                        {sent && (

                            <p className="success-message">
                                ✓ Your message has been sent successfully!
                            </p>

                        )}

                    </form>

                </div>

            </section>


            {/* CTA */}

            <section className="contact-cta">

                <h2>
                    Ready to find a service?
                </h2>

                <p>
                    Explore our available services and
                    connect with local workers.
                </p>

                <br />

                <Link
                    to="/services"
                    className="primary-btn"
                >
                    Explore Services
                </Link>

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


export default Contact;