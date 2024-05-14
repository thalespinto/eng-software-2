import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.15.106:3000",
});

export const createSession = async (cpf: string, senha: string) => {
  try {
    const response = await api.post("/user/login", { cpf, senha });
    return response.data;
  } catch (error) {
    throw error;
  }
};
