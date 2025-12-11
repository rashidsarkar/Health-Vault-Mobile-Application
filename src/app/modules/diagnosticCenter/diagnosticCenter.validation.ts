import { z } from "zod";

export const updateDiagnosticCenterData = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const DiagnosticCenterValidations = { updateDiagnosticCenterData };
export default DiagnosticCenterValidations;