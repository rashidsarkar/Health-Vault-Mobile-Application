import { z } from "zod";

export const updatePharmacyData = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const PharmacyValidations = { updatePharmacyData };
export default PharmacyValidations;