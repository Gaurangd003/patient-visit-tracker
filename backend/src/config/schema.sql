CREATE TABLE IF NOT EXISTS clinicians (
  id        SERIAL PRIMARY KEY,
  name      TEXT NOT NULL,
  specialty TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS patients (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  date_of_birth DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS visits (
  id           SERIAL PRIMARY KEY,
  clinician_id INTEGER NOT NULL REFERENCES clinicians(id),
  patient_id   INTEGER NOT NULL REFERENCES patients(id),
  visited_at   TIMESTAMP DEFAULT NOW(),
  notes        TEXT
);