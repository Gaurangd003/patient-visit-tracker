
import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useClinicians } from "../hooks/useClinicians";
import CreateClinicianModal from "../components/modal/CreateClinicianModal";
import { useState } from "react";

const Clinicians = () => {
  const result = useClinicians();
  const [open, setOpen] = useState(false);

  return <>
    <TableContainer >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Specialty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.data?.map(c => (
            <TableRow key={c.id}>
              <TableCell>{c.id}</TableCell>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.specialty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Fab aria-label="add" onClick={() => setOpen(true)} sx={{ position: "absolute", right: "2%", bottom : "5%"}}>
      <AddIcon />
    </Fab>
    <CreateClinicianModal open={open} onClose={() => setOpen(false)} />
  </>
};

export default Clinicians;