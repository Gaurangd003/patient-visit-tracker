import { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Box, Typography, IconButton, Divider,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import PeopleIcon from "@mui/icons-material/People";
import { useCreatePatient } from "../../hooks/usePatients";

interface PatientFormState{
    name: string,
    date_of_birth: string
}

const EMPTY_FORM: PatientFormState = {
    name: "",
    date_of_birth: "",
};

interface CreateClinicianModalProps {
    open: boolean;
    onClose: () => void;
}

const CreatePatientModal = ({ open, onClose }: CreateClinicianModalProps) => {
    const [form, setForm] = useState<PatientFormState>(EMPTY_FORM);
    const { mutate, isPending, isSuccess, isError } = useCreatePatient();

    const handleClose = () => { setForm(EMPTY_FORM); onClose(); };

    const handleSubmit = () => {
        if (!form.name || !form.date_of_birth) return;
        mutate(form , {
            onSuccess : () => handleClose()
        });
    };


    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm"
            slotProps={{ paper: { sx: { borderRadius: 3 } } }}
        >
            <DialogTitle sx={{
                display: "flex", alignItems: "center", gap: 1.5,
                background: "linear-gradient(135deg, #c5f6de 20%, #ffffff 70%)",
            }}>
                <Box sx={{
                    width: 36, height: 36, borderRadius: 2, bgcolor: "#15663f",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <PeopleIcon sx={{ color: "#fff", fontSize: 18 }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1E293B", lineHeight: 1.2 }}>
                        New Patient
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Fill in the details below
                    </Typography>
                </Box>
                <IconButton size="small" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 2.5 }}>
                <TextField
                    label="Name"
                    size="small"
                    fullWidth
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                />
                <TextField
                    label="Date of Birth"
                    type="date"
                    size="small"
                    fullWidth
                    value={form.date_of_birth}
                    onChange={(e) => setForm(prev => ({ ...prev, date_of_birth: e.target.value }))}
                    slotProps={{ inputLabel: { shrink: true } }}
                />
            </DialogContent>

            <Divider />

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button onClick={handleClose} sx={{ textTransform: "none", color: "text.secondary" }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={!form.name || !form.date_of_birth}
                    sx={{
                        textTransform: "none", fontWeight: 600,
                        bgcolor: "#15663f", borderRadius: 2, px: 3,
                        "&:hover": { bgcolor: "#0a4c2c" },
                    }}
                >
                    Create Patient
                </Button>
            </DialogActions>

            {isPending && <Alert severity="info">Loading...</Alert>}
            {isSuccess && <Alert severity="success">Clinician created successfully.</Alert>}
            {isError && <Alert severity="error">Something went wrong.</Alert>}
        </Dialog>
    );
};

export default CreatePatientModal;