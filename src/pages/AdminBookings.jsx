import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import {
    getBookings,
    exportData
} from "../utils/exportData";


function AdminBookings() {

    const navigate = useNavigate();

    const [bookings, setBookings] =
        useState([]);

    const [search, setSearch] =
        useState("");


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

        loadBookings();

    }, [navigate]);


    const loadBookings = () => {

        setBookings(
            getBookings()
        );
    };


    const filteredBookings =
        bookings.filter(
            booking =>
                booking.customer
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                booking.service
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                booking.status
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );


    const getStatusClass = (status) => {

        if (status === "Accepted") {
            return "accepted";
        }

        if (status === "Completed") {
            return "completed";
        }

        if (status === "Rejected") {
            return "pending";
        }

        return "pending";
    };


    const format =
        localStorage.getItem(
            "adminExportFormat"
        ) || "pdf";


    return (

        <div className="dashboard-layout admin-dashboard">


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

                    <Link to="/admin-dashboard">
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

                    <Link
                        to="/admin-bookings"
                        className="active"
                    >
                        <span>📅</span>
                        Bookings
                    </Link>

                    <Link to="/admin-settings">
                        <span>⚙️</span>
                        Settings
                    </Link>

                </nav>

            </aside>


            <main className="dashboard-main">


                <div className="dashboard-topbar">

                    <div>

                        <span className="section-label">
                            BOOKING MANAGEMENT
                        </span>

                        <h1>
                            Bookings
                        </h1>

                        <p>
                            View all service requests submitted
                            by customers.
                        </p>

                    </div>

                </div>


                <div className="dashboard-stats">


                    <div className="stat-card">

                        <div className="stat-icon">
                            📅
                        </div>

                        <div>

                            <span>
                                Total
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

                                {
                                    bookings.filter(
                                        b =>
                                            b.status ===
                                            "Pending"
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

                            <span>
                                Accepted
                            </span>

                            <strong>

                                {
                                    bookings.filter(
                                        b =>
                                            b.status ===
                                            "Accepted"
                                    ).length
                                }

                            </strong>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            ✅
                        </div>

                        <div>

                            <span>
                                Completed
                            </span>

                            <strong>

                                {
                                    bookings.filter(
                                        b =>
                                            b.status ===
                                            "Completed"
                                    ).length
                                }

                            </strong>

                        </div>

                    </div>

                </div>


                <div className="admin-table-section">


                    <div className="admin-section-header">

                        <div>

                            <h2>
                                Service Requests
                            </h2>

                            <p>
                                Customer booking information
                            </p>

                        </div>


                        <button
                            className="admin-save-btn"
                            style={{
                                width: "150px"
                            }}
                            onClick={() =>
                                exportData(
                                    format,
                                    "bookings"
                                )
                            }
                        >
                            📥 Export
                        </button>

                    </div>


                    <div
                        style={{
                            padding: "18px 24px"
                        }}
                    >

                        <input
                            type="text"
                            placeholder="Search customer, service or status..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            style={{
                                width: "100%",
                                maxWidth: "380px",
                                height: "40px",
                                padding: "0 12px",
                                border: "1px solid #dbe3ec",
                                borderRadius: "8px",
                                outline: "none",
                                fontSize: "10px"
                            }}
                        />

                    </div>


                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>
                                        Booking
                                    </th>

                                    <th>
                                        Customer
                                    </th>

                                    <th>
                                        Service
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Time
                                    </th>

                                    <th>
                                        Worker
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredBookings.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            style={{
                                                textAlign: "center",
                                                padding: "40px"
                                            }}
                                        >
                                            No bookings found.
                                        </td>

                                    </tr>

                                ) : (

                                    filteredBookings.map(
                                        (booking, index) => (

                                            <tr
                                                key={
                                                    booking.id ||
                                                    index
                                                }
                                            >

                                                <td>
                                                    <strong>
                                                        {
                                                            booking.id
                                                        }
                                                    </strong>
                                                </td>


                                                <td>

                                                    <div className="admin-user-cell">

                                                        <div className="admin-user-avatar">
                                                            👤
                                                        </div>

                                                        <div>

                                                            <strong>
                                                                {
                                                                    booking.customer
                                                                }
                                                            </strong>

                                                            <div
                                                                style={{
                                                                    fontSize: "8px"
                                                                }}
                                                            >
                                                                {
                                                                    booking.customerEmail
                                                                }
                                                            </div>

                                                        </div>

                                                    </div>

                                                </td>


                                                <td>
                                                    {
                                                        booking.service
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        booking.date
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        booking.time
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        booking.worker ||
                                                        "Not Assigned"
                                                    }
                                                </td>


                                                <td>

                                                    <span
                                                        className={`admin-status ${getStatusClass(
                                                            booking.status
                                                        )}`}
                                                    >
                                                        {
                                                            booking.status ||
                                                            "Pending"
                                                        }
                                                    </span>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default AdminBookings;