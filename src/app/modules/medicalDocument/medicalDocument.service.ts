import { IMedicalDocument } from './medicalDocument.interface';
import MedicalDocument from './medicalDocument.model';

const createUserMedicalDocument = (
  profileId: string,
  payload: IMedicalDocument,
) => {
  //   const result = MedicalDocument.create(payload);
  //   return result;
  const data = {
    ...payload,
  };
  console.log(data);

  return data;
};
const updateUserMedicalDocument = (
  profileId: string,
  payload: IMedicalDocument,
) => {};

const MedicalDocumentServices = {
  createUserMedicalDocument,
  updateUserMedicalDocument,
};
export default MedicalDocumentServices;
