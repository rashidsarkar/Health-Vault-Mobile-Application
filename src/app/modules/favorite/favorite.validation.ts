import { z } from 'zod';

// export const updateFavoriteData = z.object({
//     body: z.object({
//         name: z.string().optional(),
//         phone: z.string().optional(),
//         address: z.string().optional(),
//     }),
// });

const FavoriteValidations = { updateFavoriteData };
export default FavoriteValidations;
