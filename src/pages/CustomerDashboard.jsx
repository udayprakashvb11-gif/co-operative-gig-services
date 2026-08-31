import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";


function CustomerDashboard() {

    const navigate = useNavigate();


    const [customer, setCustomer] =
        useState(null);

    const [bookings, setBookings] =
        useState([]);


    /* =========================================================
       LOAD CUSTOMER
    ========================================================= */

    useEffect(() => {

        const savedCustomer =
            JSON.parse(
                localStorage.getItem(
                    "currentCustomer"
                )
            );


        if (!savedCustomer) {

            navigate("/customer-login");

            return;
        }


        setCustomer(savedCustomer);


        loadBookings(
            savedCustomer.id
        );

    }, [navigate]);


    /* =========================================================
       LOAD CUSTOMER BOOKINGS
    ========================================================= */

    const loadBookings = (customerId) => {

        const allBookings =
            JSON.parse(
                localStorage.getItem(
                    "bookings"
                )
            ) || [];


        const customerBookings =
            allBookings.filter(
                booking =>
                    String(
                        booking.customerId
                    ) === String(customerId)
            );


        setBookings(
            customerBookings
        );
    };


    /* =========================================================
       LOGOUT
    ========================================================= */

    const handleLogout = () => {

        localStorage.removeItem(
            "currentCustomer"
        );

        navigate("/customer-login");
    };


    /* =========================================================
       STATS
    ========================================================= */

    const totalBookings =
        bookings.length;


    const pendingBookings =
        bookings.filter(
            booking =>
                booking.status ===
                "Pending"
        ).length;


    const acceptedBookings =
        bookings.filter(
            booking =>
                booking.status ===
                "Accepted"
        ).length;


    const completedBookings =
        bookings.filter(
            booking =>
                booking.status ===
                "Completed"
        ).length;


    /* =========================================================
       RECENT BOOKINGS
    ========================================================= */

    const recentBookings =
        [...bookings]
            .reverse()
            .slice(0, 4);


    /* =========================================================
       SERVICE ICON
    ========================================================= */

    const getServiceIcon = (service) => {

        const name =
            service?.toLowerCase() || "";


        if (
            name.includes("plumb")
        ) {
            return "🔧";
        }


        if (
            name.includes("electric")
        ) {
            return "⚡";
        }


        if (
            name.includes("clean")
        ) {
            return "🧹";
        }


        if (
            name.includes("paint")
        ) {
            return "🎨";
        }


        if (
            name.includes("garden")
        ) {
            return "🌱";
        }


        if (
            name.includes("carpent")
        ) {
            return "🪚";
        }


        if (
            name.includes("ac")
        ) {
            return "❄️";
        }


        if (
            name.includes("repair")
        ) {
            return "🔨";
        }


        return "🛠️";
    };


    /* =========================================================
       STATUS CLASS
    ========================================================= */

    const getStatusClass = (status) => {

        if (
            status === "Accepted"
        ) {
            return "accepted";
        }


        if (
            status === "Completed"
        ) {
            return "completed";
        }


        if (
            status === "Rejected"
        ) {
            return "rejected";
        }


        return "pending";
    };


    if (!customer) {
        return null;
    }


    return (

        <div className="dashboard-layout customer-dashboard">


            {/* =================================================
               SIDEBAR
            ================================================= */}

            <aside className="dashboard-sidebar">


                {/* LOGO */}

                <div className="dashboard-logo">

                    🤝 Co-Op Services

                </div>


                {/* CUSTOMER */}

                <div className="dashboard-user">

                    <div className="user-avatar">
                        👤
                    </div>


                    <div>

                        <strong>
                            {customer.name}
                        </strong>

                        <small>
                            Customer
                        </small>

                    </div>

                </div>


                {/* NAVIGATION */}

                <nav className="dashboard-nav">


                    <Link
                        to="/customer-dashboard"
                        className="active"
                    >
                        <span>⌂</span>

                        Dashboard
                    </Link>


                    <Link to="/services">

                        <span>🛠️</span>

                        Services

                    </Link>


                    <Link to="/my-bookings">

                        <span>📅</span>

                        My Bookings

                    </Link>


                    <Link to="/customer-profile">

                        <span>👤</span>

                        My Profile

                    </Link>


                    <Link to="/customer-feedback">

                        <span>💬</span>

                        Feedback

                    </Link>


                </nav>


                {/* LOGOUT */}

                <button
                    className="dashboard-logout"
                    onClick={handleLogout}
                >
                    ↪ Logout
                </button>


            </aside>


            {/* =================================================
               MAIN
            ================================================= */}

            <main className="dashboard-main">


                {/* =================================================
                   TOP BAR
                ================================================= */}

                <div className="dashboard-topbar">


                    <div>

                        <span className="section-label">
                            CUSTOMER DASHBOARD
                        </span>


                        <h1>
                            Welcome, {customer.name}
                        </h1>


                        <p>
                            Manage your services, bookings
                            and feedback from one place.
                        </p>

                    </div>


                    <Link
                        to="/services"
                        className="dashboard-primary-btn"
                    >
                        + Book a Service
                    </Link>


                </div>


                {/* =================================================
                   PROFILE WELCOME
                ================================================= */}

                <section className="customer-welcome-card">


                    <div className="customer-welcome-left">


                        <div className="customer-welcome-avatar">
                            👤
                        </div>


                        <div>

                            <span>
                                YOUR ACCOUNT
                            </span>


                            <h2>
                                {customer.name}
                            </h2>


                            <p>
                                {customer.email}
                            </p>

                        </div>


                    </div>


                    <Link
                        to="/customer-profile"
                        className="customer-welcome-btn"
                    >
                        View Profile →
                    </Link>


                </section>


                {/* =================================================
                   STATISTICS
                ================================================= */}

                <section className="dashboard-section">


                    <div className="dashboard-section-title">

                        <div>

                            <h2>
                                Booking Overview
                            </h2>

                            <p>
                                Your current service activity
                            </p>

                        </div>

                    </div>


                    <div className="dashboard-stats">


                        {/* TOTAL */}

                        <div className="stat-card">

                            <div className="stat-icon">
                                📅
                            </div>


                            <div>

                                <span>
                                    Total Bookings
                                </span>


                                <strong>
                                    {totalBookings}
                                </strong>

                            </div>

                        </div>


                        {/* PENDING */}

                        <div className="stat-card">

                            <div className="stat-icon">
                                ⏳
                            </div>


                            <div>

                                <span>
                                    Pending
                                </span>


                                <strong>
                                    {pendingBookings}
                                </strong>

                            </div>

                        </div>


                        {/* ACCEPTED */}

                        <div className="stat-card">

                            <div className="stat-icon">
                                ✓
                            </div>


                            <div>

                                <span>
                                    Accepted
                                </span>


                                <strong>
                                    {acceptedBookings}
                                </strong>

                            </div>

                        </div>


                        {/* COMPLETED */}

                        <div className="stat-card">

                            <div className="stat-icon">
                                ✅
                            </div>


                            <div>

                                <span>
                                    Completed
                                </span>


                                <strong>
                                    {completedBookings}
                                </strong>

                            </div>

                        </div>


                    </div>

                </section>


                {/* =================================================
                   QUICK ACTIONS
                ================================================= */}

                <section className="dashboard-section">


                    <div className="dashboard-section-title">

                        <div>

                            <h2>
                                Quick Actions
                            </h2>

                            <p>
                                Access your most-used features
                            </p>

                        </div>

                    </div>


                    <div className="quick-action-grid">


                        {/* BOOK SERVICE */}

                        <Link
                            to="/services"
                            className="quick-action-card"
                        >

                            <div className="quick-icon">
                                🛠️
                            </div>


                            <div>

                                <h3>
                                    Book a Service
                                </h3>

                                <p>
                                    Find a service and submit
                                    a new request.
                                </p>

                            </div>


                            <span>
                                →
                            </span>

                        </Link>


                        {/* MY BOOKINGS */}

                        <Link
                            to="/my-bookings"
                            className="quick-action-card"
                        >

                            <div className="quick-icon">
                                📅
                            </div>


                            <div>

                                <h3>
                                    My Bookings
                                </h3>

                                <p>
                                    View and track your
                                    service requests.
                                </p>

                            </div>


                            <span>
                                →
                            </span>

                        </Link>


                        {/* PROFILE */}

                        <Link
                            to="/customer-profile"
                            className="quick-action-card"
                        >

                            <div className="quick-icon">
                                👤
                            </div>


                            <div>

                                <h3>
                                    My Profile
                                </h3>

                                <p>
                                    View and update your
                                    personal information.
                                </p>

                            </div>


                            <span>
                                →
                            </span>

                        </Link>


                        {/* FEEDBACK */}

                        <Link
                            to="/customer-feedback"
                            className="quick-action-card"
                        >

                            <div className="quick-icon">
                                💬
                            </div>


                            <div>

                                <h3>
                                    Give Feedback
                                </h3>

                                <p>
                                    Rate your experience
                                    and share suggestions.
                                </p>

                            </div>


                            <span>
                                →
                            </span>

                        </Link>


                    </div>

                </section>


                {/* =================================================
                   RECENT BOOKINGS
                ================================================= */}

                <section className="dashboard-section">


                    <div className="dashboard-section-title">


                        <div>

                            <h2>
                                Recent Bookings
                            </h2>

                            <p>
                                Your latest service requests
                            </p>

                        </div>


                        <Link to="/my-bookings">
                            View All →
                        </Link>


                    </div>


                    {recentBookings.length === 0 ? (

                        <div className="dashboard-empty">


                            <div>
                                📭
                            </div>


                            <h3>
                                No Bookings Yet
                            </h3>


                            <p>
                                You haven't booked a service yet.
                            </p>


                            <Link to="/services">
                                Book Your First Service
                            </Link>


                        </div>

                    ) : (

                        <div className="customer-recent-bookings">


                            {recentBookings.map(
                                (booking) => (

                                    <div
                                        className="customer-booking-card"
                                        key={booking.id}
                                    >


                                        {/* SERVICE */}

                                        <div className="customer-booking-main">


                                            <div className="customer-booking-service-icon">
                                                {getServiceIcon(
                                                    booking.service
                                                )}
                                            </div>


                                            <div>

                                                <h3>
                                                    {
                                                        booking.service
                                                    }
                                                </h3>


                                                <p>
                                                    {
                                                        booking.id
                                                    }
                                                </p>

                                            </div>


                                        </div>


                                        {/* DETAILS */}

                                        <div className="customer-booking-details">


                                            <div>

                                                <span>
                                                    DATE
                                                </span>

                                                <strong>
                                                    {
                                                        booking.date
                                                    }
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    TIME
                                                </span>

                                                <strong>
                                                    {
                                                        booking.time
                                                    }
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    WORKER
                                                </span>

                                                <strong>
                                                    {
                                                        booking.worker ||
                                                        "Not Assigned"
                                                    }
                                                </strong>

                                            </div>


                                        </div>


                                        {/* STATUS */}

                                        <span
                                            className={`booking-status ${getStatusClass(
                                                booking.status
                                            )}`}
                                        >
                                            {
                                                booking.status ||
                                                "Pending"
                                            }
                                        </span>


                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* =================================================
                   FEEDBACK CARD
                ================================================= */}

                <section className="customer-feedback-promo">


                    <div className="customer-feedback-promo-icon">
                        💬
                    </div>


                    <div>

                        <span>
                            WE VALUE YOUR OPINION
                        </span>


                        <h2>
                            How was your experience?
                        </h2>


                        <p>
                            Share your feedback and help us
                            improve Co-Op Services.
                        </p>

                    </div>


                    <Link
                        to="/customer-feedback"
                        className="customer-feedback-promo-btn"
                    >
                        Give Feedback →
                    </Link>


                </section>


            </main>

        </div>
    );
}

export default CustomerDashboard;