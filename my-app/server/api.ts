import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.15.100:3000",
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
