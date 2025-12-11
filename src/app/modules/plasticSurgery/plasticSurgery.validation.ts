import { z } from "zod";

export const updatePlasticSurgeryData = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const PlasticSurgeryValidations = { updatePlasticSurgeryData };
export default PlasticSurgeryValidations;