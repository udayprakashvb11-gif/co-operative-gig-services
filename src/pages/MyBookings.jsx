import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function MyBookings() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState("All");


    /* =========================================================
       LOAD CURRENT CUSTOMER BOOKINGS
    ========================================================= */

    useEffect(() => {

        const currentCustomer =
            JSON.parse(
                localStorage.getItem("currentCustomer")
            );

        const allBookings =
            JSON.parse(
                localStorage.getItem("bookings")
            ) || [];


        if (!currentCustomer) {
            navigate("/customer-login");
            return;
        }


        const customerBookings = allBookings.filter(
            (booking) =>
                booking.customerId === currentCustomer.id
        );


        setBookings(customerBookings);

    }, [navigate]);


    /* =========================================================
       SERVICE ICON
    ========================================================= */

    const getServiceIcon = (service) => {

        const name = service?.toLowerCase();

        if (name === "plumbing") return "🔧";
        if (name === "electrical") return "⚡";
        if (name === "cleaning") return "🧹";
        if (name === "painting") return "🎨";
        if (name === "gardening") return "🌱";
        if (name === "carpentry") return "🪚";
        if (name === "ac service") return "❄️";
        if (name === "home repair") return "🔨";

        return "🛠️";
    };


    /* =========================================================
       FILTER BOOKINGS
    ========================================================= */

    const filteredBookings =
        filter === "All"
            ? bookings
            : bookings.filter(
                (booking) =>
                    booking.status === filter
            );


    /* =========================================================
       COUNTS
    ========================================================= */

    const pendingCount =
        bookings.filter(
            (booking) =>
                booking.status === "Pending"
        ).length;


    const acceptedCount =
        bookings.filter(
            (booking) =>
                booking.status === "Accepted"
        ).length;


    const completedCount =
        bookings.filter(
            (booking) =>
                booking.status === "Completed"
        ).length;


    /* =========================================================
       REFRESH BOOKINGS
    ========================================================= */

    const refreshBookings = () => {

        const currentCustomer =
            JSON.parse(
                localStorage.getItem("currentCustomer")
            );

        const allBookings =
            JSON.parse(
                localStorage.getItem("bookings")
            ) || [];


        if (!currentCustomer) {
            navigate("/customer-login");
            return;
        }


        const customerBookings = allBookings.filter(
            (booking) =>
                booking.customerId === currentCustomer.id
        );


        setBookings(customerBookings);
    };


    /* =========================================================
       CANCEL BOOKING
    ========================================================= */

    const cancelBooking = (bookingId) => {

        const confirmCancel =
            window.confirm(
                "Are you sure you want to cancel this booking?"
            );


        if (!confirmCancel) {
            return;
        }


        const allBookings =
            JSON.parse(
                localStorage.getItem("bookings")
            ) || [];


        const updatedBookings =
            allBookings.map((booking) =>
                booking.id === bookingId
                    ? {
                        ...booking,
                        status: "Rejected"
                    }
                    : booking
            );


        localStorage.setItem(
            "bookings",
            JSON.stringify(updatedBookings)
        );


        refreshBookings();
    };


    return (
        <div className="bookings-page">

            <div className="bookings-container">

                {/* =================================================
                   BACK
                ================================================= */}

                <Link
                    to="/customer-dashboard"
                    className="page-back-link"
                >
                    ← Back to Dashboard
                </Link>


                {/* =================================================
                   HEADER
                ================================================= */}

                <div className="bookings-header">

                    <span className="section-label">
                        CUSTOMER BOOKINGS
                    </span>

                    <h1>
                        My Bookings
                    </h1>

                    <p>
                        Track your service requests and view
                        their current status in one place.
                    </p>

                </div>


                {/* =================================================
                   SUMMARY CARDS
                ================================================= */}

                <div className="booking-summary">


                    {/* TOTAL */}

                    <div className="booking-summary-card">

                        <div className="booking-summary-icon">
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


                    {/* PENDING */}

                    <div className="booking-summary-card">

                        <div className="booking-summary-icon">
                            ⏳
                        </div>

                        <div>

                            <span>
                                Pending
                            </span>

                            <strong>
                                {pendingCount}
                            </strong>

                        </div>

                    </div>


                    {/* COMPLETED */}

                    <div className="booking-summary-card">

                        <div className="booking-summary-icon">
                            ✓
                        </div>

                        <div>

                            <span>
                                Completed
                            </span>

                            <strong>
                                {completedCount}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================================
                   FILTER CARD
                ================================================= */}

                <div className="booking-filter-card">

                    <div className="booking-filter-card-title">
                        Filter Bookings
                    </div>


                    <div className="booking-filters">


                        <button
                            className={
                                filter === "All"
                                    ? "booking-filter active"
                                    : "booking-filter"
                            }
                            onClick={() => setFilter("All")}
                        >
                            All
                        </button>


                        <button
                            className={
                                filter === "Pending"
                                    ? "booking-filter active"
                                    : "booking-filter"
                            }
                            onClick={() => setFilter("Pending")}
                        >
                            Pending
                        </button>


                        <button
                            className={
                                filter === "Accepted"
                                    ? "booking-filter active"
                                    : "booking-filter"
                            }
                            onClick={() => setFilter("Accepted")}
                        >
                            Accepted
                        </button>


                        <button
                            className={
                                filter === "Completed"
                                    ? "booking-filter active"
                                    : "booking-filter"
                            }
                            onClick={() => setFilter("Completed")}
                        >
                            Completed
                        </button>


                        <button
                            className={
                                filter === "Rejected"
                                    ? "booking-filter active"
                                    : "booking-filter"
                            }
                            onClick={() => setFilter("Rejected")}
                        >
                            Rejected
                        </button>

                    </div>

                </div>


                {/* =================================================
                   BOOKING LIST
                ================================================= */}

                <div className="booking-list">

                    {filteredBookings.length === 0 ? (

                        <div className="bookings-empty">

                            <div className="bookings-empty-icon">
                                📅
                            </div>

                            <h2>
                                No Bookings Found
                            </h2>

                            <p>
                                {filter === "All"
                                    ? "You haven't made any service bookings yet."
                                    : `You don't have any ${filter.toLowerCase()} bookings.`}
                            </p>

                            <Link to="/services">
                                Browse Services →
                            </Link>

                        </div>

                    ) : (

                        filteredBookings.map((booking) => (

                            <div
                                className="booking-card"
                                key={booking.id}
                            >


                                {/* SERVICE */}

                                <div className="booking-service">

                                    <div className="booking-service-icon">
                                        {getServiceIcon(
                                            booking.service
                                        )}
                                    </div>


                                    <div>

                                        <h3>
                                            {booking.service}
                                        </h3>

                                        <p>
                                            Booking ID: {booking.id}
                                        </p>

                                    </div>

                                </div>


                                {/* DETAILS */}

                                <div className="booking-details">


                                    <div className="booking-detail">

                                        <span>
                                            Date
                                        </span>

                                        <strong>
                                            {booking.date || "Not set"}
                                        </strong>

                                    </div>


                                    <div className="booking-detail">

                                        <span>
                                            Time
                                        </span>

                                        <strong>
                                            {booking.time || "Not set"}
                                        </strong>

                                    </div>


                                    <div className="booking-detail">

                                        <span>
                                            Address
                                        </span>

                                        <strong
                                            title={booking.address}
                                        >
                                            {booking.address || "Not provided"}
                                        </strong>

                                    </div>


                                    <div className="booking-detail">

                                        <span>
                                            Worker
                                        </span>

                                        <strong>
                                            {booking.worker || "Waiting for worker"}
                                        </strong>

                                    </div>

                                </div>


                                {/* BOTTOM */}

                                <div className="booking-card-bottom">

                                    <span className="booking-id">
                                        Requested
                                    </span>


                                    <span
                                        className={
                                            `booking-status ${
                                                booking.status
                                                    ?.toLowerCase()
                                                    .replace(" ", "-")
                                            }`
                                        }
                                    >
                                        {booking.status || "Pending"}
                                    </span>

                                </div>


                                {/* CANCEL */}

                                {booking.status === "Pending" && (

                                    <button
                                        className="booking-cancel-btn"
                                        onClick={() =>
                                            cancelBooking(
                                                booking.id
                                            )
                                        }
                                    >
                                        Cancel Booking
                                    </button>

                                )}

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}

export default MyBookings;