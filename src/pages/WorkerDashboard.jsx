import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function WorkerDashboard() {

    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [jobs, setJobs] = useState([]);

    const currentWorker =
        JSON.parse(
            localStorage.getItem("currentWorker")
        );


    useEffect(() => {

        if (!currentWorker) {
            navigate("/worker-login");
            return;
        }

        loadData();

    }, [navigate]);


    const loadData = () => {

        const bookings =
            JSON.parse(
                localStorage.getItem("bookings")
            ) || [];


        const pendingRequests =
            bookings.filter(
                (booking) =>
                    booking.status === "Pending"
            );


        const workerJobs =
            bookings.filter(
                (booking) =>
                    booking.workerId === currentWorker.id &&
                    (
                        booking.status === "Accepted" ||
                        booking.status === "Completed"
                    )
            );


        setRequests(pendingRequests);
        setJobs(workerJobs);
    };


    const logout = () => {

        localStorage.removeItem("currentWorker");

        navigate("/worker-login");
    };


    return (
        <div className="dashboard-layout">


            <aside className="dashboard-sidebar">

                <div className="dashboard-logo">
                    🤝 Co-Op Services
                </div>


                <div className="dashboard-user">

                    <div className="user-avatar">
                        🧑‍🔧
                    </div>

                    <div>

                        <strong>
                            {currentWorker?.name || "Worker"}
                        </strong>

                        <small>
                            {currentWorker?.service ||
                                "Service Provider"}
                        </small>

                    </div>

                </div>


                <nav className="dashboard-nav">

                    <Link
                        to="/worker-dashboard"
                        className="active"
                    >
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

                    <Link to="/worker-profile">
                        <span>👤</span>
                        Profile
                    </Link>

                </nav>


                <button
                    className="dashboard-logout"
                    onClick={logout}
                >
                    ↪ Logout
                </button>

            </aside>


            <main className="dashboard-main">

                <div className="dashboard-topbar">

                    <div>

                        <span className="section-label">
                            WORKER DASHBOARD
                        </span>

                        <h1>
                            Welcome,{" "}
                            {currentWorker?.name || "Worker"}
                        </h1>

                        <p>
                            Manage customer requests and
                            accepted jobs.
                        </p>

                    </div>


                    <Link
                        to="/worker-requests"
                        className="dashboard-primary-btn"
                    >
                        📩 View Requests
                    </Link>

                </div>


                <div className="dashboard-stats">

                    <div className="stat-card">

                        <div className="stat-icon">
                            📩
                        </div>

                        <div>

                            <span>
                                Pending Requests
                            </span>

                            <strong>
                                {requests.length}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            🛠️
                        </div>

                        <div>

                            <span>
                                My Jobs
                            </span>

                            <strong>
                                {jobs.length}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            🔧
                        </div>

                        <div>

                            <span>
                                My Service
                            </span>

                            <strong style={{ fontSize: "13px" }}>
                                {currentWorker?.service ||
                                    "Not Set"}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            ✓
                        </div>

                        <div>

                            <span>
                                Status
                            </span>

                            <strong style={{ fontSize: "13px" }}>
                                {currentWorker?.status ||
                                    "Active"}
                            </strong>

                        </div>

                    </div>

                </div>


                <section className="dashboard-section">

                    <div className="dashboard-section-title">

                        <div>

                            <h2>
                                Customer Requests
                            </h2>

                            <p>
                                Requests waiting for your decision.
                            </p>

                        </div>

                        <Link to="/worker-requests">
                            View All →
                        </Link>

                    </div>


                    {requests.length === 0 ? (

                        <div className="dashboard-empty">

                            <div>📭</div>

                            <h3>
                                No Pending Requests
                            </h3>

                            <p>
                                New customer requests
                                will appear here.
                            </p>

                            <Link to="/worker-requests">
                                Open Requests
                            </Link>

                        </div>

                    ) : (

                        <div className="quick-action-grid">

                            {requests
                                .slice(0, 3)
                                .map((request) => (

                                    <div
                                        className="quick-action-card"
                                        key={request.id}
                                    >

                                        <div className="quick-icon">
                                            🔧
                                        </div>

                                        <div>

                                            <h3>
                                                {request.service}
                                            </h3>

                                            <p>
                                                Customer:{" "}
                                                {request.customer}
                                            </p>

                                            <p>
                                                Date:{" "}
                                                {request.date}
                                            </p>

                                        </div>

                                        <Link
                                            to="/worker-requests"
                                            style={{
                                                marginLeft: "auto",
                                                color: "#2563eb",
                                                fontWeight: "800"
                                            }}
                                        >
                                            View →
                                        </Link>

                                    </div>

                                ))}

                        </div>

                    )}

                </section>


                <section className="dashboard-section">

                    <div className="dashboard-section-title">

                        <div>

                            <h2>
                                My Jobs
                            </h2>

                            <p>
                                Your accepted jobs.
                            </p>

                        </div>

                        <Link to="/worker-jobs">
                            View All →
                        </Link>

                    </div>


                    {jobs.length === 0 ? (

                        <div className="dashboard-empty">

                            <div>🛠️</div>

                            <h3>
                                No Accepted Jobs
                            </h3>

                            <p>
                                Accept a customer request
                                to see it here.
                            </p>

                        </div>

                    ) : (

                        <div className="quick-action-grid">

                            {jobs.slice(0, 3).map((job) => (

                                <div
                                    className="quick-action-card"
                                    key={job.id}
                                >

                                    <div className="quick-icon">
                                        🛠️
                                    </div>

                                    <div>

                                        <h3>
                                            {job.service}
                                        </h3>

                                        <p>
                                            Customer:{" "}
                                            {job.customer}
                                        </p>

                                        <p>
                                            {job.date}
                                        </p>

                                    </div>

                                    <span>
                                        ✓
                                    </span>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default WorkerDashboard;