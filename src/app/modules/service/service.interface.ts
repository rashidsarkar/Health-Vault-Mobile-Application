export interface IService {
  providerId?: string | null;
  isAdminCreated: boolean;
  providerType: string;
  title: string;
  type: string;
  price: number;
}
