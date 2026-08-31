import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function BookService() {

    const { service } = useParams();
    const navigate = useNavigate();

    // =========================================================
    // GET LOGGED-IN CUSTOMER
    // =========================================================

    const currentCustomer =
        JSON.parse(localStorage.getItem("currentCustomer"));


    // =========================================================
    // FORM STATES
    // =========================================================

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [address, setAddress] = useState("");
    const [details, setDetails] = useState("");


    // =========================================================
    // SERVICE ICON
    // =========================================================

    const getServiceIcon = () => {

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


    // =========================================================
    // SUBMIT BOOKING
    // =========================================================

    const handleSubmit = (e) => {

        e.preventDefault();


        // -----------------------------------------------------
        // CHECK CUSTOMER LOGIN
        // -----------------------------------------------------

        if (!currentCustomer) {

            alert("Please login as a customer first.");

            navigate("/customer-login");

            return;
        }


        // -----------------------------------------------------
        // VALIDATE FORM
        // -----------------------------------------------------

        if (!date || !time || !address || !details) {

            alert(
                "Please fill in all booking details."
            );

            return;
        }


        // -----------------------------------------------------
        // GET EXISTING BOOKINGS
        // -----------------------------------------------------

        const bookings =
            JSON.parse(
                localStorage.getItem("bookings")
            ) || [];


        // -----------------------------------------------------
        // CREATE NEW BOOKING
        // -----------------------------------------------------

        const booking = {

            // Unique booking ID
            id: "BK" + Date.now(),


            // =================================================
            // CUSTOMER DETAILS
            // =================================================

            customerId: currentCustomer.id,

            customer: currentCustomer.name,

            customerEmail: currentCustomer.email,

            customerPhone: currentCustomer.phone,


            // =================================================
            // SERVICE DETAILS
            // =================================================

            service: service,


            // =================================================
            // REQUEST DETAILS
            // =================================================

            date: date,

            time: time,

            address: address,

            details: details,


            // =================================================
            // BOOKING STATUS
            // =================================================

            status: "Pending",


            // =================================================
            // WORKER DETAILS
            // Initially empty because worker has not accepted
            // =================================================

            workerId: null,

            worker: null,

            workerEmail: null,

            workerPhone: null,


            // =================================================
            // TIMESTAMP
            // =================================================

            createdAt:
                new Date().toISOString()

        };


        // -----------------------------------------------------
        // ADD BOOKING
        // -----------------------------------------------------

        bookings.push(booking);


        // -----------------------------------------------------
        // SAVE BOOKINGS
        // -----------------------------------------------------

        localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
        );


        // -----------------------------------------------------
        // SUCCESS
        // -----------------------------------------------------

        alert(
            "Booking request sent successfully!"
        );


        // -----------------------------------------------------
        // GO TO MY BOOKINGS
        // -----------------------------------------------------

        navigate("/my-bookings");
    };


    return (
        <div className="book-service-page">


            {/* =================================================
               HERO
            ================================================= */}

            <header className="booking-hero">

                <div className="booking-hero-content">

                    <span className="section-label">
                        SERVICE BOOKING
                    </span>

                    <h1>
                        Book Your Service
                    </h1>

                    <p>
                        Tell us what you need and choose
                        your preferred date, time and location.
                    </p>

                </div>

            </header>


            {/* =================================================
               MAIN CONTENT
            ================================================= */}

            <main className="service-booking-wrapper">


                {/* =================================================
                   LEFT SERVICE CARD
                ================================================= */}

                <section className="service-summary-card">


                    {/* TOP */}

                    <div className="service-summary-top">

                        <span className="selected-label">
                            SELECTED SERVICE
                        </span>

                        <div className="selected-service-icon">
                            {getServiceIcon()}
                        </div>

                    </div>


                    {/* SERVICE NAME */}

                    <h2>
                        {service}
                    </h2>


                    <p>
                        Your request will be sent to workers
                        who provide this service.
                    </p>


                    {/* =================================================
                       BENEFITS
                    ================================================= */}

                    <div className="booking-benefits">


                        {/* BENEFIT 1 */}

                        <div className="booking-benefit">

                            <div className="booking-benefit-icon">
                                ✓
                            </div>

                            <div>

                                <strong>
                                    Trusted Workers
                                </strong>

                                <span>
                                    Connect with local service providers.
                                </span>

                            </div>

                        </div>


                        {/* BENEFIT 2 */}

                        <div className="booking-benefit">

                            <div className="booking-benefit-icon">
                                📅
                            </div>

                            <div>

                                <strong>
                                    Flexible Scheduling
                                </strong>

                                <span>
                                    Choose your preferred date and time.
                                </span>

                            </div>

                        </div>


                        {/* BENEFIT 3 */}

                        <div className="booking-benefit">

                            <div className="booking-benefit-icon">
                                📍
                            </div>

                            <div>

                                <strong>
                                    Local Service
                                </strong>

                                <span>
                                    Get help at your preferred location.
                                </span>

                            </div>

                        </div>


                        {/* BENEFIT 4 */}

                        <div className="booking-benefit">

                            <div className="booking-benefit-icon">
                                🔒
                            </div>

                            <div>

                                <strong>
                                    Secure Request
                                </strong>

                                <span>
                                    Your request is linked to your account.
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* BACK */}

                    <Link
                        to="/customer-dashboard"
                        className="back-dashboard-link"
                    >
                        ← Back to Dashboard
                    </Link>

                </section>


                {/* =================================================
                   RIGHT FORM
                ================================================= */}

                <section className="service-booking-card">


                    {/* =================================================
                       FORM HEADER
                    ================================================= */}

                    <div className="service-booking-title">

                        <div>

                            <span className="section-label">
                                BOOKING DETAILS
                            </span>

                            <h2>
                                Tell us what you need
                            </h2>

                            <p>
                                Provide the details below to
                                send your request.
                            </p>

                        </div>


                        <div className="booking-step">
                            STEP 1
                        </div>

                    </div>


                    {/* =================================================
                       FORM
                    ================================================= */}

                    <form onSubmit={handleSubmit}>


                        {/* DATE + TIME */}

                        <div className="booking-form-grid">


                            {/* DATE */}

                            <div className="form-group">

                                <label>
                                    Preferred Date
                                </label>

                                <div className="booking-input">

                                    <span>
                                        📅
                                    </span>

                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) =>
                                            setDate(
                                                e.target.value
                                            )
                                        }
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        required
                                    />

                                </div>

                            </div>


                            {/* TIME */}

                            <div className="form-group">

                                <label>
                                    Preferred Time
                                </label>

                                <div className="booking-input">

                                    <span>
                                        🕐
                                    </span>

                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(e) =>
                                            setTime(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                           ADDRESS
                        ================================================= */}

                        <div className="form-group">

                            <label>
                                Service Address
                            </label>

                            <div className="booking-input">

                                <span>
                                    📍
                                </span>

                                <input
                                    type="text"
                                    placeholder="Enter the address where service is needed"
                                    value={address}
                                    onChange={(e) =>
                                        setAddress(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                        </div>


                        {/* =================================================
                           REQUIREMENTS
                        ================================================= */}

                        <div className="form-group">

                            <label>
                                Customer Requirements
                            </label>

                            <textarea
                                className="booking-textarea"
                                placeholder="Describe the work you need..."
                                value={details}
                                onChange={(e) =>
                                    setDetails(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* =================================================
                           CURRENT CUSTOMER
                        ================================================= */}

                        <div className="customer-booking-info">

                            <div className="customer-booking-icon">
                                👤
                            </div>


                            <div>

                                <span>
                                    BOOKING FOR
                                </span>

                                <strong>
                                    {currentCustomer?.name ||
                                        "Customer"}
                                </strong>

                                <small>
                                    {currentCustomer?.email ||
                                        "Email not available"}
                                </small>

                            </div>

                        </div>


                        {/* =================================================
                           ACTIONS
                        ================================================= */}

                        <div className="booking-actions">


                            <Link
                                to="/customer-dashboard"
                                className="booking-cancel-btn"
                            >
                                Cancel
                            </Link>


                            <button
                                type="submit"
                                className="booking-submit-btn"
                            >

                                Send Booking Request

                                <span>
                                    →
                                </span>

                            </button>

                        </div>

                    </form>

                </section>

            </main>


            {/* =================================================
               FOOTER
            ================================================= */}

            <footer className="booking-footer">

                <div>
                    🤝 <strong>Co-Op Services</strong>
                </div>

                <span>
                    Connecting communities with trusted workers.
                </span>

            </footer>

        </div>
    );
}

export default BookService;