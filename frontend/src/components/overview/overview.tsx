import type { Clinician, Patient, Visit } from "../../types";
import visit_img from "../../assets/Visit.svg";
import clinician_img from "../../assets/Clinician.svg";
import patient_img from "../../assets/Patient.svg";
import Table from '@mui/material/Table';
import { Box, Button, Typography, Card, CardContent } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import type React from "react";

const OverView = () => {
  const data: Clinician[] = [
    { id: 1, name: "Dr. Sarah Johnson", speciality: "Cardiology" },
    { id: 2, name: "Dr. Michael Chen", speciality: "Neurology" },
    { id: 3, name: "Dr. Emily Davis", speciality: "Pediatrics" },
    { id: 4, name: "Dr. Robert Wilson", speciality: "Orthopedics" },
    { id: 5, name: "Dr. Priya Sharma", speciality: "Dermatology" },
  ];

  const data2: Patient[] = [
    { id: 1, name: "John Doe", dateOfBirth: "1985-03-15" },
    { id: 2, name: "Jane Smith", dateOfBirth: "1992-07-22" },
    { id: 3, name: "Michael Johnson", dateOfBirth: "1978-11-08" },
    { id: 4, name: "Emily Davis", dateOfBirth: "2000-01-30" },
    { id: 5, name: "Robert Wilson", dateOfBirth: "1969-09-12" },
  ];

  const sampleVisits: Visit[] = [
    { id: 1, clinician: 1, patient: 1, visitedAt: "2026-06-09T09:00:00", notes: "Routine cardiac follow-up" },
    { id: 2, clinician: 2, patient: 2, visitedAt: "2026-06-09T10:30:00", notes: "Skin rash consultation" },
    { id: 3, clinician: 3, patient: 4, visitedAt: "2026-06-08T14:15:00", notes: "Routine pediatric visit" },
    { id: 4, clinician: 4, patient: 3, visitedAt: "2026-06-08T11:00:00", notes: "Neurological assessment" },
    { id: 5, clinician: 1, patient: 5, visitedAt: "2026-06-07T16:45:00", notes: "Blood pressure review" },
  ];

  const StyledTable = ({ children, title }: { children: React.ReactNode, title: string }) => {
    return (
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: "1rem", alignItems: "center" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{title}</Typography>
          <Button size="small" sx={{ color: "#3B82F6", textTransform: "none" }}>View all</Button>
        </Box>
        <Table>
          {children}
        </Table>
      </TableContainer>
    );
  }

  const CountCard = ({
    count,
    entity,
    img,
  }: {
    count: number;
    entity: string;
    img : string;
  }) => { 
    return (
      <Card
        sx={{
          gridColumn: { md: "span 1", xs: "span 3" },
          borderRadius: 4,
          cursor: "pointer",
          border: "1px solid #E2E8F0",
          background:
            "linear-gradient(135deg, #FFFFFF 0%, #bcd8f3 100%)",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
          },
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                {entity}
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  mt: 1,
                  fontWeight: 700,
                  color: "#1E293B",
                }}
              >
                {count}
              </Typography><Typography
            sx={{
              mt: 4,
              color: "#2563EB",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            View Details →
          </Typography>
            </Box>
            <Box component="img" src={img} alt={entity} sx={{ width: 140, display: { xs: "none", sm: "block" }, objectFit: "contain" }} />
          </Box>

          
        </CardContent>
      </Card>
    );
  };


  return (
    <>
      <Box component="div" sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        p: 2,
        gap: "10px",
      }}>

        {/* ── Welcome banner — replaces the plain image+button box ── */}
        <Paper elevation={2} sx={{
          borderRadius: 3, overflow: "hidden",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", p: 3, gap: 2,
          background: "linear-gradient(135deg, #d5e3f7 20%, #ffffff 70%)",
          gridColumn: "span 3",
        }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#1E293B" }}>
              Welcome back, Dr. Admin 👋
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
              Manage patient visits, clinicians and more.
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} sx={{
              bgcolor: "#3B82F6", borderRadius: 2, textTransform: "none",
              fontWeight: 600, "&:hover": { bgcolor: "#2563EB" },
            }}>
              Create New Visit
            </Button>
          </Box>
          <Box component="img" src={visit_img} alt="Doctor and patient"
            sx={{ width: 200, display: { xs: "none", sm: "block" }, objectFit: "contain" }} />
        </Paper>


        <CountCard count={data.length} entity="Clinicians" img={clinician_img}/>
        <CountCard count={data2.length} entity="Patients" img={patient_img}/>
        <CountCard count={sampleVisits.length} entity="Total Visits" img={visit_img}/>

        {/* Visits */}
        <Box sx={{ gridColumn: "span 3" }}>
          <StyledTable title="Recent Visits" >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Clinician</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Date & Time</TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleVisits.map((visit) => (
                <TableRow key={visit.id} hover>
                  <TableCell>{visit.id}</TableCell>
                  <TableCell>{data.find(c => c.id === visit.clinician)?.name}</TableCell>
                  <TableCell>{data2.find(p => p.id === visit.patient)?.name}</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {new Date(visit.visitedAt).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>{visit.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </Box>

      </Box>
    </>
  );
}

export default OverView;