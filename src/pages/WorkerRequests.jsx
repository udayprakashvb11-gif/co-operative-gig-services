import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function WorkerRequests() {

    const navigate = useNavigate();

    const [requests, setRequests] =
        useState([]);


    const currentWorker =
        JSON.parse(
            localStorage.getItem("currentWorker")
        );


    useEffect(() => {

        if (!currentWorker) {

            navigate("/worker-login");

            return;
        }

        loadRequests();

    }, [navigate]);


    const loadRequests = () => {

        const bookings =
            JSON.parse(
                localStorage.getItem("bookings")
            ) || [];


        const pending =
            bookings.filter(
                booking =>
                    booking.status === "Pending"
            );


        setRequests(pending);
    };


    const acceptRequest = (id) => {

        const bookings =
            JSON.parse(
                localStorage.getItem("bookings")
            ) || [];


        const updated =
            bookings.map(
                booking => {

                    if (booking.id === id) {

                        return {
                            ...booking,

                            status: "Accepted",

                            workerId:
                                currentWorker.id,

                            worker:
                                currentWorker.name,

                            workerEmail:
                                currentWorker.email,

                            workerPhone:
                                currentWorker.phone,

                            acceptedAt:
                                new Date().toISOString()
                        };
                    }

                    return booking;
                }
            );


        localStorage.setItem(
            "bookings",
            JSON.stringify(updated)
        );


        alert(
            "Request accepted successfully!"
        );


        loadRequests();
    };


    const rejectRequest = (id) => {

        if (
            !window.confirm(
                "Reject this customer request?"
            )
        ) {
            return;
        }


        const bookings =
            JSON.parse(
                localStorage.getItem("bookings")
            ) || [];


        const updated =
            bookings.map(
                booking => {

                    if (booking.id === id) {

                        return {
                            ...booking,

                            status: "Rejected",

                            rejectedBy:
                                currentWorker.id,

                            rejectedByName:
                                currentWorker.name,

                            rejectedAt:
                                new Date().toISOString()
                        };
                    }

                    return booking;
                }
            );


        localStorage.setItem(
            "bookings",
            JSON.stringify(updated)
        );


        alert(
            "Request rejected."
        );


        loadRequests();
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
                            {currentWorker?.name}
                        </strong>

                        <small>
                            {currentWorker?.service}
                        </small>

                    </div>

                </div>


                <nav className="dashboard-nav">

                    <Link to="/worker-dashboard">
                        <span>⌂</span>
                        Dashboard
                    </Link>

                    <Link
                        to="/worker-requests"
                        className="active"
                    >
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

            </aside>


            <main className="dashboard-main">

                <div className="dashboard-topbar">

                    <div>

                        <span className="section-label">
                            CUSTOMER REQUESTS
                        </span>

                        <h1>
                            Service Requests
                        </h1>

                        <p>
                            Review customer requests and
                            decide whether to accept or reject.
                        </p>

                    </div>

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

                </div>


                <section className="dashboard-section">

                    {requests.length === 0 ? (

                        <div className="dashboard-empty">

                            <div>
                                📭
                            </div>

                            <h3>
                                No Pending Requests
                            </h3>

                            <p>
                                New customer requests
                                will appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="worker-request-list">

                            {requests.map(
                                request => (

                                    <div
                                        className="worker-request-card"
                                        key={request.id}
                                    >


                                        <div className="worker-request-header">

                                            <div className="worker-request-service">

                                                <div className="worker-request-icon">
                                                    🔧
                                                </div>

                                                <div>

                                                    <h3>
                                                        {request.service}
                                                    </h3>

                                                    <p>
                                                        {request.id}
                                                    </p>

                                                </div>

                                            </div>


                                            <span className="request-status pending">
                                                Pending
                                            </span>

                                        </div>


                                        <div className="worker-request-details">

                                            <div>

                                                <span>
                                                    Customer
                                                </span>

                                                <strong>
                                                    {request.customer}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Phone
                                                </span>

                                                <strong>
                                                    {request.customerPhone}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Email
                                                </span>

                                                <strong>
                                                    {request.customerEmail}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Date
                                                </span>

                                                <strong>
                                                    {request.date}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Time
                                                </span>

                                                <strong>
                                                    {request.time}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Address
                                                </span>

                                                <strong>
                                                    {request.address}
                                                </strong>

                                            </div>


                                            <div className="full">

                                                <span>
                                                    Customer Requirements
                                                </span>

                                                <strong>
                                                    {request.details}
                                                </strong>

                                            </div>

                                        </div>


                                        <div className="worker-request-actions">

                                            <button
                                                className="worker-accept-btn"
                                                onClick={() =>
                                                    acceptRequest(
                                                        request.id
                                                    )
                                                }
                                            >
                                                ✓ Accept Request
                                            </button>


                                            <button
                                                className="worker-reject-btn"
                                                onClick={() =>
                                                    rejectRequest(
                                                        request.id
                                                    )
                                                }
                                            >
                                                ✕ Reject Request
                                            </button>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>
                    )}

                </section>

            </main>

        </div>
    );
}

export default WorkerRequests;