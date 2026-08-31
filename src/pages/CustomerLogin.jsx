import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function CustomerLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();

        const customers =
            JSON.parse(localStorage.getItem("customers")) || [];

        const customer = customers.find(
            (item) =>
                item.email.toLowerCase() === email.toLowerCase() &&
                item.password === password
        );

        if (!customer) {
            alert("Invalid email or password.");
            return;
        }

        localStorage.setItem(
            "currentCustomer",
            JSON.stringify(customer)
        );

        navigate("/customer-dashboard");
    };

    return (
        <div className="auth-page">

            <nav className="navbar">

                <h2>🤝 Co-Op Services</h2>

                <div className="nav-links">

                    <Link to="/">Home</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/worker-login">Worker Login</Link>
                    <Link to="/admin-login">Admin</Link>

                </div>

            </nav>


            <main className="auth-main">

                <div className="auth-container">

                    <div className="auth-info">

                        <span className="section-label">
                            CUSTOMER PORTAL
                        </span>

                        <h1>
                            Welcome back.
                        </h1>

                        <p>
                            Sign in to book services and
                            manage your service requests.
                        </p>

                    </div>


                    <div className="auth-card">

                        <div className="auth-card-icon">
                            👤
                        </div>

                        <span className="section-label">
                            CUSTOMER LOGIN
                        </span>

                        <h2>
                            Sign in to your account
                        </h2>

                        <p className="auth-subtitle">
                            Enter your registered email and password.
                        </p>


                        <form onSubmit={handleLogin}>

                            <div className="form-group">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <button
                                type="submit"
                                className="auth-submit"
                            >
                                Sign In →
                            </button>

                        </form>


                        <div className="auth-divider">
                            <span>New to Co-Op Services?</span>
                        </div>


                        <Link
                            to="/customer-register"
                            className="auth-register"
                        >
                            Create Customer Account
                        </Link>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default CustomerLogin;