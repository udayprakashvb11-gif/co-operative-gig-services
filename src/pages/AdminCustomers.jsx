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
    exportData
} from "../utils/exportData";


function AdminCustomers() {

    const navigate = useNavigate();

    const [customers, setCustomers] =
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

        setCustomers(
            getCustomers()
        );

    }, [navigate]);


    const filteredCustomers =
        customers.filter(
            customer =>
                customer.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                customer.email
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                customer.phone
                    ?.includes(search)
        );


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

                    <Link
                        to="/admin-customers"
                        className="active"
                    >
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

            </aside>


            <main className="dashboard-main">


                <div className="dashboard-topbar">

                    <div>
                        <span className="section-label">
                            CUSTOMER MANAGEMENT
                        </span>

                        <h1>
                            Customers
                        </h1>

                        <p>
                            View the customers registered
                            on the platform.
                        </p>
                    </div>

                </div>


                <div className="admin-table-section">


                    <div className="admin-section-header">

                        <div>

                            <h2>
                                Customer Records
                            </h2>

                            <p>
                                {customers.length}
                                {" "}
                                registered customer(s)
                            </p>

                        </div>


                        <button
                            className="admin-save-btn"
                            style={{
                                width: "150px"
                            }}
                            onClick={() => {

                                const format =
                                    localStorage.getItem(
                                        "adminExportFormat"
                                    ) || "pdf";

                                exportData(
                                    format,
                                    "customers"
                                );

                            }}
                        >
                            📥 Export
                        </button>

                    </div>


                    {/* SEARCH */}

                    <div
                        style={{
                            padding: "18px 24px"
                        }}
                    >

                        <input
                            type="text"
                            placeholder="Search customer..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            style={{
                                width: "100%",
                                maxWidth: "350px",
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
                                        S.No
                                    </th>

                                    <th>
                                        Customer
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Location
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredCustomers.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            style={{
                                                textAlign: "center",
                                                padding: "40px"
                                            }}
                                        >
                                            No customers found.
                                        </td>

                                    </tr>

                                ) : (

                                    filteredCustomers.map(
                                        (customer, index) => (

                                            <tr
                                                key={
                                                    customer.id ||
                                                    index
                                                }
                                            >

                                                <td>
                                                    {index + 1}
                                                </td>


                                                <td>

                                                    <div className="admin-user-cell">

                                                        <div className="admin-user-avatar">
                                                            👤
                                                        </div>

                                                        <strong>
                                                            {
                                                                customer.name
                                                            }
                                                        </strong>

                                                    </div>

                                                </td>


                                                <td>
                                                    {
                                                        customer.email
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        customer.phone
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        customer.location ||
                                                        "-"
                                                    }
                                                </td>


                                                <td>

                                                    <span className="admin-status active">
                                                        {
                                                            customer.status ||
                                                            "Active"
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

export default AdminCustomers;