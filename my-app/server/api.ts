import axios from "axios";

export const api = axios.create({
  baseURL: "http://jogar.storyadventure.com.br:3000",
});

export const createSession = async (cpf: string, senha: string) => {
  try {
    const response = await api.post("/user/login", { cpf, senha });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserVehicles = async (userId: number) => {
  try {
    const response = await api.get(`/vehicle/getUserVehicles/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserVehicle = async (carId: number) => {
  try {
    await api.delete(`/vehicle/delete/${carId}`);
  } catch (error) {
    throw error;
  }
};

