import { z } from "zod";

export const updateNormalUserData = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const NormalUserValidations = { updateNormalUserData };
export default NormalUserValidations;