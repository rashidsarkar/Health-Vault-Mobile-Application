import { z } from "zod";

export const updateMedicalTourismData = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const MedicalTourismValidations = { updateMedicalTourismData };
export default MedicalTourismValidations;