import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import {
    getWorkers,
    exportData
} from "../utils/exportData";


function AdminWorkers() {

    const navigate = useNavigate();

    const [workers, setWorkers] =
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

        setWorkers(
            getWorkers()
        );

    }, [navigate]);


    const filteredWorkers =
        workers.filter(
            worker =>
                worker.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                worker.email
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                worker.service
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );


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

                    <Link
                        to="/admin-workers"
                        className="active"
                    >
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
                            WORKER MANAGEMENT
                        </span>

                        <h1>
                            Workers
                        </h1>

                        <p>
                            View workers and their professional
                            information.
                        </p>

                    </div>

                </div>


                <div className="admin-table-section">


                    <div className="admin-section-header">

                        <div>

                            <h2>
                                Worker Records
                            </h2>

                            <p>
                                {workers.length}
                                {" "}
                                registered worker(s)
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
                                    "workers"
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
                            placeholder="Search worker or service..."
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
                                        Worker
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Service
                                    </th>

                                    <th>
                                        Experience
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

                                {filteredWorkers.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            style={{
                                                textAlign: "center",
                                                padding: "40px"
                                            }}
                                        >
                                            No workers found.
                                        </td>

                                    </tr>

                                ) : (

                                    filteredWorkers.map(
                                        (worker, index) => (

                                            <tr
                                                key={
                                                    worker.id ||
                                                    index
                                                }
                                            >

                                                <td>
                                                    {index + 1}
                                                </td>


                                                <td>

                                                    <div className="admin-user-cell">

                                                        <div className="admin-user-avatar worker">
                                                            🧑‍🔧
                                                        </div>

                                                        <strong>
                                                            {
                                                                worker.name
                                                            }
                                                        </strong>

                                                    </div>

                                                </td>


                                                <td>
                                                    {
                                                        worker.email
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        worker.phone
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        worker.service ||
                                                        "-"
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        worker.experience ||
                                                        "-"
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        worker.location ||
                                                        "-"
                                                    }
                                                </td>


                                                <td>

                                                    <span className="admin-status active">
                                                        {
                                                            worker.status ||
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

export default AdminWorkers;