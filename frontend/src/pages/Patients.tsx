
import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer,Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CreatePatientModal from "../components/modal/CreatePatientModal";
import { useState } from "react";
import { usePatients } from "../hooks/usePatients";


const Patients = () => {
  const result = usePatients();
  const [open, setOpen] = useState(false);

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

export default Patients;