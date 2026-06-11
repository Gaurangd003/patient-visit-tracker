
import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer,Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CreatePatientModal from "../components/modal/CreatePatientModal";
import type { Patient } from "../types";
import { useState } from "react";
import { usePatients } from "../hooks/usePatients";


const data: Patient[] = [
  { id: 1, name: "John Doe", date_of_birth: "1985-03-15" },
  { id: 2, name: "Jane Smith", date_of_birth: "1992-07-22" },
  { id: 3, name: "Michael Johnson", date_of_birth: "1978-11-08" },
  { id: 4, name: "Emily Davis", date_of_birth: "2000-01-30" },
  { id: 5, name: "Robert Wilson", date_of_birth: "1969-09-12" },
];

const Clinicians = () => {
  const result = usePatients();
  const [open, setOpen] = useState<boolean>(false);

  return <>  <TableContainer >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Date of Birth</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {result.data?.map(c => (
          <TableRow key={c.id}>
            <TableCell>{c.id}</TableCell>
            <TableCell>{c.name}</TableCell>
            <TableCell>{c.date_of_birth}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
    <Fab aria-label="add" onClick={() => setOpen(true)} sx={{ position: "absolute", right: "2%", bottom: "5%" }}>
      <AddIcon />
    </Fab>
    <CreatePatientModal open={open} onClose={() => setOpen(false)} />
  </>
}

export default Clinicians;