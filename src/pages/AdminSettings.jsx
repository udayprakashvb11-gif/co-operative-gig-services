import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

function AdminSettings() {

    const navigate = useNavigate();


    /* =========================================================
       ADMIN DETAILS
    ========================================================= */

    const [admin, setAdmin] = useState({
        id: 1,
        name: "Administrator",
        email: "admin@coopservices.com",
        password: "admin123"
    });


    const [format, setFormat] =
        useState(
            localStorage.getItem(
                "adminExportFormat"
            ) || "pdf"
        );


    const [message, setMessage] =
        useState("");


    /* =========================================================
       LOAD ADMIN
    ========================================================= */

    useEffect(() => {

        const savedAdmin =
            JSON.parse(
                localStorage.getItem(
                    "adminAccount"
                )
            );


        const currentAdmin =
            JSON.parse(
                localStorage.getItem(
                    "currentAdmin"
                )
            );


        if (savedAdmin) {

            setAdmin(savedAdmin);

        } else if (currentAdmin) {

            setAdmin({
                ...currentAdmin,
                password: "admin123"
            });

        } else {

            navigate("/admin-login");

        }

    }, [navigate]);


    /* =========================================================
       INPUT CHANGE
    ========================================================= */

    const handleChange = (e) => {

        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });

        setMessage("");
    };


    /* =========================================================
       SAVE ADMIN DETAILS
    ========================================================= */

    const saveAdminDetails = (e) => {

        e.preventDefault();


        if (
            !admin.name.trim() ||
            !admin.email.trim() ||
            !admin.password.trim()
        ) {

            setMessage(
                "Please fill in all admin details."
            );

            return;
        }


        const updatedAdmin = {
            id: admin.id || 1,
            name: admin.name.trim(),
            email: admin.email.trim(),
            password: admin.password
        };


        /* Save permanent admin account */

        localStorage.setItem(
            "adminAccount",
            JSON.stringify(updatedAdmin)
        );


        /* Update currently logged-in admin */

        localStorage.setItem(
            "currentAdmin",
            JSON.stringify(updatedAdmin)
        );


        setAdmin(updatedAdmin);


        setMessage(
            "Admin details updated successfully."
        );
    };


    /* =========================================================
       SAVE EXPORT FORMAT
    ========================================================= */

    const saveFormat = () => {

        localStorage.setItem(
            "adminExportFormat",
            format
        );


        setMessage(
            `Export format saved as ${
                format === "pdf"
                    ? "PDF"
                    : "Excel"
            }.`
        );
    };


    /* =========================================================
       LOGOUT
    ========================================================= */

    const logout = () => {

        localStorage.removeItem(
            "currentAdmin"
        );

        navigate("/admin-login");
    };


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
                            {admin.name}
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


                    <Link to="/admin-bookings">
                        <span>📅</span>
                        Bookings
                    </Link>


                    <Link
                        to="/admin-settings"
                        className="active"
                    >
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


                {/* =================================================
                   HEADER
                ================================================= */}

                <div className="dashboard-topbar">

                    <div>

                        <span className="section-label">
                            ADMIN SETTINGS
                        </span>

                        <h1>
                            Settings
                        </h1>

                        <p>
                            Manage your administrator account
                            and platform preferences.
                        </p>

                    </div>

                </div>


                {/* =================================================
                   MESSAGE
                ================================================= */}

                {message && (

                    <div
                        style={{
                            marginBottom: "20px",
                            padding: "12px 15px",
                            background: "#ecfdf5",
                            border: "1px solid #a7f3d0",
                            borderRadius: "9px",
                            color: "#047857",
                            fontSize: "9px",
                            fontWeight: "700"
                        }}
                    >
                        ✓ {message}
                    </div>

                )}


                <div className="admin-settings-grid">


                    {/* =================================================
                       ADMIN ACCOUNT
                    ================================================= */}

                    <div className="admin-settings-card">

                        <div className="admin-settings-header">

                            <div className="admin-settings-icon">
                                👨‍💼
                            </div>

                            <div>

                                <h2>
                                    Admin Account
                                </h2>

                                <p>
                                    Change your administrator details.
                                </p>

                            </div>

                        </div>


                        <form
                            onSubmit={saveAdminDetails}
                        >


                            {/* NAME */}

                            <div className="admin-form-group">

                                <label>
                                    Admin Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter admin name"
                                    value={admin.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="admin-form-group">

                                <label>
                                    Admin Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter admin email"
                                    value={admin.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* PASSWORD */}

                            <div className="admin-form-group">

                                <label>
                                    Admin Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter new password"
                                    value={admin.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <button
                                type="submit"
                                className="admin-save-btn"
                            >
                                Save Admin Details
                            </button>

                        </form>


                        <div className="admin-security-box">

                            <div className="admin-security-icon">
                                🔐
                            </div>

                            <div>

                                <strong>
                                    Account Security
                                </strong>

                                <p>
                                    Changing the email or password
                                    will affect your next admin login.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                       EXPORT SETTINGS
                    ================================================= */}

                    <div className="admin-settings-card">

                        <div className="admin-settings-header">

                            <div className="admin-settings-icon">
                                📄
                            </div>

                            <div>

                                <h2>
                                    Export Format
                                </h2>

                                <p>
                                    Choose how platform data is exported.
                                </p>

                            </div>

                        </div>


                        <div className="admin-form-group">

                            <label>
                                Preferred File Format
                            </label>

                            <select
                                value={format}
                                onChange={(e) =>
                                    setFormat(
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    height: "42px",
                                    padding: "0 12px",
                                    background: "#f8fafc",
                                    border: "1px solid #dbe3ec",
                                    borderRadius: "7px",
                                    outline: "none",
                                    color: "#334155",
                                    fontSize: "10px"
                                }}
                            >

                                <option value="pdf">
                                    PDF Document
                                </option>

                                <option value="excel">
                                    Excel Spreadsheet
                                </option>

                            </select>

                        </div>


                        <button
                            className="admin-save-btn"
                            onClick={saveFormat}
                        >
                            Save Export Preference
                        </button>


                        <div className="admin-setting-option">

                            <div>

                                <strong>
                                    Current Format
                                </strong>

                                <span>
                                    Used by Export buttons
                                </span>

                            </div>

                            <strong
                                style={{
                                    color: "#2563eb"
                                }}
                            >
                                {format === "pdf"
                                    ? "PDF"
                                    : "Excel"}
                            </strong>

                        </div>

                    </div>


                    {/* =================================================
                       PLATFORM DATA
                    ================================================= */}

                    <div className="admin-settings-card">

                        <div className="admin-settings-header">

                            <div className="admin-settings-icon">
                                💾
                            </div>

                            <div>

                                <h2>
                                    Platform Data
                                </h2>

                                <p>
                                    Data managed by the administrator.
                                </p>

                            </div>

                        </div>


                        <div className="admin-setting-option">

                            <div>

                                <strong>
                                    Customers
                                </strong>

                                <span>
                                    Customer registration records
                                </span>

                            </div>

                            <span>
                                👥
                            </span>

                        </div>


                        <div className="admin-setting-option">

                            <div>

                                <strong>
                                    Workers
                                </strong>

                                <span>
                                    Worker registration records
                                </span>

                            </div>

                            <span>
                                🧑‍🔧
                            </span>

                        </div>


                        <div className="admin-setting-option">

                            <div>

                                <strong>
                                    Bookings
                                </strong>

                                <span>
                                    Customer service requests
                                </span>

                            </div>

                            <span>
                                📅
                            </span>

                        </div>

                    </div>


                    {/* =================================================
                       ACCOUNT SUMMARY
                    ================================================= */}

                    <div className="admin-settings-card">

                        <div className="admin-settings-header">

                            <div className="admin-settings-icon">
                                ✅
                            </div>

                            <div>

                                <h2>
                                    Account Summary
                                </h2>

                                <p>
                                    Current administrator information.
                                </p>

                            </div>

                        </div>


                        <div className="admin-setting-option">

                            <div>

                                <strong>
                                    Name
                                </strong>

                                <span>
                                    Administrator name
                                </span>

                            </div>

                            <strong>
                                {admin.name}
                            </strong>

                        </div>


                        <div className="admin-setting-option">

                            <div>

                                <strong>
                                    Email
                                </strong>

                                <span>
                                    Login email
                                </span>

                            </div>

                            <strong>
                                {admin.email}
                            </strong>

                        </div>


                        <div className="admin-security-box">

                            <div className="admin-security-icon">
                                🔒
                            </div>

                            <div>

                                <strong>
                                    Admin Access
                                </strong>

                                <p>
                                    Only the current administrator
                                    account can access this dashboard.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default AdminSettings;