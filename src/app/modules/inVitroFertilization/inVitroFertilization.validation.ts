import { z } from "zod";

export const updateInVitroFertilizationData = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const InVitroFertilizationValidations = { updateInVitroFertilizationData };
export default InVitroFertilizationValidations;