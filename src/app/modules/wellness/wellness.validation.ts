import { z } from "zod";

export const updateWellnessData = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const WellnessValidations = { updateWellnessData };
export default WellnessValidations;