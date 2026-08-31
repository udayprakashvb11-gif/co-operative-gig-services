import { Link, useNavigate } from "react-router-dom";

function WorkerJobs() {

    const navigate = useNavigate();

    const jobs = [
        {
            id: 1,
            service: "Plumbing",
            customer: "Rahul",
            date: "30 Aug 2026",
            time: "10:00 AM",
            address: "Chennai, Tamil Nadu",
            status: "Accepted",
            icon: "🔧"
        },
        {
            id: 2,
            service: "Electrical",
            customer: "Arun",
            date: "28 Aug 2026",
            time: "02:00 PM",
            address: "Tambaram, Chennai",
            status: "Completed",
            icon: "⚡"
        }
    ];


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
                        <strong>Worker</strong>
                        <small>Service Provider</small>
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

                    <Link
                        to="/worker-jobs"
                        className="active"
                    >
                        <span>🛠️</span>
                        My Jobs
                    </Link>

                    <Link to="/worker-profile">
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
                            MY JOBS
                        </span>

                        <h1>
                            Your Work
                        </h1>

                        <p>
                            Manage your accepted and completed
                            service jobs.
                        </p>

                    </div>

                </div>


                {/* STATS */}

                <div className="dashboard-stats">

                    <div className="stat-card">

                        <div className="stat-icon">
                            🛠️
                        </div>

                        <div>
                            <span>Total Jobs</span>
                            <strong>{jobs.length}</strong>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            📅
                        </div>

                        <div>
                            <span>Active Jobs</span>
                            <strong>
                                {
                                    jobs.filter(
                                        (j) => j.status === "Accepted"
                                    ).length
                                }
                            </strong>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            ✓
                        </div>

                        <div>
                            <span>Completed</span>
                            <strong>
                                {
                                    jobs.filter(
                                        (j) => j.status === "Completed"
                                    ).length
                                }
                            </strong>
                        </div>

                    </div>

                </div>


                {/* JOB LIST */}

                <section className="dashboard-section">

                    <div className="dashboard-section-title">

                        <div>

                            <h2>
                                My Jobs
                            </h2>

                            <p>
                                Services you have accepted or completed.
                            </p>

                        </div>

                    </div>


                    <div className="worker-job-list">

                        {jobs.map((job) => (

                            <div
                                className="worker-job-card"
                                key={job.id}
                            >

                                <div className="worker-job-main">

                                    <div className="worker-job-icon">
                                        {job.icon}
                                    </div>

                                    <div>

                                        <h3>
                                            {job.service}
                                        </h3>

                                        <p>
                                            Customer: {job.customer}
                                        </p>

                                    </div>

                                </div>


                                <div className="worker-job-details">

                                    <div>
                                        <span>Date</span>
                                        <strong>
                                            {job.date}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Time</span>
                                        <strong>
                                            {job.time}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Location</span>
                                        <strong>
                                            {job.address}
                                        </strong>
                                    </div>

                                </div>


                                <span
                                    className={`job-status ${job.status.toLowerCase()}`}
                                >
                                    {job.status}
                                </span>

                            </div>

                        ))}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default WorkerJobs;