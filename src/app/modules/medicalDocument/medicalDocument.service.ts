import { Types } from 'mongoose';
import unlinkFile from '../../utils/unLinkFile';
import { IMedicalDocument } from './medicalDocument.interface';
import MedicalDocument from './medicalDocument.model';

const createUserMedicalDocument = async (
  profileId: string,
  payload: IMedicalDocument,
) => {
  const result = await MedicalDocument.create({
    normalUserId: profileId,
    medical_mySelf_image: payload.medical_mySelf_image ?? [],
    medical_family_image: payload.medical_family_image ?? [],
  });

  return result;
};

// const updateUserMedicalDocument = async (
//   profileId: string,
//   payload: IMedicalDocument,
// ) => {
//   // $addToSet: { medical_mySelf_image: { $each: ["file2.png", "file3.png"] } }
//   // { $pull: { medical_mySelf_image: "file1.png" } }
//   //   const existDocoment = await MedicalDocument.findOne({
//   //     normalUserId: profileId,
//   //   });
//   //   if (!existDocoment) {
//   //     throw new Error('Document not found');
//   //   }
//   //   const result = MedicalDocument.findOneAndUpdate(
//   //     { normalUserId: profileId },
//   //     {
//   //       $addToSet: {
//   //         medical_mySelf_image: { $each: payload.medical_mySelf_image },
//   //         medical_family_image: { $each: payload.medical_family_image },
//   //       },
//   //       $pull: {
//   //         medical_mySelf_image: {
//   //           $in: payload.deleteMedical_mySelf_image,
//   //         },
//   //         medical_family_image: {
//   //           $in: payload.deleteMedical_family_image,
//   //         },
//   //       },
//   //     },
//   //   );
//   //   if (
//   //     payload.deleteMedical_mySelf_image &&
//   //     Array.isArray(payload.deleteMedical_mySelf_image)
//   //   ) {
//   //     for (const image of payload.deleteMedical_mySelf_image) {
//   //       unlinkFile(image);
//   //     }
//   //   }
//   //   if (
//   //     payload.medical_family_image &&
//   //     Array.isArray(payload.medical_family_image)
//   //   ) {
//   //     for (const image of payload.medical_family_image) {
//   //       unlinkFile(image);
//   //     }
//   //   }
//   //   return result;
//   // -----------

//   // -----------
// };
const updateUserMedicalDocument = async (
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
    { new: true },
  );

  if (!result) {
    throw new Error('Document not found');
  }

  // delete files from storage
  for (const image of deleteMedical_mySelf_image) {
    unlinkFile(image);
  }

  for (const image of deleteMedical_family_image) {
    unlinkFile(image);
  }

  return result;
};

const MedicalDocumentServices = {
  createUserMedicalDocument,
  updateUserMedicalDocument,
};
export default MedicalDocumentServices;
