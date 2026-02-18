import { Types } from 'mongoose';
import unlinkFile from '../../utils/unLinkFile';
import { IMedicalDocument } from './medicalDocument.interface';
import MedicalDocument from './medicalDocument.model';

// const createUserMedicalDocument = async (
//   profileId: string,
//   payload: IMedicalDocument,
// ) => {
//   const result = await MedicalDocument.create({
//     normalUserId: profileId,
//     medical_mySelf_image: payload.medical_mySelf_image ?? [],
//     medical_family_image: payload.medical_family_image ?? [],
//   });

//   return result;
// };

// const updateUserMedicalDocument = async (
//   profileId: string,
//   payload: IMedicalDocument,
// ) => {
//   const {
//     medical_mySelf_image = [],
//     medical_family_image = [],
//     deleteMedical_mySelf_image = [],
//     deleteMedical_family_image = [],
//   } = payload;

//   const result = await MedicalDocument.findOneAndUpdate(
//     { normalUserId: profileId },
//     [
//       {
//         $set: {
//           medical_mySelf_image: {
//             $setDifference: [
//               {
//                 $setUnion: [
//                   { $ifNull: ['$medical_mySelf_image', []] },
//                   medical_mySelf_image,
//                 ],
//               },
//               deleteMedical_mySelf_image,
//             ],
//           },

//           medical_family_image: {
//             $setDifference: [
//               {
//                 $setUnion: [
//                   { $ifNull: ['$medical_family_image', []] },
//                   medical_family_image,
//                 ],
//               },
//               deleteMedical_family_image,
//             ],
//           },
//         },
//       },
//     ],
//     { new: true },
//   );

//   if (!result) {
//     throw new Error('Document not found');
//   }

//   // delete files from storage
//   for (const image of deleteMedical_mySelf_image) {
//     unlinkFile(image);
//   }

//   for (const image of deleteMedical_family_image) {
//     unlinkFile(image);
//   }

//   return result;
// };

const upsertUserMedicalDocument = async (
  profileId: string,
  payload: IMedicalDocument,
) => {
  const {
    medical_mySelf_image = [],
    medical_family_image = [],
    deleteMedical_mySelf_image = [],
    deleteMedical_family_image = [],
  } = payload;

  const result = await MedicalDocument.findOneAndUpdate(
    { normalUserId: profileId },
    [
      {
        $set: {
          medical_mySelf_image: {
            $setDifference: [
              {
                $setUnion: [
                  { $ifNull: ['$medical_mySelf_image', []] },
                  medical_mySelf_image,
                ],
              },
              deleteMedical_mySelf_image,
            ],
          },

          medical_family_image: {
            $setDifference: [
              {
                $setUnion: [
                  { $ifNull: ['$medical_family_image', []] },
                  medical_family_image,
                ],
              },
              deleteMedical_family_image,
            ],
          },
        },
      },
    ],
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );

  // delete removed files
  for (const image of deleteMedical_mySelf_image) unlinkFile(image);
  for (const image of deleteMedical_family_image) unlinkFile(image);

  return result;
};

const getMyMedicalDocument = async (profileId: string) => {
  const result = await MedicalDocument.findOne({
    normalUserId: profileId,
  }).lean();

  if (!result) {
    throw new Error('Medical document not found');
  }

  return result;
};

const MedicalDocumentServices = {
  // createUserMedicalDocument,
  // updateUserMedicalDocument,
  upsertUserMedicalDocument,
  getMyMedicalDocument,
};
export default MedicalDocumentServices;
