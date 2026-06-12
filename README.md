# Patient Visit Tracker

A simple web application for managing clinicians, patients, and patient visits.

## Features

* View clinicians and patients
* Record new patient visits
* View visits in reverse chronological order
* Filter visits by clinician and patient


## Tech Stack
* React
* TypeScript
* Material UI

### Backend

* Node.js
* Express

### Database

* PostgreSQL (Neon)

## Database Schema

### clinicians

* id
* name
* specialty

### patients

* id
* name
* date_of_birth

### visits

* id
* clinician_id
* patient_id
* visited_at
* notes

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL=your_neon_connection_string
PORT=3000
```

## API Endpoints

### Clinicians

* GET /clinicians
* POST /clinicians

### Patients

* GET /patients
* POST /patients

### Visits

* GET /visits
* POST /visits

## Notes

* Visit data is returned with clinician and patient names for easier frontend rendering.
* The application focuses on core functionality and a clean user experience as required by the assignment.
