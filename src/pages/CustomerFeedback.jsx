import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function CustomerFeedback() {

    const navigate = useNavigate();

    const currentCustomer =
        JSON.parse(
            localStorage.getItem("currentCustomer")
        );

    const [rating, setRating] = useState(0);
    const [feedbackType, setFeedbackType] =
        useState("Service");
    const [message, setMessage] =
        useState("");
    const [submitted, setSubmitted] =
        useState(false);


    /* =========================================================
       CHECK LOGIN
    ========================================================= */

    if (!currentCustomer) {

        return (
            <div className="feedback-page">

                <div className="feedback-login-required">

                    <div className="feedback-login-icon">
                        🔐
                    </div>

                    <h2>
                        Please Login First
                    </h2>

                    <p>
                        You need to be logged in as a customer
                        to submit feedback.
                    </p>

                    <Link
                        to="/customer-login"
                        className="feedback-primary-btn"
                    >
                        Go to Customer Login →
                    </Link>

                </div>

            </div>
        );
    }


    /* =========================================================
       SUBMIT
    ========================================================= */

    const handleSubmit = (e) => {

        e.preventDefault();


        if (rating === 0) {

            alert(
                "Please select a rating."
            );

            return;
        }


        if (!message.trim()) {

            alert(
                "Please enter your feedback."
            );

            return;
        }


        const feedbacks =
            JSON.parse(
                localStorage.getItem("feedbacks")
            ) || [];


        const feedback = {

            id:
                "FB" +
                Date.now(),

            customerId:
                currentCustomer.id,

            customerName:
                currentCustomer.name,

            customerEmail:
                currentCustomer.email,

            customerPhone:
                currentCustomer.phone,

            rating:
                rating,

            type:
                feedbackType,

            message:
                message.trim(),

            createdAt:
                new Date().toISOString()
        };


        feedbacks.push(feedback);


        localStorage.setItem(
            "feedbacks",
            JSON.stringify(feedbacks)
        );


        setSubmitted(true);

        setRating(0);

        setFeedbackType("Service");

        setMessage("");
    };


    return (

        <div className="feedback-page">


            {/* =================================================
               NAVBAR
            ================================================= */}

            <nav className="navbar">

                <h2>
                    🤝 Co-Op Services
                </h2>


                <div className="nav-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/services">
                        Services
                    </Link>

                    <Link to="/about">
                        About
                    </Link>

                    <Link to="/contact">
                        Contact
                    </Link>

                    <Link
                        to="/customer-dashboard"
                        className="nav-login"
                    >
                        Dashboard
                    </Link>

                </div>

            </nav>


            {/* =================================================
               MAIN
            ================================================= */}

            <main className="feedback-main">


                <div className="feedback-container">


                    {/* =================================================
                       HEADER
                    ================================================= */}

                    <section className="feedback-hero">

                        <span className="feedback-label">
                            CUSTOMER FEEDBACK
                        </span>

                        <h1>
                            Tell Us About Your Experience
                        </h1>

                        <p>
                            Your feedback helps us improve
                            Co-Op Services and provide better
                            experiences for everyone.
                        </p>

                    </section>


                    {/* =================================================
                       CONTENT
                    ================================================= */}

                    <div className="feedback-content">


                        {/* LEFT INFORMATION */}

                        <section className="feedback-info">

                            <div className="feedback-info-icon">
                                💬
                            </div>

                            <span className="section-label">
                                WE VALUE YOUR OPINION
                            </span>

                            <h2>
                                How was your experience?
                            </h2>

                            <p>
                                Share your experience with us.
                                Your feedback can help us understand
                                what works well and where we can improve.
                            </p>


                            <div className="feedback-points">


                                <div className="feedback-point">

                                    <div>
                                        ⭐
                                    </div>

                                    <span>
                                        Rate your service experience
                                    </span>

                                </div>


                                <div className="feedback-point">

                                    <div>
                                        💡
                                    </div>

                                    <span>
                                        Share useful suggestions
                                    </span>

                                </div>


                                <div className="feedback-point">

                                    <div>
                                        🤝
                                    </div>

                                    <span>
                                        Help us improve our platform
                                    </span>

                                </div>


                            </div>

                        </section>


                        {/* =================================================
                           FORM
                        ================================================= */}

                        <section className="feedback-card">


                            <div className="feedback-card-header">

                                <div>

                                    <span className="section-label">
                                        FEEDBACK FORM
                                    </span>

                                    <h2>
                                        Share Your Feedback
                                    </h2>

                                    <p>
                                        We appreciate your time.
                                    </p>

                                </div>


                                <div className="feedback-card-icon">
                                    ✍️
                                </div>

                            </div>


                            {submitted ? (

                                <div className="feedback-success">

                                    <div className="feedback-success-icon">
                                        ✓
                                    </div>

                                    <h2>
                                        Thank You!
                                    </h2>

                                    <p>
                                        Your feedback has been
                                        submitted successfully.
                                    </p>


                                    <div className="feedback-success-actions">

                                        <button
                                            onClick={() =>
                                                setSubmitted(false)
                                            }
                                            className="feedback-secondary-btn"
                                        >
                                            Submit Another
                                        </button>


                                        <Link
                                            to="/customer-dashboard"
                                            className="feedback-primary-btn"
                                        >
                                            Back to Dashboard
                                        </Link>

                                    </div>

                                </div>

                            ) : (

                                <form
                                    className="feedback-form"
                                    onSubmit={handleSubmit}
                                >


                                    {/* CUSTOMER */}

                                    <div className="feedback-customer">

                                        <div className="feedback-customer-avatar">
                                            👤
                                        </div>

                                        <div>

                                            <span>
                                                SUBMITTING AS
                                            </span>

                                            <strong>
                                                {currentCustomer.name}
                                            </strong>

                                            <small>
                                                {currentCustomer.email}
                                            </small>

                                        </div>

                                    </div>


                                    {/* RATING */}

                                    <div className="feedback-field">

                                        <label>
                                            Overall Rating
                                        </label>


                                        <div className="feedback-stars">

                                            {[1, 2, 3, 4, 5].map(
                                                (star) => (

                                                    <button
                                                        type="button"
                                                        key={star}
                                                        className={
                                                            star <= rating
                                                                ? "star active"
                                                                : "star"
                                                        }
                                                        onClick={() =>
                                                            setRating(
                                                                star
                                                            )
                                                        }
                                                        aria-label={
                                                            `${star} star rating`
                                                        }
                                                    >
                                                        ★
                                                    </button>

                                                )
                                            )}

                                        </div>


                                        <small className="rating-text">

                                            {rating === 0 &&
                                                "Select your rating"}

                                            {rating === 1 &&
                                                "Very poor"}

                                            {rating === 2 &&
                                                "Poor"}

                                            {rating === 3 &&
                                                "Average"}

                                            {rating === 4 &&
                                                "Good"}

                                            {rating === 5 &&
                                                "Excellent"}

                                        </small>

                                    </div>


                                    {/* TYPE */}

                                    <div className="feedback-field">

                                        <label>
                                            Feedback Type
                                        </label>

                                        <select
                                            value={feedbackType}
                                            onChange={(e) =>
                                                setFeedbackType(
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="Service">
                                                Service Experience
                                            </option>

                                            <option value="Worker">
                                                Worker Experience
                                            </option>

                                            <option value="Booking">
                                                Booking Experience
                                            </option>

                                            <option value="Website">
                                                Website Experience
                                            </option>

                                            <option value="Suggestion">
                                                Suggestion
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>

                                        </select>

                                    </div>


                                    {/* MESSAGE */}

                                    <div className="feedback-field">

                                        <label>
                                            Your Feedback
                                        </label>

                                        <textarea
                                            value={message}
                                            onChange={(e) =>
                                                setMessage(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Tell us about your experience..."
                                            rows="6"
                                            required
                                        />

                                    </div>


                                    {/* BUTTON */}

                                    <button
                                        type="submit"
                                        className="feedback-submit-btn"
                                    >
                                        Submit Feedback
                                        <span>
                                            →
                                        </span>
                                    </button>


                                    <Link
                                        to="/customer-dashboard"
                                        className="feedback-back"
                                    >
                                        ← Back to Customer Dashboard
                                    </Link>

                                </form>

                            )}

                        </section>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default CustomerFeedback;