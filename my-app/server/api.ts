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

export const getUserInfo = async (userId: number) => {
  try {
    const response = await api.get(`/user/getId/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelarCarona = async (id_carona: number) => {
  try {
    const response = await api.delete(`/carona/cancelar/${id_carona}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAvaliacao = async (avaliacaoData: { id_usuario_avaliador: number, id_usuario_avaliado: number, id_da_carona: number, nota: number }) => {
  try {
    const response = await api.post(`/avaliation/create`, avaliacaoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};