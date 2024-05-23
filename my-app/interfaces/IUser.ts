export interface IUser {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  login: string;
  cpf: string;
  senha: string;
  nome: string;
  esta_oferecendo_carona: boolean;
  reputacao?: number;
  profile_pic?: string;
}
