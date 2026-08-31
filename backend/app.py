from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB = "coop_service.db"


# ---------------- DATABASE ----------------

def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            password TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS workers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            password TEXT NOT NULL,
            work TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_id INTEGER,
            worker_id INTEGER,
            service TEXT,
            date TEXT,
            time TEXT,
            address TEXT,
            status TEXT DEFAULT 'Pending'
        )
    """)

    conn.commit()
    conn.close()


# ---------------- CUSTOMER REGISTER ----------------

@app.route("/api/customer/register", methods=["POST"])
def customer_register():

    data = request.json

    try:

        conn = get_db()

        conn.execute("""
            INSERT INTO customers
            (name, email, phone, password)
            VALUES (?, ?, ?, ?)
        """, (
            data["name"],
            data["email"],
            data["phone"],
            data["password"]
        ))

        conn.commit()
        conn.close()

        return jsonify({
            "message": "Customer registered successfully"
        }), 201

    except sqlite3.IntegrityError:

        return jsonify({
            "message": "Email already exists"
        }), 400


# ---------------- CUSTOMER LOGIN ----------------

@app.route("/api/customer/login", methods=["POST"])
def customer_login():

    data = request.json

    conn = get_db()

    customer = conn.execute("""
        SELECT * FROM customers
        WHERE email = ? AND password = ?
    """, (
        data["email"],
        data["password"]
    )).fetchone()

    conn.close()

    if customer:

        return jsonify({
            "id": customer["id"],
            "name": customer["name"],
            "email": customer["email"],
            "phone": customer["phone"]
        })

    return jsonify({
        "message": "Invalid email or password"
    }), 401


# ---------------- WORKER REGISTER ----------------

@app.route("/api/worker/register", methods=["POST"])
def worker_register():

    data = request.json

    try:

        conn = get_db()

        conn.execute("""
            INSERT INTO workers
            (name, email, phone, password, work)
            VALUES (?, ?, ?, ?, ?)
        """, (
            data["name"],
            data["email"],
            data["phone"],
            data["password"],
            data["work"]
        ))

        conn.commit()
        conn.close()

        return jsonify({
            "message": "Worker registered successfully"
        }), 201

    except sqlite3.IntegrityError:

        return jsonify({
            "message": "Email already exists"
        }), 400


# ---------------- WORKER LOGIN ----------------

@app.route("/api/worker/login", methods=["POST"])
def worker_login():

    data = request.json

    conn = get_db()

    worker = conn.execute("""
        SELECT * FROM workers
        WHERE email = ? AND password = ?
    """, (
        data["email"],
        data["password"]
    )).fetchone()

    conn.close()

    if worker:

        return jsonify({
            "id": worker["id"],
            "name": worker["name"],
            "email": worker["email"],
            "phone": worker["phone"],
            "work": worker["work"]
        })

    return jsonify({
        "message": "Invalid email or password"
    }), 401


# ---------------- BOOK SERVICE ----------------

@app.route("/api/bookings", methods=["POST"])
def create_booking():

    data = request.json

    print("BOOKING DATA:", data)

    customer_id = data.get("customer_id")
    service = data.get("service")
    date = data.get("date")
    time = data.get("time")
    address = data.get("address")

    if not customer_id:
        return jsonify({
            "message": "Customer ID is missing"
        }), 400

    if not service:
        return jsonify({
            "message": "Service is missing"
        }), 400

    if not date:
        return jsonify({
            "message": "Date is required"
        }), 400

    if not time:
        return jsonify({
            "message": "Time is required"
        }), 400

    if not address:
        return jsonify({
            "message": "Address is required"
        }), 400


    conn = get_db()

    # Find workers who provide this service
    worker = conn.execute("""
        SELECT id FROM workers
        WHERE LOWER(work) = LOWER(?)
        LIMIT 1
    """, (service,)).fetchone()


    worker_id = worker["id"] if worker else None


    conn.execute("""
        INSERT INTO bookings
        (customer_id, worker_id, service, date, time, address, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        customer_id,
        worker_id,
        service,
        date,
        time,
        address,
        "Pending"
    ))

    conn.commit()

    booking_id = conn.execute(
        "SELECT last_insert_rowid()"
    ).fetchone()[0]

    conn.close()


    return jsonify({
        "message": "Service booked successfully",
        "booking_id": booking_id
    }), 201


# ---------------- CUSTOMER BOOKINGS ----------------

@app.route("/api/bookings/customer/<int:customer_id>", methods=["GET"])
def customer_bookings(customer_id):

    conn = get_db()

    bookings = conn.execute("""
        SELECT *
        FROM bookings
        WHERE customer_id = ?
        ORDER BY id DESC
    """, (customer_id,)).fetchall()

    conn.close()

    return jsonify([
        dict(booking)
        for booking in bookings
    ])


# ---------------- WORKER REQUESTS ----------------

@app.route("/api/bookings/worker/<int:worker_id>", methods=["GET"])
def worker_bookings(worker_id):

    conn = get_db()

    bookings = conn.execute("""
        SELECT
            bookings.*,
            customers.name AS customer_name
        FROM bookings
        LEFT JOIN customers
        ON bookings.customer_id = customers.id
        WHERE bookings.worker_id = ?
        ORDER BY bookings.id DESC
    """, (worker_id,)).fetchall()

    conn.close()

    return jsonify([
        dict(booking)
        for booking in bookings
    ])


# ---------------- ACCEPT / REJECT ----------------

@app.route("/api/bookings/<int:booking_id>", methods=["PUT"])
def update_booking(booking_id):

    data = request.json

    status = data.get("status")

    if status not in ["Accepted", "Rejected"]:
        return jsonify({
            "message": "Invalid status"
        }), 400


    conn = get_db()

    conn.execute("""
        UPDATE bookings
        SET status = ?
        WHERE id = ?
    """, (
        status,
        booking_id
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "message": f"Booking {status}"
    })


# ---------------- TEST ----------------

@app.route("/")
def home():

    return jsonify({
        "message": "Co-Op Service Backend is running"
    })


# ---------------- START ----------------

if __name__ == "__main__":

    init_db()

    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )