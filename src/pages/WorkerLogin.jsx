import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function WorkerLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    /* =========================================================
       LOGIN
    ========================================================= */

    const handleLogin = (e) => {

        e.preventDefault();

        setError("");


        // Get workers registered by WorkerRegister
        const workers =
            JSON.parse(
                localStorage.getItem("workers")
            ) || [];


        if (workers.length === 0) {

            setError(
                "No worker account found. Please create a worker account first."
            );

            return;
        }


        // Find worker
        const worker = workers.find(
            (item) =>
                item.email?.toLowerCase().trim() ===
                email.toLowerCase().trim() &&
                item.password === password
        );


        // Invalid login
        if (!worker) {

            setError(
                "Invalid email or password. Please check your details."
            );

            return;
        }


        // Save logged-in worker
        localStorage.setItem(
            "currentWorker",
            JSON.stringify(worker)
        );


        // Go to dashboard
        navigate("/worker-dashboard");
    };


    return (

        <div className="worker-login-page">


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

                    <Link
                        to="/worker-register"
                        className="nav-login"
                    >
                        Become a Worker
                    </Link>

                </div>

            </nav>


            {/* =================================================
               LOGIN MAIN
            ================================================= */}

            <main className="worker-login-main">


                <div className="worker-login-container">


                    {/* =================================================
                       LEFT HERO
                    ================================================= */}

                    <section className="worker-login-hero">


                        <div className="worker-login-hero-content">

                            <span className="worker-login-label">
                                WORKER PORTAL
                            </span>


                            <h1>
                                Welcome Back,
                                <br />
                                Worker.
                            </h1>


                            <p>
                                Manage customer requests,
                                accept jobs and keep track
                                of your service work from
                                one place.
                            </p>


                            {/* FEATURE CARDS */}

                            <div className="worker-login-features">


                                <div className="worker-login-feature">

                                    <div className="worker-login-feature-icon">
                                        📩
                                    </div>

                                    <div>

                                        <strong>
                                            Customer Requests
                                        </strong>

                                        <span>
                                            View requests submitted
                                            by real customers.
                                        </span>

                                    </div>

                                </div>


                                <div className="worker-login-feature">

                                    <div className="worker-login-feature-icon">
                                        ✓
                                    </div>

                                    <div>

                                        <strong>
                                            Accept or Reject
                                        </strong>

                                        <span>
                                            Decide which service
                                            requests you want.
                                        </span>

                                    </div>

                                </div>


                                <div className="worker-login-feature">

                                    <div className="worker-login-feature-icon">
                                        🛠️
                                    </div>

                                    <div>

                                        <strong>
                                            Manage Your Jobs
                                        </strong>

                                        <span>
                                            Track all your accepted
                                            customer jobs.
                                        </span>

                                    </div>

                                </div>


                            </div>

                        </div>


                        <div className="worker-login-bottom">
                            🤝 Connecting skilled workers
                            with local customers
                        </div>


                    </section>


                    {/* =================================================
                       LOGIN CARD
                    ================================================= */}

                    <section className="worker-login-card">


                        {/* ICON */}

                        <div className="worker-login-card-icon">
                            🧑‍🔧
                        </div>


                        <span className="worker-login-card-label">
                            WORKER LOGIN
                        </span>


                        <h2>
                            Sign in to your account
                        </h2>


                        <p className="worker-login-subtitle">
                            Enter the email and password
                            you used when registering.
                        </p>


                        {/* ERROR */}

                        {error && (

                            <div className="worker-login-error">
                                ⚠️ {error}
                            </div>

                        )}


                        {/* FORM */}

                        <form
                            onSubmit={handleLogin}
                            className="worker-login-form"
                        >


                            {/* EMAIL */}

                            <div className="worker-login-field">

                                <label>
                                    Email Address
                                </label>

                                <div className="worker-login-input">

                                    <span>
                                        ✉️
                                    </span>

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                            </div>


                            {/* PASSWORD */}

                            <div className="worker-login-field">

                                <label>
                                    Password
                                </label>

                                <div className="worker-login-input">

                                    <span>
                                        🔒
                                    </span>

                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                            </div>


                            {/* LOGIN BUTTON */}

                            <button
                                type="submit"
                                className="worker-login-submit"
                            >

                                <span>
                                    Sign In as Worker
                                </span>

                                <b>
                                    →
                                </b>

                            </button>


                        </form>


                        {/* DIVIDER */}

                        <div className="worker-login-divider">

                            <span>
                                New worker?
                            </span>

                        </div>


                        {/* REGISTER */}

                        <Link
                            to="/worker-register"
                            className="worker-login-register"
                        >
                            Create Worker Account
                            <span>
                                →
                            </span>
                        </Link>


                        {/* CUSTOMER LOGIN */}

                        <div className="worker-login-customer">

                            Customer?

                            <Link to="/customer-login">
                                Customer Login
                            </Link>

                        </div>


                        {/* SECURITY */}

                        <div className="worker-login-security">

                            🔐 Your account details are
                            stored securely on this device.

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default WorkerLogin;