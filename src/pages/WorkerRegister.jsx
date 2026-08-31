import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function WorkerRegister() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        service: "",
        experience: "",
        location: "",
        availability: "",
        description: ""
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

        const workers =
            JSON.parse(localStorage.getItem("workers")) || [];

        const exists = workers.some(
            worker =>
                worker.email.toLowerCase().trim() ===
                form.email.toLowerCase().trim()
        );

        if (exists) {
            alert("A worker with this email already exists.");
            return;
        }

        const worker = {
            id: Date.now(),
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
            service: form.service,
            experience: form.experience,
            location: form.location,
            availability: form.availability,
            description: form.description,
            status: "Active",
            createdAt: new Date().toISOString()
        };

        workers.push(worker);

        localStorage.setItem(
            "workers",
            JSON.stringify(workers)
        );

        alert("Worker account created successfully!");

        navigate("/worker-login");
    };

    return (
        <div className="worker-register-page">

            {/* ================= NAVBAR ================= */}

            <nav className="navbar">

                <h2>🤝 Co-Op Services</h2>

                <div className="nav-links">

                    <Link to="/">Home</Link>

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
                        to="/worker-login"
                        className="nav-login"
                    >
                        Worker Login
                    </Link>

                </div>

            </nav>


            {/* ================= HERO ================= */}

            <section className="worker-register-hero">

                <span className="section-label">
                    WORKER REGISTRATION
                </span>

                <h1>
                    Create Your Worker Profile
                </h1>

                <p>
                    Connect with customers who need
                    your skills and services.
                </p>

            </section>


            {/* ================= MAIN ================= */}

            <main className="worker-register-container">


                {/* ================= LEFT SIDE ================= */}

                <div className="worker-register-info">

                    <span className="section-label">
                        JOIN OUR COMMUNITY
                    </span>

                    <h2>
                        Turn your skills into opportunities.
                    </h2>

                    <p>
                        Create a professional worker profile
                        and connect with customers in your area.
                    </p>


                    <div className="worker-benefits">

                        <div className="worker-benefit">

                            <div className="worker-benefit-icon">
                                🛠️
                            </div>

                            <div>
                                <strong>
                                    Showcase Your Skills
                                </strong>

                                <span>
                                    Tell customers about your services.
                                </span>
                            </div>

                        </div>


                        <div className="worker-benefit">

                            <div className="worker-benefit-icon">
                                📩
                            </div>

                            <div>
                                <strong>
                                    Receive Customer Requests
                                </strong>

                                <span>
                                    View service requests from customers.
                                </span>
                            </div>

                        </div>


                        <div className="worker-benefit">

                            <div className="worker-benefit-icon">
                                🤝
                            </div>

                            <div>
                                <strong>
                                    Connect With Customers
                                </strong>

                                <span>
                                    Build trusted local connections.
                                </span>
                            </div>

                        </div>


                        <div className="worker-benefit">

                            <div className="worker-benefit-icon">
                                📊
                            </div>

                            <div>
                                <strong>
                                    Manage Your Jobs
                                </strong>

                                <span>
                                    Track your accepted service jobs.
                                </span>
                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= FORM CARD ================= */}

                <div className="worker-register-card">

                    <div className="register-card-header">

                        <div>

                            <span className="section-label">
                                CREATE PROFILE
                            </span>

                            <h2>
                                Worker Information
                            </h2>

                            <p>
                                Fill in your details carefully.
                            </p>

                        </div>

                        <div className="register-icon">
                            🧑‍🔧
                        </div>

                    </div>


                    <form onSubmit={handleSubmit}>


                        {/* ================= PERSONAL ================= */}

                        <div className="worker-form-section">

                            <h3>
                                👤 Personal Information
                            </h3>

                            <p>
                                Basic contact details
                            </p>

                        </div>


                        <div className="register-form-row">

                            <div className="register-form-group">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="register-form-group">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <div className="register-form-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* ================= SECURITY ================= */}

                        <div className="worker-form-section">

                            <h3>
                                🔐 Account Security
                            </h3>

                            <p>
                                Create your login credentials
                            </p>

                        </div>


                        <div className="register-form-row">

                            <div className="register-form-group">

                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="register-form-group">

                                <label>
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        {/* ================= PROFESSIONAL ================= */}

                        <div className="worker-form-section">

                            <h3>
                                🧰 Professional Information
                            </h3>

                            <p>
                                Tell customers about your work
                            </p>

                        </div>


                        <div className="register-form-row">

                            <div className="register-form-group">

                                <label>
                                    Service
                                </label>

                                <select
                                    name="service"
                                    value={form.service}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select your service
                                    </option>

                                    <option value="Plumbing">
                                        🔧 Plumbing
                                    </option>

                                    <option value="Electrical">
                                        ⚡ Electrical
                                    </option>

                                    <option value="Cleaning">
                                        🧹 Cleaning
                                    </option>

                                    <option value="Painting">
                                        🎨 Painting
                                    </option>

                                    <option value="Gardening">
                                        🌱 Gardening
                                    </option>

                                    <option value="Carpentry">
                                        🪚 Carpentry
                                    </option>

                                    <option value="AC Service">
                                        ❄️ AC Service
                                    </option>

                                    <option value="Home Repair">
                                        🔨 Home Repair
                                    </option>

                                </select>

                            </div>


                            <div className="register-form-group">

                                <label>
                                    Experience
                                </label>

                                <select
                                    name="experience"
                                    value={form.experience}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select experience
                                    </option>

                                    <option value="Less than 1 year">
                                        Less than 1 year
                                    </option>

                                    <option value="1 - 3 years">
                                        1 - 3 years
                                    </option>

                                    <option value="3 - 5 years">
                                        3 - 5 years
                                    </option>

                                    <option value="5+ years">
                                        5+ years
                                    </option>

                                </select>

                            </div>

                        </div>


                        <div className="register-form-row">

                            <div className="register-form-group">

                                <label>
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Enter your location"
                                    value={form.location}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="register-form-group">

                                <label>
                                    Availability
                                </label>

                                <select
                                    name="availability"
                                    value={form.availability}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select availability
                                    </option>

                                    <option value="Weekdays">
                                        Weekdays
                                    </option>

                                    <option value="Weekends">
                                        Weekends
                                    </option>

                                    <option value="Morning">
                                        Morning
                                    </option>

                                    <option value="Evening">
                                        Evening
                                    </option>

                                    <option value="Anytime">
                                        Anytime
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* ================= DESCRIPTION ================= */}

                        <div className="register-form-group">

                            <label>
                                Service Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Describe your skills, experience and services..."
                                value={form.description}
                                onChange={handleChange}
                                rows="5"
                                required
                            />

                        </div>


                        {/* ================= TERMS ================= */}

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


                        {/* ================= BUTTON ================= */}

                        <button
                            type="submit"
                            className="worker-register-btn"
                        >
                            Create Worker Account
                            <span>→</span>
                        </button>

                    </form>


                    {/* ================= LOGIN ================= */}

                    <div className="already-account">

                        Already have an account?

                        <Link to="/worker-login">
                            Worker Login
                        </Link>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default WorkerRegister;