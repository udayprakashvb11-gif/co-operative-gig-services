import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


/* =========================================================
   GET DATA FROM LOCAL STORAGE
========================================================= */

export const getCustomers = () => {
    return JSON.parse(
        localStorage.getItem("customers")
    ) || [];
};


export const getWorkers = () => {
    return JSON.parse(
        localStorage.getItem("workers")
    ) || [];
};


export const getBookings = () => {
    return JSON.parse(
        localStorage.getItem("bookings")
    ) || [];
};


/* =========================================================
   EXCEL EXPORT
========================================================= */

const exportExcel = (
    type,
    customers,
    workers,
    bookings
) => {

    const workbook = XLSX.utils.book_new();


    /* -----------------------------------------------------
       CUSTOMERS
    ----------------------------------------------------- */

    if (
        type === "customers" ||
        type === "all"
    ) {

        const customerData =
            customers.map(
                (customer, index) => ({

                    "S.No": index + 1,

                    "Customer ID":
                        customer.id || "",

                    "Name":
                        customer.name || "",

                    "Email":
                        customer.email || "",

                    "Phone":
                        customer.phone || "",

                    "Location":
                        customer.location || "",

                    "Status":
                        customer.status || "Active",

                    "Registered On":
                        customer.createdAt
                            ? new Date(
                                customer.createdAt
                            ).toLocaleString()
                            : ""

                })
            );


        const sheet =
            XLSX.utils.json_to_sheet(
                customerData
            );


        XLSX.utils.book_append_sheet(
            workbook,
            sheet,
            "Customers"
        );
    }


    /* -----------------------------------------------------
       WORKERS
    ----------------------------------------------------- */

    if (
        type === "workers" ||
        type === "all"
    ) {

        const workerData =
            workers.map(
                (worker, index) => ({

                    "S.No": index + 1,

                    "Worker ID":
                        worker.id || "",

                    "Name":
                        worker.name || "",

                    "Email":
                        worker.email || "",

                    "Phone":
                        worker.phone || "",

                    "Service":
                        worker.service || "",

                    "Experience":
                        worker.experience || "",

                    "Location":
                        worker.location || "",

                    "Availability":
                        worker.availability || "",

                    "Description":
                        worker.description || "",

                    "Status":
                        worker.status || "Active",

                    "Registered On":
                        worker.createdAt
                            ? new Date(
                                worker.createdAt
                            ).toLocaleString()
                            : ""

                })
            );


        const sheet =
            XLSX.utils.json_to_sheet(
                workerData
            );


        XLSX.utils.book_append_sheet(
            workbook,
            sheet,
            "Workers"
        );
    }


    /* -----------------------------------------------------
       BOOKINGS
    ----------------------------------------------------- */

    if (
        type === "bookings" ||
        type === "all"
    ) {

        const bookingData =
            bookings.map(
                (booking, index) => ({

                    "S.No": index + 1,

                    "Booking ID":
                        booking.id || "",

                    "Customer":
                        booking.customer || "",

                    "Customer Email":
                        booking.customerEmail || "",

                    "Customer Phone":
                        booking.customerPhone || "",

                    "Service":
                        booking.service || "",

                    "Date":
                        booking.date || "",

                    "Time":
                        booking.time || "",

                    "Address":
                        booking.address || "",

                    "Requirements":
                        booking.details || "",

                    "Worker":
                        booking.worker || "Not Assigned",

                    "Status":
                        booking.status || "Pending",

                    "Created On":
                        booking.createdAt
                            ? new Date(
                                booking.createdAt
                            ).toLocaleString()
                            : ""

                })
            );


        const sheet =
            XLSX.utils.json_to_sheet(
                bookingData
            );


        XLSX.utils.book_append_sheet(
            workbook,
            sheet,
            "Bookings"
        );
    }


    /* -----------------------------------------------------
       DOWNLOAD EXCEL
    ----------------------------------------------------- */

    XLSX.writeFile(
        workbook,
        `CoOpServices_${type}.xlsx`
    );
};


/* =========================================================
   PDF EXPORT
========================================================= */

const exportPDF = (
    type,
    customers,
    workers,
    bookings
) => {

    const pdf = new jsPDF(
        "landscape",
        "mm",
        "a4"
    );


    /* -----------------------------------------------------
       TITLE
    ----------------------------------------------------- */

    pdf.setFontSize(20);

    pdf.setTextColor(
        15,
        23,
        42
    );

    pdf.text(
        "Co-Op Services",
        14,
        15
    );


    pdf.setFontSize(9);

    pdf.setTextColor(
        100,
        116,
        139
    );

    pdf.text(
        `Generated: ${new Date().toLocaleString()}`,
        14,
        22
    );


    let startY = 30;


    /* -----------------------------------------------------
       CUSTOMERS
    ----------------------------------------------------- */

    if (
        (
            type === "customers" ||
            type === "all"
        ) &&
        customers.length > 0
    ) {

        pdf.setFontSize(14);

        pdf.setTextColor(
            37,
            99,
            235
        );

        pdf.text(
            "Customers",
            14,
            startY
        );


        autoTable(
            pdf,
            {
                startY: startY + 5,

                head: [[
                    "S.No",
                    "ID",
                    "Name",
                    "Email",
                    "Phone",
                    "Location",
                    "Status"
                ]],

                body:
                    customers.map(
                        (customer, index) => [

                            index + 1,

                            customer.id || "",

                            customer.name || "",

                            customer.email || "",

                            customer.phone || "",

                            customer.location || "",

                            customer.status ||
                                "Active"

                        ]
                    ),

                theme: "grid",

                styles: {
                    fontSize: 7,
                    cellPadding: 3
                },

                headStyles: {
                    fillColor: [
                        29,
                        78,
                        216
                    ],

                    textColor: [
                        255,
                        255,
                        255
                    ]
                }
            }
        );


        startY =
            pdf.lastAutoTable.finalY + 15;
    }


    /* -----------------------------------------------------
       WORKERS
    ----------------------------------------------------- */

    if (
        (
            type === "workers" ||
            type === "all"
        ) &&
        workers.length > 0
    ) {

        if (startY > 175) {

            pdf.addPage();

            startY = 20;
        }


        pdf.setFontSize(14);

        pdf.setTextColor(
            37,
            99,
            235
        );

        pdf.text(
            "Workers",
            14,
            startY
        );


        autoTable(
            pdf,
            {
                startY: startY + 5,

                head: [[
                    "S.No",
                    "ID",
                    "Name",
                    "Email",
                    "Phone",
                    "Service",
                    "Experience",
                    "Location",
                    "Status"
                ]],

                body:
                    workers.map(
                        (worker, index) => [

                            index + 1,

                            worker.id || "",

                            worker.name || "",

                            worker.email || "",

                            worker.phone || "",

                            worker.service || "",

                            worker.experience || "",

                            worker.location || "",

                            worker.status ||
                                "Active"

                        ]
                    ),

                theme: "grid",

                styles: {
                    fontSize: 6,
                    cellPadding: 2.5
                },

                headStyles: {
                    fillColor: [
                        29,
                        78,
                        216
                    ],

                    textColor: [
                        255,
                        255,
                        255
                    ]
                }
            }
        );


        startY =
            pdf.lastAutoTable.finalY + 15;
    }


    /* -----------------------------------------------------
       BOOKINGS
    ----------------------------------------------------- */

    if (
        (
            type === "bookings" ||
            type === "all"
        ) &&
        bookings.length > 0
    ) {

        if (startY > 175) {

            pdf.addPage();

            startY = 20;
        }


        pdf.setFontSize(14);

        pdf.setTextColor(
            37,
            99,
            235
        );

        pdf.text(
            "Bookings",
            14,
            startY
        );


        autoTable(
            pdf,
            {
                startY: startY + 5,

                head: [[
                    "Booking ID",
                    "Customer",
                    "Service",
                    "Date",
                    "Time",
                    "Worker",
                    "Status"
                ]],

                body:
                    bookings.map(
                        (booking) => [

                            booking.id || "",

                            booking.customer || "",

                            booking.service || "",

                            booking.date || "",

                            booking.time || "",

                            booking.worker ||
                                "Not Assigned",

                            booking.status ||
                                "Pending"

                        ]
                    ),

                theme: "grid",

                styles: {
                    fontSize: 7,
                    cellPadding: 3
                },

                headStyles: {
                    fillColor: [
                        29,
                        78,
                        216
                    ],

                    textColor: [
                        255,
                        255,
                        255
                    ]
                }
            }
        );
    }


    /* -----------------------------------------------------
       NO DATA
    ----------------------------------------------------- */

    if (
        customers.length === 0 &&
        workers.length === 0 &&
        bookings.length === 0
    ) {

        pdf.setFontSize(14);

        pdf.setTextColor(
            100,
            116,
            139
        );

        pdf.text(
            "No data available.",
            14,
            35
        );
    }


    /* -----------------------------------------------------
       DOWNLOAD PDF
    ----------------------------------------------------- */

    pdf.save(
        `CoOpServices_${type}.pdf`
    );
};


/* =========================================================
   MAIN EXPORT FUNCTION
========================================================= */

export const exportData = (
    format,
    type = "all"
) => {

    const customers =
        getCustomers();

    const workers =
        getWorkers();

    const bookings =
        getBookings();


    if (format === "pdf") {

        exportPDF(
            type,
            customers,
            workers,
            bookings
        );

        return;
    }


    if (format === "excel") {

        exportExcel(
            type,
            customers,
            workers,
            bookings
        );

        return;
    }


    alert(
        "Please select PDF or Excel."
    );
};