import { useState, useMemo } from "react";
import type { Visit } from "../../types";
import Table from '@mui/material/Table';
import { Box, Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from "react-router-dom";

interface VisitsTableProps {
  visits: Visit[];
  viewAll?: boolean;
}

const VisitsTable = ({ visits, viewAll }: VisitsTableProps) => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedClinician, setSelectedClinician] = useState("");

  const patient_names = useMemo(() =>
    [...new Set(visits.map((v) => v.patient_name))], [visits]);

  const clinician_names = useMemo(() =>
    [...new Set(visits.map((v) => v.clinician_name))], [visits]);

  const filteredVisits = useMemo(() =>
    visits.filter((visit) => {
      const patientMatch = !selectedPatient || visit.patient_name === selectedPatient;
      const clinicianMatch = !selectedClinician || visit.clinician_name === selectedClinician;
      return patientMatch && clinicianMatch;
    }),
    [visits, selectedPatient, selectedClinician]
  );

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Recent Visits
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Select
            size="small"
            value={selectedPatient}
            displayEmpty
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <MenuItem value=""><em>All Patients</em></MenuItem>
            {patient_names.map((name) => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select>

          <Select
            size="small"
            value={selectedClinician}
            displayEmpty
            onChange={(e) => setSelectedClinician(e.target.value)}
          >
            <MenuItem value=""><em>All Clinicians</em></MenuItem>
            {clinician_names.map((name) => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select>

          {viewAll && (
            <Button size="small" component={NavLink} sx={{ textTransform: "none", color: "#0a4c2c", fontWeight: "500" }} to="/visits">
              View All
            </Button>
          )}
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Clinician</TableCell>
            <TableCell>Patient</TableCell>
            <TableCell>Date & Time</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredVisits.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 4, color: "text.secondary" }}>
                No visits found
              </TableCell>
            </TableRow>
          ) : (
            filteredVisits.slice(0, viewAll ? 5 : filteredVisits.length).map((visit) => (
              <TableRow key={visit.id} hover>
                <TableCell>{visit.id}</TableCell>
                <TableCell>{visit.clinician_name}</TableCell>
                <TableCell>{visit.patient_name}</TableCell>
                <TableCell>{new Date(visit.visited_at).toLocaleString()}</TableCell>
                <TableCell>{visit.notes}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VisitsTable;