import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    // =========================================================
    // ADMIN CREDENTIALS
    // =========================================================

    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "admin123";


    // =========================================================
    // LOGIN
    // =========================================================

    const handleLogin = (e) => {

        e.preventDefault();

        setError("");


        const enteredEmail =
            email.trim().toLowerCase();

        const enteredPassword =
            password;


        // CHECK LOGIN

        if (
            enteredEmail === ADMIN_EMAIL &&
            enteredPassword === ADMIN_PASSWORD
        ) {

            // Save admin login state

            localStorage.setItem(
                "isAdminLoggedIn",
                "true"
            );


            // Save current admin

            localStorage.setItem(
                "currentAdmin",
                JSON.stringify({
                    name: "Administrator",
                    email: ADMIN_EMAIL
                })
            );


            // Open admin dashboard

            navigate("/admin-dashboard");

        } else {

            setError(
                "Invalid admin email or password."
            );

        }
    };


    return (

        <div className="auth-page">


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

                    <Link to="/customer-login">
                        Customer Login
                    </Link>

                    <Link to="/worker-login">
                        Worker Login
                    </Link>

                </div>

            </nav>


            {/* =================================================
               MAIN
            ================================================= */}

            <main className="auth-main">

                <div className="auth-container">


                    {/* =================================================
                       LEFT SIDE
                    ================================================= */}

                    <div className="auth-info">

                        <span className="section-label">
                            ADMIN PORTAL
                        </span>


                        <h1>
                            Welcome,
                            <br />
                            Administrator.
                        </h1>


                        <p>
                            Manage customers, workers,
                            bookings and platform settings
                            from one secure administration
                            dashboard.
                        </p>


                        {/* CUSTOMER */}

                        <div className="auth-feature">

                            <div className="auth-feature-icon">
                                👥
                            </div>


                            <div>

                                <strong>
                                    Manage Customers
                                </strong>

                                <span>
                                    View and manage registered
                                    customer accounts.
                                </span>

                            </div>

                        </div>


                        {/* WORKERS */}

                        <div className="auth-feature">

                            <div className="auth-feature-icon">
                                🧑‍🔧
                            </div>


                            <div>

                                <strong>
                                    Manage Workers
                                </strong>

                                <span>
                                    View registered workers
                                    and their details.
                                </span>

                            </div>

                        </div>


                        {/* BOOKINGS */}

                        <div className="auth-feature">

                            <div className="auth-feature-icon">
                                📋
                            </div>


                            <div>

                                <strong>
                                    Manage Bookings
                                </strong>

                                <span>
                                    Monitor customer service
                                    bookings and status.
                                </span>

                            </div>

                        </div>


                        {/* SETTINGS */}

                        <div className="auth-feature">

                            <div className="auth-feature-icon">
                                ⚙️
                            </div>


                            <div>

                                <strong>
                                    Platform Settings
                                </strong>

                                <span>
                                    Configure administrator
                                    account settings.
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                       LOGIN CARD
                    ================================================= */}

                    <div className="auth-card">


                        {/* ICON */}

                        <div className="auth-card-icon">
                            🔐
                        </div>


                        {/* LABEL */}

                        <span className="section-label">
                            SECURE ADMIN LOGIN
                        </span>


                        {/* TITLE */}

                        <h2>
                            Admin Sign In
                        </h2>


                        <p className="auth-subtitle">
                            Enter your administrator credentials
                            to continue.
                        </p>


                        {/* =================================================
                           FORM
                        ================================================= */}

                        <form onSubmit={handleLogin}>


                            {/* EMAIL */}

                            <div className="form-group">

                                <label>
                                    Admin Email
                                </label>


                                <input
                                    type="email"
                                    value={email}
                                    placeholder="Enter admin email"
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* PASSWORD */}

                            <div className="form-group">

                                <label>
                                    Password
                                </label>


                                <input
                                    type="password"
                                    value={password}
                                    placeholder="Enter admin password"
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* ERROR */}

                            {error && (

                                <div
                                    style={{
                                        marginBottom: "16px",
                                        padding: "11px 12px",
                                        textAlign: "center",
                                        color: "#b91c1c",
                                        background: "#fef2f2",
                                        border: "1px solid #fecaca",
                                        borderRadius: "8px",
                                        fontSize: "10px",
                                        fontWeight: "700"
                                    }}
                                >
                                    {error}
                                </div>

                            )}


                            {/* LOGIN BUTTON */}

                            <button
                                type="submit"
                                className="auth-submit"
                            >
                                Sign In as Admin →
                            </button>

                        </form>


                        {/* =================================================
                           DIVIDER
                        ================================================= */}

                        <div className="auth-divider">

                            <span>
                                Administrator access only
                            </span>

                        </div>


                        {/* BACK HOME */}

                        <Link
                            to="/"
                            className="auth-register"
                        >
                            ← Back to Home
                        </Link>


                        {/* SECURITY */}

                        <div className="admin-security">

                            🔒 Secure Administrator Access

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}


export default AdminLogin;