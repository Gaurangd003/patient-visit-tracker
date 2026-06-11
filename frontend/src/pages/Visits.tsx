import VisitsTable from "../components/tables/VisitsTable";
import { useClinicians } from "../hooks/useClinicians";
import { usePatients } from "../hooks/usePatients";
import { useVisits } from "../hooks/useVisits";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import CreateVisitModal from "../components/modal/CreateVisitModal";

const Visits = () => {
  const clinician_data = useClinicians();
  const patients_data = usePatients(); 
  const visits_data = useVisits();
  const [open,setOpen] = useState<boolean>(false);
  return <>
  <VisitsTable visits={visits_data.data ?? []}/>
      <Fab aria-label="add" onClick={() => setOpen(true)} sx={{ position: "absolute", right: "2%", bottom : "5%"}}>
      <AddIcon />
    </Fab>
    <CreateVisitModal open={open} onClose={() => setOpen(false)} clinicians={clinician_data.data ?? []} patients={patients_data.data ?? []}/>
  </>;
};

export default Visits;