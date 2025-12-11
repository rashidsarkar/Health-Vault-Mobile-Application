import { z } from "zod";

export const updateDoctorData = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const DoctorValidations = { updateDoctorData };
export default DoctorValidations;