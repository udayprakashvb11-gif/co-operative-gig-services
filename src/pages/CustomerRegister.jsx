import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function CustomerRegister() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const customers =
            JSON.parse(localStorage.getItem("customers")) || [];

        const existingCustomer = customers.find(
            (customer) =>
                customer.email.toLowerCase() ===
                form.email.toLowerCase()
        );

        if (existingCustomer) {
            alert("An account with this email already exists.");
            return;
        }

        const customer = {
            id: Date.now(),
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
            status: "Active",
            createdAt: new Date().toISOString()
        };

        customers.push(customer);

        localStorage.setItem(
            "customers",
            JSON.stringify(customers)
        );

        alert("Customer account created successfully!");

        navigate("/customer-login");
    };

    return (
        <div className="register-page">

            <div className="register-container">

                {/* LEFT */}

                <div className="register-hero">

                    <div className="register-logo">
                        🤝
                        <span>Co-Op Services</span>
                    </div>

                    <div className="register-hero-content">

                        <span className="register-label">
                            JOIN OUR COMMUNITY
                        </span>

                        <h1>
                            Get reliable help,
                            <br />
                            right when you need it.
                        </h1>

                        <p>
                            Connect with trusted local workers
                            and book household and community
                            services from one place.
                        </p>

                        <div className="register-features">

                            <div className="register-feature">
                                <span>✓</span>

                                <div>
                                    <strong>Trusted Workers</strong>
                                    <small>
                                        Connect with local service providers.
                                    </small>
                                </div>
                            </div>

                            <div className="register-feature">
                                <span>✓</span>

                                <div>
                                    <strong>Easy Booking</strong>
                                    <small>
                                        Request services in a few clicks.
                                    </small>
                                </div>
                            </div>

                            <div className="register-feature">
                                <span>✓</span>

                                <div>
                                    <strong>Community Focused</strong>
                                    <small>
                                        Support local workers and services.
                                    </small>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="register-hero-footer">
                        © 2026 Co-Op Services
                    </div>

                </div>


                {/* RIGHT */}

                <div className="register-form-section">

                    <div className="register-form-header">

                        <span className="register-form-label">
                            CREATE ACCOUNT
                        </span>

                        <h2>
                            Create your account
                        </h2>

                        <p>
                            Enter your details to get started.
                        </p>

                    </div>


                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="register-field">

                            <label>Full Name</label>

                            <div className="register-input">

                                <span>👤</span>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <div className="register-field">

                            <label>Email Address</label>

                            <div className="register-input">

                                <span>✉</span>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <div className="register-field">

                            <label>Phone Number</label>

                            <div className="register-input">

                                <span>📱</span>

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <div className="register-field">

                            <label>Password</label>

                            <div className="register-input">

                                <span>🔒</span>

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <div className="register-field">

                            <label>Confirm Password</label>

                            <div className="register-input">

                                <span>🔐</span>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <label className="register-terms">

                            <input
                                type="checkbox"
                                required
                            />

                            <span>
                                I agree to the Terms of Service
                                and Privacy Policy.
                            </span>

                        </label>


                        <button
                            type="submit"
                            className="register-button"
                        >
                            Create Account
                            <span>→</span>
                        </button>

                    </form>


                    <div className="register-login">

                        Already have an account?

                        <Link to="/customer-login">
                            Sign in
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CustomerRegister;