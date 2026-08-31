import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import {
    getCustomers,
    getWorkers,
    getBookings,
    exportData
} from "../utils/exportData";


function AdminDashboard() {

    const navigate = useNavigate();


    const [customers, setCustomers] =
        useState([]);

    const [workers, setWorkers] =
        useState([]);

    const [bookings, setBookings] =
        useState([]);


    useEffect(() => {

        const admin =
            JSON.parse(
                localStorage.getItem(
                    "currentAdmin"
                )
            );


        if (!admin) {

            navigate("/admin-login");

            return;
        }


        loadData();

    }, [navigate]);


    const loadData = () => {

        setCustomers(
            getCustomers()
        );

        setWorkers(
            getWorkers()
        );

        setBookings(
            getBookings()
        );
    };


    const handleExport = (type) => {

        const format =
            localStorage.getItem(
                "adminExportFormat"
            ) || "pdf";


        exportData(
            format,
            type
        );
    };


    const logout = () => {

        localStorage.removeItem(
            "currentAdmin"
        );

        navigate("/admin-login");
    };


    const pending =
        bookings.filter(
            booking =>
                booking.status ===
                "Pending"
        ).length;


    const accepted =
        bookings.filter(
            booking =>
                booking.status ===
                "Accepted"
        ).length;


    return (

        <div className="dashboard-layout admin-dashboard">


            {/* =================================================
               SIDEBAR
            ================================================= */}

            <aside className="dashboard-sidebar">

                <div className="dashboard-logo">
                    🤝 Co-Op Admin
                </div>


                <div className="dashboard-user">

                    <div className="user-avatar admin-avatar">
                        👨‍💼
                    </div>

                    <div>

                        <strong>
                            Administrator
                        </strong>

                        <small>
                            Admin Panel
                        </small>

                    </div>

                </div>


                <nav className="dashboard-nav">

                    <Link
                        to="/admin-dashboard"
                        className="active"
                    >
                        <span>⌂</span>
                        Dashboard
                    </Link>


                    <Link to="/admin-customers">
                        <span>👥</span>
                        Customers
                    </Link>


                    <Link to="/admin-workers">
                        <span>🧑‍🔧</span>
                        Workers
                    </Link>


                    <Link to="/admin-bookings">
                        <span>📅</span>
                        Bookings
                    </Link>


                    <Link to="/admin-settings">
                        <span>⚙️</span>
                        Settings
                    </Link>

                </nav>


                <button
                    className="dashboard-logout"
                    onClick={logout}
                >
                    ↪ Logout
                </button>

            </aside>


            {/* =================================================
               MAIN
            ================================================= */}

            <main className="dashboard-main">


                <div className="dashboard-topbar">

                    <div>

                        <span className="section-label">
                            ADMIN DASHBOARD
                        </span>

                        <h1>
                            Platform Overview
                        </h1>

                        <p>
                            Manage your entire Co-Op Services
                            platform.
                        </p>

                    </div>

                </div>


                {/* =================================================
                   STATISTICS
                ================================================= */}

                <div className="dashboard-stats">


                    <div className="stat-card">

                        <div className="stat-icon">
                            👥
                        </div>

                        <div>

                            <span>
                                Total Customers
                            </span>

                            <strong>
                                {customers.length}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            🧑‍🔧
                        </div>

                        <div>

                            <span>
                                Total Workers
                            </span>

                            <strong>
                                {workers.length}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            📅
                        </div>

                        <div>

                            <span>
                                Total Bookings
                            </span>

                            <strong>
                                {bookings.length}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            ⏳
                        </div>

                        <div>

                            <span>
                                Pending
                            </span>

                            <strong>
                                {pending}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================================
                   QUICK MANAGEMENT
                ================================================= */}

                <section className="dashboard-section">

                    <div className="dashboard-section-title">

                        <div>

                            <h2>
                                Management
                            </h2>

                            <p>
                                Access the platform records.
                            </p>

                        </div>

                    </div>


                    <div className="quick-action-grid">


                        <Link
                            to="/admin-customers"
                            className="quick-action-card"
                        >

                            <div className="quick-icon">
                                👥
                            </div>

                            <div>

                                <h3>
                                    Customers
                                </h3>

                                <p>
                                    View {customers.length}
                                    {" "}
                                    registered customers.
                                </p>

                            </div>

                            <span>
                                →
                            </span>

                        </Link>


                        <Link
                            to="/admin-workers"
                            className="quick-action-card"
                        >

                            <div className="quick-icon">
                                🧑‍🔧
                            </div>

                            <div>

                                <h3>
                                    Workers
                                </h3>

                                <p>
                                    View {workers.length}
                                    {" "}
                                    registered workers.
                                </p>

                            </div>

                            <span>
                                →
                            </span>

                        </Link>


                        <Link
                            to="/admin-bookings"
                            className="quick-action-card"
                        >

                            <div className="quick-icon">
                                📅
                            </div>

                            <div>

                                <h3>
                                    Bookings
                                </h3>

                                <p>
                                    View {bookings.length}
                                    {" "}
                                    service requests.
                                </p>

                            </div>

                            <span>
                                →
                            </span>

                        </Link>

                    </div>

                </section>


                {/* =================================================
                   BOOKING STATUS
                ================================================= */}

                <section className="dashboard-section">

                    <div className="admin-settings-grid">


                        <div className="admin-settings-card">

                            <div className="admin-settings-header">

                                <div className="admin-settings-icon">
                                    📊
                                </div>

                                <div>

                                    <h2>
                                        Booking Status
                                    </h2>

                                    <p>
                                        Current platform requests.
                                    </p>

                                </div>

                            </div>


                            <div className="admin-setting-option">

                                <div>

                                    <strong>
                                        Pending
                                    </strong>

                                    <span>
                                        Waiting for a worker
                                    </span>

                                </div>

                                <strong>
                                    {pending}
                                </strong>

                            </div>


                            <div className="admin-setting-option">

                                <div>

                                    <strong>
                                        Accepted
                                    </strong>

                                    <span>
                                        Accepted by workers
                                    </span>

                                </div>

                                <strong>
                                    {accepted}
                                </strong>

                            </div>


                            <Link
                                to="/admin-bookings"
                                className="admin-secondary-btn"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                View All Bookings
                            </Link>

                        </div>


                        <div className="admin-settings-card">

                            <div className="admin-settings-header">

                                <div className="admin-settings-icon">
                                    📥
                                </div>

                                <div>

                                    <h2>
                                        Export Data
                                    </h2>

                                    <p>
                                        Download platform records.
                                    </p>

                                </div>

                            </div>


                            <button
                                className="admin-save-btn"
                                onClick={() =>
                                    handleExport("customers")
                                }
                            >
                                Export Customers
                            </button>


                            <button
                                className="admin-secondary-btn"
                                onClick={() =>
                                    handleExport("workers")
                                }
                            >
                                Export Workers
                            </button>


                            <button
                                className="admin-secondary-btn"
                                onClick={() =>
                                    handleExport("bookings")
                                }
                            >
                                Export Bookings
                            </button>


                            <button
                                className="admin-secondary-btn"
                                onClick={() =>
                                    handleExport("all")
                                }
                            >
                                Export All Data
                            </button>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;