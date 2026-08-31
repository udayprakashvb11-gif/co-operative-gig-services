import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function CustomerProfile() {

    const navigate = useNavigate();

    const savedCustomer =
        JSON.parse(localStorage.getItem("currentCustomer"));

    const [customer, setCustomer] = useState(
        savedCustomer || {
            name: "",
            email: "",
            phone: ""
        }
    );

    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || ""
    });


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const saveProfile = (e) => {

        e.preventDefault();

        const updatedCustomer = {
            ...customer,
            name: form.name,
            email: form.email,
            phone: form.phone
        };

        setCustomer(updatedCustomer);

        localStorage.setItem(
            "currentCustomer",
            JSON.stringify(updatedCustomer)
        );


        const customers =
            JSON.parse(localStorage.getItem("customers")) || [];

        const updatedCustomers = customers.map((item) =>
            item.id === updatedCustomer.id
                ? updatedCustomer
                : item
        );

        localStorage.setItem(
            "customers",
            JSON.stringify(updatedCustomers)
        );


        setEditing(false);

        alert("Profile updated successfully!");

    };


    const logout = () => {

        localStorage.removeItem("currentCustomer");

        navigate("/customer-login");

    };


    return (
        <div className="profile-page">

            <div className="profile-container">

                {/* BACK */}

                <Link
                    to="/customer-dashboard"
                    className="page-back-link"
                >
                    ← Back to Dashboard
                </Link>


                {/* HEADER */}

                <div className="profile-header">

                    <span className="section-label">
                        CUSTOMER PROFILE
                    </span>

                    <h1>
                        My Profile
                    </h1>

                    <p>
                        View and manage your personal account information.
                    </p>

                </div>


                {/* PROFILE GRID */}

                <div className="profile-grid">


                    {/* LEFT CARD */}

                    <div className="profile-card">

                        <div className="profile-avatar">
                            👤
                        </div>

                        <h2>
                            {customer.name || "Customer"}
                        </h2>

                        <p>
                            {customer.email || "No email available"}
                        </p>

                        <span className="profile-badge">
                            ● Active Customer
                        </span>

                    </div>


                    {/* RIGHT CARD */}

                    <div className="profile-info-card">

                        <div className="profile-info-header">

                            <div>

                                <h2>
                                    Personal Information
                                </h2>

                                <p>
                                    Your registered account details.
                                </p>

                            </div>


                            {!editing && (
                                <button
                                    className="profile-edit-btn"
                                    onClick={() => setEditing(true)}
                                >
                                    ✎ Edit Profile
                                </button>
                            )}

                        </div>


                        {/* VIEW DETAILS */}

                        {!editing && (

                            <div className="profile-details">

                                <div className="profile-detail">

                                    <span>
                                        Full Name
                                    </span>

                                    <strong>
                                        {customer.name || "Not provided"}
                                    </strong>

                                </div>


                                <div className="profile-detail">

                                    <span>
                                        Email Address
                                    </span>

                                    <strong>
                                        {customer.email || "Not provided"}
                                    </strong>

                                </div>


                                <div className="profile-detail">

                                    <span>
                                        Phone Number
                                    </span>

                                    <strong>
                                        {customer.phone || "Not provided"}
                                    </strong>

                                </div>


                                <div className="profile-detail">

                                    <span>
                                        Account Status
                                    </span>

                                    <strong>
                                        {customer.status || "Active"}
                                    </strong>

                                </div>


                                <div className="profile-detail">

                                    <span>
                                        Customer ID
                                    </span>

                                    <strong>
                                        {customer.id || "N/A"}
                                    </strong>

                                </div>


                                <div className="profile-detail">

                                    <span>
                                        Member Since
                                    </span>

                                    <strong>
                                        {customer.createdAt
                                            ? new Date(
                                                customer.createdAt
                                            ).toLocaleDateString()
                                            : "Recently"}
                                    </strong>

                                </div>

                            </div>

                        )}


                        {/* EDIT FORM */}

                        {editing && (

                            <form
                                className="profile-form"
                                onSubmit={saveProfile}
                            >

                                <div className="profile-field">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="profile-field">

                                    <label>
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
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
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="profile-field">

                                    <label>
                                        Account Status
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            customer.status || "Active"
                                        }
                                        disabled
                                    />

                                </div>


                                <div className="profile-field full">

                                    <label>
                                        Customer ID
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            customer.id || "N/A"
                                        }
                                        disabled
                                    />

                                </div>


                                <div className="profile-field full">

                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px"
                                        }}
                                    >

                                        <button
                                            type="submit"
                                            className="profile-save-btn"
                                        >
                                            Save Changes
                                        </button>

                                        <button
                                            type="button"
                                            className="profile-edit-btn"
                                            onClick={() =>
                                                setEditing(false)
                                            }
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </div>

                            </form>

                        )}

                    </div>

                </div>


                {/* ACCOUNT ACTIONS */}

                <div className="profile-account-card">

                    <div>

                        <span>
                            ACCOUNT
                        </span>

                        <h3>
                            Manage your account
                        </h3>

                        <p>
                            Your profile information is linked
                            to your customer account.
                        </p>

                    </div>

                    <button
                        onClick={logout}
                        className="profile-logout-btn"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CustomerProfile;