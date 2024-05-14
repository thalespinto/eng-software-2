import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const createSession = async (cpf: string, senha: string) => {
  const response = await api.post("/sessions", {
    cpf,
    senha,
  });

  return response.data;
}