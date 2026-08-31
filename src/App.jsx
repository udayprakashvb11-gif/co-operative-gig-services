import { BrowserRouter, Routes, Route } from "react-router-dom";

/* =========================================================
   HOME
========================================================= */

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

/* =========================================================
   CUSTOMER
========================================================= */

import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerProfile from "./pages/CustomerProfile";
import Services from "./pages/Services";
import BookService from "./pages/BookService";
import MyBookings from "./pages/MyBookings";
import CustomerFeedback from "./pages/CustomerFeedback";

/* =========================================================
   WORKER
========================================================= */

import WorkerLogin from "./pages/WorkerLogin";
import WorkerRegister from "./pages/WorkerRegister";
import WorkerDashboard from "./pages/WorkerDashboard";
import WorkerRequests from "./pages/WorkerRequests";
import WorkerJobs from "./pages/WorkerJobs";
import WorkerProfile from "./pages/WorkerProfile";

/* =========================================================
   ADMIN
========================================================= */

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCustomers from "./pages/AdminCustomers";
import AdminWorkers from "./pages/AdminWorkers";
import AdminBookings from "./pages/AdminBookings";
import AdminSettings from "./pages/AdminSettings";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =================================================
                   HOME
                ================================================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />


                {/* =================================================
                   CUSTOMER
                ================================================= */}

                <Route
                    path="/customer-login"
                    element={<CustomerLogin />}
                />

                <Route
                    path="/customer-register"
                    element={<CustomerRegister />}
                />

                <Route
                    path="/customer-dashboard"
                    element={<CustomerDashboard />}
                />

                <Route
                    path="/customer-profile"
                    element={<CustomerProfile />}
                />

                {/* Customer service listing */}
                <Route
                    path="/services"
                    element={<Services />}
                />

                {/* Actual booking page */}
                <Route
                    path="/book-service/:service"
                    element={<BookService />}
                />

                <Route
                    path="/my-bookings"
                    element={<MyBookings />}
                />

                {/* Customer feedback */}
                <Route
                    path="/customer-feedback"
                    element={<CustomerFeedback />}
                />


                {/* =================================================
                   WORKER
                ================================================= */}

                <Route
                    path="/worker-login"
                    element={<WorkerLogin />}
                />

                <Route
                    path="/worker-register"
                    element={<WorkerRegister />}
                />

                <Route
                    path="/worker-dashboard"
                    element={<WorkerDashboard />}
                />

                <Route
                    path="/worker-requests"
                    element={<WorkerRequests />}
                />

                <Route
                    path="/worker-jobs"
                    element={<WorkerJobs />}
                />

                <Route
                    path="/worker-profile"
                    element={<WorkerProfile />}
                />


                {/* =================================================
                   ADMIN
                ================================================= */}

                <Route
                    path="/admin-login"
                    element={<AdminLogin />}
                />

                <Route
                    path="/admin-dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin-customers"
                    element={<AdminCustomers />}
                />

                <Route
                    path="/admin-workers"
                    element={<AdminWorkers />}
                />

                <Route
                    path="/admin-bookings"
                    element={<AdminBookings />}
                />

                <Route
                    path="/admin-settings"
                    element={<AdminSettings />}
                />


                {/* =================================================
                   INVALID URL
                ================================================= */}

                <Route
                    path="*"
                    element={
                        <div
                            style={{
                                minHeight: "100vh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                gap: "15px",
                                fontFamily: "Inter, sans-serif"
                            }}
                        >
                            <h1>
                                404
                            </h1>

                            <p>
                                Page not found
                            </p>
                        </div>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;