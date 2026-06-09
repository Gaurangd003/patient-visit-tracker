import type { Clinician,Patient,Visit } from "../../types";
function OverView() {
  const data: Clinician[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      speciality: "Cardiology",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      speciality: "Neurology",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      speciality: "Pediatrics",
    },
    {
      id: 4,
      name: "Dr. Robert Wilson",
      speciality: "Orthopedics",
    },
    {
      id: 5,
      name: "Dr. Priya Sharma",
      speciality: "Dermatology",
    },
  ];

  const data2: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    dateOfBirth: "1985-03-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    dateOfBirth: "1992-07-22",
  },
  {
    id: 3,
    name: "Michael Johnson",
    dateOfBirth: "1978-11-08",
  },
  {
    id: 4,
    name: "Emily Davis",
    dateOfBirth: "2000-01-30",
  },
  {
    id: 5,
    name: "Robert Wilson",
    dateOfBirth: "1969-09-12",
  },
];

const sampleVisits: Visit[] = [
  {
    id: 1,
    clinician: 1,
    patient: 1,
    visitedAt: "2026-06-09T09:00:00",
    notes: "Routine cardiac follow-up",
  },
  {
    id: 2,
    clinician: 2,
    patient: 2,
    visitedAt: "2026-06-09T10:30:00",
    notes: "Skin rash consultation",
  },
  {
    id: 3,
    clinician: 3,
    patient: 4,
    visitedAt: "2026-06-08T14:15:00",
    notes: "Routine pediatric visit",
  },
  {
    id: 4,
    clinician: 4,
    patient: 3,
    visitedAt: "2026-06-08T11:00:00",
    notes: "Neurological assessment",
  },
  {
    id: 5,
    clinician: 1,
    patient: 5,
    visitedAt: "2026-06-07T16:45:00",
    notes: "Blood pressure review",
  },
];

  return (
    <>
    <div>
      <table>
        <thead>
          <tr><th>id</th><th>Clinicians</th><th>Speciality</th></tr>
        </thead>
        <tbody>
          {data.map((clinician) => {
            return <tr><td>{clinician.id}</td> <td>{clinician.name}</td> <td>{clinician.speciality}</td> </tr>
          })}
        </tbody>
      </table>

      <table>
        <thead>
          <tr><th>id</th><th>Patients</th><th>Date of Birth</th></tr>
        </thead>
        <tbody>
          {data2.map((patient) => {
            return <tr><td>{patient.id}</td> <td>{patient.name}</td> <td>{patient.dateOfBirth}</td> </tr>
          })}
        </tbody>
      </table>
       <table>
        <thead>
          <tr><th>id</th><th>Clinician</th><th>Patient</th><th>time</th></tr>
        </thead>
        <tbody>
          {sampleVisits.map((visit) => {
            return <tr><td>{visit.id}</td> <td>{visit.clinician}</td> <td>{visit.patient}</td> </tr>
          })}
        </tbody>
      </table>
      </div>
    </>
  )
}

export default OverView;
