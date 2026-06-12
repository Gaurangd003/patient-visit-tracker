import { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Box, Typography, IconButton, Divider, Autocomplete
} from "@mui/material";
import Alert from '@mui/material/Alert';
import CloseIcon from "@mui/icons-material/Close";
import AssignmentIcon from "@mui/icons-material/Assignment";
import type { Clinician, Patient } from "../../types";
import { useCreateVisit } from "../../hooks/useVisits";

interface CreateVisitModalProps {
    open: boolean;
    onClose: () => void;
    clinicians: Clinician[];
    patients: Patient[];
}

interface VisitFormState {
    clinician:  Clinician | null;
    patient:    Patient   | null;
    visited_at: string;
    notes:      string;
}

const EMPTY_FORM : VisitFormState = {
    clinician: null as Clinician | null,
    patient:   null as Patient  | null,
    visited_at: "",
    notes:     "",
};

const CreateVisitModal = ({ open, onClose, clinicians, patients }: CreateVisitModalProps) => {
    const [form, setForm] = useState<VisitFormState>(EMPTY_FORM);
    const { mutate, isPending, isSuccess, isError } = useCreateVisit();

    const handleClose = () => { setForm(EMPTY_FORM); onClose(); };

    const handleSubmit = () => {
        if (!form.clinician || !form.patient || !form.visited_at) return;
        mutate(form, {
            onSuccess: () => handleClose(),
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
                    <AssignmentIcon sx={{ color: "#fff", fontSize: 18 }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1E293B", lineHeight: 1.2 }}>
                        New Visit
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
                <Autocomplete
                    options={clinicians}
                    getOptionLabel={(c) => c.name}
                    onChange={(_, value) => setForm(prev => ({ ...prev, clinician: value }))}
                    renderOption={(props, c) => (
                        <Box component="li" {...props}>
                            <Typography variant="body2">{c.name}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                {c.specialty}
                            </Typography>
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label="Clinician" size="small" />}
                />

                <Autocomplete
                    options={patients}
                    getOptionLabel={(p) => p.name}
                    onChange={(_, value) => setForm(prev => ({ ...prev, patient: value }))}
                    renderOption={(props, p) => (
                        <Box component="li" {...props}>
                            <Typography variant="body2">{p.name}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                DOB: {new Date(p.date_of_birth).toLocaleDateString()}
                            </Typography>
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label="Patient" size="small" />}
                />

                <TextField
                    label="Date & Time"
                    type="datetime-local"
                    size="small"
                    fullWidth
                    onChange={(e) => setForm(prev => ({ ...prev, visited_at: e.target.value }))}
                    slotProps={{ inputLabel: { shrink: true } }}
                />

                <TextField
                    label="Notes"
                    multiline
                    rows={4}
                    fullWidth
                    size="small"
                    onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
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
                    disabled={!form.clinician || !form.patient || !form.visited_at}
                    sx={{
                        textTransform: "none", fontWeight: 600,
                        bgcolor: "#15663f", borderRadius: 2, px: 3,
                        "&:hover": { bgcolor: "#0a4c2c" },
                    }}
                >
                    Create Visit
                </Button>
            </DialogActions>

            {isPending && <Alert severity="info">Loading...</Alert>}
            {isSuccess && <Alert severity="success">Visit created successfully.</Alert>}
            {isError   && <Alert severity="error">Something went wrong.</Alert>}
        </Dialog>
    );
};

export default CreateVisitModal;