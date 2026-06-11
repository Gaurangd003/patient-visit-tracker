
import visit_img from "../assets/Visit.svg";
import clinician_img from "../assets/Clinician.svg";
import patient_img from "../assets/Patient.svg";
import VisitsTable from "../components/tables/VisitsTable";
import { Box, Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import CountCard from "../components/card/CountCard";
import CreateVisitModal from "../components/modal/CreateVisitModal";

import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { useClinicians } from "../hooks/useClinicians";
import { usePatients } from "../hooks/usePatients";
import { useVisits } from "../hooks/useVisits";


const OverView = () => {
  const[open,setOpen] = useState<boolean>(false);
  const clinician_data = useClinicians();
  const patients_data = usePatients(); 
  const visits_data = useVisits();
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
          background: "linear-gradient(135deg, #c5f6de 20%, #ffffff 70%)",
          gridColumn: "span 3",
        }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#1E293B" }}>
              Welcome back, Dr. Admin 👋
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
              Manage patient visits, clinicians and more.
            </Typography>
            <Button variant="contained" onClick={()=> setOpen(true)} startIcon={<AddIcon />} sx={{
              bgcolor: "#15663f", borderRadius: 2, textTransform: "none",
              fontWeight: 600, "&:hover": { bgcolor: "#0a4c2c" },
            }}>
              Create New Visit
            </Button>
          </Box>
          <Box component="img" src={visit_img} alt="Doctor and patient"
            sx={{ width: 200, display: { xs: "none", sm: "block" }, objectFit: "contain" }} />
        </Paper>


        <CountCard count={clinician_data.data?.length ?? 0} entity="Clinicians" img={clinician_img} />
        <CountCard count={patients_data.data?.length ?? 0} entity="Patients" img={patient_img} />
        <CountCard count={visits_data.data?.length ?? 0} entity="Visits" img={visit_img} />

        {/*Recent Visits Table*/}
        <Box sx={{ gridColumn: "span 3" }}>
          <VisitsTable visits={visits_data.data ?? []} ViewAll={true }/>
        </Box>
        <CreateVisitModal open={open} onClose={() => setOpen(false)} clinicians={clinician_data.data ?? []} patients={patients_data.data ?? []}/>
      </Box>
    </>
  );
}

export default OverView;