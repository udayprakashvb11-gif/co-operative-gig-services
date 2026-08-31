import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function WorkerProfile() {

    const navigate = useNavigate();

    const [editing, setEditing] = useState(false);

    const [worker, setWorker] = useState({
        name: "Worker",
        email: "worker@example.com",
        phone: "9876543210",
        work: "Plumbing",
        experience: "3 - 5 years",
        location: "Chennai, Tamil Nadu"
    });


    const handleChange = (e) => {

        setWorker({
            ...worker,
            [e.target.name]: e.target.value
        });

    };


    const handleSave = (e) => {

        e.preventDefault();

        localStorage.setItem(
            "workerProfile",
            JSON.stringify(worker)
        );

        setEditing(false);

        alert("Profile updated successfully!");

    };


    const logout = () => {
        navigate("/worker-login");
    };


    return (
        <div className="dashboard-layout">

            {/* SIDEBAR */}

            <aside className="dashboard-sidebar">

                <div className="dashboard-logo">
                    <span>🤝</span>
                    <span>Co-Op Services</span>
                </div>


                <div className="dashboard-user">

                    <div className="user-avatar">
                        🧑‍🔧
                    </div>

                    <div>
                        <strong>
                            {worker.name}
                        </strong>

                        <small>
                            Service Provider
                        </small>
                    </div>

                </div>


                <nav className="dashboard-nav">

                    <Link to="/worker-dashboard">
                        <span>⌂</span>
                        Dashboard
                    </Link>

                    <Link to="/worker-requests">
                        <span>📩</span>
                        Requests
                    </Link>

                    <Link to="/worker-jobs">
                        <span>🛠️</span>
                        My Jobs
                    </Link>

                    <Link
                        to="/worker-profile"
                        className="active"
                    >
                        <span>👤</span>
                        My Profile
                    </Link>

                </nav>


                <button
                    className="dashboard-logout"
                    onClick={logout}
                >
                    ↪ Logout
                </button>

            </aside>


            {/* MAIN */}

            <main className="dashboard-main">

                <div className="dashboard-topbar">

                    <div>

                        <span className="section-label">
                            WORKER PROFILE
                        </span>

                        <h1>
                            My Profile
                        </h1>

                        <p>
                            Manage your service provider information.
                        </p>

                    </div>

                </div>


                <section className="worker-profile-page">


                    {/* PROFILE SUMMARY */}

                    <div className="worker-profile-card">

                        <div className="worker-profile-avatar">
                            🧑‍🔧
                        </div>

                        <h2>
                            {worker.name}
                        </h2>

                        <p>
                            {worker.work}
                        </p>

                        <span className="worker-active-badge">
                            ● Active Worker
                        </span>

                    </div>


                    {/* INFORMATION */}

                    <div className="worker-profile-info">

                        <div className="worker-profile-header">

                            <div>

                                <h2>
                                    Professional Information
                                </h2>

                                <p>
                                    Keep your information up to date.
                                </p>

                            </div>


                            <button
                                className="profile-edit-btn"
                                onClick={() =>
                                    setEditing(!editing)
                                }
                            >
                                {editing
                                    ? "Cancel"
                                    : "Edit Profile"}
                            </button>

                        </div>


                        {editing ? (

                            <form
                                className="worker-profile-form"
                                onSubmit={handleSave}
                            >

                                <div className="profile-field">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={worker.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="profile-field">

                                    <label>
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={worker.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="profile-field">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={worker.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="profile-field">

                                    <label>
                                        Work / Service
                                    </label>

                                    <select
                                        name="work"
                                        value={worker.work}
                                        onChange={handleChange}
                                    >

                                        <option>
                                            Plumbing
                                        </option>

                                        <option>
                                            Electrical
                                        </option>

                                        <option>
                                            Cleaning
                                        </option>

                                        <option>
                                            Painting
                                        </option>

                                        <option>
                                            Gardening
                                        </option>

                                        <option>
                                            Carpentry
                                        </option>

                                        <option>
                                            AC Service
                                        </option>

                                        <option>
                                            Home Repair
                                        </option>

                                    </select>

                                </div>


                                <div className="profile-field">

                                    <label>
                                        Experience
                                    </label>

                                    <select
                                        name="experience"
                                        value={worker.experience}
                                        onChange={handleChange}
                                    >

                                        <option>
                                            Less than 1 year
                                        </option>

                                        <option>
                                            1 - 3 years
                                        </option>

                                        <option>
                                            3 - 5 years
                                        </option>

                                        <option>
                                            5+ years
                                        </option>

                                    </select>

                                </div>


                                <div className="profile-field">

                                    <label>
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={worker.location}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="worker-profile-save">

                                    <button
                                        type="submit"
                                        className="profile-save-btn"
                                    >
                                        Save Changes
                                    </button>

                                </div>

                            </form>

                        ) : (

                            <div className="worker-profile-details">

                                <div>
                                    <span>Full Name</span>
                                    <strong>{worker.name}</strong>
                                </div>

                                <div>
                                    <span>Email Address</span>
                                    <strong>{worker.email}</strong>
                                </div>

                                <div>
                                    <span>Phone Number</span>
                                    <strong>{worker.phone}</strong>
                                </div>

                                <div>
                                    <span>Service</span>
                                    <strong>{worker.work}</strong>
                                </div>

                                <div>
                                    <span>Experience</span>
                                    <strong>{worker.experience}</strong>
                                </div>

                                <div>
                                    <span>Location</span>
                                    <strong>{worker.location}</strong>
                                </div>

                            </div>

                        )}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default WorkerProfile;