import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import type { Clinician } from "../types";

const useClinicians = () => {
    const result = useQuery<Clinician[]>({
        queryKey: ["Clinicians"],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/clinicians')
            return res.json();
        },
         refetchOnWindowFocus: false
    })
    return result;
}

const useCreateClinician = () => {
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn: async (bodyData: { name: string; specialty: string }) => {
            const res = await fetch('http://localhost:3000/clinicians', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData)
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Clinicians"] });
        }
    })
    return result;
}


export { useClinicians, useCreateClinician };

