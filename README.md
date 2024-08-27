# SeatMe

SeatMe is a Django-based web application that allows users to sign up for a waitlist at restaurants. The application utilizes PostgreSQL for database management and features a front-end built with React and Material UI.

![Screen Shot 2024-08-26 at 11 13 57 PM](https://github.com/user-attachments/assets/5f111e36-64de-4fa1-9734-919c408dfb75)

![Screen Shot 2024-08-25 at 9 28 53 PM](https://github.com/user-attachments/assets/30e3d548-b723-47ff-aa7a-7349f4573193)


## Features

- **Waitlist Management:** Add and track users on the restaurant waitlist.
- **Admin Interface:** Manage users and reservations through Django's built-in admin interface.

## Requirements

- Python 3.11 or higher
- Django 5.1
- PostgreSQL 16
- psycopg2-binary
- - Node.js (for front-end)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/seatme.git
cd seatme
```

### 2. Set up a Virtual Enviroment

```bash
cd server
python3 -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
```

### 3. Install Backend Dependencies

Ensure your virtual environment is activated.

```bash
cd server/newproject
pip install -r requirements.txt
```

### 4. Apply Migrations

```bash
cd server/newproject
python3 manage.py migrate
```

### 7. Start the Django Development Server

```bash
python3 manage.py runserver
```

Access the Django REST UI at http://127.0.0.1:8000/api/bookings/

### 8. Set Up the Front-End

Navigate to the client directory:

```bash
cd client/app
```

### 8.1 Install Node.js Dependencies

```bash
npm instal
```

### 8.2 Start the React Development Server

```bash
npm run dev
```

Feel free to reach out at lukelyusf@gmail.com if you encounter any issues during the setup process.
