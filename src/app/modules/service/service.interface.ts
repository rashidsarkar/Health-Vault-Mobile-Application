import { ENUM_USER_ROLE } from '../user/user.const';

export interface IService {
  providerId?: string | null;
  providerType: ENUM_USER_ROLE | null;
  title: string;
  type: string;
  price: number;
}
