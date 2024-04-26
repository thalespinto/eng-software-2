export interface ICar {
  id: number;
  placa: string;
  marca?: string;
  modelo?: string;
  cor?: string;
  createdAt: Date;
  updatedAt: Date;
}
