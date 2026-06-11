import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import type { Patient } from "../types";

const usePatients = () => {
    const result = useQuery<Patient[]>({
        queryKey: ["Patients"],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/patients')
            return res.json();
        },
         refetchOnWindowFocus: false,
    })
    return result;
}

const useCreatePatient = () => {
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn: async (bodyData: { name: string; date_of_birth: string }) => {
            const res = await fetch('http://localhost:3000/patients', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData)
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },
        onSuccess : () => queryClient.invalidateQueries({ queryKey: ["Patients"]})
    })
    return result;
}


export { usePatients,useCreatePatient};

