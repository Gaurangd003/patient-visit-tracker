import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Visit, Clinician, Patient } from "../types";

interface CreateVisitBody {
    clinician_id: number;
    patient_id:   number;
    visited_at:   string;
    notes:        string;
}

const useVisits = () => {
    return useQuery<Visit[]>({
        queryKey: ["visits"],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/visits');
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        }
    });
};

const useCreateVisit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (bodyData: { clinician: Clinician | null; patient: Patient | null; visited_at: string; notes: string }) => {
            const res = await fetch('http://localhost:3000/visits', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clinician_id: bodyData.clinician?.id,
                    patient_id:   bodyData.patient?.id,
                    visited_at:   bodyData.visited_at,
                    notes:        bodyData.notes,
                } as CreateVisitBody)
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["visits"] });
        }
    });
};

export { useVisits, useCreateVisit };